import React from "react";

const PaymentTable = ({ payments }) => {
    return (
        <div>
            {payments.length > 0 ? (
                <table className="table-auto w-full text-gray-700 dark:text-gray-300">
                    <thead className="bg-indigo-500 dark:bg-gray-800 text-white">
                    <tr>
                        <th className="p-3">Fecha</th>
                        <th className="p-3">Monto</th>
                        <th className="p-3">Método</th>
                        <th className="p-3">Observaciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {payments.map((payment, index) => (
                        <tr key={index} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
                            <td className="p-3">{new Date(payment.fechaPago).toLocaleDateString()}</td>
                            <td className="p-3">${payment.monto.toLocaleString()}</td>
                            <td className="p-3">{payment.metodoPago}</td>
                            <td className="p-3">{payment.observaciones}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center text-gray-500 mt-4">No hay pagos registrados.</p>
            )}
        </div>
    );
};

export default PaymentTable;
