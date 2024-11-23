// src/components/PaymentsTable.js
import React from 'react';

function PaymentsTable({ clientData }) {
    return (
        <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">Pagos</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-lg rounded-lg">
                    <thead>
                    <tr className="bg-indigo-500 text-white">
                        <th className="py-3 px-6 text-left font-medium">Fecha</th>
                        <th className="py-3 px-6 text-left font-medium">Mes</th>
                        <th className="py-3 px-6 text-left font-medium">Honorarios</th>
                        <th className="py-3 px-6 text-left font-medium">IVA</th>
                        <th className="py-3 px-6 text-left font-medium">Imposiciones</th>
                        <th className="py-3 px-6 text-left font-medium">Multas</th>
                        <th className="py-3 px-6 text-left font-medium">Total Pago Cliente</th>
                        <th className="py-3 px-6 text-left font-medium">Forma de Pago</th>
                        <th className="py-3 px-6 text-left font-medium">Talonario</th>
                        <th className="py-3 px-6 text-left font-medium">Observaciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {clientData.map((data, index) => (
                        <tr key={index} className="border-b hover:bg-gray-100">
                            <td className="py-4 px-6">{data.date}</td>
                            <td className="py-4 px-6">{data.month}</td>
                            <td className="py-4 px-6">${data.honorarios.toLocaleString()}</td>
                            <td className="py-4 px-6">${data.iva.toLocaleString()}</td>
                            <td className="py-4 px-6">${data.imposiciones.toLocaleString()}</td>
                            <td className="py-4 px-6">${data.multas.toLocaleString()}</td>
                            <td className="py-4 px-6">${data.totalPagoCliente.toLocaleString()}</td>
                            <td className="py-4 px-6">{data.formaPago}</td>
                            <td className="py-4 px-6">{data.talonario}</td>
                            <td className="py-4 px-6">{data.observaciones}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PaymentsTable;
