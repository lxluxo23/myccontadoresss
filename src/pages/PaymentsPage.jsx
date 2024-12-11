import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import PaymentTable from "../components/PaymentsComp/PaymentTable";
import AddPaymentForm from "../components/PaymentsComp/AddPaymentForm";
import Modal from "../components/Modal";
import FiltersButton from "../components/DebtsAndPaymentsComp/Filters";
import { FaPlus } from "react-icons/fa";
import { useCliente } from "../components/context/ClienteContext";

const PaymentsPage = () => {
    const { clienteId, clienteData } = useCliente(); // Acceso al cliente seleccionado desde el contexto
    const [payments, setPayments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!clienteId) {
            navigate("/clientes"); // Redirige a la lista de clientes si no hay cliente seleccionado
            return;
        }

        const fetchPayments = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/clientes/${clienteId}/pagos`);
                if (!response.ok) {
                    throw new Error("Error al cargar pagos");
                }
                const data = await response.json();
                setPayments(data);
            } catch (error) {
                console.error("Error al cargar pagos:", error);
            }
        };

        fetchPayments();
    }, [clienteId, navigate]);

    const handleAddPayment = async (newPayment) => {
        try {
            const response = await fetch(`http://localhost:8080/api/pagos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPayment),
            });
            if (!response.ok) {
                throw new Error("Error al agregar el pago");
            }
            const addedPayment = await response.json();
            setPayments([...payments, addedPayment]); // Actualiza la lista de pagos
        } catch (error) {
            console.error("Error al agregar el pago:", error);
        } finally {
            setIsModalOpen(false); // Cierra el modal al finalizar
        }
    };

    if (!clienteData) {
        return <p>Cargando datos del cliente...</p>;
    }

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 p-6 space-y-6 relative">
                {/* Encabezado */}
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                        Gestión de Pagos
                    </h1>
                    {/* Botón Flotante para Filtros */}
                    <FiltersButton />
                </div>

                {/* Tabla de Pagos */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md">
                    {payments.length > 0 ? (
                        <PaymentTable payments={payments} />
                    ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400">
                            No hay pagos registrados.
                        </p>
                    )}
                </div>

                {/* Botón Flotante para Agregar Pago */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="fixed bottom-6 right-6 flex items-center px-6 py-3 bg-indigo-500 text-white rounded-full shadow-lg hover:bg-indigo-600 transition space-x-2"
                >
                    <FaPlus />
                    <span>Agregar Pago</span>
                </button>

                {/* Modal para Agregar Pago */}
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <AddPaymentForm
                        onSubmit={handleAddPayment}
                        onClose={() => setIsModalOpen(false)}
                    />
                </Modal>
            </div>
        </div>
    );
};

export default PaymentsPage;
