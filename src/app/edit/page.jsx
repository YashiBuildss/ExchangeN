'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getMe, updateMe } from '@/lib/api';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const inputClass =
  'w-full px-4 py-2.5 bg-[#0a0a0a] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/50 transition-colors text-sm';

const EditProfilePage = () => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [profileData, setProfileData] = useState({ name: '', email: '', location: '', bio: '' });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [saveMessage, setSaveMessage] = useState('');

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!user) return;
    getMe().then((data) => {
      setProfileData({
        name: data.name || '',
        email: data.email || '',
        location: data.location || '',
        bio: data.bio || '',
      });
      if (data.profilePic) setPreviewUrl(`${BASE_URL}${data.profilePic}`);
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setApiError(null);
    setSaveMessage('');
    try {
      await updateMe({ name: profileData.name, bio: profileData.bio, location: profileData.location });

      if (imageFile) {
        const formData = new FormData();
        formData.append('profileImage', imageFile);
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE_URL}/user/me/photo`, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || 'Failed to upload photo');
        }
      }

      setSaveMessage('Profile updated successfully!');
      setTimeout(() => router.push('/profile'), 1200);
    } catch (error) {
      setApiError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return null;

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <p className="text-gray-500">
          Please <a href="/login" className="text-amber-400 underline">log in</a> to edit your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-4 sm:px-8 lg:px-12 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold mb-3">
            Edit Profile
          </h1>
          <p className="text-gray-500 text-base">Update your personal details and profile picture.</p>
        </div>

        {apiError && (
          <div className="bg-red-900/20 border border-red-700/40 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm">
            {apiError}
          </div>
        )}
        {saveMessage && (
          <div className="bg-emerald-900/20 border border-emerald-700/40 text-emerald-400 px-4 py-3 rounded-xl mb-6 text-sm">
            {saveMessage}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Profile Picture */}
          <div className="bg-[#161616] border border-white/5 rounded-2xl p-6">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold mb-1">Profile Picture</h2>
            <div className="h-px bg-white/5 mb-5" />
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Profile Preview"
                    className="w-24 h-24 rounded-full object-cover border-2 border-amber-500/40"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-[#2a2a2a] border-2 border-amber-500/40 flex items-center justify-center text-3xl font-bold text-amber-400">
                    {profileData.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                )}
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-3">Upload a new picture</p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/png, image/jpeg, image/gif"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#0a0a0a] font-semibold text-sm transition-colors"
                >
                  Choose from Gallery
                </button>
                <p className="text-xs text-gray-600 mt-2">Recommended: Square image (e.g., 400×400 pixels).</p>
              </div>
            </div>
          </div>

          {/* Personal Details */}
          <div className="bg-[#161616] border border-white/5 rounded-2xl p-6">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold mb-1">Personal Details</h2>
            <div className="h-px bg-white/5 mb-5" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  placeholder="Your display name"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">Location</label>
                <input
                  type="text"
                  name="location"
                  value={profileData.location}
                  onChange={handleChange}
                  placeholder="e.g., City, Country"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">Email (Read Only)</label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  readOnly
                  className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-white/5 rounded-xl text-gray-600 cursor-not-allowed text-sm"
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-[#161616] border border-white/5 rounded-2xl p-6">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold mb-1">About Me</h2>
            <div className="h-px bg-white/5 mb-5" />
            <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">
              Tell us about your exchange goals
            </label>
            <textarea
              name="bio"
              rows="4"
              value={profileData.bio}
              onChange={handleChange}
              placeholder="A passionate developer looking to…"
              className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/50 transition-colors text-sm resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.push('/profile')}
              disabled={loading}
              className="px-6 py-2.5 rounded-xl border border-white/8 text-gray-400 hover:text-white hover:border-white/15 font-semibold text-sm transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#0a0a0a] font-semibold text-sm transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
