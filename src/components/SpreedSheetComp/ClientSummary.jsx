import React from "react";
import { FaEdit } from "react-icons/fa";

const ClientSummary = ({ summary, onEdit }) => {
    return (
        <div className="client-summary bg-white dark:bg-darkCard text-gray-800 dark:text-darkText shadow-md dark:shadow-dark rounded-xl p-6 flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
            {/* Avatar Section */}
            <div className="relative">
                <img
                    src={summary.photo || "/default-avatar.png"}
                    alt="Cliente"
                    className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 dark:border-white shadow-lg"
                />
                {/* Improved Edit Button */}
                <button
                    onClick={onEdit}
                    className="absolute bottom-2 right-2 bg-indigo-500 dark:bg-gray-400 text-white p-3 rounded-full shadow-lg hover:bg-indigo-600 dark:hover:bg-gray-700 transition-transform transform hover:scale-105"
                >
                    <FaEdit className="text-lg" />
                </button>
            </div>

            {/* Client Details */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 col-span-2 text-center md:text-left">
                    {summary.nombre || "Nombre no disponible"}
                </h2>
                <p className="text-gray-600 dark:text-gray-200">
                    <strong>RUT:</strong> {summary.rut || "Sin datos"}
                </p>
                <p className="text-gray-600 dark:text-gray-200">
                    <strong>Email:</strong> {summary.email || "Sin datos"}
                </p>
                <p className="text-gray-600 dark:text-gray-200">
                    <strong>Teléfono:</strong> {summary.telefono || "Sin datos"}
                </p>
                <p className="text-gray-600 dark:text-gray-200">
                    <strong>Dirección:</strong> {summary.direccion || "Sin datos"}
                </p>
            </div>
        </div>
    );
};

export default ClientSummary;
