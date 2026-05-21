'use client';
import React, { useState } from 'react';

const AddSkillPage = () => {
  // State to manage the form inputs
  const [skillForm, setSkillForm] = useState({
    type: 'offer', // Can be 'offer' or 'seek'
    skillName: '',
    level: 'intermediate',
    description: '',
  });

  // Simple handler for form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSkillForm(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Placeholder function for submitting the new skill
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting new skill:", skillForm);
    
    // TODO: Integrate with backend API (e.g., POST /api/skills)
    
    // After submission, redirect to the profile page
    alert(`Successfully added skill: ${skillForm.skillName} as a ${skillForm.type}! (MOCK)`);
    window.location.href = '/profile';
  };

  // Function to handle cancellation and return to the profile page
  const handleCancel = () => {
    window.location.href = '/profile';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8 lg:p-12">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-extrabold text-indigo-400 mb-8 border-b border-gray-700 pb-4">
          {skillForm.type === 'offer' ? 'Offer a Skill' : 'Seek a Skill'}
        </h1>
        <p className="text-gray-400 mb-6">
          Specify a skill you want to share with the community or one you're actively looking to learn.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-8 rounded-xl shadow-2xl">
          
          {/* Skill Type Selector (Offer or Seek) */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setSkillForm(p => ({ ...p, type: 'offer' }))}
              className={`flex-1 py-3 rounded-lg text-lg font-semibold transition duration-150 ${
                skillForm.type === 'offer'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              I Offer (Expertise)
            </button>
            <button
              type="button"
              onClick={() => setSkillForm(p => ({ ...p, type: 'seek' }))}
              className={`flex-1 py-3 rounded-lg text-lg font-semibold transition duration-150 ${
                skillForm.type === 'seek'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              I Seek (To Learn)
            </button>
          </div>

          {/* Skill Name Input */}
          <label className="block">
            <span className="text-gray-400 font-medium mb-1 block">Skill Name (e.g., Python, Piano, UX Design)</span>
            <input
              type="text"
              name="skillName"
              value={skillForm.skillName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 text-white"
              placeholder="Enter the skill title"
            />
          </label>
          
          {/* Level Selector */}
          <label className="block">
            <span className="text-gray-400 font-medium mb-1 block">Your Current Level (for Offer) or Desired Depth (for Seek)</span>
            <select
              name="level"
              value={skillForm.level}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 text-white appearance-none cursor-pointer"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </label>

          {/* Description Textarea */}
          <label className="block">
            <span className="text-gray-400 font-medium mb-1 block">Brief Description / Scope</span>
            <textarea
              name="description"
              rows="3"
              value={skillForm.description}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 text-white"
              placeholder="Example: I can teach you the basics of Python lists and dictionaries."
            />
          </label>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-lg bg-gray-600 px-6 py-3 text-base font-semibold text-white transition duration-150 hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition duration-150 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Post Skill
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddSkillPage;
