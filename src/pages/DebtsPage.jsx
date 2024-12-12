import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DebtTable from "../components/DebtsComp/DebtTable";
import Modal from "../components/Modal";
import AddAccountingHonorary from "../components/DebtsComp/AddAccountingHonorary";
import { useCliente } from "../components/context/ClienteContext";
import { FaPlus } from "react-icons/fa";

const DebtsPage = () => {
    const { clienteId } = useCliente();
    const [debts, setDebts] = useState([]);
    const [honorariosContables, setHonorariosContables] = useState([]);
    const [isHonoraryModalOpen, setIsHonoraryModalOpen] = useState(false);
    const [error, setError] = useState(null); // Para manejar errores
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
                console.log("Deudas:", data); // Depuración
                setDebts(data);
            } catch (error) {
                console.error("Error al cargar deudas:", error);
                setError("Error al cargar deudas. Inténtalo más tarde.");
            }
        };

        const fetchHonorarios = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/honorarios/cliente/${clienteId}`);
                if (!response.ok) {
                    throw new Error("Error al cargar honorarios contables");
                }
                const data = await response.json();
                console.log("Honorarios Contables:", data); // Depuración
                setHonorariosContables(data);
            } catch (error) {
                console.error("Error al cargar honorarios contables:", error);
                setError("Error al cargar honorarios contables. Inténtalo más tarde.");
            }
        };

        fetchDebts();
        fetchHonorarios();
    }, [clienteId, navigate]);

    const handleAddHonorary = async (clienteId, payload) => {
        console.log("Payload enviado:", payload); // Depuración
        try {
            const response = await fetch(`http://localhost:8080/api/honorarios/${clienteId}`, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) {
                throw new Error("Error al agregar honorario contable");
            }
            const data = await response.json();
            console.log("Respuesta del servidor:", data); // Depuración

            // Vuelve a cargar los honorarios contables
            await fetchHonorarios();
            setIsHonoraryModalOpen(false); // Cierra el modal
        } catch (error) {
            console.error("Error al agregar honorario contable:", error);
            setError("No se pudo agregar el honorario contable. Inténtalo de nuevo.");
        }
    };

    const fetchHonorarios = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/honorarios/cliente/${clienteId}`);
            if (!response.ok) {
                throw new Error("Error al cargar honorarios contables");
            }
            const data = await response.json();
            setHonorariosContables(data);
        } catch (error) {
            console.error("Error al recargar honorarios contables:", error);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 p-6 space-y-6 relative">
                {error && <div className="text-red-500">{error}</div>}
                <DebtTable debts={debts} honorariosContables={honorariosContables} />
                <div className="flex justify-end gap-4">
                    <button
                        onClick={() => setIsHonoraryModalOpen(true)}
                        className="px-4 py-3 bg-indigo-500 text-white rounded-full shadow-lg hover:bg-indigo-600 flex items-center"
                    >
                        <FaPlus />
                        <span className="ml-2">Agregar Honorario Contable</span>
                    </button>
                </div>
                <Modal isOpen={isHonoraryModalOpen} onClose={() => setIsHonoraryModalOpen(false)}>
                    <AddAccountingHonorary
                        onSubmit={handleAddHonorary}
                        clienteId={clienteId}
                        onClose={() => setIsHonoraryModalOpen(false)}
                    />
                </Modal>
            </div>
        </div>
    );
};

export default DebtsPage;
