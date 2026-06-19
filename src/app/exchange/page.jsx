'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAllPosts, getSkillListings } from '@/lib/api';

const SkillTag = ({ label, color }) => (
  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium mr-1 mb-1 ${color}`}>
    {label}
  </span>
);

const ExchangeCard = ({ title, offers, seeks, user, userId, source }) => {
  const router = useRouter();
  return (
    <div className="bg-[#161616] border border-white/5 rounded-2xl p-6 hover:border-amber-500/20 hover:shadow-[0_0_24px_rgba(245,158,11,0.08)] transition-all duration-300 hover:-translate-y-1 flex flex-col">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-base font-semibold text-white leading-snug">{title}</h3>
        {source === 'skills' && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex-shrink-0 ml-2">
            Profile
          </span>
        )}
      </div>

      <p className="text-xs text-gray-500 mb-5">
        by <span className="text-amber-400 font-medium">{user}</span>
      </p>

      <div className="mb-4">
        <p className="text-xs text-gray-600 mb-2 tracking-widest uppercase">Offering</p>
        <div className="flex flex-wrap">
          {offers.map((s) => (
            <SkillTag key={s} label={s} color="bg-emerald-900/25 border border-emerald-700/40 text-emerald-400" />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xs text-gray-600 mb-2 tracking-widest uppercase">Seeking</p>
        <div className="flex flex-wrap">
          {seeks.map((s) => (
            <SkillTag key={s} label={s} color="bg-amber-900/25 border border-amber-700/40 text-amber-400" />
          ))}
        </div>
      </div>

      <div className="mt-auto">
        <button
          onClick={() => router.push(`/chat/${userId}`)}
          className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#0a0a0a] font-semibold text-sm transition-colors"
        >
          Start Conversation
        </button>
      </div>
    </div>
  );
};

const Exchange = () => {
  const router = useRouter();

  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ offering: '', seeking: '' });

  useEffect(() => {
    Promise.all([getAllPosts(), getSkillListings()])
      .then(([posts, skillListings]) => {
        const postItems = posts.map((p) => ({
          id: `post-${p._id}`,
          title: p.title,
          offers: [p.offer],
          seeks: [p.seek],
          user: p.user?.name || 'Unknown',
          userId: p.user?._id,
          source: 'post',
        }));

        const skillItems = skillListings.map((l) => ({
          id: `skill-${l.userId}`,
          title: `${l.userName}'s Skills`,
          offers: l.offers,
          seeks: l.seeks,
          user: l.userName,
          userId: l.userId,
          source: 'skills',
        }));

        const postUserIds = new Set(posts.map((p) => p.user?._id?.toString()));
        const dedupedSkillItems = skillItems.filter(
          (item) => !postUserIds.has(item.userId?.toString())
        );

        setAllItems([...postItems, ...dedupedSkillItems]);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredData = useMemo(() => {
    const offerFilter = filters.offering.toLowerCase().trim();
    const seekFilter = filters.seeking.toLowerCase().trim();

    return allItems.filter((item) => {
      const offersStr = item.offers.join(' ').toLowerCase();
      const seeksStr = item.seeks.join(' ').toLowerCase();
      const matchesOffer = offerFilter === '' || offersStr.includes(offerFilter);
      const matchesSeek = seekFilter === '' || seeksStr.includes(seekFilter);
      const perfectMatch =
        offerFilter && seekFilter &&
        offersStr.includes(seekFilter) &&
        seeksStr.includes(offerFilter);
      return (matchesOffer && matchesSeek) || perfectMatch;
    });
  }, [allItems, filters]);

  const inputClass =
    'w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/50 transition-colors';

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-4 sm:px-8 lg:px-12 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold mb-3">
            Skill Exchange
          </h1>
          <p className="text-gray-500 text-base max-w-xl">
            Find someone whose skills complement yours. No money, just knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 bg-[#161616] border border-white/5 rounded-2xl p-6 h-fit sticky top-20">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold mb-5">Filter</h2>

            <div className="mb-4">
              <label className="block text-xs text-gray-500 mb-1.5 uppercase tracking-wider">I can teach</label>
              <input
                type="text"
                value={filters.offering}
                placeholder="e.g. Python"
                onChange={(e) => setFilters({ ...filters, offering: e.target.value })}
                className={inputClass}
              />
            </div>

            <div className="mb-5">
              <label className="block text-xs text-gray-500 mb-1.5 uppercase tracking-wider">I want to learn</label>
              <input
                type="text"
                value={filters.seeking}
                placeholder="e.g. React"
                onChange={(e) => setFilters({ ...filters, seeking: e.target.value })}
                className={inputClass}
              />
            </div>

            <button
              onClick={() => setFilters({ offering: '', seeking: '' })}
              className="w-full py-2.5 rounded-xl border border-white/8 text-gray-400 hover:text-white hover:border-white/15 transition-colors text-sm mb-3"
            >
              Clear Filters
            </button>

            <button
              onClick={() => router.push('/create_post')}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#0a0a0a] font-semibold text-sm transition-colors"
            >
              + New Post
            </button>
          </div>

          {/* Listings */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold">
                {loading ? 'Loading…' : `${filteredData.length} ${filteredData.length === 1 ? 'listing' : 'listings'}`}
              </h2>
            </div>

            {loading ? (
              <p className="text-gray-600 text-center py-32">Loading…</p>
            ) : error ? (
              <p className="text-red-400 text-center py-32">{error}</p>
            ) : filteredData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredData.map((item) => (
                  <ExchangeCard
                    key={item.id}
                    title={item.title}
                    offers={item.offers}
                    seeks={item.seeks}
                    user={item.user}
                    userId={item.userId}
                    source={item.source}
                  />
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center py-32">
                <p className="text-gray-600 text-sm italic">No matches found. Try different filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exchange;
