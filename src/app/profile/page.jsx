'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getMe, getMySkills, deleteSkill } from '@/lib/api';
import AddSkillModal from '@/components/AddSkillModal';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const Profile = () => {
  const router = useRouter();
  const { user, loading: authLoading, logout } = useAuth();

  const [userProfile, setUserProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;

    Promise.all([getMe(), getMySkills()])
      .then(([userData, skillsData]) => {
        setUserProfile(userData);
        setSkills(skillsData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user]);

  const handleSkillAdded = (newSkill) => {
    setSkills((prev) => [...prev, newSkill]);
  };

  const handleDeleteSkill = async (skillId) => {
    try {
      await deleteSkill(skillId);
      setSkills((prev) => prev.filter((s) => s._id !== skillId));
    } catch (err) {
      setError(err.message);
    }
  };

  const SkillTag = ({ skill }) => {
    const colorClass =
      skill.type === 'OFFER'
        ? 'bg-emerald-900/25 border border-emerald-700/40 text-emerald-400'
        : 'bg-amber-900/25 border border-amber-700/40 text-amber-400';

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colorClass} mr-2 mb-2`}>
        {skill.name}
        <span className="ml-2 text-xs opacity-60">{skill.type}</span>
        <button
          onClick={() => handleDeleteSkill(skill._id)}
          className="ml-2 text-xs opacity-50 hover:opacity-100 transition-opacity"
        >
          ✕
        </button>
      </span>
    );
  };

  if (authLoading || loading) return null;

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <p className="text-gray-500">
          Please <a href="/login" className="text-amber-400 underline">log in</a> to view your profile.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (!userProfile) return null;

  const memberSince = new Date(userProfile.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-4 sm:px-8 lg:px-12 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold mb-3">
            {userProfile.name}'s Profile
          </h1>
          <p className="text-gray-500 text-base">Manage your skills and exchange preferences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 bg-[#161616] border border-white/5 rounded-2xl p-6 h-fit sticky top-20 space-y-5 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start">
              {userProfile.profilePic ? (
                <img
                  src={`${BASE_URL}${userProfile.profilePic}`}
                  alt={userProfile.name}
                  className="w-28 h-28 rounded-full object-cover border-2 border-amber-500/40"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-[#2a2a2a] border-2 border-amber-500/40 flex items-center justify-center text-4xl font-bold text-amber-400">
                  {userProfile.name[0]}
                </div>
              )}
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">{userProfile.name}</h2>
              <p className="text-sm text-gray-500 mt-1">{userProfile.email}</p>
            </div>

            <div className="border-t border-white/5 pt-4 space-y-3 text-sm">
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-widest mb-0.5">Location</p>
                <p className="text-amber-400">{userProfile.location || 'Not set'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-widest mb-0.5">Member Since</p>
                <p className="text-amber-400">{memberSince}</p>
              </div>
            </div>

            <button
              onClick={() => router.push('/edit')}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#0a0a0a] font-semibold text-sm transition-colors"
            >
              Edit Profile
            </button>

            <button
              onClick={() => { logout(); router.push('/'); }}
              className="w-full py-2.5 rounded-xl border border-white/8 text-gray-400 hover:text-white hover:border-white/15 font-semibold text-sm transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3 space-y-6">
            {/* About */}
            <div className="bg-[#161616] border border-white/5 rounded-2xl p-6">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold mb-1">About Me</h2>
              <div className="h-px bg-white/5 mb-4" />
              <p className="text-gray-400 leading-relaxed">
                {userProfile.bio || 'No bio yet — add one from Edit Profile.'}
              </p>
            </div>

            {/* Skills */}
            <div className="bg-[#161616] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold">Skills & Exchange Status</h2>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
                >
                  + Add Skill
                </button>
              </div>
              <div className="h-px bg-white/5 mb-5" />

              <div className="mb-5">
                <p className="text-xs text-gray-600 uppercase tracking-widest mb-3">What I Offer</p>
                <div className="flex flex-wrap">
                  {skills.filter((s) => s.type === 'OFFER').length > 0
                    ? skills.filter((s) => s.type === 'OFFER').map((skill) => (
                        <SkillTag key={skill._id} skill={skill} />
                      ))
                    : <p className="text-gray-600 text-sm italic">No offering skills added yet.</p>
                  }
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-600 uppercase tracking-widest mb-3">What I'm Seeking</p>
                <div className="flex flex-wrap">
                  {skills.filter((s) => s.type === 'SEEK').length > 0
                    ? skills.filter((s) => s.type === 'SEEK').map((skill) => (
                        <SkillTag key={skill._id} skill={skill} />
                      ))
                    : <p className="text-gray-600 text-sm italic">No seeking skills added yet.</p>
                  }
                </div>
              </div>
            </div>

            {/* Exchange history */}
            <div className="bg-[#161616] border border-white/5 rounded-2xl p-6">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold mb-1">Exchange History</h2>
              <div className="h-px bg-white/5 mb-4" />
              <p className="text-gray-600 italic text-sm">No recent exchanges found. Start your first skill swap now!</p>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <AddSkillModal
          onClose={() => setIsModalOpen(false)}
          onSkillAdded={handleSkillAdded}
        />
      )}
    </div>
  );
};

export default Profile;
