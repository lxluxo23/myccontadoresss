import React, { useState } from "react";

export const AddDebtForm = ({ onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        tipo: "",
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

        const debtData = {
            ...formData,
            montoTotal: parseFloat(formData.montoTotal),
        };

        onSubmit(debtData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-indigo-600">Agregar Nueva Deuda</h2>
            <div className="space-y-2">
                <label className="block text-gray-700">Tipo de Deuda</label>
                <select
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="">Seleccione</option>
                    <option value="Impuesto IVA">Impuesto IVA</option>
                    <option value="Impuesto Renta">Impuesto Renta</option>
                    <option value="Honorario Mensual">Honorario Mensual</option>
                    <option value="Honorario Renta AT">Honorario Renta AT</option>
                    <option value="Multa">Multa</option>
                    <option value="Imposiciones">Imposiciones</option>
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

export const AddAccountingHonorary = ({ onSubmit, lastHonoraryDate }) => {
    const currentDate = new Date();
    const lastDate = new Date(lastHonoraryDate);

    const isDisabled =
        lastHonoraryDate &&
        currentDate.getFullYear() === lastDate.getFullYear() &&
        currentDate.getMonth() === lastDate.getMonth();

    const handleSubmit = () => {
        if (isDisabled) return;

        const honoraryData = {
            tipo: "Honorario Contable",
            montoTotal: 1000,
            fechaInicio: new Date().toISOString().split("T")[0],
            fechaVencimiento: new Date(
                new Date().setFullYear(new Date().getFullYear() + 1)
            )
                .toISOString()
                .split("T")[0],
            observaciones: "Honorario Contable anual",
        };

        onSubmit(honoraryData);
    };

    return (
        <button
            onClick={handleSubmit}
            disabled={isDisabled}
            className={`px-4 py-2 rounded-md shadow ${
                isDisabled
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600"
            }`}
        >
            {isDisabled
                ? "Honorario Contable ya añadido"
                : "Agregar Honorario Contable"}
        </button>
    );
};
