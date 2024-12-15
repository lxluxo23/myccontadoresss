import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DebtTable from "../components/DebtsComp/DebtTable";
import Modal from "../components/Modal";
import AddAccountingHonorary from "../components/DebtsComp/AddAccountingHonorary";
import { useCliente } from "../components/context/ClienteContext";
import { FaPlus } from "react-icons/fa";
import ThemeToggle from "../components/ThemeToggle";
import { AddDebtForm } from "../components/DebtsComp/AddDebtForm";

const DebtsPage = () => {
    const { clienteId } = useCliente();
    const [debts, setDebts] = useState([]);
    const [honorariosContables, setHonorariosContables] = useState([]);
    const [isHonoraryModalOpen, setIsHonoraryModalOpen] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [isDebtModalOpen, setIsDebtModalOpen] = useState(false);

    useEffect(() => {
        if (!clienteId) {
            navigate("/");
            return;
        }

        const fetchDebts = async () => {
            try {
                const response = await fetch(`https://cobros.myccontadores.cl/${clienteId}/deudas`);
                if (!response.ok) {
                    throw new Error("Error al cargar deudas");
                }
                const data = await response.json();
                setDebts(data);
            } catch (error) {
                setError("Error al cargar deudas. Inténtalo más tarde.");
            }
        };

        const fetchHonorarios = async () => {
            try {
                const response = await fetch(`hhttps://cobros.myccontadores.cl/api/honorarios/cliente/${clienteId}`);
                if (!response.ok) {
                    throw new Error("Error al cargar honorarios contables");
                }
                const data = await response.json();
                setHonorariosContables(data);
            } catch (error) {
                setError("Error al cargar honorarios contables. Inténtalo más tarde.");
            }
        };

        fetchDebts();
        fetchHonorarios();
    }, [clienteId, navigate]);

    const handleAddHonorary = async (clienteId, payload) => {
        try {
            const response = await fetch(`https://cobros.myccontadores.cl/api/honorarios/${clienteId}`, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) {
                throw new Error("Error al agregar honorario contable");
            }
            await fetchHonorarios();
            setIsHonoraryModalOpen(false);
        } catch (error) {
            setError("No se pudo agregar el honorario contable. Inténtalo de nuevo.");
        }
    };

    const fetchHonorarios = async () => {
        try {
            const response = await fetch(`https://cobros.myccontadores.cl/api/honorarios/cliente/${clienteId}`);
            if (!response.ok) {
                throw new Error("Error al cargar honorarios contables");
            }
            const data = await response.json();
            setHonorariosContables(data);
        } catch (error) {
            console.error("Error al recargar honorarios contables:", error);
        }
    };

    const handleAddDebt = async (debtData) => {
        try {
            const response = await fetch(`https://cobros.myccontadores.cl/api/deudas`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...debtData,
                    cliente: { clienteId: clienteId },
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error del servidor:", errorData);
                throw new Error(errorData.error || "Error al agregar la deuda");
            }

            const newDebt = await response.json();
            setDebts((prev) => [...prev, newDebt]);
            setIsDebtModalOpen(false);
        } catch (error) {
            setError(error.message || "No se pudo agregar la deuda. Inténtalo de nuevo.");
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 p-6">
                <DebtTable debts={debts} honorariosContables={honorariosContables} />

                {/* Botón Añadir Deuda */}
                <div className="flex justify-end space-x-4 mt-4">
                    <button
                        onClick={() => setIsDebtModalOpen(true)}
                        className="px-4 py-2 bg-indigo-500 text-white dark:bg-indigo-600 dark:text-gray-200 rounded hover:bg-indigo-600 dark:hover:bg-indigo-700 inline-flex items-center"
                    >
                        <FaPlus className="mr-2" />
                        Añadir Deuda
                    </button>
                </div>

                {/* Botón Agregar Honorario Contable */}
                <div className="flex justify-end space-x-4 mt-4">
                    <button
                        onClick={() => setIsHonoraryModalOpen(true)}
                        className="px-4 py-2 bg-indigo-500 text-white dark:bg-indigo-600 dark:text-gray-200 rounded hover:bg-indigo-600 dark:hover:bg-indigo-700 inline-flex items-center"
                    >
                        <FaPlus className="mr-2" />
                        Agregar Honorario Contable
                    </button>
                </div>

                <Modal isOpen={isHonoraryModalOpen} onClose={() => setIsHonoraryModalOpen(false)}>
                    <AddAccountingHonorary
                        onSubmit={handleAddHonorary}
                        clienteId={clienteId}
                        onClose={() => setIsHonoraryModalOpen(false)}
                    />
                </Modal>

                <Modal isOpen={isDebtModalOpen} onClose={() => setIsDebtModalOpen(false)}>
                    <AddDebtForm
                        onSubmit={handleAddDebt}
                        onClose={() => setIsDebtModalOpen(false)}
                    />
                </Modal>

                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
            <ThemeToggle />
        </div>
    );
};

export default DebtsPage;
