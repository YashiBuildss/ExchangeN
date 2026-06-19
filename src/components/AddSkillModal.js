import React, { useState } from 'react';
import { addSkill } from '@/lib/api';

export default function AddSkillModal({ onClose, onSkillAdded }) {
  const [skillName, setSkillName] = useState('');
  const [skillType, setSkillType] = useState('OFFER'); // Default to 'OFFER'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!skillName.trim()) {
      setError('Skill name cannot be empty.');
      return;
    }

    setLoading(true);

    try {
      const newSkill = await addSkill({ name: skillName, type: skillType });
      
      // Success! Update the parent component's state
      onSkillAdded(newSkill); 
      onClose(); // Close the modal

    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // Backdrop: fixed, covers screen, high z-index, dark background
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      
      {/* Modal Content Box: Centered, styled to match profile theme */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-white border-b border-gray-600 pb-2">Add a New Skill</h2>
        {error && <p className="text-red-400 mb-3 text-sm">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          
          {/* Skill Name Input */}
          <div className="mb-4">
            <label htmlFor="skillName" className="block text-sm font-medium text-gray-300 mb-1">Skill Name:</label>
            <input
              id="skillName"
              type="text"
              className="mt-1 w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              placeholder="e.g., Next.js, Python"
              required
            />
          </div>
          
          {/* Skill Type Radio Buttons */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Status:</label>
            <div className="flex space-x-6">
              <label className="text-white flex items-center">
                <input
                  type="radio"
                  name="skillType"
                  value="OFFER"
                  checked={skillType === 'OFFER'}
                  onChange={(e) => setSkillType(e.target.value)}
                  className="mr-2 h-4 w-4 text-green-500 border-gray-300 focus:ring-green-500"
                />
                What I Offer
              </label>
              <label className="text-white flex items-center">
                <input
                  type="radio"
                  name="skillType"
                  value="SEEK"
                  checked={skillType === 'SEEK'}
                  onChange={(e) => setSkillType(e.target.value)}
                  className="mr-2 h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                />
                What I'm Seeking
              </label>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <button 
              type="button" 
              onClick={onClose} 
              disabled={loading}
              className="py-2 px-4 rounded bg-gray-600 hover:bg-gray-500 text-white transition duration-150"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="py-2 px-4 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-50 transition duration-150"
            >
              {loading ? 'Saving...' : 'Save Skill'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}