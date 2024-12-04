import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import DebtTable from "../components/DebtsComp/DebtTable";
import AddDebtForm from "../components/DebtsComp/AddDebtForm";
import Modal from "../components/Modal";
import FiltersButton from "../components/DebtsAndPaymentsComp/Filters";
import { FaPlus } from "react-icons/fa";

const DebtsPage = () => {
    const [debts, setDebts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddDebt = (newDebt) => {
        setDebts([...debts, { ...newDebt, estado: "Pendiente" }]);
        setIsModalOpen(false);
    };

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 p-6 space-y-6 relative">
                {/* Encabezado */}
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                        Gestión de Deudas
                    </h1>
                    {/* Botón Flotante para Filtros */}
                    <FiltersButton />
                </div>

                {/* Tabla de Deudas */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md">
                    {debts.length > 0 ? (
                        <DebtTable debts={debts} />
                    ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400">
                            No hay deudas registradas.
                        </p>
                    )}
                </div>

                {/* Botón Flotante para Agregar Deuda */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="fixed bottom-6 right-6 flex items-center px-6 py-3 bg-indigo-500 text-white rounded-full shadow-lg hover:bg-indigo-600 transition space-x-2"
                >
                    <FaPlus />
                    <span>Agregar Deuda</span>
                </button>

                {/* Modal para Agregar Deuda */}
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <AddDebtForm onSubmit={handleAddDebt} onClose={() => setIsModalOpen(false)} />
                </Modal>
            </div>
        </div>
    );
};

export default DebtsPage;
