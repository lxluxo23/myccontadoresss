import React, { useState, useEffect, useRef } from 'react';

const StateSelector = ({ selectedState, setSelectedState }) => {
    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef(null);

    const states = ['Pagado', 'Pendiente', 'Atrasado'];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleStateChange = (state) => {
        setSelectedState(state);
        setIsOpen(false);
    };

    // Efecto para manejar clics fuera del dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef} style={{ fontFamily: 'Work Sans, sans-serif', letterSpacing: '-2%' }}>
            {/* Botón para abrir el dropdown */}
            <button
                className="flex items-center bg-white rounded-lg border border-neutral-200 p-2.5"
                onClick={toggleDropdown}
                style={{ fontFamily: 'Work Sans, sans-serif', letterSpacing: '-2%' }}
            >
                {/* Cambiar el color del texto a #7879F1 */}
                <span className="text-[#7879F1]" style={{ fontFamily: 'Work Sans, sans-serif', letterSpacing: '-2%' }}>
                    {selectedState || "Estado"}
                </span>
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/012b9ca63cc6c8634f6cb3e6d4ccc53d4d800a88ea8e90ce806ae090b8200542?apiKey=c8e063ba4e294c0496fff8126c800e5e&"
                    alt=""
                    className="w-[18px] h-[18px] ml-2"
                />
            </button>

            {/* Dropdown de opciones */}
            {isOpen && (
                <div className="absolute top-12 left-0 bg-white rounded-lg border border-neutral-200 p-2 shadow-lg" style={{ fontFamily: 'Work Sans, sans-serif', letterSpacing: '-2%' }}>
                    {states.map((state, index) => (
                        <div
                            key={index}
                            className="px-4 py-2 cursor-pointer hover:bg-indigo-100"
                            onClick={() => handleStateChange(state)}
                            style={{ fontFamily: 'Work Sans, sans-serif', letterSpacing: '-2%' }}
                        >
                            {state}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StateSelector;
