// frontend/src/components/About.jsx
import React, { useContext } from 'react';
import { FaShieldAlt, FaInfoCircle, FaThumbsUp, FaSun, FaMoon } from 'react-icons/fa';
import { ThemeContext } from './ThemeContext';

function About() {
    const { darkMode, toggleTheme } = useContext(ThemeContext);

    return (
        <div className={`min-h-screen text-white flex flex-col items-center p-4 bg-cover bg-center ${darkMode ? 'bg-gray-900' : 'bg-gray-100 text-gray-900'}`} style={{ backgroundImage: "url('/images/about-background.jpg')" }}>
            <header className="w-full flex justify-between items-center mb-8 bg-black bg-opacity-50 p-4 rounded">
                <h1 className="text-4xl flex items-center">
                    <FaShieldAlt className="mr-2 text-teal-400" /> About
                </h1>
                <nav className="flex items-center">
                    <a href="/" className="mx-2 hover:text-teal-400">Home</a>
                    <a href="/calendar" className="mx-2 hover:text-teal-400">Calendar</a>
                    <a href="/crypto" className="mx-2 hover:text-teal-400">Crypto</a>
                    <button onClick={toggleTheme} className="ml-4 text-xl focus:outline-none">
                        {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-800" />}
                    </button>
                </nav>
            </header>
            <div className="max-w-3xl bg-gray-800 bg-opacity-75 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl mb-4 flex items-center">
                    <FaInfoCircle className="mr-2 text-teal-400" /> About This Project
                </h2>
                <p className="mb-4">
                    Welcome to our Cybersecurity Dashboard! This application is designed to provide up-to-date information on the latest cybersecurity news, track vulnerabilities, breaches, and exploitations. Built with React for the frontend and Flask for the backend, it leverages various APIs to deliver real-time insights into the ever-evolving field of cybersecurity.
                </p>
                <h3 className="text-xl mb-2 flex items-center">
                    <FaThumbsUp className="mr-2 text-teal-400" /> Features
                </h3>
                <ul className="list-disc list-inside">
                    <li>Search for the latest cybersecurity news.</li>
                    <li>Interactive calendar to view news on specific dates.</li>
                    <li>Comprehensive cryptocurrency data and trends.</li>
                    <li>Responsive and aesthetically pleasing design.</li>
                    <li>Rate-limited API requests to ensure performance.</li>
                    <li>Secure handling of API keys and sensitive data.</li>
                </ul>
                <h3 className="text-xl mt-6 mb-2 flex items-center">
                    <FaInfoCircle className="mr-2 text-teal-400" /> Technology Stack
                </h3>
                <ul className="list-disc list-inside">
                    <li>Frontend: React, Tailwind CSS, React Router, React Calendar, Chart.js</li>
                    <li>Backend: Flask, Flask-Limiter, Flask-CORS</li>
                    <li>APIs: NewsAPI, CoinGecko</li>
                    <li>Icons: React Icons</li>
                </ul>
                <p className="mt-6">
                    Our mission is to provide cybersecurity professionals, enthusiasts, and the general public with a centralized platform to stay informed about the latest developments in cybersecurity. We strive to deliver accurate, timely, and relevant information to help users stay ahead in the digital landscape.
                </p>
            </div>
        </div>
    );
}

export default About;