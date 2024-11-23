// src/components/PaymentForm.js
import React from 'react';

function PaymentForm({ newPayment, handleInputChange, handleAddPayment }) {
    return (
        <form onSubmit={handleAddPayment} className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Agregar Nuevo Pago</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Fecha */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha</label>
                    <input
                        type="date"
                        name="date"
                        value={newPayment.date}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                {/* Honorarios */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Honorarios</label>
                    <input
                        type="number"
                        name="honorarios"
                        value={newPayment.honorarios}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                {/* IVA */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">IVA</label>
                    <input
                        type="number"
                        name="iva"
                        value={newPayment.iva}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                {/* Imposiciones */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Imposiciones</label>
                    <input
                        type="number"
                        name="imposiciones"
                        value={newPayment.imposiciones}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                {/* Multas */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Multas</label>
                    <input
                        type="number"
                        name="multas"
                        value={newPayment.multas}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                {/* Forma de Pago */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Forma de Pago</label>
                    <input
                        type="text"
                        name="formaPago"
                        value={newPayment.formaPago}
                        onChange={handleInputChange}
                        placeholder="Ej. Transferencia"
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                {/* Talonario */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Talonario</label>
                    <input
                        type="text"
                        name="talonario"
                        value={newPayment.talonario}
                        onChange={handleInputChange}
                        placeholder="Ej. T-003"
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                {/* Observaciones */}
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Observaciones</label>
                    <textarea
                        name="observaciones"
                        value={newPayment.observaciones}
                        onChange={handleInputChange}
                        placeholder="Observaciones adicionales"
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
            </div>
            <button
                type="submit"
                className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-md shadow-lg hover:bg-indigo-700 transition duration-300"
            >
                Agregar Pago
            </button>
        </form>
    );
}

export default PaymentForm;
