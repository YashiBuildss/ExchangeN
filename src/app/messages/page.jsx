'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getConversationsList } from '@/lib/api';
import { getSocket } from '@/lib/socket';

export default function MessagesPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [conversations, setConversations] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;

    const socket = getSocket();
    socket.emit('register', user._id);

    const handleOnlineUsers = (ids) => setOnlineUsers(ids);
    socket.on('online_users', handleOnlineUsers);

    getConversationsList()
      .then(setConversations)
      .catch((err) => setError(err.message))
      .finally(() => setFetching(false));

    return () => socket.off('online_users', handleOnlineUsers);
  }, [user]);

  if (loading) return null;

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <p className="text-gray-500">
          Please <a href="/login" className="text-amber-400 underline">log in</a> to view messages.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-4 sm:px-8 lg:px-12 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold mb-3">
            Messages
          </h1>
          <p className="text-gray-500 text-base">Your conversations with skill exchange partners.</p>
        </div>

        {fetching ? (
          <p className="text-gray-600 text-center py-32">Loading conversations…</p>
        ) : error ? (
          <p className="text-red-400 text-center py-32">{error}</p>
        ) : conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <p className="text-gray-600 italic">No conversations yet.</p>
            <button
              onClick={() => router.push('/exchange')}
              className="bg-amber-500 hover:bg-amber-400 text-[#0a0a0a] px-6 py-3 rounded-xl font-semibold transition-colors text-sm"
            >
              Browse Exchange Board
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {conversations.map((conv) => {
              const isOnline = onlineUsers.includes(conv.userId?.toString());
              return (
                <button
                  key={conv.userId}
                  onClick={() => router.push(`/chat/${conv.userId}`)}
                  className="w-full text-left bg-[#161616] border border-white/5 hover:border-amber-500/20 hover:shadow-[0_0_24px_rgba(245,158,11,0.08)] rounded-2xl p-5 transition-all duration-300 flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-[#2a2a2a] border border-white/10 flex items-center justify-center text-amber-400 font-bold text-sm">
                        {conv.name?.[0]?.toUpperCase() ?? '?'}
                      </div>
                      {isOnline && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#161616] shadow-[0_0_6px_#4ade80]" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-white">{conv.name}</p>
                        {isOnline && (
                          <span className="text-xs px-1.5 py-0.5 rounded-full bg-green-900/25 border border-green-700/40 text-green-400">
                            Online
                          </span>
                        )}
                      </div>
                      <p className="text-gray-500 text-sm truncate max-w-xs mt-0.5">{conv.lastMessage}</p>
                    </div>
                  </div>

                  <span className="text-gray-600 text-xs flex-shrink-0">
                    {new Date(conv.lastMessageAt).toLocaleDateString()}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
