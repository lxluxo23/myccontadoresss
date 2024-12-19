import React from "react";
import { FaSortAlphaDown, FaSortAlphaUpAlt } from "react-icons/fa";

function TableHeader({ sortOrder, onSortChange }) {
    const handleSortChange = () => {
        const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
        onSortChange(newSortOrder);
    };

    return (
        <div className="grid grid-cols-4 px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-t-lg text-sm font-medium shadow-md">
            {/* Nombre con orden */}
            <div
                className="flex items-center cursor-pointer"
                onClick={handleSortChange}
            >
                Nombre
                {sortOrder === "asc" ? (
                    <FaSortAlphaDown className="ml-2 w-4 h-4" />
                ) : (
                    <FaSortAlphaUpAlt className="ml-2 w-4 h-4" />
                )}
            </div>
            <div className="text-center">Correo</div>
            <div className="text-center">RUT</div>
            <div className="text-center">Opciones</div>
        </div>
    );
}

export default TableHeader;
