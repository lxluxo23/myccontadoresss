import React from "react";
import Avatar from "react-avatar";
import { FaEdit } from "react-icons/fa";

const ClientSummary = ({ summary = {}, onEdit }) => {
    console.log("Datos recibidos en ClientSummary:", summary);

    return (
        <div className="client-summary bg-white dark:bg-darkCard text-gray-800 dark:text-darkText shadow-md dark:shadow-dark rounded-xl p-6 flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
            {/* Avatar Section */}
            <div className="relative w-40 h-40 rounded-full border-4 border-indigo-500 dark:border-white shadow-lg flex items-center justify-center bg-gray-200">
                {summary.photo ? (
                    <img
                        src={summary.photo}
                        alt="Cliente"
                        className="w-full h-full rounded-full object-cover"
                    />
                ) : (
                    <Avatar
                        name={summary.nombre || "Cliente"}
                        size="160"
                        round
                        color={Avatar.getRandomColor("sitebase", ["#FF5733", "#33FF57", "#3357FF"])}
                    />
                )}
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
