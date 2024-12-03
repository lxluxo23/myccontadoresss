import React from "react";

const ClientSummary = ({ summary }) => {
    return (
        <div className="client-summary bg-white dark:bg-darkCard text-gray-800 dark:text-darkText shadow-md dark:shadow-dark rounded-xl p-6 flex items-center space-x-6">
            <img
                src={summary.photo || "/default-avatar.png"}
                alt="Cliente"
                className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500"
            />
            <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{summary.nombre || "Nombre no disponible"}</h2>
                <p className="text-gray-600 dark:text-gray-400"><strong>RUT:</strong> {summary.rut || "Sin datos"}</p>
                <p className="text-gray-600 dark:text-gray-400"><strong>Email:</strong> {summary.email || "Sin datos"}</p>
                <p className="text-gray-600 dark:text-gray-400"><strong>Teléfono:</strong> {summary.telefono || "Sin datos"}</p>
                <p className="text-gray-600 dark:text-gray-400"><strong>Dirección:</strong> {summary.direccion || "Sin datos"}</p>
            </div>
        </div>
    );
};

export default ClientSummary;
