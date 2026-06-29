'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCall } from '@/context/CallContext';
import { getConversation, sendMessageHttp, sendFileMessage, getUserById } from '@/lib/api';
import { getSocket } from '@/lib/socket';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ChatPage() {
  const { id: receiverId } = useParams();
  const router = useRouter();
  const { user, loading } = useAuth();
  const { startCall } = useCall();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [peerName, setPeerName] = useState('');
  const [isOnline, setIsOnline] = useState(false);
  const [peerIsTyping, setPeerIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const bottomRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!user) return;
    const socket = getSocket();
    socket.emit('register', user._id);

    getConversation(receiverId)
      .then(setMessages)
      .catch((err) => setError(err.message));

    getUserById(receiverId)
      .then((u) => setPeerName(u.name || ''))
      .catch(() => {});

    const onReceive = (msg) => {
      if (msg.sender === receiverId || msg.sender?._id === receiverId) {
        setMessages((prev) => [...prev, msg]);
      }
    };
    const onOnlineUsers = (ids) => setIsOnline(ids.includes(receiverId));
    const onTyping = ({ sender }) => { if (sender === receiverId) setPeerIsTyping(true); };
    const onStopTyping = ({ sender }) => { if (sender === receiverId) setPeerIsTyping(false); };

    socket.on('receive_message', onReceive);
    socket.on('online_users', onOnlineUsers);
    socket.on('user_typing', onTyping);
    socket.on('user_stop_typing', onStopTyping);

    return () => {
      socket.off('receive_message', onReceive);
      socket.off('online_users', onOnlineUsers);
      socket.off('user_typing', onTyping);
      socket.off('user_stop_typing', onStopTyping);
    };
  }, [user, receiverId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, peerIsTyping]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    const socket = getSocket();
    socket.emit('typing', { sender: user._id, receiver: receiverId });
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('stop_typing', { sender: user._id, receiver: receiverId });
    }, 1500);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    clearTimeout(typingTimeoutRef.current);
    const socket = getSocket();
    socket.emit('stop_typing', { sender: user._id, receiver: receiverId });
    try {
      const saved = await sendMessageHttp(receiverId, input);
      setMessages((prev) => [...prev, { ...saved, type: 'text' }]);
      socket.emit('send_message', {
        sender: user._id, receiver: receiverId,
        content: input, type: 'text',
        _id: saved._id, createdAt: saved.createdAt,
      });
      setInput('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const saved = await sendFileMessage(receiverId, 'file', file);
      setMessages((prev) => [...prev, saved]);
      getSocket().emit('send_message', {
        sender: user._id, receiver: receiverId,
        type: 'file', fileUrl: saved.fileUrl,
        fileName: saved.fileName, fileMimeType: saved.fileMimeType,
        _id: saved._id, createdAt: saved.createdAt,
      });
    } catch (err) {
      setError(err.message);
    }
    e.target.value = '';
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];
      recorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const file = new File([blob], `voice_${Date.now()}.webm`, { type: 'audio/webm' });
        try {
          const saved = await sendFileMessage(receiverId, 'voice', file);
          setMessages((prev) => [...prev, saved]);
          getSocket().emit('send_message', {
            sender: user._id, receiver: receiverId,
            type: 'voice', fileUrl: saved.fileUrl,
            _id: saved._id, createdAt: saved.createdAt,
          });
        } catch (err) {
          setError(err.message);
        }
      };
      recorder.start();
      setIsRecording(true);
    } catch {
      setError('Microphone access denied.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const renderMessageContent = (msg) => {
    if (msg.type === 'voice') {
      return <audio controls src={`${BASE_URL}${msg.fileUrl}`} className="max-w-[240px]" />;
    }
    if (msg.type === 'file') {
      const isImage = msg.fileMimeType?.startsWith('image/');
      if (isImage) {
        return <img src={`${BASE_URL}${msg.fileUrl}`} alt={msg.fileName} className="max-w-[220px] rounded-lg" />;
      }
      return (
        <a href={`${BASE_URL}${msg.fileUrl}`} download={msg.fileName} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 underline text-amber-400 text-sm">
          <span>📎</span> {msg.fileName || 'Download file'}
        </a>
      );
    }
    return msg.content;
  };

  if (loading) return null;

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <p className="text-gray-500">Please <a href="/login" className="text-amber-400 underline">log in</a> to chat.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col px-4 py-8 max-w-3xl mx-auto">
      <button
        onClick={() => router.push('/exchange')}
        className="text-gray-500 hover:text-amber-400 mb-6 text-sm self-start transition-colors"
      >
        ← Back to Exchange
      </button>

      <div className="flex-1 bg-[#161616] border border-white/5 rounded-2xl p-6 flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold">
              {peerName || 'Conversation'}
            </h2>
            <div className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-green-400 shadow-[0_0_6px_#4ade80]' : 'bg-gray-600'}`} />
              <span className={`text-sm ${isOnline ? 'text-green-400' : 'text-gray-500'}`}>
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => startCall(receiverId, 'audio', peerName)}
              title="Voice call"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0a0a0a] border border-white/8 hover:border-amber-500/40 hover:text-amber-400 text-gray-300 text-sm transition-colors"
            >
              <PhoneIcon /> Voice
            </button>
            <button
              onClick={() => startCall(receiverId, 'video', peerName)}
              title="Video call"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0a0a0a] border border-white/8 hover:border-amber-500/40 hover:text-amber-400 text-gray-300 text-sm transition-colors"
            >
              <VideoIcon /> Video
            </button>
          </div>
        </div>

        {error && (
          <p className="bg-red-900/20 border border-red-700/40 text-red-400 rounded-xl px-4 py-2 mb-4 text-sm">{error}</p>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4 max-h-[55vh] pr-1">
          {messages.length === 0 ? (
            <p className="text-gray-600 text-center py-10 italic">No messages yet. Say hello!</p>
          ) : (
            messages.map((msg) => {
              const isMine = msg.sender === user._id || msg.sender?._id === user._id;
              return (
                <div key={msg._id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-4 py-2 rounded-2xl max-w-xs break-words ${
                    isMine
                      ? 'bg-amber-500 text-[#0a0a0a] font-medium'
                      : 'bg-[#1e1e1e] border border-white/8 text-gray-200'
                  }`}>
                    {renderMessageContent(msg)}
                    <p className={`text-xs mt-1 opacity-60 text-right ${isMine ? 'text-[#0a0a0a]' : 'text-gray-400'}`}>
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              );
            })
          )}

          {peerIsTyping && (
            <div className="flex justify-start">
              <div className="bg-[#1e1e1e] border border-white/8 px-4 py-2 rounded-2xl flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <div className="flex items-center gap-2">
          <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileSelect} />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Share file"
            className="p-3 rounded-xl bg-[#0a0a0a] border border-white/8 hover:border-amber-500/40 text-gray-400 hover:text-amber-400 transition-colors flex-shrink-0"
          >
            <PaperclipIcon />
          </button>

          <button
            type="button"
            onMouseDown={startRecording} onMouseUp={stopRecording}
            onTouchStart={startRecording} onTouchEnd={stopRecording}
            title={isRecording ? 'Release to send' : 'Hold to record'}
            className={`p-3 rounded-xl transition-colors flex-shrink-0 select-none border ${
              isRecording
                ? 'bg-red-600 border-red-500 text-white scale-110'
                : 'bg-[#0a0a0a] border-white/8 text-gray-400 hover:border-amber-500/40 hover:text-amber-400'
            }`}
          >
            <MicIcon recording={isRecording} />
          </button>

          <form onSubmit={handleSend} className="flex gap-2 flex-1">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder={isRecording ? 'Recording… release to send' : 'Type a message…'}
              className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-amber-500/50 text-sm text-white placeholder-gray-600 transition-colors"
            />
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 text-[#0a0a0a] px-5 py-3 rounded-xl font-semibold transition-colors text-sm"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
    </svg>
  );
}

function PaperclipIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
    </svg>
  );
}

function MicIcon({ recording }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill={recording ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4M9 11V7a3 3 0 116 0v4a3 3 0 11-6 0z" />
    </svg>
  );
}
