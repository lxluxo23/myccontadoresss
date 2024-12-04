import React, { useState } from "react";

const AddPaymentForm = ({ onSubmit, onClose }) => {
    const [fechaPago, setFechaPago] = useState("");
    const [monto, setMonto] = useState("");
    const [metodoPago, setMetodoPago] = useState("");
    const [observaciones, setObservaciones] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            fechaPago,
            monto: parseFloat(monto),
            metodoPago,
            observaciones,
        });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-gray-700 dark:text-gray-300">Fecha de Pago</label>
                <input
                    type="date"
                    value={fechaPago}
                    onChange={(e) => setFechaPago(e.target.value)}
                    className="w-full p-2 border rounded-md"
                />
            </div>
            <div>
                <label className="block text-gray-700 dark:text-gray-300">Monto</label>
                <input
                    type="number"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                    className="w-full p-2 border rounded-md"
                />
            </div>
            <div>
                <label className="block text-gray-700 dark:text-gray-300">Método de Pago</label>
                <select
                    value={metodoPago}
                    onChange={(e) => setMetodoPago(e.target.value)}
                    className="w-full p-2 border rounded-md"
                >
                    <option value="">Seleccione</option>
                    <option value="Transferencia">Transferencia</option>
                    <option value="Tarjeta">Tarjeta</option>
                    <option value="Efectivo">Efectivo</option>
                    <option value="Cheque">Cheque</option>
                </select>
            </div>
            <div>
                <label className="block text-gray-700 dark:text-gray-300">Observaciones</label>
                <textarea
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                    className="w-full p-2 border rounded-md"
                />
            </div>
            <button type="submit" className="w-full bg-indigo-500 text-white py-2 rounded-md">
                Agregar Pago
            </button>
        </form>
    );
};

export default AddPaymentForm;
