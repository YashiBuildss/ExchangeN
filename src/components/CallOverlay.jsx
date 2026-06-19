'use client';

import { useEffect, useRef, useState } from 'react';
import { useCall } from '@/context/CallContext';

function formatDuration(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function Avatar({ name, size = 'lg' }) {
  const s = size === 'lg' ? 'w-20 h-20 text-3xl' : 'w-12 h-12 text-xl';
  return (
    <div className={`${s} rounded-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center font-bold text-white flex-shrink-0`}>
      {name?.[0]?.toUpperCase() ?? '?'}
    </div>
  );
}

export default function CallOverlay() {
  const {
    callState, callType, incomingCall, remoteUserName,
    localStream, remoteStream, callError, isMuted, isCameraOff,
    acceptCall, rejectCall, endCall, cleanupCall, toggleMute, toggleCamera,
  } = useCall();

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [duration, setDuration] = useState(0);

  // Attach streams to video elements after mount/change
  useEffect(() => {
    if (localVideoRef.current) localVideoRef.current.srcObject = localStream ?? null;
  }, [localStream, callState]);

  useEffect(() => {
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = remoteStream ?? null;
  }, [remoteStream, callState]);

  // Call duration timer
  useEffect(() => {
    if (callState !== 'in_call') { setDuration(0); return; }
    const t = setInterval(() => setDuration((d) => d + 1), 1000);
    return () => clearInterval(t);
  }, [callState]);

  if (callState === 'idle') return null;

  // ── Error / declined ──────────────────────────────────────────────
  if (callState === 'error') {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100]">
        <div className="bg-gray-900 rounded-2xl p-8 text-center border border-red-800 shadow-2xl w-96 animate-in fade-in zoom-in duration-200">
          <div className="text-5xl mb-4">⚠️</div>
          <p className="text-xl font-bold text-white mb-2">Call Failed</p>
          <p className="text-red-400 text-sm mb-6 leading-relaxed">{callError}</p>
          <button onClick={cleanupCall}
            className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-full font-semibold transition text-white">
            Dismiss
          </button>
        </div>
      </div>
    );
  }

  // ── Incoming call ────────────────────────────────────────────────
  if (callState === 'receiving' && incomingCall) {
    return (
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-[100]">
        <div className="bg-gray-900 rounded-3xl p-10 text-center border border-gray-700 shadow-2xl w-80">
          {/* Pulsing avatar rings */}
          <div className="relative flex items-center justify-center mb-6">
            <span className="absolute w-32 h-32 rounded-full bg-green-500/20 animate-ping" />
            <span className="absolute w-24 h-24 rounded-full bg-green-500/25 animate-ping [animation-delay:0.3s]" />
            <Avatar name={incomingCall.fromName} size="lg" />
          </div>

          <p className="text-2xl font-bold text-white mb-1">{incomingCall.fromName}</p>
          <p className="text-gray-400 text-sm mb-8">
            Incoming {incomingCall.callType === 'video' ? '📹 Video' : '📞 Voice'} Call
          </p>

          <div className="flex gap-5 justify-center">
            {/* Decline */}
            <div className="flex flex-col items-center gap-2">
              <button onClick={rejectCall}
                className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-500 transition flex items-center justify-center shadow-lg">
                <PhoneOffIcon />
              </button>
              <span className="text-xs text-gray-400">Decline</span>
            </div>
            {/* Accept */}
            <div className="flex flex-col items-center gap-2">
              <button onClick={acceptCall}
                className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-400 transition flex items-center justify-center shadow-lg animate-bounce">
                <PhoneIcon />
              </button>
              <span className="text-xs text-gray-400">Accept</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Calling (waiting for answer) ─────────────────────────────────
  if (callState === 'calling') {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center z-[100] gap-6">
        <div className="flex flex-col items-center gap-4">
          <div className="relative flex items-center justify-center">
            <span className="absolute w-36 h-36 rounded-full bg-blue-500/15 animate-ping [animation-duration:1.5s]" />
            <span className="absolute w-28 h-28 rounded-full bg-blue-500/20 animate-ping [animation-duration:1.5s] [animation-delay:0.4s]" />
            <Avatar name={remoteUserName} size="lg" />
          </div>
          <div className="text-center mt-2">
            <p className="text-white text-2xl font-bold mb-1">{remoteUserName || 'Calling…'}</p>
            <p className="text-gray-400 text-sm animate-pulse">
              {callType === 'video' ? '📹 Video calling…' : '📞 Calling…'}
            </p>
          </div>
        </div>

        {/* hidden audio/video refs so streams attach on accept */}
        <video ref={remoteVideoRef} autoPlay playsInline className="hidden" />
        <video ref={localVideoRef} autoPlay playsInline muted className="hidden" />

        <button onClick={endCall}
          className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-500 transition flex items-center justify-center shadow-xl mt-4">
          <PhoneOffIcon />
        </button>
        <span className="text-xs text-gray-500">Cancel</span>
      </div>
    );
  }

  // ── Active call ──────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center z-[100] gap-4">
      {callType === 'video' ? (
        /* Video call layout */
        <div className="relative w-full max-w-2xl aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
          <video ref={remoteVideoRef} autoPlay playsInline
            className="w-full h-full object-cover" />
          {/* Local PiP */}
          <div className={`absolute bottom-3 right-3 w-32 h-24 rounded-xl overflow-hidden border-2 border-gray-600 shadow-lg ${isCameraOff ? 'bg-gray-800 flex items-center justify-center' : ''}`}>
            {isCameraOff
              ? <CameraOffIcon className="text-gray-500 w-6 h-6" />
              : <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover" />}
          </div>
          {/* Timer overlay */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-white text-sm font-mono">
            {formatDuration(duration)}
          </div>
          {/* Remote name */}
          <div className="absolute top-3 left-3 text-white text-sm font-semibold bg-black/40 px-2 py-1 rounded-lg">
            {remoteUserName}
          </div>
        </div>
      ) : (
        /* Audio call layout */
        <div className="bg-gray-900 rounded-3xl px-16 py-12 text-center border border-gray-800 shadow-2xl min-w-[300px]">
          <div className="relative flex items-center justify-center mb-5">
            <span className="absolute w-28 h-28 rounded-full bg-blue-500/20 animate-ping [animation-duration:2s]" />
            <Avatar name={remoteUserName} size="lg" />
          </div>
          <p className="text-white text-xl font-bold mb-1">{remoteUserName}</p>
          <p className="text-green-400 text-sm mb-2">In Call</p>
          <p className="text-gray-400 font-mono text-lg">{formatDuration(duration)}</p>
          {/* hidden video refs still needed for audio stream attachment */}
          <video ref={remoteVideoRef} autoPlay playsInline className="hidden" />
          <video ref={localVideoRef} autoPlay playsInline muted className="hidden" />
        </div>
      )}

      {/* Call controls */}
      <div className="flex items-center gap-5 mt-2">
        {/* Mute */}
        <div className="flex flex-col items-center gap-1.5">
          <button onClick={toggleMute}
            className={`w-14 h-14 rounded-full transition flex items-center justify-center shadow-lg ${
              isMuted ? 'bg-red-600 hover:bg-red-500' : 'bg-gray-700 hover:bg-gray-600'
            }`}>
            {isMuted ? <MicOffIcon /> : <MicIcon />}
          </button>
          <span className="text-xs text-gray-400">{isMuted ? 'Unmute' : 'Mute'}</span>
        </div>

        {/* End call */}
        <div className="flex flex-col items-center gap-1.5">
          <button onClick={endCall}
            className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-500 transition flex items-center justify-center shadow-xl">
            <PhoneOffIcon />
          </button>
          <span className="text-xs text-gray-400">End</span>
        </div>

        {/* Camera (video calls only) */}
        {callType === 'video' && (
          <div className="flex flex-col items-center gap-1.5">
            <button onClick={toggleCamera}
              className={`w-14 h-14 rounded-full transition flex items-center justify-center shadow-lg ${
                isCameraOff ? 'bg-red-600 hover:bg-red-500' : 'bg-gray-700 hover:bg-gray-600'
              }`}>
              {isCameraOff ? <CameraOffIcon /> : <CameraIcon />}
            </button>
            <span className="text-xs text-gray-400">{isCameraOff ? 'Cam On' : 'Cam Off'}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────
function PhoneIcon() {
  return (
    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}
function PhoneOffIcon() {
  return (
    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
    </svg>
  );
}
function MicIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4M9 11V7a3 3 0 116 0v4a3 3 0 11-6 0z" />
    </svg>
  );
}
function MicOffIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9v3a3 3 0 005.12 2.12M15 9.34V7a3 3 0 00-5.94-.6M17 16.48A7 7 0 015.07 11M3 3l18 18" />
    </svg>
  );
}
function CameraIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
    </svg>
  );
}
function CameraOffIcon({ className }) {
  return (
    <svg className={`w-6 h-6 text-white ${className ?? ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M3 3l18 18M9.75 9.75c-.69.69-1.11 1.653-1.11 2.75a3.75 3.75 0 003.75 3.75c1.097 0 2.06-.42 2.75-1.11" />
    </svg>
  );
}
