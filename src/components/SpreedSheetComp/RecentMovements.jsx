import React, { useState, useEffect } from "react";
import { useCliente } from "../context/ClienteContext";
import {
    FaArrowUp,
    FaArrowDown,
    FaInfoCircle,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";

const RecentMovements = () => {
    const { clienteId } = useCliente(); // Obteniendo el clienteId desde el contexto
    const [movements, setMovements] = useState([]); // Lista de movimientos
    const [expandedRow, setExpandedRow] = useState(null); // Fila expandida
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const [isLoading, setIsLoading] = useState(false); // Indicador de carga
    const [error, setError] = useState(null); // Manejo de errores
    const rowsPerPage = 5; // Cantidad de filas por página

    // Fetch de movimientos
    useEffect(() => {
        console.log("Cliente ID recibido:", clienteId);

        if (!clienteId) {
            console.warn("Cliente ID no está definido. Configúralo antes de cargar movimientos.");
            return;
        }

        const fetchMovements = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const url = `http://backend.cobros.myccontadores.cl/api/clientes/${clienteId}/movimientos`;
                console.log("Realizando solicitud a:", url);

                const response = await fetch(url);

                console.log("Estado de la respuesta:", response.status);
                if (!response.ok) {
                    throw new Error(`Error al cargar movimientos: ${response.status}`);
                }

                const data = await response.json();
                console.log("Movimientos obtenidos:", data);

                setMovements(data);
            } catch (err) {
                console.error("Error al obtener movimientos:", err.message);
                setError(err.message);
            } finally {
                setIsLoading(false);
                console.log("Finalizada la solicitud.");
            }
        };

        fetchMovements();
    }, [clienteId]);

    // Función para obtener el ícono basado en el tipo de movimiento
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

    // Filtrar filas actuales para la paginación
    const currentRows = (movements || []).slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    // Renderizar mensajes de estado
    if (!clienteId) {
        return (
            <div className="text-center text-red-500">
                <p>No se ha seleccionado un cliente.</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="text-center text-gray-500">
                <p>Cargando movimientos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500">
                <p>Error: {error}</p>
            </div>
        );
    }

    // Renderizar movimientos recientes
    return (
        <div
            className="recent-movements bg-white dark:bg-darkCard text-gray-800 dark:text-darkText shadow-md dark:shadow-dark rounded-xl p-6"
            role="region"
            aria-labelledby="recent-movements-title"
        >
            <h2
                id="recent-movements-title"
                className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200 text-center"
            >
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
                                        expandedRow === index
                                            ? "bg-indigo-100 dark:bg-indigo-800"
                                            : index % 2 === 0
                                                ? "bg-gray-50 dark:bg-gray-800"
                                                : ""
                                    } hover:bg-indigo-100 dark:hover:bg-indigo-700 transition-all duration-200 ease-in-out`}
                                    onClick={() =>
                                        setExpandedRow(
                                            expandedRow === index ? null : index
                                        )
                                    }
                                >
                                    <td className="p-3 text-center">
                                        {movement.fecha
                                            ? new Date(movement.fecha).toLocaleDateString(
                                                "es-CL"
                                            )
                                            : "Sin fecha"}
                                    </td>
                                    <td className="p-3 flex justify-center items-center space-x-2">
                                        {getIconByType(movement.tipo)}
                                        <span>{movement.tipo || "N/A"}</span>
                                    </td>
                                    <td className="p-3 text-center text-green-600">
                                        {movement.monto !== undefined
                                            ? `$${movement.monto.toLocaleString(
                                                "es-CL"
                                            )}`
                                            : "N/A"}
                                    </td>
                                    <td className="p-3 text-center">
                                        {movement.descripcion || "Sin descripción"}
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
                                                {movement.detalles || "N/A"}
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))
                    ) : (
                        <tr>
                            <td className="p-3 text-center" colSpan="4">
                                <div className="text-gray-500 dark:text-gray-400 animate-pulse">
                                    Sin movimientos registrados.
                                </div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4">
                <button
                    disabled={currentPage === 1 || movements.length === 0}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full disabled:opacity-50 hover:disabled:cursor-not-allowed"
                    aria-label="Página anterior"
                >
                    <FaChevronLeft className="text-gray-500 dark:text-gray-300"/>
                </button>
                <span className="text-sm dark:text-gray-400">
        Página {movements.length === 0 ? 0 : currentPage} de{" "}
                    {Math.ceil(movements?.length / rowsPerPage) || 0}
    </span>
                <button
                    disabled={
                        currentPage === Math.ceil(movements?.length / rowsPerPage) || movements.length === 0
                    }
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full disabled:opacity-50 hover:disabled:cursor-not-allowed"
                    aria-label="Página siguiente"
                >
                    <FaChevronRight className="text-gray-500 dark:text-gray-300"/>
                </button>
            </div>

        </div>
    );
};

export default RecentMovements;
