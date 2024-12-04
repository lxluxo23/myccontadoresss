import React from "react";

const TransactionTable = ({ transactions }) => {
    return (
        <table className="table-auto w-full text-gray-700 dark:text-gray-300">
            <thead className="bg-indigo-500 dark:bg-gray-800 text-white">
            <tr>
                <th className="p-3 text-left">Fecha</th>
                <th className="p-3 text-left">Tipo</th>
                <th className="p-3 text-left">Descripción</th>
                <th className="p-3 text-right">Monto</th>
            </tr>
            </thead>
            <tbody>
            {transactions.map((transaction, index) => (
                <tr
                    key={index}
                    className="border-b hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <td className="p-3">{transaction.fecha}</td>
                    <td className="p-3">{transaction.tipo}</td>
                    <td className="p-3">{transaction.descripcion}</td>
                    <td
                        className={`p-3 text-right ${
                            transaction.monto > 0 ? "text-green-500" : "text-red-500"
                        }`}
                    >
                        ${transaction.monto.toLocaleString()}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default TransactionTable;
