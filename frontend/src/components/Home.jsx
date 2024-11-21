// frontend/src/components/Home.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { FaSearch, FaShieldAlt, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';

function Home() {
    const [query, setQuery] = useState('');
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchNews = async (searchQuery) => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('/get-news', { params: { query: searchQuery, date: new Date().toISOString().split('T')[0] } });
            setNews(response.data.news);
        } catch (err) {
            setError('Failed to fetch news. Please try again later.');
        }
        setLoading(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim() !== '') {
            fetchNews(query);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center p-4 bg-cover bg-center relative" style={{ backgroundImage: "url('/images/home-background.jpg')" }}>
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
            
            {/* Content */}
            <div className="relative z-10 w-full flex flex-col items-center">
                <header className="w-full flex justify-between items-center mb-8 bg-black bg-opacity-50 p-4 rounded">
                    <h1 className="text-4xl flex items-center">
                        <FaShieldAlt className="mr-2 text-teal-400" /> Cybersecurity News
                    </h1>
                    <nav className="flex items-center">
                        <a href="/calendar" className="mx-2 hover:text-teal-400">Calendar</a>
                        <a href="/about" className="mx-2 hover:text-teal-400">About</a>
                        <a href="/crypto" className="mx-2 hover:text-teal-400">Crypto</a>
                    </nav>
                </header>
                <form onSubmit={handleSearch} className="w-full max-w-md flex mb-6">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for vulnerabilities, breaches..."
                        className="flex-grow p-2 rounded-l-md bg-gray-800 text-white focus:outline-none"
                    />
                    <button type="submit" className="p-2 bg-teal-500 rounded-r-md hover:bg-teal-600 flex items-center">
                        <FaSearch />
                    </button>
                </form>
                {loading ? (
                    <FaSpinner className="animate-spin mb-4 text-teal-400" />
                ) : error ? (
                    <div className="mb-4 text-red-500 flex items-center">
                        <FaExclamationTriangle className="mr-2" /> {error}
                    </div>
                ) : (
                    <ul className="w-full max-w-md">
                        {news.map((article, index) => (
                            <li key={index} className="mb-4 p-4 bg-gray-800 rounded-md shadow-md hover:bg-gray-700 transition">
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-teal-400 hover:underline">
                                    {article.title}
                                </a>
                                <p className="text-sm text-gray-400">Source: {article.source} | Published: {new Date(article.publishedAt).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Home;