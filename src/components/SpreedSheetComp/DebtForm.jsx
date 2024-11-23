// src/components/DebtForm.js
import React from 'react';

function DebtForm({
                      editingDebt,
                      newDebt,
                      handleDebtInputChange,
                      handleEditDebtInputChange,
                      handleAddDebt,
                      handleSaveEditedDebt,
                  }) {
    const currentDebt = editingDebt || newDebt;

    const handleChange = editingDebt ? handleEditDebtInputChange : handleDebtInputChange;

    return (
        <form
            onSubmit={editingDebt ? handleSaveEditedDebt : handleAddDebt}
            className="bg-white shadow-lg rounded-lg p-6 mb-8"
        >
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                {editingDebt ? 'Editar Deuda' : 'Agregar Nueva Deuda'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Fecha */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha</label>
                    <input
                        type="date"
                        name="date"
                        value={currentDebt.date}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    />
                </div>
                {/* Monto */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Monto</label>
                    <input
                        type="number"
                        name="amount"
                        value={currentDebt.amount}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    />
                </div>
                {/* Descripción */}
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea
                        name="description"
                        value={currentDebt.description}
                        onChange={handleChange}
                        placeholder="Descripción de la deuda"
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    />
                </div>
            </div>
            <button
                type="submit"
                className="mt-6 w-full bg-red-600 text-white py-3 rounded-md shadow-lg hover:bg-red-700 transition duration-300"
            >
                {editingDebt ? 'Guardar Cambios' : 'Agregar Deuda'}
            </button>
        </form>
    );
}

export default DebtForm;
