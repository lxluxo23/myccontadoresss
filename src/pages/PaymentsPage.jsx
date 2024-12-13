import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import PaymentTable from "../components/PaymentsComp/PaymentTable";
import AddPaymentForm from "../components/PaymentsComp/AddPaymentForm";
import FiltersAccordion from "../components/PaymentsComp/FiltersAccordion";
import Modal from "../components/Modal";
import { useCliente } from "../components/context/ClienteContext";
import { FaPlus } from "react-icons/fa";

const PaymentsPage = () => {
    const { clienteId } = useCliente();
    const [payments, setPayments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (!clienteId) {
            navigate("/clientes");
            return;
        }

        const fetchPayments = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/clientes/${clienteId}/pagos`);
                if (!response.ok) {
                    throw new Error("Error al cargar los datos");
                }
                const data = await response.json();
                setPayments(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPayments();
    }, [clienteId, navigate]);

    const handleAddPayment = async (newPayment) => {
        try {
            const response = await fetch(`http://localhost:8080/api/pagos`, {
                method: "POST",
                body: JSON.stringify(newPayment),
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) {
                throw new Error("Error al agregar el pago");
            }
            const addedPayment = await response.json();
            setPayments((prevPayments) => [...prevPayments, addedPayment]);
        } catch (error) {
            console.error("Error al agregar pago:", error);
        } finally {
            setIsModalOpen(false);
        }
    };

    const handleFilter = (filters) => {
        console.log("Filtros aplicados:", filters);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-gray-600">Cargando...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 p-6">

                {/* Contenedor principal similar a la página de Deudas */}
                <div className="space-y-6 bg-white rounded-xl shadow-lg p-6">

                    {/* Encabezado */}
                    <div className="flex justify-between items-center mb-3">
                        <div className="text-xl font-bold text-gray-800">Gestión de Pagos</div>
                    </div>

                    {/* Filtros */}
                    <div>
                        <div className="text-lg font-semibold text-gray-700 mb-4">Filtros Avanzados</div>
                        <FiltersAccordion onFilter={handleFilter} />
                    </div>

                    {/* Tabla de Pagos */}
                    <div>
                        <div className="text-lg font-semibold text-gray-700 mb-4">Lista de Pagos</div>
                        <PaymentTable payments={payments} />
                    </div>

                    {/* Botón para agregar pago */}
                    <div className="flex justify-end">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                        >
                            <FaPlus className="mr-2" />
                            Agregar Pago
                        </button>
                    </div>
                </div>

                {/* Modal para agregar pago */}
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <AddPaymentForm onSubmit={handleAddPayment} />
                </Modal>
            </div>
        </div>
    );
};

export default PaymentsPage;
