import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Intenta cargar la preferencia del usuario desde localStorage
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark'; // Si es 'dark', inicia en modo oscuro
    });

    useEffect(() => {
        const root = document.documentElement;

        if (isDarkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark'); // Guarda la preferencia como 'dark'
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light'); // Guarda la preferencia como 'light'
        }
    }, [isDarkMode]);

    return (
        <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`fixed bottom-6 right-6 p-3 rounded-full ${
                isDarkMode ? 'bg-yellow-400 text-black' : 'bg-indigo-500 text-white'
            } shadow-lg transition-transform transform hover:scale-110 ring-2 ${
                isDarkMode ? 'ring-yellow-300' : 'ring-indigo-300'
            }`}
            title={isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
        >
            {isDarkMode ? '☀️' : '🌙'}
        </button>
    );
};

export default ThemeToggle;
