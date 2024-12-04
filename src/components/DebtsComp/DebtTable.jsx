import React from "react";

const DebtTable = ({ debts = [] }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full text-left text-gray-700 dark:text-gray-300">
                <thead className="bg-indigo-500 text-white">
                <tr>
                    <th className="px-4 py-2">Tipo</th>
                    <th className="px-4 py-2">Monto Total</th>
                    <th className="px-4 py-2">Monto Restante</th>
                    <th className="px-4 py-2">Estado</th>
                    <th className="px-4 py-2">Fecha Creación</th>
                    <th className="px-4 py-2">Fecha Vencimiento</th>
                    <th className="px-4 py-2">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {debts.length > 0 ? (
                    debts.map((debt, index) => (
                        <tr key={index} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
                            <td className="px-4 py-2">{debt.tipo}</td>
                            <td className="px-4 py-2">${debt.montoTotal.toLocaleString()}</td>
                            <td className="px-4 py-2">${debt.montoRestante.toLocaleString()}</td>
                            <td className="px-4 py-2">{debt.estado}</td>
                            <td className="px-4 py-2">
                                {new Date(debt.fechaCreacion).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-2">
                                {new Date(debt.fechaVencimiento).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-2">
                                <button className="text-indigo-500 hover:underline">Ver</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7" className="text-center px-4 py-2 text-gray-500">
                            No hay deudas registradas.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default DebtTable;
