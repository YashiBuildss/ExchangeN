'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getConversation, sendMessageHttp } from '@/lib/api';
import { getSocket } from '@/lib/socket';

export default function ChatPage() {
  const { id: receiverId } = useParams();
  const router = useRouter();
  const { user, loading } = useAuth();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!user) return;

    const socket = getSocket();
    socket.emit('register', user._id);

    getConversation(receiverId)
      .then(setMessages)
      .catch((err) => setError(err.message));

    const handleReceive = (msg) => {
      if (msg.sender === receiverId || msg.receiver === receiverId) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on('receive_message', handleReceive);

    return () => {
      socket.off('receive_message', handleReceive);
    };
  }, [user, receiverId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const saved = await sendMessageHttp(receiverId, input);
      setMessages((prev) => [...prev, saved]);

      const socket = getSocket();
      socket.emit('send_message', {
        sender: user._id,
        receiver: receiverId,
        content: input,
        _id: saved._id,
        createdAt: saved.createdAt,
      });

      setInput('');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return null;

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">
          Please <a href="/login" className="text-blue-400 underline">log in</a> to chat.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col px-4 py-8 max-w-3xl mx-auto">
      <button
        onClick={() => router.push('/exchange')}
        className="text-gray-400 hover:text-white mb-4 text-sm self-start"
      >
        ← Back to Exchange
      </button>

      <div className="flex-1 bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-4">Conversation</h2>

        {error && (
          <p className="bg-red-900/30 border border-red-700 text-red-300 rounded-xl px-4 py-2 mb-4 text-sm">
            {error}
          </p>
        )}

        <div className="flex-1 overflow-y-auto space-y-3 mb-4 max-h-[60vh]">
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center py-10">No messages yet. Say hello!</p>
          ) : (
            messages.map((msg) => {
              const isMine = msg.sender === user._id || msg.sender?._id === user._id;
              return (
                <div
                  key={msg._id}
                  className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`px-4 py-2 rounded-2xl max-w-xs ${
                      isMine
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-200 border border-gray-700'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              );
            })
          )}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={handleSend} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-black border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}