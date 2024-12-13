// PaymentDetailsModal.jsx
import React from "react";

const PaymentDetailsModal = ({ payment, onClose }) => {
    if (!payment) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 dark:text-gray-300 hover:text-red-500"
                >
                    ✕
                </button>
                <h2 className="text-2xl font-bold text-indigo-600 mb-4">
                    Detalles del Pago
                </h2>
                <div className="space-y-2">
                    <p><strong>Fecha:</strong> {payment.fechaPago}</p>
                    <p><strong>Monto:</strong> ${payment.monto.toLocaleString()}</p>
                    <p><strong>Método:</strong> {payment.metodoPago}</p>
                    <p><strong>Observaciones:</strong> {payment.observaciones || "N/A"}</p>
                </div>
            </div>
        </div>
    );
};

export default PaymentDetailsModal;
