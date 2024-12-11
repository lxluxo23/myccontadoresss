import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DebtTable from "../components/DebtsComp/DebtTable";
import Modal from "../components/Modal";
import AddAccountingHonorary from "../components/DebtsComp/AddAccountingHonorary";
import { FaPlus } from "react-icons/fa";
import { useCliente } from "../components/context/ClienteContext";

const DebtsPage = () => {
    const { clienteId, clienteData } = useCliente();
    const [debts, setDebts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHonoraryModalOpen, setIsHonoraryModalOpen] = useState(false);
    const [lastHonoraryDate, setLastHonoraryDate] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!clienteId) {
            navigate("/clientes");
            return;
        }

        const fetchDebts = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/clientes/${clienteId}/deudas`);
                if (!response.ok) {
                    throw new Error("Error al cargar deudas");
                }
                const data = await response.json();
                setDebts(data);

                const lastHonorary = data
                    .filter((deuda) => deuda.tipo === "Honorario Contable")
                    .sort((a, b) => new Date(b.fechaInicio) - new Date(a.fechaInicio))[0];

                setLastHonoraryDate(lastHonorary?.fechaInicio || null);
            } catch (error) {
                console.error("Error al cargar deudas:", error);
            }
        };

        fetchDebts();
    }, [clienteId, navigate]);

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

            if (newDebt.tipo === "Honorario Contable") {
                setLastHonoraryDate(newDebt.fechaInicio);
            }
        } catch (error) {
            console.error("Error al agregar deuda:", error);
        } finally {
            setIsModalOpen(false);
            setIsHonoraryModalOpen(false);
        }
    };

    if (!clienteData) {
        return <p>Cargando datos del cliente...</p>;
    }

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 p-6 space-y-6 relative">
                <h1 className="text-3xl font-bold">Gestión de Deudas</h1>
                <DebtTable debts={debts} />
                <div className="flex justify-end gap-4">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-3 bg-indigo-500 text-white rounded-full shadow-lg hover:bg-indigo-600 flex items-center"
                    >
                        <FaPlus />
                        <span className="ml-2">Agregar Deuda</span>
                    </button>
                    <button
                        onClick={() => setIsHonoraryModalOpen(true)}
                        className={`px-4 py-2 rounded-md shadow ${
                            lastHonoraryDate
                                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                                : "bg-green-500 text-white hover:bg-green-600"
                        }`}
                        disabled={!!lastHonoraryDate}
                    >
                        {lastHonoraryDate
                            ? "Honorario Contable ya añadido"
                            : "Agregar Honorario Contable"}
                    </button>
                </div>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    {/* Otro formulario para agregar deuda */}
                </Modal>
                <Modal isOpen={isHonoraryModalOpen} onClose={() => setIsHonoraryModalOpen(false)}>
                    <AddAccountingHonorary
                        onSubmit={handleAddDebt}
                        lastHonoraryDate={lastHonoraryDate}
                        onClose={() => setIsHonoraryModalOpen(false)}
                    />
                </Modal>
            </div>
        </div>
    );
};

export default DebtsPage;
