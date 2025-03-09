import React, { useState } from "react";
import axios from "axios";
import { config } from "../../config/config";

// Componente Input reutilizable
const InputField = React.memo(
    ({ label, type = "text", name, value, onChange, required = false }) => (
        <div className="mb-4">
            <label className="block text-sm font-medium">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full p-2 border rounded-lg"
                required={required}
            />
        </div>
    )
);

function AddClientForm({ onClose, onAddClient }) {
    const [clientData, setClientData] = useState({
        nombre: "",
        rut: "",
        email: "",
        telefono: "",
        direccion: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Actualiza el estado del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setClientData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Valida que los campos obligatorios estén completos
    const validateForm = () => {
        if (!clientData.nombre.trim() || !clientData.rut.trim()) {
            alert("Los campos Nombre y RUT son obligatorios.");
            return false;
        }
        // Se pueden agregar más validaciones (por ejemplo, formato de email)
        return true;
    };

    // Envía el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const response = await axios.post(`${config.apiUrl}/api/clientes`, clientData);
            onAddClient(response.data);
            onClose();
        } catch (error) {
            console.error("Error al agregar cliente:", error.response?.data || error.message);
            alert("Hubo un problema al agregar el cliente. Por favor, inténtalo nuevamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Añadir Cliente</h2>
                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Nombre"
                        name="nombre"
                        value={clientData.nombre}
                        onChange={handleChange}
                        required
                    />
                    <InputField
                        label="RUT"
                        name="rut"
                        value={clientData.rut}
                        onChange={handleChange}
                        required
                    />
                    <InputField
                        label="Correo Electrónico"
                        type="email"
                        name="email"
                        value={clientData.email}
                        onChange={handleChange}
                    />
                    <InputField
                        label="Teléfono"
                        type="tel"
                        name="telefono"
                        value={clientData.telefono}
                        onChange={handleChange}
                    />
                    <InputField
                        label="Dirección"
                        name="direccion"
                        value={clientData.direccion}
                        onChange={handleChange}
                    />
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
