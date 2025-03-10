// PaymentsPage.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import PaymentTable from "../components/PaymentsComp/PaymentTable";
import AddPaymentForm from "../components/PaymentsComp/AddPaymentForm"; // Nuevo formulario para pagos de honorarios
import Modal from "../components/DebtsComp/Modal";
import { useCliente } from "../components/context/ClienteContext";
import { FaPlus } from "react-icons/fa";
import ThemeToggle from "../components/ThemeToggle";
import { config } from '../config/config'; 

const PaymentsPage = () => {
    const { clienteId } = useCliente();
    const [payments, setPayments] = useState([]); // Estado para almacenar los pagos
    const [isAddPaymentModalOpen, setIsAddPaymentModalOpen] = useState(false); // Modal para agregar pagos normales
    const [isAddHonoraryPaymentModalOpen, setIsAddHonoraryPaymentModalOpen] = useState(false); // Modal para pagos de honorarios
    const [isLoading, setIsLoading] = useState(true); // Estado de carga
    const [error, setError] = useState(null); // Manejo de errores

    const navigate = useNavigate();

    useEffect(() => {
        if (!clienteId) {
            navigate("/");
            return;
        }

        const fetchPayments = async () => {
            try {
                const response = await fetch(`${config.apiUrl}/api/clientes/${clienteId}/pagos`);
                if (!response.ok) {
                    throw new Error("Error al cargar los datos");
                }
                const data = await response.json();
                setPayments(data); // Establece los pagos obtenidos en el estado
                console.log("Datos cargados:", data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPayments();
    }, [clienteId, navigate]);

    // Función para manejar el agregado de nuevos pagos normales
    const handleAddPayment = (newPayment) => {
        setPayments((prevPayments) => [newPayment, ...prevPayments]); // Agrega el nuevo pago al inicio de la lista
        setIsAddPaymentModalOpen(false); // Cierra el modal
    };

    // Función para manejar el agregado de pagos de honorarios
    const handleAddHonoraryPayment = async (honorarioId, payload) => {
        try {
            const response = await fetch(`${config.apiUrl}/api/honorarios/${honorarioId}/pagos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                throw new Error("Error al registrar el pago de honorario.");
            }
            const newHonoraryPayment = await response.json();
            setPayments((prevPayments) => [newHonoraryPayment, ...prevPayments]); // Agrega el nuevo honorario al inicio de la lista
            setIsAddHonoraryPaymentModalOpen(false); // Cierra el modal
        } catch (error) {
            setError("Error al registrar el pago de honorario: " + error.message);
        }
    };

    // Función para manejar la eliminación de pagos desde PaymentTable
    const handleDeletePayment = (deletedPagoId) => {
        setPayments((prevPayments) => prevPayments.filter(p => p.pagoId !== deletedPagoId));
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-gray-600 dark:text-gray-400">Cargando...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-red-500 dark:text-gray-400">
                    Hubo un problema al cargar los pagos. Por favor, intente nuevamente más tarde.
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 p-6">
                <div>
                    <PaymentTable
                        payments={payments} // Tabla que muestra los pagos
                        onDeletePayment={handleDeletePayment} // Función para manejar la eliminación
                    />
                </div>

                <div className="flex justify-end mt-4">
                    <button
                        onClick={() => setIsAddPaymentModalOpen(true)}
                        className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white dark:bg-indigo-600 dark:text-gray-200 rounded hover:bg-indigo-600 dark:hover:bg-indigo-700"
                    >
                        <FaPlus className="mr-2" />
                        Agregar Pago
                    </button>
                </div>

                {/* Modal para agregar pagos normales */}
                <Modal isOpen={isAddPaymentModalOpen} onClose={() => setIsAddPaymentModalOpen(false)}>
                    <AddPaymentForm
                        onPaymentAdded={handleAddPayment} // Función para manejar el agregado de pagos normales
                        userId={clienteId}
                        onClose={() => setIsAddPaymentModalOpen(false)} // Cierra el modal
                    />
                </Modal>
            </div>
            <ThemeToggle />
        </div>
    );

};

export default PaymentsPage;
