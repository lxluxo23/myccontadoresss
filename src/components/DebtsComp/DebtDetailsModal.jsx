import React from "react";

const DebtDetailsModal = ({ debt, onClose }) => {
    if (!debt) return null; // Si no hay deuda seleccionada, no renderiza nada

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
                    Detalles de la Deuda
                </h2>
                <div className="space-y-2">
                    <p>
                        <strong>Tipo:</strong> {debt.tipo || "Sin Tipo"}
                    </p>
                    <p>
                        <strong>Monto Total:</strong> $
                        {debt.montoTotal ? debt.montoTotal.toLocaleString() : "0"}
                    </p>
                    <p>
                        <strong>Monto Restante:</strong> $
                        {debt.montoRestante ? debt.montoRestante.toLocaleString() : "0"}
                    </p>
                    <p>
                        <strong>Estado:</strong>{" "}
                        <span
                            className={`${
                                debt.estado === "Pendiente" ? "text-red-500" : "text-green-500"
                            }`}
                        >
              {debt.estado || "Desconocido"}
            </span>
                    </p>
                    <p>
                        <strong>Fecha Creación:</strong> {debt.fechaCreacion || "N/A"}
                    </p>
                    <p>
                        <strong>Fecha Vencimiento:</strong> {debt.fechaVencimiento || "N/A"}
                    </p>
                    <p>
                        <strong>Observaciones:</strong> {debt.observaciones || "Sin observaciones"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DebtDetailsModal;
