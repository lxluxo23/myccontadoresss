import React from "react";

const ClientSummary = ({ summary }) => {
    return (
        <div className="client-summary bg-white shadow rounded-lg p-6 flex items-center space-x-6">
            <img
                src={summary.photo || "/default-avatar.png"}
                alt="Cliente"
                className="w-20 h-20 rounded-full object-cover"
            />
            <div>
                <h2 className="text-xl font-bold">{summary.nombre || "Nombre no disponible"}</h2>
                <p><strong>RUT:</strong> {summary.rut || "Sin datos"}</p>
                <p><strong>Email:</strong> {summary.email || "Sin datos"}</p>
                <p><strong>Teléfono:</strong> {summary.telefono || "Sin datos"}</p>
                <p><strong>Dirección:</strong> {summary.direccion || "Sin datos"}</p>
            </div>
        </div>
    );
};

export default ClientSummary;
