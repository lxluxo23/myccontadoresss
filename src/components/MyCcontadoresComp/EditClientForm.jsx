import React, { useState } from "react";
import axios from "axios";

function EditClientForm({ client, onSave, onCancel }) {
    const [formData, setFormData] = useState(client);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://backend.cobros.myccontadores.cl/api/clientes/${client.clienteId}`, formData);
            alert("Cliente actualizado exitosamente.");
            onSave(formData); // Llama a la función onSave para actualizar la lista de clientes
        } catch (error) {
            console.error("Error al actualizar el cliente:", error.message);
            alert("Hubo un problema al actualizar el cliente.");
        }
    };

    return (
        <div className="bg-white p-6 rounded shadow-md w-[400px]">
            <h2 className="text-xl font-semibold mb-4">Editar Cliente</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">RUT</label>
                    <input
                        type="text"
                        name="rut"
                        value={formData.rut}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Dirección</label>
                    <input
                        type="text"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Teléfono</label>
                    <input
                        type="text"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Guardar Cambios
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditClientForm;
