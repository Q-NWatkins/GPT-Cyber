// frontend/src/components/Calendar.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaShieldAlt, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';

function CalendarPage() {
    const [date, setDate] = useState(new Date());
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchNews = async (selectedDate) => {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('/get-news', { // Using relative URL
                params: { query: 'cybersecurity', date: formattedDate }
            });
            if (response.data.news) {
                setNews(response.data.news);
            } else if (response.data.message) {
                setError(response.data.message);
            } else {
                setError('No news articles found.');
            }
        } catch (err) {
            setError('Failed to fetch news. Please try again later.');
            console.error(err);
        }
        setLoading(false);
    };

    const onDateChange = (selectedDate) => {
        setDate(selectedDate);
        fetchNews(selectedDate);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 bg-cover bg-center" style={{ backgroundImage: "url('/images/calendar-background.jpg')" }}>
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-75"></div>
            
            {/* Content */}
            <div className="relative z-10 w-full flex flex-col items-center">
                <header className="w-full flex justify-between items-center mb-8 bg-gray-800 bg-opacity-75 p-4 rounded">
                    <h1 className="text-4xl flex items-center text-white">
                        <FaShieldAlt className="mr-2 text-teal-400" /> Cybersecurity Calendar
                    </h1>
                    <nav className="flex items-center">
                        <a href="/" className="mx-2 text-white hover:text-teal-400">Home</a>
                        <a href="/about" className="mx-2 text-white hover:text-teal-400">About</a>
                        <a href="/crypto" className="mx-2 text-white hover:text-teal-400">Crypto</a>
                    </nav>
                </header>
                <Calendar
                    onChange={onDateChange}
                    value={date}
                    className="mb-6 bg-gray-800 text-white rounded-lg p-4 shadow-lg"
                />
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

export default CalendarPage;