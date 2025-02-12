import React, { useState } from "react";

const MonthYearModal = ({ isOpen, onClose, onConfirm }) => {
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    const handleConfirm = () => {
        if (month && year) {
            onConfirm(month, year);
        } else {
            alert("Por favor, selecciona un mes y un año.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow p-6 w-96">
                <h2 className="text-lg font-semibold mb-4">Seleccionar Mes y Año</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Mes:</label>
                    <select
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Seleccionar mes</option>
                        {[...Array(12)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {new Date(0, i).toLocaleString("es", { month: "long" })}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Año:</label>
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Año"
                        min="2000"
                        max={new Date().getFullYear()}
                    />
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MonthYearModal;
