import React, { useState } from "react";

const AddHonoraryPayment = ({ onSubmit, onClose, honorarioId }) => {
    const [formData, setFormData] = useState({
        mes: "",
        montoPago: "",
        comprobante: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { mes, montoPago, comprobante } = formData;

        if (!mes || !montoPago || !comprobante) {
            alert("Todos los campos son obligatorios");
            return;
        }

        onSubmit({
            honorarioId,
            mes: parseInt(mes, 10),
            montoPago: parseFloat(montoPago),
            comprobante,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-indigo-600">Registrar Pago de Honorario</h2>

            <div>
                <label htmlFor="mes" className="block text-gray-700 dark:text-gray-200">
                    Mes
                </label>
                <select
                    id="mes"
                    name="mes"
                    value={formData.mes}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="">Seleccione un mes</option>
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {new Date(0, i).toLocaleString("es-CL", { month: "long" })}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="montoPago" className="block text-gray-700 dark:text-gray-200">
                    Monto del Pago
                </label>
                <input
                    type="number"
                    id="montoPago"
                    name="montoPago"
                    value={formData.montoPago}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Ingrese el monto"
                />
            </div>

            <div>
                <label htmlFor="comprobante" className="block text-gray-700 dark:text-gray-200">
                    Comprobante
                </label>
                <input
                    type="text"
                    id="comprobante"
                    name="comprobante"
                    value={formData.comprobante}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Ingrese la URL o descripción del comprobante"
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
                    Registrar Pago
                </button>
            </div>
        </form>
    );
};

export default AddHonoraryPayment;
