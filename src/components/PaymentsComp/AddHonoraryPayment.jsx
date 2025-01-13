// AddHonoraryPayment.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";

const AddHonoraryPayment = ({ honorarioId, onSubmit, onClose }) => {
    const [paymentData, setPaymentData] = useState({
        mes: "",
        montoPago: "",
        comprobante: null,
    });
    const [error, setError] = useState(null);
    const [pendingMonths, setPendingMonths] = useState([]);
    const [loading, setLoading] = useState(true);

    // Lista de todos los meses del año
    const allMonths = [
        { value: 1, label: "Enero" },
        { value: 2, label: "Febrero" },
        { value: 3, label: "Marzo" },
        { value: 4, label: "Abril" },
        { value: 5, label: "Mayo" },
        { value: 6, label: "Junio" },
        { value: 7, label: "Julio" },
        { value: 8, label: "Agosto" },
        { value: 9, label: "Septiembre" },
        { value: 10, label: "Octubre" },
        { value: 11, label: "Noviembre" },
        { value: 12, label: "Diciembre" },
    ];

    // Función para obtener pagos existentes
    const fetchExistingPayments = async () => {
        try {
            const response = await axios.get(`http://backend.cobros.myccontadores.cl/api/honorarios/${honorarioId}/pagos`);
            return response.data; // Asumiendo que la respuesta es un array de pagos
        } catch (err) {
            console.error("Error al obtener los pagos existentes:", err);
            return [];
        }
    };

    // Calcular meses pendientes
    const calculatePendingMonths = (existingPayments) => {
        const paidMonths = existingPayments.map((payment) => payment.mes);
        const pending = allMonths.filter((month) => !paidMonths.includes(month.value));
        setPendingMonths(pending);
    };

    // Obtener los pagos existentes y calcular meses pendientes al montarse
    useEffect(() => {
        const initialize = async () => {
            setLoading(true);
            const existingPayments = await fetchExistingPayments();
            calculatePendingMonths(existingPayments);
            setLoading(false);
        };
        initialize();
    }, [honorarioId]);

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
        if (!paymentData.mes) {
            setError("Por favor, selecciona un mes.");
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

        // Preparar datos para enviar
        const payload = new FormData();
        payload.append("mes", parseInt(paymentData.mes));
        payload.append("montoPago", parseFloat(paymentData.montoPago));
        if (paymentData.comprobante) {
            payload.append("comprobante", paymentData.comprobante);
        }

        try {
            await onSubmit(honorarioId, payload);
            onClose();
        } catch (error) {
            setError("Ocurrió un error al registrar el pago. Por favor, inténtalo de nuevo.");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96"
                encType="multipart/form-data"
            >
                <h2 className="text-2xl font-bold text-indigo-500 mb-4">Registrar Pago</h2>
                {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
                {loading ? (
                    <div className="text-center py-10">
                        <span className="text-gray-500 dark:text-gray-300">Cargando meses pendientes...</span>
                    </div>
                ) : pendingMonths.length === 0 ? (
                    <div className="text-center py-10">
                        <span className="text-gray-500 dark:text-gray-300">Todos los meses ya han sido pagados.</span>
                        <button
                            type="button"
                            onClick={onClose}
                            className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                        >
                            Cerrar
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Mes</label>
                            <select
                                name="mes"
                                value={paymentData.mes}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg"
                                required
                            >
                                <option value="">Seleccione un mes</option>
                                {pendingMonths.map((month) => (
                                    <option key={month.value} value={month.value}>
                                        {month.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Monto del Pago</label>
                            <input
                                type="number"
                                name="montoPago"
                                value={paymentData.montoPago}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg"
                                min="0.01"
                                step="0.01"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Comprobante (opcional)</label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="w-full p-2 text-sm text-gray-500"
                                accept=".pdf,.jpg,.jpeg,.png"
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
                    </>
                )}
            </form>
        </div>
    );
}
export default AddHonoraryPayment;
