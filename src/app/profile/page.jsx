'use client';

import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import AddSkillModal from '@/components/AddSkillModal'; // Import the AddSkillModal component

const Profile = () => {

  // --- Initial Data (Now loaded into State) ---
  const initialUserData = {
    name: "Abc",
    email: "abc123@xchangen.com",
    bio: "Passionate developer looking to exchange my Python skills for practical UI/UX design knowledge. Always ready to collaborate and learn new things!",
    // NOTE: 'type' values adjusted to match backend (OFFER/SEEK)
    skills: [
      { name: "Python", type: "OFFER", level: "Expert" }, 
      { name: "Tailwind CSS", type: "OFFER", level: "Intermediate" },
      { name: "React", type: "SEEK", level: "Beginner" },
      { name: "UI/UX Design", type: "SEEK", level: "N/A" },
    ],
    memberSince: "Oct 2024",
    location: "Tech City",
  };
  
  // --- STATE MANAGEMENT ---
  const [userProfile, setUserProfile] = useState(initialUserData); // State for profile data
  const [isModalOpen, setIsModalOpen] = useState(false);          // State for modal visibility
  
  // Placeholder for initial data fetching
  useEffect(() => {
    // In a real app, you would fetch profile data from your GET /api/user/:id endpoint here
  }, []);


  // --- FUNCTION TO UPDATE SKILLS ARRAY (Passed to the Modal) ---
  const handleSkillAdded = (newSkill) => {
    // Create a new skill object in the format the frontend expects
    const formattedSkill = {
      name: newSkill.name,
      type: newSkill.type // 'OFFER' or 'SEEK' from the database
    };

    // Update the userProfile state, adding the new skill to the skills array
    setUserProfile(prevProfile => ({
      ...prevProfile,
      skills: [...prevProfile.skills, formattedSkill]
    }));
  };
  
  // --- Skill Tag Component (Adjusted to use database values: OFFER/SEEK) ---
  const SkillTag = ({ name, type }) => {
    let colorClass = 'bg-gray-700 text-gray-300';
    
    // Logic updated to check for 'OFFER' and 'SEEK'
    if (type === 'OFFER') {
      colorClass = 'bg-green-600 text-white';
    } else if (type === 'SEEK') {
      colorClass = 'bg-blue-600 text-white';
    }

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colorClass} mr-2 mb-2`}>
        {name}
        <span className="ml-2 text-xs opacity-70">
          {type} 
        </span>
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-10">
      <div className="max-w-6xl mx-auto py-10">

        <h1 className="text-4xl font-extrabold mb-8 text-center sm:text-left">
          {userProfile.name}'s Profile
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

          {/* Left Column (Sidebar/Info Card) */}
          <div className="lg:col-span-1 p-6 rounded-xl bg-gray-900 shadow-2xl space-y-6 text-center lg:text-left">
            
            {/* Profile Picture */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center text-4xl font-bold border-4 border-blue-500">
                {userProfile.name[0]}
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-4">{userProfile.name}</h2>
            <p className="text-sm text-gray-400">{userProfile.email}</p>
            
            <div className="border-t border-gray-700 pt-4 space-y-2 text-sm">
                <div className='flex justify-between lg:block'>
                    <p className="font-semibold text-gray-300">Location:</p>
                    <p className="text-blue-400">{userProfile.location}</p>
                </div>
                <div className='flex justify-between lg:block'>
                    <p className="font-semibold text-gray-300">Member Since:</p>
                    <p className="text-blue-400">{userProfile.memberSince}</p>
                </div>
            </div>

            <button
            onClick={() => window.location.href = '/edit'}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-150"
            >
                Edit Profile
            </button>
          </div>

          {/* Right Column (Main Content) */}
          <div className="lg:col-span-3 space-y-10">
            
            {/* Bio Section */}
            <div className="p-6 rounded-xl bg-gray-900 shadow-2xl">
              <h2 className="text-2xl font-bold border-b border-gray-700 pb-3 mb-4">
                About Me
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {userProfile.bio}
              </p>
            </div>

            {/* Skills Section */}
            <div className="p-6 rounded-xl bg-gray-900 shadow-2xl">
              <h2 className="text-2xl font-bold border-b border-gray-700 pb-3 mb-4 flex justify-between items-center">
                Skills & Exchange Status
                {/* Button to open the modal */}
                <button 
                onClick={() => setIsModalOpen(true)} // <--- Changed to open modal
                className='text-sm text-blue-400 hover:text-blue-300'>+ Add Skill</button>
              </h2>
              
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-green-400 mb-2">What I Offer (My Expertise)</h3>
                <div className="flex flex-wrap">
                  {/* Filter by OFFER */}
                  {userProfile.skills.filter(s => s.type === 'OFFER').map((skill) => (
                    <SkillTag key={skill.name} name={skill.name} type={skill.type} />
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">What I'm Seeking to Learn</h3>
                <div className="flex flex-wrap">
                  {/* Filter by SEEK */}
                  {userProfile.skills.filter(s => s.type === 'SEEK').map((skill) => (
                    <SkillTag key={skill.name} name={skill.name} type={skill.type} />
                  ))}
                </div>
              </div>
            </div>

            {/* Exchange History Placeholder */}
            <div className="p-6 rounded-xl bg-gray-900 shadow-2xl">
                <h2 className="text-2xl font-bold border-b border-gray-700 pb-3 mb-4">
                    Exchange History
                </h2>
                <p className="text-gray-500 italic">
                    No recent exchanges found. Start your first skill swap now!
                </p>
            </div>
          </div>
        </div>
      </div>

      {/* Conditionally Render the Modal (Correct Syntax) */}
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