import React, { useState } from "react";

const AddAccountingHonorary = ({ onSubmit, lastHonoraryDate, onClose }) => {
    const [honoraryData, setHonoraryData] = useState({
        descripcion: "Honorario Contable",
        monto: "",
        fechaInicio: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHonoraryData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!honoraryData.monto || !honoraryData.fechaInicio) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        if (lastHonoraryDate && new Date(honoraryData.fechaInicio) <= new Date(lastHonoraryDate)) {
            alert("La fecha debe ser posterior al último honorario registrado.");
            return;
        }

        onSubmit({
            ...honoraryData,
            tipo: "Honorario Contable", // Asegura que el tipo sea correcto
        });

        onClose(); // Cierra el modal después de enviar
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-green-500">Agregar Honorario Contable</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium">Monto</label>
                <input
                    type="number"
                    name="monto"
                    value={honoraryData.monto}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium">Fecha de Inicio</label>
                <input
                    type="date"
                    name="fechaInicio"
                    value={honoraryData.fechaInicio}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg"
                    required
                />
            </div>
            <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                    Agregar
                </button>
            </div>
        </form>
    );
};

export default AddAccountingHonorary;
