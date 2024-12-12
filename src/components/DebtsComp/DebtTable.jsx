import React, { useState } from "react";
import { FaCheckCircle, FaExclamationCircle, FaEye, FaTrashAlt } from "react-icons/fa";
import dayjs from "dayjs";


const DebtTable = ({ debts = [], honorariosContables = [] }) => {
    const [selectedDebt, setSelectedDebt] = useState(null);

    const handleViewDetails = (item) => {
        setSelectedDebt(item);
    };

    const closeDetails = () => {
        setSelectedDebt(null);
    };

    // Función para convertir string "200.000" a número 200000
    const parseMonto = (montoStr) => {
        if (!montoStr) return 0;
        // Quitar los puntos para transformar a número
        const montoSinPuntos = montoStr.replace(/\./g, "");
        const valorNumerico = parseFloat(montoSinPuntos) || 0;
        return valorNumerico;
    };

    const obtenerNombreMes = (numeroMes) => {
        const meses = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        return meses[numeroMes - 1] || "Mes desconocido"; // Restar 1 porque el array comienza en 0
    };

    console.log("Honorarios Contables:", honorariosContables);

    return (
        <div className="space-y-6 bg-white rounded-xl shadow-lg p-6">
            <div className="text-xl font-bold text-gray-800">Gestión de Deudas</div>

            {/* Tabla de Deudas Normales */}
            <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Deudas Normales</h2>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full text-left text-gray-700 dark:text-gray-300 border-collapse">
                        <thead className="bg-indigo-500 text-white rounded-lg">
                        <tr>
                            <th className="px-6 py-4 border-b border-gray-300">Tipo de Deuda</th>
                            <th className="px-6 py-4 border-b border-gray-300">Monto Total</th>
                            <th className="px-6 py-4 border-b border-gray-300">Monto Restante</th>
                            <th className="px-6 py-4 border-b border-gray-300">Estado</th>
                            <th className="px-6 py-4 border-b border-gray-300">Fecha Inicio</th>
                            <th className="px-6 py-4 border-b border-gray-300">Fecha Vencimiento</th>
                            <th className="px-6 py-4 border-b border-gray-300 text-center">Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {debts.length > 0 ? (
                            debts.map((debt, index) => (
                                <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <td className="px-6 py-4 flex items-center gap-2 text-lg">
                                        {debt.estadoDeuda === "Pagado" ? (
                                            <FaCheckCircle className="text-green-500" />
                                        ) : (
                                            <FaExclamationCircle className="text-red-500" />
                                        )}
                                        {debt.tipoDeuda}
                                    </td>
                                    <td className="px-6 py-4 text-lg">${debt.montoTotal.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-lg">${debt.montoRestante.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-lg text-center">
                                            <span
                                                className={`px-4 py-2 rounded-full text-white text-sm font-bold ${
                                                    debt.estadoDeuda === "Pagado" ? "bg-green-500" : "bg-red-500"
                                                }`}
                                            >
                                                {debt.estadoDeuda.replace("_", " ")}
                                            </span>
                                    </td>
                                    <td className="px-6 py-4 text-lg">
                                        {dayjs(debt.fechaInicio).format("DD/MM/YYYY")}
                                    </td>
                                    <td className="px-6 py-4 text-lg">
                                        {dayjs(debt.fechaVencimiento).format("DD/MM/YYYY")}
                                    </td>
                                    <td className="px-6 py-4 text-center flex justify-center gap-4">
                                        <button
                                            onClick={() => handleViewDetails(debt)}
                                            className="text-indigo-500 hover:text-indigo-700 text-2xl"
                                        >
                                            <FaEye />
                                        </button>
                                        <button className="text-red-500 hover:text-red-700 text-2xl">
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center px-4 py-6 text-gray-500 text-lg">
                                    No hay deudas normales registradas.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Tabla de Honorarios Contables */}
            <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Honorarios Contables</h2>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full text-left text-gray-700 dark:text-gray-300 border-collapse">
                        <thead className="bg-indigo-500 text-white rounded-lg">
                        <tr>
                            <th className="px-6 py-4 border-b border-gray-300">Monto Mensual</th>
                            <th className="px-6 py-4 border-b border-gray-300">Monto Restante</th>
                            <th className="px-6 py-4 border-b border-gray-300">Estado</th>
                            <th className="px-6 py-4 border-b border-gray-300">Mes</th>
                            <th className="px-6 py-4 border-b border-gray-300">Año</th>
                            <th className="px-6 py-4 border-b border-gray-300 text-center">Acciones</th>
                        </tr>
                        </thead>

                        <tbody>
                        {honorariosContables.length > 0 ? (
                            honorariosContables.map((honorario, index) =>
                                    honorario.meses.map((mes, mesIndex) => {
                                        const montoMensualNum = parseFloat(mes.montoMensual);
                                        const montoPagadoNum = parseFloat(mes.montoPagado);
                                        const montoRestante = montoMensualNum - montoPagadoNum;

                                        return (
                                            <tr
                                                key={`${index}-${mesIndex}`}
                                                className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                <td className="px-6 py-4 text-lg">${montoMensualNum.toLocaleString()}</td>
                                                <td className="px-6 py-4 text-lg">${montoRestante.toLocaleString()}</td>
                                                <td className="px-6 py-4 text-lg text-center">
                            <span
                                className={`px-4 py-2 rounded-full text-white text-sm font-bold ${
                                    mes.estado === "Pagado" ? "bg-green-500" : "bg-red-500"
                                }`}
                            >
                                {mes.estado}
                            </span>
                                                </td>
                                                <td className="px-6 py-4 text-lg">{obtenerNombreMes(mes.mes)}</td>
                                                <td className="px-6 py-4 text-lg">{honorario.anio}</td>
                                                <td className="px-6 py-4 text-center flex justify-center gap-4">
                                                    <button
                                                        onClick={() => handleViewDetails(mes)}
                                                        className="text-indigo-500 hover:text-indigo-700 text-2xl"
                                                    >
                                                        <FaEye/>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                            )
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center px-4 py-6 text-gray-500 text-lg">
                                    No hay honorarios contables registrados.
                                </td>
                            </tr>
                        )}
                        </tbody>

                    </table>
                </div>
            </div>

            {/* Modal de detalles */}
            {selectedDebt && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-2xl relative">
                        <button
                            onClick={closeDetails}
                            className="absolute top-2 right-2 text-gray-500 dark:text-gray-300 hover:text-red-500"
                        >
                            ✕
                        </button>
                        <h2 className="text-2xl font-bold text-indigo-600 mb-4">Detalles</h2>
                        <div className="space-y-2 text-lg">
                            {selectedDebt.tipoDeuda ? (
                                <>
                                    <p><strong>Tipo de Deuda:</strong> {selectedDebt.tipoDeuda}</p>
                                    <p><strong>Monto Total:</strong> ${selectedDebt.montoTotal?.toLocaleString()}</p>
                                    <p><strong>Monto Restante:</strong> ${selectedDebt.montoRestante?.toLocaleString()}
                                    </p>
                                    <p><strong>Estado:</strong> {selectedDebt.estadoDeuda}</p>
                                    <p><strong>Fecha
                                        Inicio:</strong> {dayjs(selectedDebt.fechaInicio).format("DD/MM/YYYY")}</p>
                                    <p><strong>Fecha
                                        Vencimiento:</strong> {dayjs(selectedDebt.fechaVencimiento).format("DD/MM/YYYY")}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p><strong>Mes:</strong> {selectedDebt.mes}</p>
                                    <p><strong>Monto Mensual:</strong> {selectedDebt.montoMensual}</p>
                                    <p><strong>Monto Pagado:</strong> {selectedDebt.montoPagado}</p>
                                    <p><strong>Estado:</strong> {selectedDebt.estado}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DebtTable;
