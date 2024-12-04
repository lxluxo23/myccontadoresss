import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";

const Filters = ({
                     selectedMonth,
                     selectedYear,
                     selectedStatus,
                     selectedType,
                     onMonthChange,
                     onYearChange,
                     onStatusChange,
                     onTypeChange,
                 }) => {
    const months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];

    const types = [
        "Impuesto IVA",
        "Impuesto Renta",
        "Honorario Mensual",
        "Honorario Renta AT",
        "Multa",
        "Imposiciones",
        "Otros",
    ];

    const statuses = ["Pendiente", "Saldada"];

    // Controlar la visibilidad de los filtros
    const [filtersVisible, setFiltersVisible] = useState(false);

    return (
        <div className="relative">
            {/* Botón flotante para filtros */}
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setFiltersVisible((prev) => !prev)}
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-full shadow-md hover:bg-indigo-600 transition-all"
                >
                    <FaFilter className="mr-2" />
                    {filtersVisible ? "Ocultar Filtros" : "Mostrar Filtros"}
                </button>
            </div>

            {/* Contenedor de Filtros */}
            {filtersVisible && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-10">
                    <div className="grid grid-cols-1 gap-4">
                        {/* Filtro Mes */}
                        <div>
                            <label
                                htmlFor="month"
                                className="block text-sm font-medium text-gray-600 dark:text-gray-400"
                            >
                                Mes
                            </label>
                            <select
                                id="month"
                                value={selectedMonth || ""}
                                onChange={(e) => onMonthChange(e.target.value ? Number(e.target.value) : "")}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-gray-800 dark:text-gray-300"
                            >
                                <option value="">Todos</option>
                                {months.map((month, index) => (
                                    <option key={index} value={index + 1}>
                                        {month}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Filtro Año */}
                        <div>
                            <label
                                htmlFor="year"
                                className="block text-sm font-medium text-gray-600 dark:text-gray-400"
                            >
                                Año
                            </label>
                            <input
                                type="number"
                                id="year"
                                value={selectedYear || ""}
                                onChange={(e) => onYearChange(Number(e.target.value))}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-gray-800 dark:text-gray-300"
                                min="2000"
                                max="2100"
                            />
                        </div>

                        {/* Filtro Estado */}
                        <div>
                            <label
                                htmlFor="status"
                                className="block text-sm font-medium text-gray-600 dark:text-gray-400"
                            >
                                Estado
                            </label>
                            <select
                                id="status"
                                value={selectedStatus || ""}
                                onChange={(e) => onStatusChange(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-gray-800 dark:text-gray-300"
                            >
                                <option value="">Todos</option>
                                {statuses.map((status, index) => (
                                    <option key={index} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Filtro Tipo */}
                        <div>
                            <label
                                htmlFor="type"
                                className="block text-sm font-medium text-gray-600 dark:text-gray-400"
                            >
                                Tipo
                            </label>
                            <select
                                id="type"
                                value={selectedType || ""}
                                onChange={(e) => onTypeChange(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-gray-800 dark:text-gray-300"
                            >
                                <option value="">Todos</option>
                                {types.map((type, index) => (
                                    <option key={index} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Filters;
