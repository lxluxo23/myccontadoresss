// src/components/DebtsTable.js
import React from 'react';

function DebtsTable({ debtData, handleEditDebt, handleDeleteDebt }) {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-red-600">Deudas</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-lg rounded-lg">
                    <thead>
                    <tr className="bg-red-500 text-white">
                        <th className="py-3 px-6 text-left font-medium">Fecha</th>
                        <th className="py-3 px-6 text-left font-medium">Mes</th>
                        <th className="py-3 px-6 text-left font-medium">Monto</th>
                        <th className="py-3 px-6 text-left font-medium">Descripción</th>
                        <th className="py-3 px-6 text-left font-medium">Estado</th>
                        <th className="py-3 px-6 text-left font-medium">Opciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {debtData.map((debt, index) => (
                        <tr key={index} className="border-b hover:bg-gray-100">
                            <td className="py-4 px-6">{debt.date}</td>
                            <td className="py-4 px-6">{debt.month}</td>
                            <td className="py-4 px-6">${debt.amount.toLocaleString()}</td>
                            <td className="py-4 px-6">{debt.description}</td>
                            <td className="py-4 px-6">{debt.status}</td>
                            <td className="py-4 px-6">
                                <button
                                    onClick={() => handleEditDebt(debt)}
                                    className="text-blue-600 hover:underline mr-4"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDeleteDebt(debt.id)}
                                    className="text-red-600 hover:underline"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DebtsTable;
