// PaymentTable.jsx

import React, { useState, useMemo } from "react";
import { FaChevronLeft, FaChevronRight, FaEye, FaTrashAlt } from "react-icons/fa";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween"; // Importar el plugin
import PaymentDetailsModal from "./PaymentsDetailsModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

// Extender Day.js con el plugin isBetween
dayjs.extend(isBetween);

const PaymentTable = ({ payments }) => { // Recibe payments como prop
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [paymentToDelete, setPaymentToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Ítems por página fijo en 10
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: "fechaTransaccion", direction: "ascending" });
    const [error, setError] = useState(null);
    const [debtTypes, setDebtTypes] = useState([]); // Para filtros por tipo de deuda
    const [selectedDebtType, setSelectedDebtType] = useState(""); // Estado para filtro de tipo de deuda
    const [dateRange, setDateRange] = useState({ start: "", end: "" }); // Estado para filtro de rango de fechas

    // Establecer tipos únicos de deuda al recibir nuevos pagos
    useMemo(() => {
        const tiposUnicos = [...new Set(payments.map((pago) => pago.deuda?.tipoDeuda))].filter(Boolean);
        setDebtTypes(tiposUnicos);
    }, [payments]);

    // Función para manejar la vista de detalles
    const handleViewDetails = (payment) => {
        setSelectedPayment(payment);
    };

    const closeDetails = () => {
        setSelectedPayment(null);
    };

    // Función para abrir el modal de confirmación de eliminación
    const handleDelete = (payment) => {
        setPaymentToDelete(payment);
    };

    const confirmDelete = async () => {
        if (!paymentToDelete) return;
        try {
            const response = await fetch(`http://backend.cobros.myccontadores.cl/api/pagos/cancelar/${paymentToDelete.pagoId}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Error al eliminar el pago.");
            }
            // Actualizar los pagos eliminando el pago eliminado
            // Esto requiere que PaymentsPage maneje la actualización de los pagos
            // Puedes pasar una función desde PaymentsPage para actualizar los pagos
            // Por simplicidad, aquí asumimos que PaymentsPage está gestionando esto
            setPaymentToDelete(null);
            // Opcional: notificar a PaymentsPage para que actualice el estado de payments
            // Esto se puede hacer mediante props adicionales o context
        } catch (err) {
            console.error("Error al eliminar el pago:", err);
            setError("Error al eliminar el pago.");
        }
    };

    const closeDeleteModal = () => {
        setPaymentToDelete(null);
    };

    // Función para formatear el monto como pesos chilenos (CLP) con separadores de miles
    const formatAmount = (amount) => {
        return amount.toLocaleString("es-CL", { style: "currency", currency: "CLP" });
    };

    // Filtros aplicados a los pagos
    const filteredPayments = useMemo(() => {
        const filtered = payments.filter((payment) => {
            // Manejar posibles datos faltantes con encadenamiento opcional
            const fechaTransaccion = payment.fechaTransaccion ? dayjs(payment.fechaTransaccion).format("DD/MM/YYYY") : "";
            const monto = payment.monto ? formatAmount(payment.monto) : "0";
            const tipoDeuda = payment.deuda?.tipoDeuda || "";
            const observacionesDeuda = payment.deuda?.observaciones || "";
            const observacionesPago = payment.observaciones || "";

            // Filtrado por término de búsqueda
            const matchesSearchTerm =
                searchTerm === "" ||
                fechaTransaccion.includes(searchTerm) ||
                monto.includes(searchTerm) ||
                tipoDeuda.toLowerCase().includes(searchTerm.toLowerCase()) ||
                observacionesDeuda.toLowerCase().includes(searchTerm.toLowerCase()) ||
                observacionesPago.toLowerCase().includes(searchTerm.toLowerCase());

            // Filtrado por tipo de deuda
            const matchesDebtType = selectedDebtType === "" || tipoDeuda === selectedDebtType;

            // Filtrado por rango de fechas
            const matchesDateRange = (() => {
                if (dateRange.start && dateRange.end) {
                    const fecha = payment.fechaTransaccion ? dayjs(payment.fechaTransaccion) : null;
                    const inicio = dayjs(dateRange.start);
                    const fin = dayjs(dateRange.end);
                    if (!fecha?.isValid()) return false;
                    return fecha.isBetween(inicio, fin, null, '[]'); // Inclusivo
                }
                return true;
            })();

            return matchesSearchTerm && matchesDebtType && matchesDateRange;
        });

        console.log("Pagos después de aplicar filtros:", filtered);
        return filtered;
    }, [payments, searchTerm, selectedDebtType, dateRange]);

    // Ordenar los pagos según la columna seleccionada
    const sortedPayments = useMemo(() => {
        const sorted = [...filteredPayments];
        if (sortConfig !== null) {
            sorted.sort((a, b) => {
                let aKey = a[sortConfig.key];
                let bKey = b[sortConfig.key];

                // Si la clave es 'tipoDeuda' o 'observacionesDeuda' o 'observaciones', acceder a los campos anidados
                if (sortConfig.key === "tipoDeuda") {
                    aKey = a.deuda?.tipoDeuda || "";
                    bKey = b.deuda?.tipoDeuda || "";
                }
                if (sortConfig.key === "observacionesDeuda") {
                    aKey = a.deuda?.observaciones || "";
                    bKey = b.deuda?.observaciones || "";
                }
                if (sortConfig.key === "observaciones") {
                    aKey = a.observaciones || "";
                    bKey = b.observaciones || "";
                }

                // Para fechas, convertir a timestamps para una comparación adecuada
                if (sortConfig.key === "fechaTransaccion") {
                    aKey = a.fechaTransaccion ? dayjs(a.fechaTransaccion).valueOf() : 0;
                    bKey = b.fechaTransaccion ? dayjs(b.fechaTransaccion).valueOf() : 0;
                }

                if (aKey < bKey) {
                    return sortConfig.direction === "ascending" ? -1 : 1;
                }
                if (aKey > bKey) {
                    return sortConfig.direction === "ascending" ? 1 : -1;
                }
                return 0;
            });
        }
        return sorted;
    }, [filteredPayments, sortConfig]);

    // Paginación de los pagos
    const paginatedPayments = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginated = sortedPayments.slice(start, end);
        console.log(`Pagos en la página ${currentPage}:`, paginated);
        return paginated;
    }, [sortedPayments, currentPage, itemsPerPage]);

    // Función para manejar el ordenamiento de las columnas
    const requestSort = (key) => {
        let direction = "ascending";
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

    // Calcular el total de páginas
    const totalPages = Math.ceil(filteredPayments.length / itemsPerPage) || 1;

    // Función para manejar el cambio de página asegurando que esté dentro del rango válido
    const handlePageChange = (newPage) => {
        if (newPage < 1) newPage = 1;
        else if (newPage > totalPages) newPage = totalPages;
        setCurrentPage(newPage);
    };

    // Funciones para manejar el cambio de rango de fechas
    const handleStartDateChange = (e) => {
        setDateRange((prev) => ({ ...prev, start: e.target.value }));
    };

    const handleEndDateChange = (e) => {
        setDateRange((prev) => ({ ...prev, end: e.target.value }));
    };

    return (
        <div className="recent-movements bg-white dark:bg-darkCard text-gray-800 dark:text-darkText shadow-md dark:shadow-dark rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200 text-center">
                Gestión de Pagos
            </h2>

            {/* Barra de búsqueda y Filtros */}
            <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Filtro de Búsqueda */}
                <input
                    type="text"
                    placeholder="Buscar por fecha, monto, tipo o observaciones de deuda"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 bg-gray-200 dark:bg-gray-700 rounded w-full md:w-1/2"
                    aria-label="Buscar pagos por fecha, monto, tipo o observaciones de deuda"
                />

                {/* Filtros de Tipo de Deuda y Rango de Fechas */}
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Filtro por Tipo de Deuda */}
                    <div className="flex items-center">
                        <label htmlFor="debtType" className="mr-2 text-sm dark:text-gray-400">
                            Tipo de Deuda:
                        </label>
                        <select
                            id="debtType"
                            value={selectedDebtType}
                            onChange={(e) => setSelectedDebtType(e.target.value)}
                            className="p-2 bg-gray-200 dark:bg-gray-700 rounded"
                        >
                            <option value="">Todos</option>
                            {debtTypes.map((tipo, index) => (
                                <option key={index} value={tipo}>
                                    {tipo}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Filtro por Rango de Fechas */}
                    <div className="flex items-center">
                        <label className="mr-2 text-sm dark:text-gray-400">Fecha Transacción:</label>
                        <input
                            type="date"
                            value={dateRange.start}
                            onChange={handleStartDateChange}
                            className="p-2 bg-gray-200 dark:bg-gray-700 rounded mr-2"
                            aria-label="Fecha de inicio"
                        />
                        <span className="mx-2 text-gray-500 dark:text-gray-400">-</span>
                        <input
                            type="date"
                            value={dateRange.end}
                            onChange={handleEndDateChange}
                            className="p-2 bg-gray-200 dark:bg-gray-700 rounded"
                            aria-label="Fecha de fin"
                        />
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Pagos</h3>
                {error ? (
                    <div className="text-center py-10">
                        <span className="text-red-500">{error}</span>
                    </div>
                ) : (
                    <table className="table-auto w-full text-gray-700 dark:text-gray-300 rounded-lg">
                        <thead className="bg-indigo-500 dark:bg-gray-800 text-white">
                        <tr>
                            <th
                                className="p-3 text-center cursor-pointer"
                                onClick={() => requestSort("fechaTransaccion")}
                                aria-sort={sortConfig.key === "fechaTransaccion" ? sortConfig.direction : "none"}
                            >
                                Fecha {sortConfig.key === "fechaTransaccion" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                            </th>
                            <th
                                className="p-3 text-center cursor-pointer"
                                onClick={() => requestSort("monto")}
                                aria-sort={sortConfig.key === "monto" ? sortConfig.direction : "none"}
                            >
                                Monto {sortConfig.key === "monto" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                            </th>
                            <th
                                className="p-3 text-center cursor-pointer"
                                onClick={() => requestSort("tipoDeuda")}
                                aria-sort={sortConfig.key === "tipoDeuda" ? sortConfig.direction : "none"}
                            >
                                Tipo de Deuda {sortConfig.key === "tipoDeuda" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                            </th>
                            <th
                                className="p-3 text-center cursor-pointer"
                                onClick={() => requestSort("observacionesDeuda")}
                                aria-sort={sortConfig.key === "observacionesDeuda" ? sortConfig.direction : "none"}
                            >
                                Observaciones de Deuda {sortConfig.key === "observacionesDeuda" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                            </th>
                            <th className="p-3 text-center">Método</th>
                            <th
                                className="p-3 text-center cursor-pointer"
                                onClick={() => requestSort("observaciones")}
                                aria-sort={sortConfig.key === "observaciones" ? sortConfig.direction : "none"}
                            >
                                Observaciones del Pago {sortConfig.key === "observaciones" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                            </th>
                            <th className="p-3 text-center">Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredPayments.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="p-3 text-center text-gray-500 dark:text-gray-400">
                                    No se encontraron pagos.
                                </td>
                            </tr>
                        ) : (
                            paginatedPayments.map((payment, index) => (
                                <tr
                                    key={payment.pagoId}
                                    className={`border-b dark:border-gray-600 ${
                                        index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : ""
                                    } hover:bg-indigo-100 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out`}
                                >
                                    <td className="p-3 text-center">
                                        {payment.fechaTransaccion
                                            ? dayjs(payment.fechaTransaccion).format("DD/MM/YYYY")
                                            : "Sin fecha"}
                                    </td>
                                    <td className="p-3 text-center">
                                        {payment.monto ? formatAmount(payment.monto) : "0"}
                                    </td>
                                    <td className="p-3 text-center">{payment.deuda?.tipoDeuda || "N/A"}</td>
                                    <td className="p-3 text-center">{payment.deuda?.observaciones || "N/A"}</td>
                                    <td className="p-3 text-center">{payment.metodoPago || "N/A"}</td>
                                    <td className="p-3 text-center">{payment.observaciones || "Sin observaciones"}</td>
                                    <td className="p-3 text-center flex justify-center gap-4">
                                        <button
                                            onClick={() => handleViewDetails(payment)}
                                            className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                                            aria-label={`Ver detalles del pago ${payment.pagoId}`}
                                        >
                                            <FaEye />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(payment)}
                                            className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                                            aria-label={`Eliminar pago ${payment.pagoId}`}
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Paginación */}
            <div className="flex justify-between items-center mt-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full disabled:opacity-50"
                    aria-label="Página anterior"
                >
                    <FaChevronLeft className="text-gray-500 dark:text-gray-300" />
                </button>
                <span className="text-sm dark:text-gray-400">
                    Página {currentPage} de {totalPages}
                </span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full disabled:opacity-50"
                    aria-label="Página siguiente"
                >
                    <FaChevronRight className="text-gray-500 dark:text-gray-300" />
                </button>
            </div>

            {/* Modal para ver detalles de un pago */}
            {selectedPayment && <PaymentDetailsModal payment={selectedPayment} onClose={closeDetails} />}

            {/* Modal de confirmación de eliminación */}
            {paymentToDelete && (
                <DeleteConfirmationModal
                    onConfirm={confirmDelete}
                    onCancel={closeDeleteModal}
                    message={`¿Estás seguro de eliminar el pago de ${formatAmount(paymentToDelete.monto)}?`}
                />
            )}
        </div>
    );

}

export default PaymentTable;
