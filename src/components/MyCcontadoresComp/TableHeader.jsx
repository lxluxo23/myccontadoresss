import React, { useCallback, useMemo } from "react";
import { FaSortAlphaDown, FaSortAlphaUpAlt } from "react-icons/fa";

const TableHeader = React.memo(({ sortOrder, onSortChange }) => {
    // Función memorizada para cambiar el orden de clasificación
    const handleSortChange = useCallback(() => {
        const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
        onSortChange(newSortOrder);
    }, [sortOrder, onSortChange]);

    // Memoriza el icono de orden según el sortOrder actual
    const SortIcon = useMemo(() => {
        return sortOrder === "asc" ? FaSortAlphaDown : FaSortAlphaUpAlt;
    }, [sortOrder]);

    return (
        <div className="grid grid-cols-4 px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-t-lg text-sm font-medium shadow-md">
            {/* Columna "Nombre" con cambio de orden */}
            <div className="flex items-center cursor-pointer" onClick={handleSortChange}>
                Nombre
                <SortIcon className="ml-2 w-4 h-4" />
            </div>
            <div className="text-center">Correo</div>
            <div className="text-center">RUT</div>
            <div className="text-center">Opciones</div>
        </div>
    );
});

export default TableHeader;
