import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/DebtsAndPaymentsComp/Header";
import Overview from "../components/DebtsAndPaymentsComp/Overview";
import Analytics from "../components/DebtsAndPaymentsComp/Analytics";
import DetailsTable from "../components/DebtsAndPaymentsComp/DetailsTable";
import { useCliente } from "../components/context/ClienteContext";

const DebtsAndPaymentsPage = () => {
    const { clienteId, clienteData, setClienteData } = useCliente();
    const navigate = useNavigate();

    useEffect(() => {
        if (!clienteId) {
            navigate("/clientes");
            return;
        }

        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/clientes/${clienteId}/finanzas`);
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }

                const rawData = await response.json();

                // Estructura los datos como los subcomponentes los necesitan
                const data = {
                    nextDueDate: rawData.nextDueDate || "No disponible",
                    totalDebt: rawData.totalDebt || 0,
                    totalPayments: rawData.totalPayments || 0,
                    pendingPayments: rawData.pendingPayments || 0,
                    movements: rawData.movements || []
                };

                setClienteData(data);
            } catch (error) {
                console.error("Error al cargar los datos financieros:", error);
                navigate("/clientes");
            }
        };

        if (!clienteData) {
            fetchData();
        }
    }, [clienteId, clienteData, setClienteData, navigate]);

    if (!clienteData) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-lg font-semibold">Cargando datos financieros...</p>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-6 space-y-6">
                    <Overview finance={clienteData} />
                    <Analytics finance={clienteData} />
                    <DetailsTable movements={clienteData.movements} />
                </main>
            </div>
        </div>
    );
};

export default DebtsAndPaymentsPage;
