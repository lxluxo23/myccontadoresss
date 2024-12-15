import React, { useState } from "react";
import { FaArrowUp, FaArrowDown, FaInfoCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const RecentMovements = ({ movements = [] }) => {
    const [expandedRow, setExpandedRow] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const getIconByType = (type) => {
        switch (type) {
            case "Ingreso":
                return <FaArrowUp className="text-green-500 text-lg" />;
            case "Gasto":
                return <FaArrowDown className="text-red-500 text-lg" />;
            default:
                return <FaInfoCircle className="text-gray-500 text-lg" />;
        }
    };

    const currentRows = (movements || []).slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    return (
        <div className="recent-movements bg-white dark:bg-darkCard text-gray-800 dark:text-darkText shadow-md dark:shadow-dark rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200 text-center">
                Últimos Movimientos
            </h2>

            <div className="overflow-x-auto">
                <table className="table-auto w-full text-gray-700 dark:text-gray-300 rounded-lg">
                    <thead className="bg-indigo-500 dark:bg-gray-800 text-white">
                    <tr>
                        <th className="p-3 text-center">Fecha</th>
                        <th className="p-3 text-center">Tipo</th>
                        <th className="p-3 text-center">Monto</th>
                        <th className="p-3 text-center">Descripción</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentRows.length > 0 ? (
                        currentRows.map((movement, index) => (
                            <React.Fragment key={index}>
                                <tr
                                    className={`border-b dark:border-gray-600 ${
                                        index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : ""
                                    } hover:bg-indigo-100 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out`}
                                    onClick={() =>
                                        setExpandedRow(expandedRow === index ? null : index)
                                    }
                                >
                                    <td className="p-3 text-center">
                                        {movement.date
                                            ? new Date(movement.date).toLocaleDateString("es-CL")
                                            : "Sin fecha"}
                                    </td>
                                    <td className="p-3 flex justify-center items-center space-x-2">
                                        {getIconByType(movement.type)}
                                        <span>{movement.type || "N/A"}</span>
                                    </td>
                                    <td className="p-3 text-center text-green-600">
                                        {movement.amount !== undefined
                                            ? `$${movement.amount.toLocaleString("es-CL")}`
                                            : "N/A"}
                                    </td>
                                    <td className="p-3 text-center">
                                        {movement.description || "Sin descripción"}
                                    </td>
                                </tr>
                                {expandedRow === index && (
                                    <tr>
                                        <td
                                            className="p-3 bg-gray-100 dark:bg-gray-800 text-center"
                                            colSpan="4"
                                        >
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Detalles adicionales:{" "}
                                                {movement.details || "N/A"}
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))
                    ) : (
                        <tr>
                            <td className="p-3 text-center" colSpan="4">
                                Sin datos
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full disabled:opacity-50"
                >
                    <FaChevronLeft className="text-gray-500 dark:text-gray-300" />
                </button>
                <span className="text-sm dark:text-gray-400">
                    Página {currentPage} de {Math.ceil(movements?.length / rowsPerPage)}
                </span>
                <button
                    disabled={currentPage === Math.ceil(movements?.length / rowsPerPage)}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full disabled:opacity-50"
                >
                    <FaChevronRight className="text-gray-500 dark:text-gray-300" />
                </button>
            </div>
        </div>
    );
};

export default RecentMovements;
