import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import PaymentTable from "../components/PaymentsComp/PaymentTable";
import AddPaymentForm from "../components/PaymentsComp/AddPaymentForm";
import Modal from "../components/Modal";
import { useCliente } from "../components/context/ClienteContext";
import { FaPlus } from "react-icons/fa";
import ThemeToggle from "../components/ThemeToggle";

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
                const response = await fetch(`https://backend.cobros.myccontadores.cl/api/clientes/${clienteId}/pagos`);
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
            const response = await fetch(`https://backend.cobros.myccontadores.cl/api/pagos/registrar/${newPayment.deudaSeleccionada}`, {
                method: "POST",
                body: JSON.stringify({
                    fechaTransaccion: newPayment.fechaPago,
                    monto: newPayment.monto,
                    metodoPago: newPayment.metodoPago,
                    observaciones: newPayment.observaciones,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                try {
                    const errorData = JSON.parse(errorText);
                    throw new Error(errorData.error || "Error desconocido al agregar el pago");
                } catch {
                    throw new Error(errorText);
                }
            }

            const addedPayment = await response.json();

            // Actualiza el estado local añadiendo el nuevo pago
            setPayments((prevPayments) => {
                // Valida que el pago no esté duplicado
                const isDuplicate = prevPayments.some((payment) => payment.pagoId === addedPayment.pagoId);
                if (isDuplicate) {
                    console.warn("Pago duplicado detectado, no se agregará nuevamente.");
                    return prevPayments;
                }
                return [...prevPayments, addedPayment];
            });
        } catch (error) {
            console.error("Error al agregar el pago:", error.message);
            alert(`Error al agregar el pago: ${error.message}`);
        } finally {
            setIsModalOpen(false);
        }
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
                <div className="text-red-500 dark:text-red-400">{error}</div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 p-6">
                <div>
                    <PaymentTable payments={payments} />
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white dark:bg-indigo-600 dark:text-gray-200 rounded hover:bg-indigo-600 dark:hover:bg-indigo-700"
                    >
                        <FaPlus className="mr-2" />
                        Agregar Pago
                    </button>
                </div>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <AddPaymentForm
                        onSubmit={handleAddPayment}
                        userId={clienteId}
                        onClose={() => setIsModalOpen(false)}
                    />
                </Modal>
            </div>
            <ThemeToggle />
        </div>
    );
};

export default PaymentsPage;
