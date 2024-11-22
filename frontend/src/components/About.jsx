// frontend/src/components/About.jsx
import React from 'react';
import { FaShieldAlt, FaInfoCircle, FaThumbsUp } from 'react-icons/fa';

function About() {
  return (
    <div
      className="min-h-screen flex flex-col items-center p-4 bg-gray-900 text-white"
      // Removed background images or theme overlays if present
    >
      <header className="w-full flex justify-between items-center mb-8 bg-gray-800 bg-opacity-75 p-4 rounded">
        <h1 className="text-4xl flex items-center">
          <FaShieldAlt className="mr-2 text-teal-400" /> About Us
        </h1>
        <nav className="flex items-center">
          <a href="/" className="mx-2 text-white hover:text-teal-400">Home</a>
          <a href="/calendar" className="mx-2 text-white hover:text-teal-400">Calendar</a>
          <a href="/crypto" className="mx-2 text-white hover:text-teal-400">Crypto</a>
        </nav>
      </header>
      
      <main className="w-full max-w-4xl bg-gray-800 bg-opacity-75 p-6 rounded-md shadow-md">
        <section className="mb-6">
          <h2 className="text-2xl mb-4 flex items-center">
            <FaInfoCircle className="mr-2 text-teal-400" /> Our Mission
          </h2>
          <p className="mb-4">
            We aim to provide the latest cybersecurity news, trends, and insights to help you stay informed and secure in the digital world.
          </p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-2xl mb-4 flex items-center">
            <FaInfoCircle className="mr-2 text-teal-400" /> Our Team
          </h2>
          <p className="mb-4">
            Our team consists of cybersecurity experts, developers, and analysts dedicated to delivering accurate and timely information.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl mb-4 flex items-center">
            <FaThumbsUp className="mr-2 text-teal-400" /> Contact Us
          </h2>
          <p>
            For inquiries, please reach out to us at <a href="mailto:n.watkins00@outlook.com" className="text-teal-400 hover:underline">contact@cybersecuritynews.com</a>.
          </p>
        </section>
      </main>
    </div>
  );
}

export default About;