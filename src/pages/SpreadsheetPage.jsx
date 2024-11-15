import React, { useState } from 'react';

function SpreadsheetPage() {
    // Datos de ejemplo para el cliente
    const [clientData, setClientData] = useState([
        {
            date: '2024-01-15',
            month: 'Enero',
            honorarios: 500000,
            iva: 95000,
            imposiciones: 20000,
            multas: 0,
            totalPagoCliente: 615000,
            formaPago: 'Transferencia',
            talonario: 'T-001',
            observaciones: 'Pago mensual, sin multas',
            honorariosPagados: false,
            ivaPagado: false,
            imposicionesPagadas: false,
            multasPagadas: false,
        },
        {
            date: '2024-02-18',
            month: 'Febrero',
            honorarios: 500000,
            iva: 95000,
            imposiciones: 20000,
            multas: 0,
            totalPagoCliente: 615000,
            formaPago: 'Efectivo',
            talonario: 'T-002',
            observaciones: 'Pago mensual, sin multas',
            honorariosPagados: false,
            ivaPagado: false,
            imposicionesPagadas: false,
            multasPagadas: false,
        },
    ]);

    // Formulario de ingreso de nuevos pagos
    const [newPayment, setNewPayment] = useState({
        date: '',
        month: '',
        honorarios: 0,
        iva: 0,
        imposiciones: 0,
        multas: 0,
        totalPagoCliente: 0,
        formaPago: '',
        talonario: '',
        observaciones: '',
        honorariosPagados: false,
        ivaPagado: false,
        imposicionesPagadas: false,
        multasPagadas: false,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPayment(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddPayment = (e) => {
        e.preventDefault();
        if (!newPayment.date || !newPayment.month || !newPayment.formaPago) {
            alert("Por favor, complete todos los campos obligatorios.");
            return;
        }
        setClientData(prevData => [...prevData, newPayment]);
        setNewPayment({
            date: '',
            month: '',
            honorarios: 0,
            iva: 0,
            imposiciones: 0,
            multas: 0,
            totalPagoCliente: 0,
            formaPago: '',
            talonario: '',
            observaciones: '',
            honorariosPagados: false,
            ivaPagado: false,
            imposicionesPagadas: false,
            multasPagadas: false,
        });
    };

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-xl font-bold mb-4">Registro de Pagos de Cliente</h1>

            {/* Formulario para agregar nuevos pagos */}
            <form onSubmit={handleAddPayment} className="mb-5 border p-4 rounded-lg">
                <h2 className="font-semibold mb-3">Agregar Nuevo Pago</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium">Fecha</label>
                        <input
                            type="date"
                            name="date"
                            value={newPayment.date}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Mes</label>
                        <input
                            type="text"
                            name="month"
                            value={newPayment.month}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Ej. Enero"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Honorarios</label>
                        <input
                            type="number"
                            name="honorarios"
                            value={newPayment.honorarios}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">IVA</label>
                        <input
                            type="number"
                            name="iva"
                            value={newPayment.iva}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Imposiciones</label>
                        <input
                            type="number"
                            name="imposiciones"
                            value={newPayment.imposiciones}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Multas</label>
                        <input
                            type="number"
                            name="multas"
                            value={newPayment.multas}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Forma de Pago</label>
                        <input
                            type="text"
                            name="formaPago"
                            value={newPayment.formaPago}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Ej. Transferencia"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Talonario</label>
                        <input
                            type="text"
                            name="talonario"
                            value={newPayment.talonario}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Ej. T-003"
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium">Observaciones</label>
                        <textarea
                            name="observaciones"
                            value={newPayment.observaciones}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Observaciones adicionales"
                        />
                    </div>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Agregar Pago</button>
            </form>

            {/* Tabla de registros de pagos */}
            <table className="min-w-full table-auto border-collapse">
                <thead>
                <tr className="bg-gray-200 text-gray-700">
                    <th className="px-4 py-2 text-left">Fecha</th>
                    <th className="px-4 py-2 text-left">Mes</th>
                    <th className="px-4 py-2 text-left">Honorarios</th>
                    <th className="px-4 py-2 text-left">IVA</th>
                    <th className="px-4 py-2 text-left">Imposiciones</th>
                    <th className="px-4 py-2 text-left">Multas</th>
                    <th className="px-4 py-2 text-left">Total Pago Cliente</th>
                    <th className="px-4 py-2 text-left">Forma de Pago</th>
                    <th className="px-4 py-2 text-left">Talonario</th>
                    <th className="px-4 py-2 text-left">Observaciones</th>
                </tr>
                </thead>
                <tbody>
                {clientData.map((data, index) => (
                    <tr key={index} className="border-b hover:bg-gray-100">
                        <td className="px-4 py-2">{data.date}</td>
                        <td className="px-4 py-2">{data.month}</td>
                        <td className="px-4 py-2">${data.honorarios.toLocaleString()}</td>
                        <td className="px-4 py-2">${data.iva.toLocaleString()}</td>
                        <td className="px-4 py-2">${data.imposiciones.toLocaleString()}</td>
                        <td className="px-4 py-2">${data.multas.toLocaleString()}</td>
                        <td className="px-4 py-2">${data.totalPagoCliente.toLocaleString()}</td>
                        <td className="px-4 py-2">{data.formaPago}</td>
                        <td className="px-4 py-2">{data.talonario}</td>
                        <td className="px-4 py-2">{data.observaciones}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default SpreadsheetPage;
