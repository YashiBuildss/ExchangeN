'use client';
import React from 'react';
// Note: Since the Footer component was removed from the Home page due to import issues,
// I am keeping the About page self-contained without external imports like Footer.

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* Hero Section */}
      <div className="bg-indigo-700 py-16 md:py-24 shadow-xl">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4">
            About SkillSwap Connect
          </h1>
          <p className="text-lg text-indigo-200 max-w-3xl mx-auto">
            We are building a decentralized community where learning and teaching are exchanged through human connection, not currency.
          </p>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="py-16 lg:py-24">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Mission */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-[1.02]">
              <div className="flex items-center text-indigo-600 mb-4">
                <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Our mission is to foster a global **knowledge economy** built purely on the exchange of time and talent. We aim to break down financial barriers to education by enabling anyone to teach what they know and learn what they need, creating mutually beneficial skill swaps.
              </p>
            </div>
            
            {/* Vision */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-[1.02]">
              <div className="flex items-center text-indigo-600 mb-4">
                <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948.684L12 10l-2.432 1.216a1 1 0 01-.948 0L3 10V5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 15V9m4 6V9m4 6V9m4 6V9m4 6V9"></path></svg>
                <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We envision a future where continuous learning is accessible to everyone, everywhere. SkillSwap Connect will be the leading global platform for peer-to-peer knowledge transfer, creating a network of lifelong learners and mentors.
              </p>
            </div>
            
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-indigo-100 py-16 lg:py-24">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">
            Core Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Value 1: Community */}
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-500 text-white mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20h-2m2 0h-2m0 0a5 5 0 01-5-5V9h-2M13 15a5 5 0 01-5-5V3a2 2 0 00-2-2h2a2 2 0 002 2v2M4 7h16"></path></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Community</h3>
              <p className="text-gray-500 text-sm">Learning thrives when shared. We prioritize supportive, non-judgmental connections.</p>
            </div>

            {/* Value 2: Accessibility */}
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-500 text-white mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8m-2 2h-5m-2 2h-5m-2 2h-5m-2 2h-5"></path></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Accessibility</h3>
              <p className="text-gray-500 text-sm">All skills, from coding to cooking, are valued and available to everyone.</p>
            </div>

            {/* Value 3: Reciprocity */}
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-500 text-white mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6h-8m0 0l4 4m-4-4l-4 4"></path></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Reciprocity</h3>
              <p className="text-gray-500 text-sm">We believe in a balanced exchange—give what you can and take what you need.</p>
            </div>

            {/* Value 4: Growth */}
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-500 text-white mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Growth</h3>
              <p className="text-gray-500 text-sm">We encourage continuous self-improvement and the sharing of knowledge.</p>
            </div>
            
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="py-16 text-center">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Ready to start swapping skills?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join the community and find your first mentor or student today!
          </p>
          <a
            href="/exchange" 
            className="inline-block rounded-lg bg-indigo-600 px-8 py-3 text-center text-lg font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-700 focus-visible:ring active:bg-indigo-800 shadow-lg"
          >
            Go to Exchange
          </a>
        </div>
      </div>

    </div>
  )
}

export default About;
