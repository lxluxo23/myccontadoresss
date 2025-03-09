import React, { useState, useCallback } from 'react';
import AddClientForm from './AddClientForm';

function FilterSection({ onAddClient, onSearchNameChange }) {
    const [searchName, setSearchName] = useState('');
    const [showAddClientForm, setShowAddClientForm] = useState(false);

    // Handler para actualizar la búsqueda y notificar al componente padre
    const handleNameSearchChange = useCallback((event) => {
        const value = event.target.value;
        setSearchName(value);
        onSearchNameChange(value);
    }, [onSearchNameChange]);

    // Handler para mostrar el formulario de "Añadir Cliente"
    const handleShowAddClientForm = useCallback(() => {
        setShowAddClientForm(true);
    }, []);

    // Handler para cerrar el formulario de "Añadir Cliente"
    const handleCloseAddClientForm = useCallback(() => {
        setShowAddClientForm(false);
    }, []);

    // Handler para agregar el cliente y cerrar el formulario
    const handleAddClient = useCallback((clientData) => {
        onAddClient(clientData);
        setShowAddClientForm(false);
    }, [onAddClient]);

    return (
        <section className="flex flex-wrap justify-between gap-5 mt-10 w-full max-md:max-w-full text-sm">
            <div className="flex flex-wrap gap-4 items-center max-md:max-w-full">
                <div className="flex items-center bg-white rounded-lg border border-neutral-200 p-2.5 w-[222px] h-[40px]">
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ac34c89075cc9f5150c0d9188e344b5ab22d341ea722a0b4ce115573d2bf2e7?apiKey=c8e063ba4e294c0496fff8126c800e5e&"
                        alt=""
                        className="w-[18px] h-[18px] mr-2"
                    />
                    <input
                        type="text"
                        value={searchName}
                        onChange={handleNameSearchChange}
                        placeholder="Buscar Cliente"
                        className="bg-transparent focus:outline-none h-full w-full"
                    />
                </div>
            </div>

            <button
                onClick={handleShowAddClientForm}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:from-indigo-600 hover:to-blue-600 hover:scale-105 transition-all font-semibold"
            >
                <span>Añadir Cliente</span>
            </button>

            {showAddClientForm && (
                <AddClientForm
                    onClose={handleCloseAddClientForm}
                    onAddClient={handleAddClient}
                />
            )}
        </section>
    );
}

export default React.memo(FilterSection);
