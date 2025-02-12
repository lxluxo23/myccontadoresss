import React from "react";

const FloatingExcelButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            title="Generar y Descargar Excel"
        >
            <span className="text-xl">📥</span> {/* Icono de descarga */}
        </button>
    );
};

export default FloatingExcelButton;
