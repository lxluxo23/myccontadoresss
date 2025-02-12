// ConfirmationModal.jsx
import React from "react";
import Modal from "./Modal";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    Confirmar Acción
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{message}</p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-700 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;
