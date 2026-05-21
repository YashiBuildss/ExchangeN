'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

// ---------------- CARD COMPONENT ----------------
const ExchangeCard = ({
  offer,
  seek,
  user,
  title,
  id,
}) => {

  const router = useRouter();

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-blue-600 transition duration-300 hover:-translate-y-1 shadow-lg">

      {/* TITLE */}
      <h3 className="text-xl font-bold text-white mb-3">
        {title}
      </h3>

      {/* USER */}
      <p className="text-sm text-gray-400 mb-6">
        Posted by{' '}
        <span className="text-blue-400 font-medium">
          {user}
        </span>
      </p>

      {/* OFFER */}
      <div className="mb-5">

        <p className="text-xs text-gray-500 mb-2 tracking-wider">
          OFFERING
        </p>

        <span className="inline-block px-4 py-2 rounded-full bg-green-900/30 border border-green-700 text-green-300 text-sm">
          {offer}
        </span>

      </div>

      {/* SEEK */}
      <div className="mb-6">

        <p className="text-xs text-gray-500 mb-2 tracking-wider">
          SEEKING
        </p>

        <span className="inline-block px-4 py-2 rounded-full bg-blue-900/30 border border-blue-700 text-blue-300 text-sm">
          {seek}
        </span>

      </div>

      {/* BUTTON */}
      <button
        onClick={() => router.push(`/chat/${id}`)}
        className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
      >
        Start Conversation
      </button>

    </div>
  );
};

// ---------------- MAIN COMPONENT ----------------
const Exchange = () => {

  const router = useRouter();

  // ---------------- POSTS ----------------
  const [exchangeData, setExchangeData] = useState([]);

  // ---------------- FILTERS ----------------
  const [filters, setFilters] = useState({
    offering: '',
    seeking: '',
  });

  // ---------------- LOAD POSTS ----------------
  useEffect(() => {

    const storedPosts =
      JSON.parse(
        localStorage.getItem('exchangePosts')
      ) || [];

    const defaultPosts = [

      {
        id: 1,
        title: 'Teach Python, Learn UI/UX',
        offer: 'Python',
        seek: 'UI/UX Design',
        user: 'Yashi',
      },

      {
        id: 2,
        title: 'Spanish for React Exchange',
        offer: 'Spanish',
        seek: 'React',
        user: 'Alex',
      },

      {
        id: 3,
        title: 'Node.js Needed',
        offer: 'Data Visualization',
        seek: 'Node.js',
        user: 'Priya',
      },

      {
        id: 4,
        title: 'Guitar Lessons Exchange',
        offer: 'Guitar',
        seek: 'Calculus',
        user: 'Tom',
      },

      {
        id: 5,
        title: 'Teach SEO',
        offer: 'SEO',
        seek: 'Copywriting',
        user: 'Sarah',
      },

    ];

    setExchangeData([
      ...storedPosts,
      ...defaultPosts,
    ]);

  }, []);

  // ---------------- FILTERED DATA ----------------
  const filteredData = useMemo(() => {

    return exchangeData.filter((item) => {

      const offerFilter =
        filters.offering
          .toLowerCase()
          .trim();

      const seekFilter =
        filters.seeking
          .toLowerCase()
          .trim();

      const itemOffer =
        item.offer.toLowerCase();

      const itemSeek =
        item.seek.toLowerCase();

      // NORMAL FILTERS
      const matchesOffer =
        offerFilter === '' ||
        itemOffer.includes(offerFilter);

      const matchesSeek =
        seekFilter === '' ||
        itemSeek.includes(seekFilter);

      // PERFECT EXCHANGE
      const perfectMatch =
        offerFilter &&
        seekFilter &&
        itemOffer.includes(seekFilter) &&
        itemSeek.includes(offerFilter);

      return (
        (matchesOffer && matchesSeek)
        || perfectMatch
      );
    });

  }, [exchangeData, filters]);

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-8 lg:px-12 py-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-12">

          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Skill Exchange Matcher
          </h1>

          <p className="text-gray-400 text-lg max-w-2xl">
            Learn skills for free by teaching your own skills to others.
          </p>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

          {/* SIDEBAR */}
          <div className="lg:col-span-1 bg-gray-900 border border-gray-800 rounded-2xl p-6 h-fit sticky top-5">

            <h2 className="text-2xl font-bold mb-6">
              Match Skills
            </h2>

            {/* OFFER INPUT */}
            <div className="mb-5">

              <label className="block text-sm text-gray-400 mb-2">
                What Can You Teach?
              </label>

              <input
                type="text"
                value={filters.offering}
                placeholder="Ex: Python"
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    offering: e.target.value,
                  })
                }
                className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500"
              />

            </div>

            {/* SEEK INPUT */}
            <div className="mb-6">

              <label className="block text-sm text-gray-400 mb-2">
                What Do You Want To Learn?
              </label>

              <input
                type="text"
                value={filters.seeking}
                placeholder="Ex: React"
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    seeking: e.target.value,
                  })
                }
                className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
              />

            </div>

            {/* CLEAR */}
            <button
              onClick={() =>
                setFilters({
                  offering: '',
                  seeking: '',
                })
              }
              className="w-full py-3 rounded-xl bg-gray-700 hover:bg-gray-600 transition font-semibold mb-4"
            >
              Clear Filters
            </button>

            {/* CREATE POST */}
            <button
              onClick={() =>
                router.push('/create-post')
              }
              className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 transition font-semibold mb-4"
            >
              + Create New Post
            </button>

            {/* HOME */}
            <button
              onClick={() => router.push('/')}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
            >
              View Home Feed
            </button>

          </div>

          {/* RIGHT SECTION */}
          <div className="lg:col-span-3">

            {/* RESULTS */}
            <div className="flex items-center justify-between mb-8">

              <h2 className="text-2xl font-bold">
                Matching Opportunities
              </h2>

              <p className="text-gray-400">
                {filteredData.length} results
              </p>

            </div>

            {/* CARDS */}
            {filteredData.length > 0 ? (

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {filteredData.map((data) => (

                  <ExchangeCard
                    key={data.id}
                    id={data.id}
                    title={data.title}
                    offer={data.offer}
                    seek={data.seek}
                    user={data.user}
                  />

                ))}

              </div>

            ) : (

              <div className="flex justify-center items-center py-32">

                <p className="text-gray-500 text-lg italic">
                  No matching skills found.
                </p>

              </div>

            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default Exchange;