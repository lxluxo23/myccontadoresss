import React from "react";

const RecentMovements = ({ movements }) => {
    return (
        <div
            className="recent-movements p-6 flex flex-col justify-start">
            <h2 className="text-lg font-bold mb-4">Últimos Movimientos</h2>
            <table className="table-auto w-full">
                <thead>
                <tr>
                    <th className="border-b p-2">Fecha</th>
                    <th className="border-b p-2">Tipo</th>
                    <th className="border-b p-2">Monto</th>
                    <th className="border-b p-2">Descripción</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="border-b p-2">Sin datos</td>
                    <td className="border-b p-2">Sin datos</td>
                    <td className="border-b p-2">$0</td>
                    <td className="border-b p-2">Sin datos</td>
                </tr>
                </tbody>
            </table>
        </div>

    );
};

export default RecentMovements;
