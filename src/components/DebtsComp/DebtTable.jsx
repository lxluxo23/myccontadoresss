import React, { useState } from "react";
import { FaCheckCircle, FaExclamationCircle, FaEye, FaTrashAlt } from "react-icons/fa";
import dayjs from "dayjs";

const DebtTable = ({ debts = [], honorariosContables = [] }) => {
    const [selectedDebt, setSelectedDebt] = useState(null);
    const [currentPageDebts, setCurrentPageDebts] = useState(1);
    const [currentPageHonorarios, setCurrentPageHonorarios] = useState(1);
    const itemsPerPage = 10;
    const [sortKeyDebts, setSortKeyDebts] = useState(null);
    const [sortOrderDebts, setSortOrderDebts] = useState(true); // true para ascendente, false para descendente

    const [sortKeyHonorarios, setSortKeyHonorarios] = useState(null);
    const [sortOrderHonorarios, setSortOrderHonorarios] = useState(true);

    const handleViewDetails = (item) => {
        setSelectedDebt(item);
    };

    const closeDetails = () => {
        setSelectedDebt(null);
    };

    const paginatedData = (data, currentPage) =>
        data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const obtenerNombreMes = (numeroMes) => {
        const meses = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
        ];
        return meses[numeroMes - 1] || "Mes desconocido";
    };

    const handleSort = (key, isDebtsTable = true) => {
        if (isDebtsTable) {
            if (sortKeyDebts === key) {
                setSortOrderDebts(!sortOrderDebts); // Alterna el orden
            } else {
                setSortKeyDebts(key);
                setSortOrderDebts(true); // Orden ascendente por defecto
            }
        } else {
            if (sortKeyHonorarios === key) {
                setSortOrderHonorarios(!sortOrderHonorarios);
            } else {
                setSortKeyHonorarios(key);
                setSortOrderHonorarios(true);
            }
        }
    };

    const sortData = (data, key, isAscending) => {
        if (!key) return data;
        return [...data].sort((a, b) => {
            if (a[key] < b[key]) return isAscending ? -1 : 1;
            if (a[key] > b[key]) return isAscending ? 1 : -1;
            return 0;
        });
    };

    const sortedDebts = sortData(debts, sortKeyDebts, sortOrderDebts);
    const sortedHonorarios = sortData(honorariosContables, sortKeyHonorarios, sortOrderHonorarios);

    return (
        <div className="space-y-6 bg-white rounded-xl shadow-lg p-6">
            <div className="text-xl font-bold text-gray-800">Gestión de Deudas</div>

            {/* Tabla de Deudas */}
            <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Deudas Normales</h2>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full text-gray-700 dark:text-gray-300 overflow-x-auto">
                        <thead className="bg-indigo-500 text-white">
                        <tr>
                            <th className="p-3 cursor-pointer" onClick={() => handleSort("tipoDeuda")}>
                                Tipo de Deuda
                            </th>
                            <th className="p-3 cursor-pointer" onClick={() => handleSort("montoTotal")}>
                                Monto Total
                            </th>
                            <th className="p-3 cursor-pointer" onClick={() => handleSort("montoRestante")}>
                                Monto Restante
                            </th>
                            <th className="p-3 cursor-pointer" onClick={() => handleSort("estadoDeuda")}>
                                Estado
                            </th>
                            <th className="p-3 cursor-pointer" onClick={() => handleSort("fechaInicio")}>
                                Fecha Inicio
                            </th>
                            <th className="p-3 cursor-pointer" onClick={() => handleSort("fechaVencimiento")}>
                                Fecha Vencimiento
                            </th>
                            <th className="p-3 text-center">Acciones</th>
                        </tr>
                        </thead>

                        <tbody>
                        {paginatedData(sortedDebts, currentPageDebts).map((debt, index) => (
                            <tr key={index} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
                                <td className="p-3">{debt.tipoDeuda}</td>
                                <td className="p-3">${debt.montoTotal.toLocaleString()}</td>
                                <td className="p-3">${debt.montoRestante.toLocaleString()}</td>
                                <td className="p-3">
                                        <span
                                            className={`px-2 py-1 rounded-full text-white ${
                                                debt.estadoDeuda === "Pagado"
                                                    ? "bg-green-500"
                                                    : "bg-red-500"
                                            }`}
                                        >
                                            {debt.estadoDeuda}
                                        </span>
                                </td>
                                <td className="p-3">{dayjs(debt.fechaInicio).format("DD/MM/YYYY")}</td>
                                <td className="p-3">{dayjs(debt.fechaVencimiento).format("DD/MM/YYYY")}</td>
                                <td className="p-3 text-center">
                                    <button
                                        onClick={() => handleViewDetails(debt)}
                                        className="text-indigo-500 hover:text-indigo-700"
                                    >
                                        <FaEye />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <button
                        disabled={currentPageDebts === 1}
                        onClick={() => setCurrentPageDebts((prev) => prev - 1)}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                        Anterior
                    </button>
                    <span>Página {currentPageDebts}</span>
                    <button
                        disabled={currentPageDebts === Math.ceil(debts.length / itemsPerPage)}
                        onClick={() => setCurrentPageDebts((prev) => prev + 1)}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                        Siguiente
                    </button>
                </div>
            </div>

            {selectedDebt && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-lg font-bold mb-4 text-gray-700">Detalles de la Deuda</h2>
                        <ul className="space-y-2 text-gray-600">
                            <li>
                                <strong>Tipo de Deuda:</strong> {selectedDebt.tipoDeuda || "No especificado"}
                            </li>
                            <li>
                                <strong>Monto Total:</strong> ${selectedDebt.montoTotal?.toLocaleString() || 0}
                            </li>
                            <li>
                                <strong>Monto Restante:</strong> ${selectedDebt.montoRestante?.toLocaleString() || 0}
                            </li>
                            <li>
                                <strong>Estado:</strong> {selectedDebt.estadoDeuda || "N/A"}
                            </li>
                            <li>
                                <strong>Fecha de Inicio:</strong> {dayjs(selectedDebt.fechaInicio).format("DD/MM/YYYY") || "N/A"}
                            </li>
                            <li>
                                <strong>Fecha de Vencimiento:</strong> {dayjs(selectedDebt.fechaVencimiento).format("DD/MM/YYYY") || "N/A"}
                            </li>
                            <li>
                                <strong>Fecha de Pago:</strong> {selectedDebt.fechaPago ? dayjs(selectedDebt.fechaPago).format("DD/MM/YYYY") : "Pendiente"}
                            </li>
                        </ul>
                        <div className="mt-6 flex justify-end space-x-2">
                            <button
                                onClick={closeDetails}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Tabla de Honorarios Contables */}
            <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Honorarios Contables</h2>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full text-gray-700 dark:text-gray-300 overflow-x-auto">
                        <thead className="bg-indigo-500 text-white">
                        <tr>
                            <th className="p-3 cursor-pointer" onClick={() => handleSort("montoMensual", false)}>
                                Monto Mensual
                            </th>
                            <th className="p-3 cursor-pointer" onClick={() => handleSort("montoRestante", false)}>
                                Monto Restante
                            </th>
                            <th className="p-3 cursor-pointer" onClick={() => handleSort("estado", false)}>
                                Estado
                            </th>
                            <th className="p-3 cursor-pointer" onClick={() => handleSort("mes", false)}>
                                Mes
                            </th>
                            <th className="p-3 cursor-pointer" onClick={() => handleSort("anio", false)}>
                                Año
                            </th>
                            <th className="p-3 text-center">Acciones</th>
                        </tr>
                        </thead>

                        <tbody>
                        {paginatedData(sortedHonorarios, currentPageHonorarios).map((honorario, index) =>
                            honorario.meses.map((mes, mesIndex) => (
                                <tr key={`${index}-${mesIndex}`} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <td className="p-3">${parseFloat(mes.montoMensual).toLocaleString()}</td>
                                    <td className="p-3">${(mes.montoMensual - mes.montoPagado).toLocaleString()}</td>
                                    <td className="p-3">
                                            <span
                                                className={`px-2 py-1 rounded-full text-white ${
                                                    mes.estado === "Pagado"
                                                        ? "bg-green-500"
                                                        : "bg-red-500"
                                                }`}
                                            >
                                                {mes.estado}
                                            </span>
                                    </td>
                                    <td className="p-3">{obtenerNombreMes(mes.mes)}</td>
                                    <td className="p-3">{honorario.anio}</td>
                                    <td className="p-3 text-center">
                                        <button
                                            onClick={() => handleViewDetails(mes)}
                                            className="text-indigo-500 hover:text-indigo-700"
                                        >
                                            <FaEye/>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <button
                        disabled={currentPageHonorarios === 1}
                        onClick={() => setCurrentPageHonorarios((prev) => prev - 1)}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                        Anterior
                    </button>
                    <span>Página {currentPageHonorarios}</span>
                    <button
                        disabled={currentPageHonorarios === Math.ceil(honorariosContables.length / itemsPerPage)}
                        onClick={() => setCurrentPageHonorarios((prev) => prev + 1)}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DebtTable;
