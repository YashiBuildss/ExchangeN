'use client';
import { useFormik } from 'formik';
import React from 'react';

const Signup = () => {

  // Formik Hook for Signup Form
  const signupForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log('Signup Submitted:', values);
      // **TODO:** Add your user registration/API call here
    },
  });

  return (
    // Centered container for the entire page
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">

      {/* Signup Card (Container for the form) */}
      <div className="w-full max-w-sm p-8 sm:p-10 rounded-xl bg-gray-900 shadow-2xl space-y-6 text-center">
        
        
        <h1 className="text-2xl font-bold text-white leading-snug">
          Join XchangeN Today
        </h1>
        <p className="text-gray-400 text-sm">
          Create your free account and start exchanging skills with others.
        </p>
        
        {/* Formik Signup Form */}
        <form onSubmit={signupForm.handleSubmit} className="space-y-4 pt-4">

          {/* Name Input */}
          <input
            type="text"
            placeholder="Full Name"
            id="name"
            name="name"
            onChange={signupForm.handleChange}
            value={signupForm.values.name}
            required
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email Address"
            id="email"
            name="email"
            onChange={signupForm.handleChange}
            value={signupForm.values.email}
            required
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            onChange={signupForm.handleChange}
            value={signupForm.values.password}
            required
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-150 shadow-lg"
          >
            Sign Up
          </button>
        </form>

        {/* Social Login Buttons (Reused) */}
        <div className="pt-4 space-y-3">
          <div className="flex items-center justify-center gap-2 border border-white py-2 px-4 rounded shadow-sm hover:bg-gray-800 transition cursor-pointer">
             <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="h-5 w-5"
                alt="Google Icon"
              />
            <span className="text-sm text-white font-medium">Continue with Google</span>
          </div>

          <button className="flex items-center justify-center gap-2 border border-white bg-gray-900 text-white w-full py-2 rounded hover:bg-gray-800 transition">
            <img
              src="https://imgs.search.brave.com/vCdtYxKx6gX9OeegOZkJaFuzNEZWW2H8Y8fZIr0fPLA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91eHdp/bmcuY29tL3dwLWNv/bnRlbnQvdGhlbWVz/L3V4d2luZy9kb3du/bG9hZC9icmFuZHMt/YW5kLXNvY2lhbC1t/ZWRpYS9mYWNlYm9v/ay1hcHAtcm91bmQt/d2hpdGUtaWNvbi5z/dmc"
              className="h-5 w-5"
              alt="Facebook Icon"
            />
            <span className="text-sm text-white font-medium">Continue with Facebook</span>
          </button>
        </div>

        {/* Terms and Conditions (Reused) */}
        <p className="text-xs text-gray-500 text-center pt-2">
          By creating an account, I declare that I have read and accepted{' '}
          <a href="#" className="text-blue-500 underline">
            XchangeN's Terms of Use
          </a>{' '}
          and{' '}
          <a href="#" className="text-blue-500 underline">
            Privacy Policy
          </a>
          .
        </p>

        {/* Link to Login (Reused) */}
        <p className="text-center text-white text-sm">
          Already have an account?{' '}
          <a href="#" className="text-blue-500 underline font-semibold">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;