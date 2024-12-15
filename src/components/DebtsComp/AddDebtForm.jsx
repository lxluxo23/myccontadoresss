import React, { useState } from "react";

export const AddDebtForm = ({ onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        tipoDeuda: "",
        montoTotal: "",
        fechaInicio: "",
        fechaVencimiento: "",
        observaciones: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Construir el objeto exactamente como se espera en el backend
        const debtData = {
            tipoDeuda: formData.tipoDeuda,
            montoTotal: parseFloat(formData.montoTotal),
            fechaInicio: formData.fechaInicio, // Formato "YYYY-MM-DD"
            fechaVencimiento: formData.fechaVencimiento, // Formato "YYYY-MM-DD"
            observaciones: formData.observaciones || null, // Permitir observaciones nulas
        };

        onSubmit(debtData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-indigo-600">Agregar Nueva Deuda</h2>
            <div className="space-y-2">
                <label className="block text-gray-700">Tipo de Deuda</label>
                <select
                    name="tipoDeuda"
                    value={formData.tipoDeuda}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="">Seleccione</option>
                    <option value="Imposiciones">Imposiciones</option>
                    <option value="Impuesto IVA">Impuesto IVA</option>
                    <option value="Talonarios">Talonarios</option>
                    <option value="Multas">Multas</option>
                    <option value="Impuesto Renta">Impuesto Renta</option>
                    <option value="Contribuciones">Contribuciones</option>
                    <option value="Otros">Otros</option>
                </select>
            </div>
            <div className="space-y-2">
                <label className="block text-gray-700">Monto Total</label>
                <input
                    type="number"
                    step="0.01"
                    name="montoTotal"
                    value={formData.montoTotal}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div className="space-y-2">
                <label className="block text-gray-700">Fecha Inicio</label>
                <input
                    type="date"
                    name="fechaInicio"
                    value={formData.fechaInicio}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div className="space-y-2">
                <label className="block text-gray-700">Fecha Vencimiento</label>
                <input
                    type="date"
                    name="fechaVencimiento"
                    value={formData.fechaVencimiento}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div className="space-y-2">
                <label className="block text-gray-700">Observaciones</label>
                <textarea
                    name="observaciones"
                    value={formData.observaciones}
                    onChange={handleChange}
                    placeholder="Opcional"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-500 text-white rounded-md shadow hover:bg-indigo-600"
                >
                    Agregar
                </button>
            </div>
        </form>
    );
};
