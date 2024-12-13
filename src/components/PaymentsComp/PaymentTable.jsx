import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaEye, FaTrashAlt } from "react-icons/fa";
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
        if (window.confirm(`¿Estás seguro de eliminar el pago de $${payment.monto?.toLocaleString() || 0}?`)) {
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
        <div className="recent-movements bg-white dark:bg-darkCard text-gray-800 dark:text-darkText shadow-md dark:shadow-dark rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200 text-center">
                Gestión de Pagos
            </h2>

            <div className="overflow-x-auto">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Pagos</h3>
                <table className="table-auto w-full text-gray-700 dark:text-gray-300 rounded-lg">
                    <thead className="bg-indigo-500 dark:bg-gray-800 text-white">
                    <tr>
                        <th className="p-3 text-center cursor-pointer" onClick={() => requestSort("fechaTransaccion")}>
                            Fecha
                        </th>
                        <th className="p-3 text-center cursor-pointer" onClick={() => requestSort("monto")}>
                            Monto
                        </th>
                        <th className="p-3 text-center">Método</th>
                        <th className="p-3 text-center">Observaciones</th>
                        <th className="p-3 text-center">Fecha de Registro</th>
                        {/* Cambiar encabezado */}
                        <th className="p-3 text-center">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginatedPayments.map((payment, index) => (
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
                                ${payment.monto?.toLocaleString() || "0"}
                            </td>
                            <td className="p-3 text-center">{payment.metodoPago || "N/A"}</td>
                            <td className="p-3 text-center">{payment.observaciones || "Sin observaciones"}</td>
                            <td className="p-3 text-center">
                                {payment.fechaRegistro
                                    ? dayjs(payment.fechaRegistro).format("DD/MM/YYYY") // Formatear la fecha si existe
                                    : "Sin registro"}
                            </td>
                            {/* Nueva columna con fecha de registro */}
                            <td className="p-3 text-center flex justify-center gap-4">
                                <button
                                    onClick={() => handleViewDetails(payment)}
                                    className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                                >
                                    <FaEye/>
                                </button>
                                <button
                                    onClick={() => handleDelete(payment)}
                                    className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                                >
                                    <FaTrashAlt/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full disabled:opacity-50"
                >
                    <FaChevronLeft className="text-gray-500 dark:text-gray-300"/>
                </button>
                <span className="text-sm dark:text-gray-400">
                    Página {currentPage} de {Math.ceil(payments.length / itemsPerPage)}
                </span>
                <button
                    disabled={currentPage === Math.ceil(payments.length / itemsPerPage)}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full disabled:opacity-50"
                >
                    <FaChevronRight className="text-gray-500 dark:text-gray-300"/>
                </button>
            </div>

            {selectedPayment && <PaymentDetailsModal payment={selectedPayment} onClose={closeDetails}/>}
        </div>
    );
};

export default PaymentTable;
