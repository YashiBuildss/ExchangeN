'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getMe, updateMe } from '@/lib/api';

const DEFAULT_AVATAR = "https://placehold.co/100x100/374151/ffffff?text=U";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const EditProfilePage = () => {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    const [profileData, setProfileData] = useState({ name: '', email: '', location: '', bio: '' });
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(DEFAULT_AVATAR);

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
            if (data.profilePic) {
                setPreviewUrl(`${BASE_URL}${data.profilePic}`);
            }
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
            // Save text fields
            await updateMe({
                name: profileData.name,
                bio: profileData.bio,
                location: profileData.location,
            });

            // Save photo separately, if a new one was picked
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
            setTimeout(() => {
                router.push('/profile');
            }, 1200);
        } catch (error) {
            setApiError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => router.push('/profile');

    if (authLoading) return null;

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <p className="text-gray-400">
                    Please <a href="/login" className="text-indigo-400 underline">log in</a> to edit your profile.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8 lg:p-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold text-indigo-400 mb-8 border-b border-gray-700 pb-4">
                    Edit Your Profile
                </h1>

                {apiError && (
                    <div className="bg-red-900 border border-red-400 text-red-100 px-4 py-3 rounded mb-4">
                        <p className="font-bold">Error:</p>
                        <p className="text-sm">{apiError}</p>
                    </div>
                )}
                {saveMessage && (
                    <div className="bg-green-900 border border-green-400 text-green-100 px-4 py-3 rounded mb-4">
                        <p className="text-sm font-semibold">{saveMessage}</p>
                    </div>
                )}

                <form onSubmit={handleSave} className="space-y-8">
                    <div className="bg-gray-800 p-8 rounded-xl shadow-xl">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-200">Profile Picture (DP)</h2>
                        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
                            <div className="flex-shrink-0">
                                <img
                                    src={previewUrl}
                                    alt="Profile Preview"
                                    className="w-24 h-24 rounded-full object-cover border-4 border-indigo-400 shadow-lg"
                                    onError={(e) => { e.target.src = DEFAULT_AVATAR; }}
                                />
                            </div>
                            <div className="flex-grow">
                                <p className="text-gray-400 font-medium mb-2">Upload a new picture</p>
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
                                    className="w-full sm:w-auto rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition duration-150 hover:bg-indigo-700"
                                >
                                    Choose from Gallery
                                </button>
                                <p className="text-sm text-gray-500 mt-2">Recommended: Square image (e.g., 400x400 pixels).</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-8 rounded-xl shadow-xl">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-200">Personal Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <label className="block">
                                <span className="text-gray-400 font-medium mb-1 block">Full Name</span>
                                <input
                                    type="text"
                                    name="name"
                                    value={profileData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 text-white"
                                    placeholder="Your display name"
                                />
                            </label>

                            <label className="block">
                                <span className="text-gray-400 font-medium mb-1 block">Location</span>
                                <input
                                    type="text"
                                    name="location"
                                    value={profileData.location}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 text-white"
                                    placeholder="e.g., City, Country"
                                />
                            </label>

                            <label className="block">
                                <span className="text-gray-400 font-medium mb-1 block">Email (Read Only)</span>
                                <input
                                    type="email"
                                    name="email"
                                    value={profileData.email}
                                    readOnly
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-500 cursor-not-allowed"
                                />
                            </label>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-8 rounded-xl shadow-xl">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-200">About Me (Bio)</h2>
                        <label className="block">
                            <span className="text-gray-400 font-medium mb-1 block">Tell us about your exchange goals</span>
                            <textarea
                                name="bio"
                                rows="4"
                                value={profileData.bio}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 text-white"
                                placeholder="A passionate developer looking to..."
                            />
                        </label>
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={loading}
                            className="rounded-lg bg-gray-600 px-6 py-3 text-base font-semibold text-white transition duration-150 hover:bg-gray-700 disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition duration-150 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfilePage;