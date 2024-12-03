import React from "react";

const RecentMovements = ({ movements }) => {
    return (
        <div className="recent-movements bg-white dark:bg-darkCard text-gray-800 dark:text-darkText shadow-md dark:shadow-dark rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">Últimos Movimientos</h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full text-gray-700 dark:text-gray-300">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                        <th className="p-3 text-left">Fecha</th>
                        <th className="p-3 text-left">Tipo</th>
                        <th className="p-3 text-left">Monto</th>
                        <th className="p-3 text-left">Descripción</th>
                    </tr>
                    </thead>
                    <tbody>
                    {movements.length > 0 ? (
                        movements.map((movement, index) => (
                            <tr key={index} className="border-b dark:border-gray-600">
                                <td className="p-3">{movement.date}</td>
                                <td className="p-3">{movement.type}</td>
                                <td className="p-3 text-green-600">{`$${movement.amount}`}</td>
                                <td className="p-3">{movement.description}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="p-3 text-center" colSpan="4">Sin datos</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentMovements;
