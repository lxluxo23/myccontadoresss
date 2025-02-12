// DeleteConfirmationModal.jsx
import React from "react";

const DeleteConfirmationModal = ({ onConfirm, onCancel, message }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-80">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Confirmar Eliminación</h3>
                <p className="mb-6 text-gray-700 dark:text-gray-300">{message}</p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 dark:bg-red-700 text-white rounded"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
