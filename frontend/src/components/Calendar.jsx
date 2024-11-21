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
            const response = await axios.get('/get-news', { params: { query: 'cybersecurity', date: formattedDate } });
            setNews(response.data.news);
        } catch (err) {
            setError('Failed to fetch news. Please try again later.');
        }
        setLoading(false);
    };

    const onDateChange = (selectedDate) => {
        setDate(selectedDate);
        fetchNews(selectedDate);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 bg-cover bg-center" style={{ backgroundImage: "url('/images/calendar-background.jpg')" }}>
            <header className="w-full flex justify-between items-center mb-8 bg-black bg-opacity-50 p-4 rounded">
                <h1 className="text-4xl flex items-center">
                    <FaShieldAlt className="mr-2 text-teal-400" /> Cybersecurity Calendar
                </h1>
                <nav className="flex items-center">
                    <a href="/" className="mx-2 hover:text-teal-400">Home</a>
                    <a href="/about" className="mx-2 hover:text-teal-400">About</a>
                    <a href="/crypto" className="mx-2 hover:text-teal-400">Crypto</a>
                </nav>
            </header>
            <Calendar
                onChange={onDateChange}
                value={date}
                className="mb-6 bg-gray-800 text-white rounded-lg p-4 shadow-lg"
                tileClassName={({ date, view }) => {
                    // Customize tile classes if needed
                    return '';
                }}
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
    );
}

export default CalendarPage;