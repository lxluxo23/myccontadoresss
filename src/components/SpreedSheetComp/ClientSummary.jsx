import React from "react";
import Avatar from "react-avatar";
import { FaEdit, FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard } from "react-icons/fa";

const ClientSummary = ({ summary = {}, onEdit }) => {
    console.log("Datos recibidos en ClientSummary:", summary);

    return (
        <div className="client-summary animate-fadeIn bg-white dark:bg-darkCard text-gray-800 dark:text-darkText shadow-md dark:shadow-dark rounded-xl p-6 flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
            {/* Avatar Section */}
            <div
                className="relative w-40 h-40 rounded-full border-4 border-indigo-500 dark:border-white shadow-lg flex items-center justify-center bg-gray-200"
                aria-label="Foto de perfil del cliente"
            >
                {summary.photo ? (
                    <img
                        src={summary.photo}
                        alt={`Foto de ${summary.nombre || "Cliente"}`}
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
                    aria-label="Editar cliente"
                >
                    <FaEdit className="text-lg" />
                </button>
            </div>

            {/* Client Details */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <h2
                    className="text-2xl font-bold text-gray-800 dark:text-gray-200 col-span-2 text-center md:text-left"
                    aria-label={`Nombre del cliente: ${summary.nombre || "Nombre no disponible"}`}
                >
                    {summary.nombre || "Nombre no disponible"}
                </h2>
                {/* Línea Divisoria */}
                <hr className="border-t border-gray-300 dark:border-gray-500 col-span-2" />
                <p className="flex items-center text-gray-600 dark:text-gray-200">
                    <FaIdCard className="mr-2 text-lg" />
                    <strong>RUT:</strong> {summary.rut || "Sin datos"}
                </p>
                <p className="flex items-center text-gray-600 dark:text-gray-200">
                    <FaEnvelope className="mr-2 text-lg" />
                    <strong>Email:</strong> {summary.email || "Sin datos"}
                </p>
                <p className="flex items-center text-gray-600 dark:text-gray-200">
                    <FaPhone className="mr-2 text-lg" />
                    <strong>Teléfono:</strong> {summary.telefono || "Sin datos"}
                </p>
                <p className="flex items-center text-gray-600 dark:text-gray-200">
                    <FaMapMarkerAlt className="mr-2 text-lg" />
                    <strong>Dirección:</strong> {summary.direccion || "Sin datos"}
                </p>
            </div>
        </div>
    );
};

export default ClientSummary;
