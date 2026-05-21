'use client';

import { useFormik } from 'formik';
import React from 'react';

const Contact = () => {

  // Initialize Formik for the Contact Form
  const contactForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    onSubmit: (values, { resetForm }) => {
      console.log('Contact Form Submitted:', values);
      // **TODO:** Add logic here to send the data to your backend service (e.g., email API, database)
      alert('Thank you for reaching out! We will get back to you shortly.');
      resetForm(); // Clear the form after submission
    },
  });

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-10">
      <div className="max-w-6xl mx-auto py-10">
        
        {/* Page Header */}
        <h1 className="text-5xl font-extrabold text-center mb-4">
          Get in Touch
        </h1>
        <p className="text-gray-400 text-lg text-center mb-12">
          We'd love to hear from you—whether it's a question, a suggestion, or a bug report.
        </p>

        {/* Main Content: Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left Column: Contact Info */}
          <div className="lg:col-span-1 space-y-8 p-6 rounded-xl bg-gray-900 shadow-2xl">
            <h2 className="text-3xl font-bold border-b border-blue-500 pb-3">
              Contact Details
            </h2>

            {/* Support Email */}
            <div>
              <p className="text-blue-400 font-semibold text-lg">General Support</p>
              <p className="text-gray-300">support@xchangen.com</p>
            </div>

            {/* Business Inquiry */}
            <div>
              <p className="text-blue-400 font-semibold text-lg">Business Inquiries</p>
              <p className="text-gray-300">bizdev@xchangen.com</p>
            </div>

            {/* Address Placeholder */}
            <div>
              <p className="text-blue-400 font-semibold text-lg">Our Office</p>
              <p className="text-gray-300">123 Skill Exchange Blvd, Tech City, Global</p>
            </div>

            {/* Social Media Links (Placeholders) */}
            <div className='pt-4'>
                <p className="text-blue-400 font-semibold text-lg mb-2">Connect With Us</p>
                <div className='flex space-x-4'>
                    <a href="#" className='text-gray-500 hover:text-white transition'><i className="fab fa-twitter"></i> Twitter</a>
                    <a href="#" className='text-gray-500 hover:text-white transition'><i className="fab fa-linkedin-in"></i> LinkedIn</a>
                </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-2 p-6">
            <h2 className="text-3xl font-bold mb-8 text-center lg:text-left">
              Send us a message
            </h2>

            <form onSubmit={contactForm.handleSubmit} className="space-y-6">

              {/* Name and Email in a single row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    onChange={contactForm.handleChange}
                    value={contactForm.values.name}
                    required
                    className="w-full p-3 rounded bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your.email@example.com"
                    onChange={contactForm.handleChange}
                    value={contactForm.values.email}
                    required
                    className="w-full p-3 rounded bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Subject Input */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="I have a question about my account..."
                  onChange={contactForm.handleChange}
                  value={contactForm.values.subject}
                  required
                  className="w-full p-3 rounded bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Message Textarea */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Type your message here..."
                  onChange={contactForm.handleChange}
                  value={contactForm.values.message}
                  required
                  className="w-full p-3 rounded bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-150 shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;