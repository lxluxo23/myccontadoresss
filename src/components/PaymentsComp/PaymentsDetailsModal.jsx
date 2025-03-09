import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../../config/config";

const PaymentDetailsModal = ({ payment, onClose }) => {
    const { pagoId, fechaTransaccion, monto, metodoPago, observaciones } = payment || {};
    const [comprobanteUrl, setComprobanteUrl] = useState(null);
    const [comprobanteFormato, setComprobanteFormato] = useState("");
    const [loadingComprobante, setLoadingComprobante] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (pagoId) {
            cargarComprobante(pagoId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [payment]);

    const cargarComprobante = async (id) => {
        setLoadingComprobante(true);
        setError(null);
        try {
            const response = await axios.get(
                `${config.apiUrl}/api/pagos/comprobante/${id}`,
                { responseType: "blob" }
            );
            const formato = response.headers["content-type"];
            const url = URL.createObjectURL(response.data);
            setComprobanteUrl(url);
            setComprobanteFormato(formato);
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setComprobanteUrl(null);
            } else {
                console.error("Error al cargar el comprobante:", err);
                setError("No se pudo cargar el comprobante.");
            }
        } finally {
            setLoadingComprobante(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-lg rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg transition-transform transform duration-300 scale-100">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-2xl text-gray-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
                    aria-label="Cerrar"
                >
                    &times;
                </button>
                <h2 className="mb-4 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    Detalles del Pago
                </h2>
                <div className="space-y-2 text-gray-700 dark:text-gray-200">
                    <p>
                        <strong>Fecha:</strong> {fechaTransaccion || "N/A"}
                    </p>
                    <p>
                        <strong>Monto:</strong>{" "}
                        {monto ? `$${monto.toLocaleString("es-CL", { minimumFractionDigits: 2 })}` : "N/A"}
                    </p>
                    <p>
                        <strong>Método:</strong> {metodoPago || "N/A"}
                    </p>
                    <p>
                        <strong>Observaciones:</strong> {observaciones || "N/A"}
                    </p>
                </div>

                <div className="mt-6">
                    <h3 className="mb-2 text-lg font-bold">Comprobante</h3>
                    {loadingComprobante && <p className="text-gray-600">Cargando comprobante...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    {!loadingComprobante && !error && !comprobanteUrl && (
                        <p className="text-gray-600">No hay comprobante.</p>
                    )}
                    {comprobanteUrl && (
                        <div className="mt-2">
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
                                    className="w-full max-h-64 object-contain rounded-md border"
                                />
                            )}
                            <a
                                href={comprobanteUrl}
                                download={`comprobante-${pagoId}.${comprobanteFormato.split("/")[1]}`}
                                className="mt-2 block text-center text-indigo-500 hover:underline"
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
