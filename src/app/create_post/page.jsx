'use client';

import React, { useState } from 'react';

export default function CreatePost() {

  const [formData, setFormData] = useState({
    title: '',
    offer: '',
    seek: '',
    user: '',
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    // GET OLD POSTS
    const existingPosts =
      JSON.parse(
        localStorage.getItem('exchangePosts')
      ) || [];

    // CREATE NEW POST
    const newPost = {
      id: Date.now(),
      title: formData.title,
      offer: formData.offer,
      seek: formData.seek,
      user: formData.user,
    };

    // SAVE POSTS
    localStorage.setItem(
      'exchangePosts',
      JSON.stringify([
        newPost,
        ...existingPosts,
      ])
    );

    // REDIRECT TO HOME
    window.location.href = '/';

  };

  return (

    <div className="min-h-screen bg-black text-white flex items-center justify-center px-5 py-10">

      <div className="w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-2xl p-8">

        <h1 className="text-4xl font-bold mb-3">
          Create Skill Exchange Post
        </h1>

        <p className="text-gray-400 mb-10">
          Offer a skill and learn a new one for free.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* TITLE */}
          <div>

            <label className="block text-sm mb-2 text-gray-400">
              Post Title
            </label>

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

          {/* OFFER */}
          <div>

            <label className="block text-sm mb-2 text-gray-400">
              Skill You Offer
            </label>

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

          {/* SEEK */}
          <div>

            <label className="block text-sm mb-2 text-gray-400">
              Skill You Want
            </label>

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

          {/* USER */}
          <div>

            <label className="block text-sm mb-2 text-gray-400">
              Your Name
            </label>

            <input
              type="text"
              name="user"
              required
              placeholder="Ex: Yashi"
              value={formData.user}
              onChange={handleChange}
              className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
            />

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-xl font-semibold text-lg transition"
          >
            Create Post
          </button>

        </form>

      </div>

    </div>

  );
}