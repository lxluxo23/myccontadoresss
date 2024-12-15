import React, { useState } from "react";

const AddHonoraryPayment = ({ honorarioId, onSubmit, onClose }) => {
    const [paymentData, setPaymentData] = useState({
        mes: "",
        montoPago: "",
        comprobante: null,
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setPaymentData((prevData) => ({
            ...prevData,
            comprobante: e.target.files[0],
        }));
    };

    const validateForm = () => {
        if (!paymentData.mes || paymentData.mes < 1 || paymentData.mes > 12) {
            setError("El mes debe estar entre 1 y 12.");
            return false;
        }
        if (!paymentData.montoPago || Number(paymentData.montoPago) <= 0) {
            setError("El monto del pago debe ser mayor a 0.");
            return false;
        }
        setError(null);
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const payload = {
            mes: parseInt(paymentData.mes),
            montoPago: parseFloat(paymentData.montoPago),
            comprobante: paymentData.comprobante ? paymentData.comprobante.name : null,
        };

        try {
            await onSubmit(honorarioId, payload);
            onClose();
        } catch (error) {
            setError("Ocurrió un error al registrar el pago. Por favor, inténtalo de nuevo.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-6">
            <h2 className="text-2xl font-bold text-indigo-500">Registrar Pago</h2>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div>
                <label className="block text-sm font-medium mb-1">Mes</label>
                <input
                    type="number"
                    name="mes"
                    value={paymentData.mes}
                    onChange={handleChange}
                    className="no-spinner w-full p-2 border rounded-lg"
                    min="1"
                    max="12"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Monto del Pago</label>
                <input
                    type="number"
                    name="montoPago"
                    value={paymentData.montoPago}
                    onChange={handleChange}
                    className="no-spinner w-full p-2 border rounded-lg"
                    min="0"
                    step="0.01"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Comprobante (opcional)</label>
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full p-2 text-sm text-gray-500"
                />
            </div>
            <div className="flex justify-end gap-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                >
                    Registrar Pago
                </button>
            </div>
        </form>
    );
};

export default AddHonoraryPayment;
