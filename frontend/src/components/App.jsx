// frontend/src/components/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import CalendarPage from './Calendar';
import About from './About';
import Crypto from './Crypto';
import { ThemeProvider } from './ThemeContext';

function App() {
    return (
        <ThemeProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/calendar" element={<CalendarPage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/crypto" element={<Crypto />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;