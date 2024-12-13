import React, { useState } from "react";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import dayjs from "dayjs";
import PaymentDetailsModal from "./PaymentsDetailsModal";

const PaymentTable = ({ payments }) => {
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState(null);
    const itemsPerPage = 10;

    const handleViewDetails = (payment) => {
        setSelectedPayment(payment);
    };

    const closeDetails = () => {
        setSelectedPayment(null);
    };

    const handleDelete = (payment) => {
        if (window.confirm(`¿Estás seguro de eliminar el pago de $${payment.monto.toLocaleString()}?`)) {
            console.log("Pago eliminado: ", payment);
            // Aquí iría la lógica para eliminar el pago del backend
        }
    };

    const sortedPayments = [...payments].sort((a, b) => {
        if (sortConfig) {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === "ascending" ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === "ascending" ? 1 : -1;
            }
        }
        return 0;
    });

    const paginatedPayments = sortedPayments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const requestSort = (key) => {
        let direction = "ascending";
        if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

    return (
        <div>
            <table className="table-auto w-full text-gray-700 dark:text-gray-300 overflow-x-auto">
                <thead className="bg-indigo-500 text-white">
                <tr>
                    <th className="p-3 cursor-pointer" onClick={() => requestSort("fechaTransaccion")}>Fecha</th>
                    <th className="p-3 cursor-pointer" onClick={() => requestSort("monto")}>Monto</th>
                    <th className="p-3">Método</th>
                    <th className="p-3">Observaciones</th>
                    <th className="p-3 text-center">Estado</th>
                    <th className="p-3 text-center">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {paginatedPayments.map((payment) => (
                    <tr
                        key={payment.pagoId}
                        className="border-b hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <td className="p-3">{dayjs(payment.fechaTransaccion).format("DD/MM/YYYY")}</td>
                        <td className="p-3">${payment.monto.toLocaleString()}</td>
                        <td className="p-3">{payment.metodoPago || "N/A"}</td>
                        <td className="p-3">{payment.observaciones || "Sin observaciones"}</td>
                        <td className="p-3 text-center">
                                <span
                                    className={`px-2 py-1 rounded-full text-white text-sm ${
                                        payment.estado === "Completado"
                                            ? "bg-green-500"
                                            : payment.estado === "Parcial"
                                                ? "bg-yellow-500"
                                                : "bg-red-500"
                                    }`}
                                >
                                    {payment.estado || "Pendiente"}
                                </span>
                        </td>
                        <td className="p-3 text-center flex justify-center gap-4">
                            <button
                                onClick={() => handleViewDetails(payment)}
                                className="text-indigo-500 hover:text-indigo-700 text-2xl"
                            >
                                <FaEye />
                            </button>
                            <button
                                onClick={() => handleDelete(payment)}
                                className="text-red-500 hover:text-red-700 text-2xl"
                            >
                                <FaTrashAlt />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="flex justify-between items-center mt-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    Anterior
                </button>
                <span>Página {currentPage}</span>
                <button
                    disabled={currentPage === Math.ceil(payments.length / itemsPerPage)}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    Siguiente
                </button>
            </div>

            {selectedPayment && (
                <PaymentDetailsModal payment={selectedPayment} onClose={closeDetails} />
            )}
        </div>
    );
};

export default PaymentTable;
