'use client';

import React, { useEffect, useState } from 'react';

export default function Home() {

  // ---------------- POSTS ----------------
  const [posts, setPosts] = useState([]);

  // ---------------- LOAD POSTS ----------------
  useEffect(() => {

    const savedPosts =
      JSON.parse(
        localStorage.getItem('exchangePosts')
      ) || [];

    // SHOW NEWEST POSTS FIRST
    setPosts(savedPosts.reverse());

  }, []);

  // ---------------- NAVIGATION ----------------
  const handleStartNow = () => {
    window.location.href = '/exchange';
  };

  const handleTakeTour = () => {
    window.location.href = '/aboutus';
  };

  const handleCreatePost = () => {
    window.location.href = '/create-post';
  };

  return (
    <div>

      {/* HERO SECTION */}
      <div className="bg-white pb-6 sm:pb-8 lg:pb-12">

        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">

          <section className="relative flex items-center justify-center overflow-hidden rounded-lg bg-gray-100 py-16 shadow-lg md:py-20 xl:py-48">

            {/* IMAGE */}
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
              alt="Hero"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-indigo-900/60" />

            {/* CONTENT */}
            <div className="relative flex flex-col items-center p-4 sm:max-w-xl">

              <p className="mb-4 text-center text-lg text-gray-100">
                It's time to swap your skills!
              </p>

              <h1 className="mb-8 text-center text-4xl font-bold text-white sm:text-5xl md:text-6xl">
                Learn. Teach. Exchange. Grow.
              </h1>

              <div className="flex flex-col gap-3 sm:flex-row">

                {/* START */}
                <button
                  onClick={handleStartNow}
                  className="rounded-lg bg-black px-8 py-3 text-white font-semibold hover:bg-indigo-500 transition"
                >
                  Start now
                </button>

                {/* TOUR */}
                <button
                  onClick={handleTakeTour}
                  className="rounded-lg bg-white px-8 py-3 text-black font-semibold hover:bg-gray-200 transition"
                >
                  Take tour
                </button>

              </div>

            </div>

          </section>
        </div>
      </div>

      {/* FEATURE SECTION */}
      <div className="bg-white py-12">

        <div className="max-w-7xl mx-auto px-5">

          <h2 className="text-3xl font-bold text-center mb-4">
            Learn something new for FREE!
          </h2>

          <p className="text-center text-gray-500 mb-12">
            Learn a skill, teach a skill, and grow together with people around the world.
          </p>

          {/* FEATURE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* CARD 1 */}
            <div className="bg-indigo-100 p-8 rounded-2xl shadow-md">

              <h3 className="text-2xl font-bold mb-3">
                Learn Skills
              </h3>

              <p className="text-gray-700">
                Learn coding, design, editing, marketing, music and much more for free.
              </p>

            </div>

            {/* CARD 2 */}
            <div className="bg-indigo-100 p-8 rounded-2xl shadow-md">

              <h3 className="text-2xl font-bold mb-3">
                Teach Others
              </h3>

              <p className="text-gray-700">
                Share your own knowledge and help others grow while improving yourself.
              </p>

            </div>

            {/* CARD 3 */}
            <div className="bg-indigo-100 p-8 rounded-2xl shadow-md">

              <h3 className="text-2xl font-bold mb-3">
                Exchange Skills
              </h3>

              <p className="text-gray-700">
                Match with people who need your skills and offer the skills you want.
              </p>

            </div>

          </div>

        </div>
      </div>

      {/* RECENT POSTS SECTION */}
      <div className="bg-black text-white py-16">

        <div className="max-w-7xl mx-auto px-5">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 mb-10">

            <div>

              <h2 className="text-4xl font-bold mb-2">
                Recent Skill Exchange Posts
              </h2>

              <p className="text-gray-400">
                Connect with people and start learning today.
              </p>

            </div>

            {/* CREATE BUTTON */}
            <button
              onClick={handleCreatePost}
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold transition"
            >
              + Create Post
            </button>

          </div>

          {/* NO POSTS */}
          {posts.length === 0 ? (

            <div className="bg-gray-900 border border-gray-800 rounded-2xl py-20 text-center">

              <p className="text-2xl mb-3">
                No posts yet
              </p>

              <p className="text-gray-400 mb-6">
                Create your first skill exchange post.
              </p>

              <button
                onClick={handleCreatePost}
                className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold transition"
              >
                Create Post
              </button>

            </div>

          ) : (

            /* POSTS GRID */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {posts.map((post, index) => (

                <div
                  key={index}
                  className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-blue-600 transition"
                >

                  {/* TITLE */}
                  <h3 className="text-2xl font-bold mb-3">
                    {post.title}
                  </h3>

                  {/* USER */}
                  <p className="text-gray-400 mb-5">

                    Posted by{' '}

                    <span className="text-blue-400">
                      {post.user}
                    </span>

                  </p>

                  {/* OFFER */}
                  <div className="mb-4">

                    <p className="text-xs text-gray-500 mb-2">
                      OFFERING
                    </p>

                    <span className="inline-block bg-green-900/40 border border-green-700 text-green-300 px-4 py-2 rounded-full text-sm">
                      {post.offer}
                    </span>

                  </div>

                  {/* SEEK */}
                  <div className="mb-6">

                    <p className="text-xs text-gray-500 mb-2">
                      SEEKING
                    </p>

                    <span className="inline-block bg-blue-900/40 border border-blue-700 text-blue-300 px-4 py-2 rounded-full text-sm">
                      {post.seek}
                    </span>

                  </div>

                  {/* BUTTON */}
                  <button
                    onClick={() =>
                      window.location.href = `/chat/${post.id}`
                    }
                    className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold transition"
                  >
                    Start Conversation
                  </button>

                </div>

              ))}

            </div>

          )}

        </div>
      </div>

    </div>
  );
}