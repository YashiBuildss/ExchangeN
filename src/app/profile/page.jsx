'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getMe, getMySkills, deleteSkill } from '@/lib/api';
import AddSkillModal from '@/components/AddSkillModal';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const DEFAULT_AVATAR_BG = 'bg-gray-700';

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
    let colorClass = 'bg-gray-700 text-gray-300';
    if (skill.type === 'OFFER') colorClass = 'bg-green-600 text-white';
    else if (skill.type === 'SEEK') colorClass = 'bg-blue-600 text-white';

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colorClass} mr-2 mb-2`}>
        {skill.name}
        <span className="ml-2 text-xs opacity-70">{skill.type}</span>
        <button
          onClick={() => handleDeleteSkill(skill._id)}
          className="ml-2 text-xs hover:text-red-300"
        >
          ✕
        </button>
      </span>
    );
  };

  if (authLoading || loading) return null;

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">
          Please <a href="/login" className="text-blue-400 underline">log in</a> to view your profile.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
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
    <div className="min-h-screen bg-black text-white p-4 sm:p-10">
      <div className="max-w-6xl mx-auto py-10">
        <h1 className="text-4xl font-extrabold mb-8 text-center sm:text-left">
          {userProfile.name}'s Profile
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1 p-6 rounded-xl bg-gray-900 shadow-2xl space-y-6 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start">
              {userProfile.profilePic ? (
                <img
                  src={`${BASE_URL}${userProfile.profilePic}`}
                  alt={userProfile.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                />
              ) : (
                <div className={`w-32 h-32 rounded-full ${DEFAULT_AVATAR_BG} flex items-center justify-center text-4xl font-bold border-4 border-blue-500`}>
                  {userProfile.name[0]}
                </div>
              )}
            </div>

            <h2 className="text-2xl font-bold mt-4">{userProfile.name}</h2>
            <p className="text-sm text-gray-400">{userProfile.email}</p>

            <div className="border-t border-gray-700 pt-4 space-y-2 text-sm">
              <div className="flex justify-between lg:block">
                <p className="font-semibold text-gray-300">Location:</p>
                <p className="text-blue-400">{userProfile.location || 'Not set'}</p>
              </div>
              <div className="flex justify-between lg:block">
                <p className="font-semibold text-gray-300">Member Since:</p>
                <p className="text-blue-400">{memberSince}</p>
              </div>
            </div>

            <button
              onClick={() => router.push('/edit')}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-150"
            >
              Edit Profile
            </button>

            <button
              onClick={() => { logout(); router.push('/'); }}
              className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition duration-150"
            >
              Logout
            </button>
          </div>

          <div className="lg:col-span-3 space-y-10">
            <div className="p-6 rounded-xl bg-gray-900 shadow-2xl">
              <h2 className="text-2xl font-bold border-b border-gray-700 pb-3 mb-4">About Me</h2>
              <p className="text-gray-300 leading-relaxed">
                {userProfile.bio || 'No bio yet — add one from Edit Profile.'}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-gray-900 shadow-2xl">
              <h2 className="text-2xl font-bold border-b border-gray-700 pb-3 mb-4 flex justify-between items-center">
                Skills & Exchange Status
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  + Add Skill
                </button>
              </h2>

              <div className="mt-4">
                <h3 className="text-lg font-semibold text-green-400 mb-2">What I Offer (My Expertise)</h3>
                <div className="flex flex-wrap">
                  {skills.filter((s) => s.type === 'OFFER').map((skill) => (
                    <SkillTag key={skill._id} skill={skill} />
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">What I'm Seeking to Learn</h3>
                <div className="flex flex-wrap">
                  {skills.filter((s) => s.type === 'SEEK').map((skill) => (
                    <SkillTag key={skill._id} skill={skill} />
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-gray-900 shadow-2xl">
              <h2 className="text-2xl font-bold border-b border-gray-700 pb-3 mb-4">Exchange History</h2>
              <p className="text-gray-500 italic">No recent exchanges found. Start your first skill swap now!</p>
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