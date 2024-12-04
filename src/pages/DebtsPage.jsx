import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import DebtTable from "../components/DebtsComp/DebtTable";
import AddDebtForm from "../components/DebtsComp/AddDebtForm";
import Modal from "../components/Modal";
import { FaPlus } from "react-icons/fa";
import {useParams} from "react-router-dom";

const DebtsPage = () => {
    const { clientId } = useParams(); // Obtener el ID del cliente desde la URL
    const [debts, setDebts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchDebts = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/clientes/${clientId}/deudas`);
                const data = await response.json();
                setDebts(data);
            } catch (error) {
                console.error("Error al cargar deudas:", error);
            }
        };

        fetchDebts();
    }, [clientId]);

    const handleAddDebt = async (newDebt) => {
        try {
            const response = await fetch("http://localhost:8080/api/deudas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newDebt),
            });
            if (!response.ok) {
                throw new Error("Error al agregar la deuda");
            }
            const addedDebt = await response.json();
            setDebts([...debts, addedDebt]);
        } catch (error) {
            console.error("Error al agregar deuda:", error);
        } finally {
            setIsModalOpen(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 p-6 space-y-6 relative">
                <h1 className="text-3xl font-bold">Gestión de Deudas</h1>
                <DebtTable debts={debts} />
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="fixed bottom-6 right-6 flex items-center px-6 py-3 bg-indigo-500 text-white rounded-full shadow-lg hover:bg-indigo-600"
                >
                    <FaPlus />
                    <span>Agregar Deuda</span>
                </button>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <AddDebtForm onSubmit={handleAddDebt} onClose={() => setIsModalOpen(false)} />
                </Modal>
            </div>
        </div>
    );
};

export default DebtsPage;
