import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import PaymentTable from "../components/PaymentsComp/PaymentTable";
import AddPaymentForm from "../components/PaymentsComp/AddPaymentForm";
import AddHonoraryPayment from "../components/PaymentsComp/AddHonoraryPayment";
import Modal from "../components/Modal";
import { useCliente } from "../components/context/ClienteContext";
import { FaPlus } from "react-icons/fa";
import ThemeToggle from "../components/ThemeToggle";

const PaymentsPage = () => {
    const { clienteId } = useCliente();
    const [payments, setPayments] = useState([]);
    const [isAddPaymentModalOpen, setIsAddPaymentModalOpen] = useState(false);
    const [isAddHonoraryPaymentModalOpen, setIsAddHonoraryPaymentModalOpen] = useState(false);
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
            setIsAddPaymentModalOpen(false);
        }
    };

    const handleAddHonoraryPayment = async (newPayment) => {
        try {
            const response = await fetch(`http://localhost:8080/api/honorarios/${newPayment.honorarioId}/pagos`, {
                method: "POST",
                body: JSON.stringify({
                    mes: newPayment.mes,
                    montoPago: newPayment.montoPago,
                    comprobante: newPayment.comprobante,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // Manejo de respuestas no JSON
            const isJson = response.headers.get("content-type")?.includes("application/json");
            const data = isJson ? await response.json() : await response.text();

            if (!response.ok) {
                throw new Error(isJson ? data.error || "Error desconocido" : data);
            }

            if (isJson) {
                setPayments((prev) => [...prev, data]);
            } else {
                console.log(data); // Mensaje de éxito del backend
            }
        } catch (error) {
            console.error("Error al registrar el pago de honorario:", error.message);
            alert(`Error al registrar el pago de honorario: ${error.message}`);
        } finally {
            setIsAddHonoraryPaymentModalOpen(false);
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

                {/* Botón para agregar pago normal */}
                <div className="flex justify-end mt-4">
                    <button
                        onClick={() => setIsAddPaymentModalOpen(true)}
                        className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white dark:bg-indigo-600 dark:text-gray-200 rounded hover:bg-indigo-600 dark:hover:bg-indigo-700"
                    >
                        <FaPlus className="mr-2" />
                        Agregar Pago
                    </button>
                </div>

                {/* Botón para registrar pago de honorario */}
                <div className="flex justify-end mt-4">
                    <button
                        onClick={() => setIsAddHonoraryPaymentModalOpen(true)}
                        className="inline-flex items-center px-4 py-2 bg-green-500 text-white dark:bg-green-600 dark:text-gray-200 rounded hover:bg-green-600 dark:hover:bg-green-700"
                    >
                        <FaPlus className="mr-2" />
                        Registrar Pago de Honorario
                    </button>
                </div>

                {/* Modal para agregar pago normal */}
                <Modal isOpen={isAddPaymentModalOpen} onClose={() => setIsAddPaymentModalOpen(false)}>
                    <AddPaymentForm
                        onSubmit={handleAddPayment}
                        userId={clienteId}
                        onClose={() => setIsAddPaymentModalOpen(false)}
                    />
                </Modal>

                {/* Modal para registrar pago de honorario */}
                <Modal isOpen={isAddHonoraryPaymentModalOpen} onClose={() => setIsAddHonoraryPaymentModalOpen(false)}>
                    <AddHonoraryPayment
                        onSubmit={handleAddHonoraryPayment}
                        honorarioId={clienteId} // Ajusta este ID según corresponda
                        onClose={() => setIsAddHonoraryPaymentModalOpen(false)}
                    />
                </Modal>
            </div>
            <ThemeToggle />
        </div>
    );
};

export default PaymentsPage;
