'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getConversationsList } from '@/lib/api';

export default function MessagesPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [conversations, setConversations] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    getConversationsList()
      .then(setConversations)
      .catch((err) => setError(err.message))
      .finally(() => setFetching(false));
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
        <p className="text-gray-500">Loading conversations...</p>
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
          {conversations.map((conv) => (
            <button
              key={conv.userId}
              onClick={() => router.push(`/chat/${conv.userId}`)}
              className="w-full text-left bg-gray-900 border border-gray-800 hover:border-blue-600 rounded-2xl p-5 transition flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-white">{conv.name}</p>
                <p className="text-gray-400 text-sm truncate max-w-xs">{conv.lastMessage}</p>
              </div>
              <span className="text-gray-500 text-xs">
                {new Date(conv.lastMessageAt).toLocaleDateString()}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}