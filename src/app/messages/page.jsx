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
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">
          Please <a href="/login" className="text-blue-400 underline">log in</a> to view messages.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-8 py-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Messages</h1>

      {fetching ? (
        <p className="text-gray-500">Loading conversations…</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : conversations.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 mb-4">No conversations yet.</p>
          <button
            onClick={() => router.push('/exchange')}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition"
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
                className="w-full text-left bg-gray-900 border border-gray-800 hover:border-blue-600 rounded-2xl p-5 transition flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  {/* Avatar with online dot */}
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-sm">
                      {conv.name?.[0]?.toUpperCase() ?? '?'}
                    </div>
                    {isOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900 shadow-[0_0_6px_#4ade80]" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-white">{conv.name}</p>
                      {isOnline && <span className="text-green-400 text-xs">Online</span>}
                    </div>
                    <p className="text-gray-400 text-sm truncate max-w-xs">{conv.lastMessage}</p>
                  </div>
                </div>

                <span className="text-gray-500 text-xs flex-shrink-0">
                  {new Date(conv.lastMessageAt).toLocaleDateString()}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
