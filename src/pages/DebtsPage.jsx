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
    const [isHonoraryModalOpen, setIsHonoraryModalOpen] = useState(false);
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
            } catch (error) {
                console.error("Error al cargar deudas:", error);
            }
        };

        fetchDebts();
    }, [clienteId, navigate]);

    const handleAddHonorary = async (clienteId, payload) => {
        const formData = new FormData();
        formData.append("montoMensual", payload.montoMensual);

        // Siempre se crean 12 meses en el backend, aquí solo enviamos info extra.
        // payload.mesesData es un array de { mes, comprobante, montoPagado }
        payload.mesesData.forEach((dataMes) => {
            // Si hay monto pagado:
            if (dataMes.montoPagado && dataMes.montoPagado > 0) {
                formData.append(`montoPagado[${dataMes.mes}]`, dataMes.montoPagado);
            }

            // Si hay comprobante:
            if (dataMes.comprobante) {
                formData.append("mesesPagados", dataMes.comprobante, `${dataMes.mes}_${dataMes.comprobante.name}`);
            }
        });

        try {
            const response = await fetch(`http://localhost:8080/api/honorarios/${clienteId}`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Error desconocido al agregar honorario contable");
            }

            const responseData = await response.json();
            alert(responseData.message);

            // Actualizar las deudas
            const debtsResponse = await fetch(`http://localhost:8080/api/clientes/${clienteId}/deudas`);
            if (debtsResponse.ok) {
                const updatedDebts = await debtsResponse.json();
                setDebts(updatedDebts);
            }
        } catch (error) {
            console.error("Error al agregar honorario contable:", error);
            alert("No se pudo agregar el honorario contable.");
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 p-6 space-y-6 relative">
                <h1 className="text-3xl font-bold">Gestión de Deudas</h1>
                <DebtTable debts={debts} />
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
