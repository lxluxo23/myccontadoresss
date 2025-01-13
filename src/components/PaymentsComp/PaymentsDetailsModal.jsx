import React, { useState, useEffect } from "react";
import axios from "axios";

const PaymentDetailsModal = ({ payment, onClose }) => {
    const [comprobanteUrl, setComprobanteUrl] = useState(null);
    const [comprobanteFormato, setComprobanteFormato] = useState("");
    const [loadingComprobante, setLoadingComprobante] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (payment?.pagoId) {
            cargarComprobante(payment.pagoId);
        }
    }, [payment]);

    const cargarComprobante = async (pagoId) => {
        setLoadingComprobante(true);
        setError(null);
        try {
            const response = await axios.get(
                `http://backend.cobros.myccontadores.cl/api/pagos/comprobante/${pagoId}`,
                { responseType: "blob" }
            );

            const formato = response.headers["content-type"];
            const url = URL.createObjectURL(response.data);
            setComprobanteUrl(url);
            setComprobanteFormato(formato);
        } catch (err) {
            console.error("Error al cargar el comprobante:", err);
            setError("No se pudo cargar el comprobante.");
        } finally {
            setLoadingComprobante(false);
        }
    };

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
                    <p><strong>Fecha:</strong> {payment.fechaTransaccion || "N/A"}</p>
                    <p>
                        <strong>Monto:</strong> ${payment.monto?.toLocaleString("es-CL", {
                        minimumFractionDigits: 2,
                    })}
                    </p>
                    <p><strong>Método:</strong> {payment.metodoPago || "N/A"}</p>
                    <p><strong>Observaciones:</strong> {payment.observaciones || "N/A"}</p>
                </div>

                <div className="mt-4">
                    <h3 className="text-lg font-bold mb-2">Comprobante</h3>
                    {loadingComprobante && <p>Cargando comprobante...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    {comprobanteUrl && (
                        <div>
                            {comprobanteFormato === "application/pdf" ? (
                                <iframe
                                    src={comprobanteUrl}
                                    className="w-full h-64 border rounded-md"
                                    title="Vista previa del comprobante"
                                />
                            ) : (
                                <img
                                    src={comprobanteUrl}
                                    alt="Comprobante"
                                    className="w-full max-h-64 object-contain"
                                />
                            )}
                            <a
                                href={comprobanteUrl}
                                download={`comprobante-${payment.pagoId}`}
                                className="block text-indigo-500 mt-2 text-center"
                            >
                                Descargar Comprobante
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentDetailsModal;
