import React, { useState } from 'react';
import axios from 'axios';

function AddClientForm({ onClose, onAddClient }) {
    const [clientData, setClientData] = useState({
        nombre: '',
        rut: '',
        email: '',
        telefono: '',
        direccion: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClientData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar campos obligatorios
        if (!clientData.nombre.trim() || !clientData.rut.trim()) {
            alert('Los campos Nombre y RUT son obligatorios.');
            return;
        }

        setIsSubmitting(true); // Mostrar indicador de carga durante el envío

        try {
            // Enviar los datos al backend
            const response = await axios.post("http://backend.cobros.myccontadores.cl/api/clientes", clientData);

            // Llamar a la función del componente padre para actualizar la lista de clientes
            onAddClient(response.data);

            // Cerrar el formulario después de enviar los datos
            onClose();
        } catch (error) {
            console.error("Error al agregar cliente:", error.response?.data || error.message);
            alert("Hubo un problema al agregar el cliente. Por favor, inténtalo nuevamente.");
        } finally {
            setIsSubmitting(false); // Ocultar indicador de carga
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Añadir Cliente</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            value={clientData.nombre}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">RUT</label>
                        <input
                            type="text"
                            name="rut"
                            value={clientData.rut}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Correo Electrónico</label>
                        <input
                            type="email"
                            name="email"
                            value={clientData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Teléfono</label>
                        <input
                            type="tel"
                            name="telefono"
                            value={clientData.telefono}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Dirección</label>
                        <input
                            type="text"
                            name="direccion"
                            value={clientData.direccion}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded-lg"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className={`px-4 py-2 rounded-lg ${
                                isSubmitting
                                    ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                                    : "bg-indigo-500 text-white hover:bg-indigo-600"
                            }`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Añadiendo..." : "Añadir"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddClientForm;
