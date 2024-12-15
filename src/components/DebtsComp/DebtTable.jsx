﻿import React, { useState } from "react";
import { FaCheckCircle, FaChevronLeft, FaChevronRight, FaExclamationCircle, FaEye, FaTrashAlt } from "react-icons/fa";
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
        <div className="space-y-6 bg-white dark:bg-darkCard rounded-xl shadow-md dark:shadow-dark p-6">
            <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200 text-center">
                Gestión de Deudas
            </h2>

            {/* Tabla de Deudas Normales */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Deudas Normales</h3>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full text-gray-700 dark:text-gray-300 rounded-lg">
                        <thead className="bg-indigo-500 dark:bg-gray-800 text-white">
                        <tr>
                            <th className="p-3 text-center">Tipo de Deuda</th>
                            <th className="p-3 text-center">Monto Total</th>
                            <th className="p-3 text-center">Monto Restante</th>
                            <th className="p-3 text-center">Estado</th>
                            <th className="p-3 text-center">Fecha Inicio</th>
                            <th className="p-3 text-center">Fecha Vencimiento</th>
                            <th className="p-3 text-center">Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {paginatedData(sortedDebts, currentPageDebts).map((debt, index) => (
                            <tr
                                key={index}
                                className={`border-b dark:border-gray-600 ${
                                    index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : ""
                                } hover:bg-indigo-100 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out`}
                            >
                                <td className="p-3 text-center">{debt.tipoDeuda || "Desconocido"}</td>
                                <td className="p-3 text-center">
                                    {debt.montoTotal ? `$${Number(debt.montoTotal).toLocaleString("es-CL")}` : "N/A"}
                                </td>
                                <td className="p-3 text-center">
                                    {debt.montoRestante ? `$${Number(debt.montoRestante).toLocaleString("es-CL")}` : "N/A"}
                                </td>
                                <td className="p-3 text-center">
                                        <span
                                            className={`px-2 py-1 rounded-full text-white ${
                                                debt.estadoDeuda === "Pagado" ? "bg-green-500" : "bg-red-500"
                                            }`}
                                        >
                                            {debt.estadoDeuda || "Desconocido"}
                                        </span>
                                </td>
                                <td className="p-3 text-center">
                                    {debt.fechaInicio ? dayjs(debt.fechaInicio).format("DD/MM/YYYY") : "Sin fecha"}
                                </td>
                                <td className="p-3 text-center">
                                    {debt.fechaVencimiento ? dayjs(debt.fechaVencimiento).format("DD/MM/YYYY") : "Sin fecha"}
                                </td>
                                <td className="p-3 text-center">
                                    <button
                                        onClick={() => handleViewDetails(debt)}
                                        className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
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
                        className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full disabled:opacity-50"
                    >
                        <FaChevronLeft className="text-gray-500 dark:text-gray-300" />
                    </button>
                    <span className="text-sm dark:text-gray-400">
                        Página {currentPageDebts} de {Math.ceil(debts.length / itemsPerPage)}
                    </span>
                    <button
                        disabled={currentPageDebts === Math.ceil(debts.length / itemsPerPage)}
                        onClick={() => setCurrentPageDebts((prev) => prev + 1)}
                        className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full disabled:opacity-50"
                    >
                        <FaChevronRight className="text-gray-500 dark:text-gray-300" />
                    </button>
                </div>
            </div>

            {/* Tabla de Honorarios Contables */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Honorarios Contables</h3>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full text-gray-700 dark:text-gray-300 rounded-lg">
                        <thead className="bg-indigo-500 dark:bg-gray-800 text-white">
                        <tr>
                            <th className="p-3 text-center">Monto Mensual</th>
                            <th className="p-3 text-center">Monto Restante</th>
                            <th className="p-3 text-center">Estado</th>
                            <th className="p-3 text-center">Mes</th>
                            <th className="p-3 text-center">Año</th>
                            <th className="p-3 text-center">Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {paginatedData(sortedHonorarios, currentPageHonorarios).map((honorario, index) =>
                            honorario.meses.map((mes, mesIndex) => (
                                <tr
                                    key={`${index}-${mesIndex}`}
                                    className={`border-b dark:border-gray-600 ${
                                        mesIndex % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : ""
                                    } hover:bg-indigo-100 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out`}
                                >
                                    <td className="p-3 text-center">
                                        ${mes.montoMensual.toLocaleString("es-CL")}
                                    </td>
                                    <td className="p-3 text-center">
                                        ${Number(mes.montoMensual - mes.montoPagado).toLocaleString("es-CL")}
                                    </td>
                                    <td className="p-3 text-center">
                                            <span
                                                className={`px-2 py-1 rounded-full text-white ${
                                                    mes.estado === "Pagado" ? "bg-green-500" : "bg-red-500"
                                                }`}
                                            >
                                                {mes.estado}
                                            </span>
                                    </td>
                                    <td className="p-3 text-center">{obtenerNombreMes(mes.mes)}</td>
                                    <td className="p-3 text-center">{honorario.anio}</td>
                                    <td className="p-3 text-center">
                                        <button
                                            onClick={() => handleViewDetails(mes)}
                                            className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                                        >
                                            <FaEye />
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
                        className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full disabled:opacity-50"
                    >
                        <FaChevronLeft className="text-gray-500 dark:text-gray-300" />
                    </button>
                    <span className="text-sm dark:text-gray-400">
                        Página {currentPageHonorarios} de {Math.ceil(honorariosContables.length / itemsPerPage)}
                    </span>
                    <button
                        disabled={currentPageHonorarios === Math.ceil(honorariosContables.length / itemsPerPage)}
                        onClick={() => setCurrentPageHonorarios((prev) => prev + 1)}
                        className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full disabled:opacity-50"
                    >
                        <FaChevronRight className="text-gray-500 dark:text-gray-300" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DebtTable;