// frontend/src/components/Footer.jsx
import React from 'react';

function Footer() {
    return (
        <footer className="w-full p-4 bg-gray-800 text-center mt-8">
            <p>&copy; {new Date().getFullYear()} Cybersecurity Dashboard. All rights reserved.</p>
        </footer>
    );
}

export default Footer;