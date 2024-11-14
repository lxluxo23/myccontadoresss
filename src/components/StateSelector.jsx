import React, { useState, useEffect, useRef } from 'react';

const StateSelector = ({ selectedState, setSelectedState }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Refs para el contenedor y el botón
    const dropdownRef = useRef(null);

    // Opciones de estado
    const states = ['Pagado', 'Pendiente', 'Atrasado'];

    // Toggle de apertura y cierre del dropdown
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Cambio de estado seleccionado
    const handleStateChange = (state) => {
        setSelectedState(state);
        setIsOpen(false); // Cerrar el dropdown después de seleccionar
    };

    // Efecto para manejar clics fuera del dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false); // Cerrar el dropdown si se hace clic fuera
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside); // Limpiar el listener al desmontar el componente
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Botón para abrir el dropdown */}
            <button
                className="flex items-center bg-white rounded-lg border border-neutral-200 p-2.5"
                onClick={toggleDropdown}
            >
                <span>{selectedState || "Estado"}</span>
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/012b9ca63cc6c8634f6cb3e6d4ccc53d4d800a88ea8e90ce806ae090b8200542?apiKey=c8e063ba4e294c0496fff8126c800e5e&"
                    alt=""
                    className="w-[18px] h-[18px] ml-2"
                />
            </button>

            {/* Dropdown de opciones */}
            {isOpen && (
                <div className="absolute top-12 left-0 bg-white rounded-lg border border-neutral-200 p-2 shadow-lg">
                    {states.map((state, index) => (
                        <div
                            key={index}
                            className="px-4 py-2 cursor-pointer hover:bg-indigo-100"
                            onClick={() => handleStateChange(state)}
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
