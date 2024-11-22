// frontend/src/components/Crypto.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCoins, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    TimeScale,
    Tooltip,
    Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import 'chartjs-chart-financial';

// Import the financial chart plugin
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';

// Register Chart.js components and financial chart plugins
ChartJS.register(
    CategoryScale,
    LinearScale,
    TimeScale,
    CandlestickController,
    CandlestickElement,
    Tooltip,
    Legend
);

function Crypto() {
    const [crypto, setCrypto] = useState([]);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [candlestickData, setCandlestickData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChart, setLoadingChart] = useState(false);
    const [error, setError] = useState('');
    const [chartError, setChartError] = useState('');

    // Fetch top 10 cryptocurrencies
    const fetchCrypto = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('/get-crypto'); // Ensure backend has /get-crypto endpoint
            setCrypto(response.data.crypto);
        } catch (err) {
            setError('Failed to fetch cryptocurrency data.');
            console.error('Crypto Fetch Error:', err);
        }
        setLoading(false);
    };

    // Fetch historical OHLC data for the selected coin
    const fetchCandlestickData = async (coinId) => {
        setLoadingChart(true);
        setChartError('');
        try {
            const response = await axios.get(`/get-ohlc?coin=${coinId}&days=30`); // Ensure backend has /get-ohlc endpoint

            if (response.status === 200) {
                const ohlcData = response.data.ohlc.map(item => ({
                    x: item.date,
                    o: item.open,
                    h: item.high,
                    l: item.low,
                    c: item.close,
                }));
                setCandlestickData(ohlcData);
            } else {
                setChartError('Failed to fetch candlestick data.');
            }
        } catch (err) {
            setChartError('Failed to fetch candlestick data.');
            console.error('OHLC Fetch Error:', err);
        }
        setLoadingChart(false);
    };

    useEffect(() => {
        fetchCrypto();

        // Real-Time Data Updates: Fetch crypto data every 60 seconds
        const interval = setInterval(() => {
            fetchCrypto();
            if (selectedCoin) {
                fetchCandlestickData(selectedCoin.id);
            }
        }, 60000); // 60,000 ms = 60 seconds

        return () => clearInterval(interval);
    }, [selectedCoin]);

    const handleCoinClick = (coin) => {
        setSelectedCoin(coin);
        fetchCandlestickData(coin.id);
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                },
                ticks: {
                    color: '#ffffff',
                },
                grid: {
                    color: '#4b5563',
                },
            },
            y: {
                position: 'right',
                ticks: {
                    color: '#ffffff',
                },
                grid: {
                    color: '#4b5563',
                },
            },
        },
    };

    const chartData = {
        datasets: [
            {
                label: 'Candlestick Chart',
                data: candlestickData,
                borderColor: 'rgba(0, 255, 255, 1)',
                borderWidth: 1,
                color: {
                    up: '#00ffcc',
                    down: '#ff3333',
                    unchanged: '#999',
                },
                borderSkipped: false,
            },
        ],
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 bg-cover bg-center" style={{ backgroundImage: "url('/images/crypto-background.jpg')" }}>
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
            
            {/* Content */}
            <div className="relative z-10 w-full flex flex-col items-center">
                <header className="w-full flex justify-between items-center mb-8 bg-gray-800 bg-opacity-75 p-4 rounded">
                    <h1 className="text-4xl flex items-center text-white">
                        <FaCoins className="mr-2 text-teal-400" /> Cryptocurrency Dashboard
                    </h1>
                    <nav className="flex items-center">
                        <a href="/" className="mx-2 text-white hover:text-teal-400">Home</a>
                        <a href="/calendar" className="mx-2 text-white hover:text-teal-400">Calendar</a>
                        <a href="/about" className="mx-2 text-white hover:text-teal-400">About</a>
                    </nav>
                </header>
                {loading ? (
                    <FaSpinner className="animate-spin mb-4 text-teal-400" />
                ) : error ? (
                    <div className="mb-4 text-red-500 flex items-center">
                        <FaExclamationTriangle className="mr-2" /> {error}
                    </div>
                ) : (
                    <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {crypto.map((coin) => (
                            <div
                                key={coin.id}
                                className="p-4 bg-gray-800 rounded-md shadow-md hover:bg-gray-700 transition cursor-pointer"
                                onClick={() => handleCoinClick(coin)}
                            >
                                <h2 className="text-2xl flex items-center mb-2">
                                    <img src={coin.image} alt={coin.name} className="w-6 h-6 mr-2" />
                                    {coin.name} ({coin.symbol.toUpperCase()})
                                </h2>
                                <p className="text-lg">Price: <span className="text-teal-400">${coin.current_price.toLocaleString()}</span></p>
                                <p className="text-lg">Market Cap: <span className="text-teal-400">${coin.market_cap.toLocaleString()}</span></p>
                                <p className="text-lg">24h Change: 
                                    <span className={coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                                        {coin.price_change_percentage_24h.toFixed(2)}%
                                    </span>
                                </p>
                                <p className="text-lg">7d Change: 
                                    <span className={coin.price_change_percentage_7d_in_currency >= 0 ? 'text-green-400' : 'text-red-400'}>
                                        {coin.price_change_percentage_7d_in_currency ? coin.price_change_percentage_7d_in_currency.toFixed(2) : 'N/A'}%
                                    </span>
                                </p>
                                <p className="text-lg">30d Change: 
                                    <span className={coin.price_change_percentage_30d_in_currency >= 0 ? 'text-green-400' : 'text-red-400'}>
                                        {coin.price_change_percentage_30d_in_currency ? coin.price_change_percentage_30d_in_currency.toFixed(2) : 'N/A'}%
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                )}
                {selectedCoin && (
                    <div className="w-full max-w-4xl mt-8 bg-gray-800 p-6 rounded-md shadow-lg">
                        <h2 className="text-2xl mb-4 flex items-center text-white">
                            <img src={selectedCoin.image} alt={selectedCoin.name} className="w-8 h-8 mr-2" />
                            {selectedCoin.name} ({selectedCoin.symbol.toUpperCase()}) - Price Movement (Last 30 Days)
                        </h2>
                        {loadingChart ? (
                            <FaSpinner className="animate-spin mb-4 text-teal-400" />
                        ) : chartError ? (
                            <div className="mb-4 text-red-500 flex items-center">
                                <FaExclamationTriangle className="mr-2" /> {chartError}
                            </div>
                        ) : (
                            <Chart type='candlestick' data={chartData} options={chartOptions} />
                        )}
                    </div>
                )}
            </div>
        </div>
    );

}

export default Crypto;