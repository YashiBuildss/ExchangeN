'use client';
import React, { useState, useRef, useEffect } from 'react';

// Default placeholder avatar for the preview
const DEFAULT_AVATAR = "https://placehold.co/100x100/374151/ffffff?text=U";

// Mock User Data for initial state loading
const MOCK_USER_DATA = {
    // NOTE: In a real app, this data would come from a useEffect API fetch
    name: "Abc",
    email: "abc123@xchangen.com",
    location: "Tech City",
    bio: "Passionate developer looking to exchange my Python skills for practical UX/UI design knowledge. Always ready to collaborate and learn new things!",
    dpUrl: '', // Placeholder for the currently saved image URL (e.g., /uploads/filename.jpg)
};

const EditProfilePage = () => {
    // State to hold the user's editable text data
    const [profileData, setProfileData] = useState(MOCK_USER_DATA);
    // State to hold the new image file if one is selected
    const [imageFile, setImageFile] = useState(null);
    // State for the image preview URL
    const [previewUrl, setPreviewUrl] = useState(MOCK_USER_DATA.dpUrl || DEFAULT_AVATAR);
    
    // NEW State for API communication
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    const [saveMessage, setSaveMessage] = useState('');
    
    // A ref to programmatically click the hidden file input
    const fileInputRef = useRef(null);

    // --- Handlers ---
    
    // Handler for text input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handler for when a new image file is selected
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            // Create a temporary URL for the selected file to show a preview
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    // Handler for saving data to the backend (The core fix)
    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        setApiError(null);
        setSaveMessage('');
        
        const formDataToSend = new FormData();
        
        // Append all text fields
        formDataToSend.append('name', profileData.name);
        formDataToSend.append('bio', profileData.bio);
        formDataToSend.append('location', profileData.location);
        
        // Append the image file
        if (imageFile) {
            formDataToSend.append('profileImage', imageFile); // 'profileImage' must match Multer field name
        }

        // --- IMPORTANT: Replace 'user-123' with the actual user's MongoDB ID ---
        const USER_ID = '60c72b2f9f1b2c0015b6d7c8'; // Use a mock ID or get the real one
        
        try {
            const response = await fetch(`http://localhost:5000/user/${USER_ID}/update`, {
                method: 'PUT',
                // IMPORTANT: DO NOT set Content-Type header. FormData handles it.
                body: formDataToSend, 
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update profile.');
            }

            // Success handling
            const updatedUser = await response.json();
            setProfileData(updatedUser.user); // Update frontend state with returned data
            setSaveMessage("Profile updated successfully!");
            
            // Wait 1.5 seconds then redirect to the profile page
            setTimeout(() => {
                window.location.href = '/profile';
            }, 1500); 

        } catch (error) {
            setApiError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Function to handle cancellation and return to the profile page
    const handleCancel = () => {
        window.location.href = '/profile';
    };

    // --- JSX Return ---
    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8 lg:p-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold text-indigo-400 mb-8 border-b border-gray-700 pb-4">
                    Edit Your Profile
                </h1>
                
                {/* Status Messages */}
                {apiError && (
                    <div className="bg-red-900 border border-red-400 text-red-100 px-4 py-3 rounded mb-4" role="alert">
                        <p className="font-bold">Error:</p>
                        <p className="text-sm">{apiError}</p>
                    </div>
                )}
                {saveMessage && (
                    <div className="bg-green-900 border border-green-400 text-green-100 px-4 py-3 rounded mb-4" role="alert">
                        <p className="text-sm font-semibold">{saveMessage}</p>
                    </div>
                )}
                
                <form onSubmit={handleSave} className="space-y-8">

                    {/* Section 1: Profile Picture with File Upload */}
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
                                {/* Hidden file input */}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    accept="image/png, image/jpeg, image/gif"
                                    className="hidden"
                                />
                                {/* Custom-styled button to trigger the file input */}
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
                    
                    {/* Section 2: Basic Information */}
                    <div className="bg-gray-800 p-8 rounded-xl shadow-xl">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-200">Personal Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Name Field */}
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

                            {/* Location Field */}
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

                            {/* Email (Read-only) */}
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
                    
                    {/* Section 3: About Me (Bio) */}
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
                    
                    {/* Section 4: Skills Management (Placeholder) */}
                    <div className="bg-gray-800 p-8 rounded-xl shadow-xl">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-200">Skills Management</h2>
                        <p className="text-gray-400 mb-6">
                            Future enhancement: dedicated interface to manage the "What I Offer" and "What I'm Seeking" lists.
                        </p>
                        <button 
                            type="button" 
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-150"
                            disabled
                        >
                            Manage Skills (Coming Soon)
                        </button>
                    </div>

                    {/* Action Buttons */}
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
                            disabled={loading} // Disable during save
                            className="rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition duration-150 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : 'Save Changes'} {/* Update button text */}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default EditProfilePage;