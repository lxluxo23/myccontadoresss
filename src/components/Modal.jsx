import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 dark:text-gray-300 hover:text-red-500"
                >
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
