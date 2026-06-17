'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { addPost } from '@/lib/api';

export default function CreatePost() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    offer: '',
    seek: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await addPost(formData);
      router.push('/exchange');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return null;

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">
          Please <a href="/login" className="text-blue-400 underline">log in</a> to create a post.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-2xl p-8">
        <h1 className="text-4xl font-bold mb-3">Create Skill Exchange Post</h1>
        <p className="text-gray-400 mb-10">Offer a skill and learn a new one for free.</p>

        {error && (
          <p className="bg-red-900/30 border border-red-700 text-red-300 rounded-xl px-4 py-3 mb-6">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm mb-2 text-gray-400">Post Title</label>
            <input
              type="text"
              name="title"
              required
              placeholder="Ex: Teach Python, Learn React"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-400">Skill You Offer</label>
            <input
              type="text"
              name="offer"
              required
              placeholder="Ex: Python"
              value={formData.offer}
              onChange={handleChange}
              className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-400">Skill You Want</label>
            <input
              type="text"
              name="seek"
              required
              placeholder="Ex: UI/UX Design"
              value={formData.seek}
              onChange={handleChange}
              className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-xl font-semibold text-lg transition disabled:opacity-50"
          >
            {submitting ? 'Posting...' : 'Create Post'}
          </button>
        </form>
      </div>
    </div>
  );
}