'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { getSocket } from '@/lib/socket';
import { useAuth } from './AuthContext';
import { startRingbackTone, startRingtone, stopPhoneSound } from '@/lib/phoneSound';

const CallContext = createContext(null);

const ICE_SERVERS = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
    { urls: 'turn:openrelay.metered.ca:80', username: 'openrelayproject', credential: 'openrelayproject' },
    { urls: 'turn:openrelay.metered.ca:443', username: 'openrelayproject', credential: 'openrelayproject' },
    { urls: 'turns:openrelay.metered.ca:443?transport=tcp', username: 'openrelayproject', credential: 'openrelayproject' },
  ],
};

export const CallProvider = ({ children }) => {
  const { user } = useAuth();

  const [callState, setCallState] = useState('idle'); // idle | calling | receiving | in_call | error
  const [callType, setCallType] = useState(null);     // audio | video
  const [incomingCall, setIncomingCall] = useState(null); // { from, fromName, signal, callType }
  const [remoteUserId, setRemoteUserId] = useState(null);
  const [remoteUserName, setRemoteUserName] = useState('');
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [callError, setCallError] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  const peerConnectionRef = useRef(null);
  const localStreamRef = useRef(null);

  // ── Phone sounds ────────────────────────────────────────────────
  useEffect(() => {
    if (callState === 'calling') startRingbackTone();
    else if (callState === 'receiving') startRingtone();
    else stopPhoneSound();
  }, [callState]);

  // ── Cleanup ─────────────────────────────────────────────────────
  const cleanupCall = useCallback(() => {
    stopPhoneSound();
    localStreamRef.current?.getTracks().forEach((t) => t.stop());
    localStreamRef.current = null;
    peerConnectionRef.current?.close();
    peerConnectionRef.current = null;
    setLocalStream(null);
    setRemoteStream(null);
    setCallState('idle');
    setCallType(null);
    setIncomingCall(null);
    setRemoteUserId(null);
    setRemoteUserName('');
    setCallError(null);
    setIsMuted(false);
    setIsCameraOff(false);
  }, []);

  // ── WebRTC peer connection ──────────────────────────────────────
  const buildPeerConnection = useCallback((targetId) => {
    const socket = getSocket();
    const pc = new RTCPeerConnection(ICE_SERVERS);
    pc.onicecandidate = (e) => {
      if (e.candidate) socket.emit('ice_candidate', { to: targetId, candidate: e.candidate });
    };
    pc.ontrack = (e) => setRemoteStream(e.streams[0]);
    pc.onconnectionstatechange = () => {
      if (pc.connectionState === 'failed' || pc.connectionState === 'disconnected') {
        setCallError('Connection lost. The call has ended.');
        setCallState('error');
      }
    };
    return pc;
  }, []);

  // ── Socket listeners (global — always active) ──────────────────
  useEffect(() => {
    if (!user) return;
    const socket = getSocket();
    socket.emit('register', user._id);

    const onIncomingCall = ({ from, fromName, signal, callType: ct }) => {
      setIncomingCall({ from, fromName: fromName || 'Someone', signal, callType: ct });
      setCallType(ct);
      setCallState('receiving');
      setRemoteUserId(from);
      setRemoteUserName(fromName || 'Someone');
    };

    const onCallAccepted = async ({ signal }) => {
      if (peerConnectionRef.current) {
        await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(signal));
        setCallState('in_call');
      }
    };

    const onIceCandidate = async ({ candidate }) => {
      try {
        if (peerConnectionRef.current && candidate) {
          await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
        }
      } catch {}
    };

    const onCallEnded = () => cleanupCall();
    const onCallRejected = () => {
      stopPhoneSound();
      setCallError('Call was declined.');
      setCallState('error');
    };

    socket.on('incoming_call', onIncomingCall);
    socket.on('call_accepted', onCallAccepted);
    socket.on('ice_candidate', onIceCandidate);
    socket.on('call_ended', onCallEnded);
    socket.on('call_rejected', onCallRejected);

    return () => {
      socket.off('incoming_call', onIncomingCall);
      socket.off('call_accepted', onCallAccepted);
      socket.off('ice_candidate', onIceCandidate);
      socket.off('call_ended', onCallEnded);
      socket.off('call_rejected', onCallRejected);
    };
  }, [user, cleanupCall]);

  // ── Media helpers ───────────────────────────────────────────────
  const getMediaStream = async (type) => {
    try {
      return await navigator.mediaDevices.getUserMedia({ audio: true, video: type === 'video' });
    } catch (err) {
      if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        throw new Error('Mic/camera is already in use by another tab or app.');
      }
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        throw new Error('Mic/camera permission denied — please allow access in your browser.');
      }
      if (err.name === 'NotFoundError') {
        throw new Error('No microphone or camera found on this device.');
      }
      throw new Error('Could not access mic/camera: ' + err.message);
    }
  };

  // ── Call actions ────────────────────────────────────────────────
  const startCall = async (targetId, type, targetName = '') => {
    setCallError(null);
    try {
      const stream = await getMediaStream(type);
      localStreamRef.current = stream;
      setLocalStream(stream);
      const pc = buildPeerConnection(targetId);
      peerConnectionRef.current = pc;
      stream.getTracks().forEach((t) => pc.addTrack(t, stream));
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      getSocket().emit('call_user', {
        to: targetId,
        from: user._id,
        fromName: user.name || 'Someone',
        signal: offer,
        callType: type,
      });
      setCallType(type);
      setCallState('calling');
      setRemoteUserId(targetId);
      setRemoteUserName(targetName);
    } catch (err) {
      setCallError(err.message);
      setCallState('error');
    }
  };

  const acceptCall = async () => {
    if (!incomingCall) return;
    setCallError(null);
    try {
      const stream = await getMediaStream(incomingCall.callType);
      localStreamRef.current = stream;
      setLocalStream(stream);
      const pc = buildPeerConnection(incomingCall.from);
      peerConnectionRef.current = pc;
      stream.getTracks().forEach((t) => pc.addTrack(t, stream));
      await pc.setRemoteDescription(new RTCSessionDescription(incomingCall.signal));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      getSocket().emit('answer_call', { to: incomingCall.from, signal: answer });
      setCallState('in_call');
      setIncomingCall(null);
    } catch (err) {
      setCallError(err.message);
      setCallState('error');
    }
  };

  const rejectCall = () => {
    if (incomingCall) getSocket().emit('reject_call', { to: incomingCall.from });
    cleanupCall();
  };

  const endCall = () => {
    if (remoteUserId) getSocket().emit('end_call', { to: remoteUserId });
    cleanupCall();
  };

  const toggleMute = () => {
    if (!localStreamRef.current) return;
    const newMuted = !isMuted;
    localStreamRef.current.getAudioTracks().forEach((t) => { t.enabled = !newMuted; });
    setIsMuted(newMuted);
  };

  const toggleCamera = () => {
    if (!localStreamRef.current) return;
    const newOff = !isCameraOff;
    localStreamRef.current.getVideoTracks().forEach((t) => { t.enabled = !newOff; });
    setIsCameraOff(newOff);
  };

  return (
    <CallContext.Provider value={{
      callState, callType, incomingCall, remoteUserId, remoteUserName,
      localStream, remoteStream, callError, isMuted, isCameraOff,
      startCall, acceptCall, rejectCall, endCall, cleanupCall,
      toggleMute, toggleCamera,
    }}>
      {children}
    </CallContext.Provider>
  );
};

export const useCall = () => useContext(CallContext);
