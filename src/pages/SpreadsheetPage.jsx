import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ClientSummary from "../components/SpreedSheetComp/ClientSummary";
import ClientIndicators from "../components/SpreedSheetComp/ClientIndicators";
import RecentMovements from "../components/SpreedSheetComp/RecentMovements";
import AlertsNotifications from "../components/SpreedSheetComp/AlertsNotifications";
import ThemeToggle from "../components/ThemeToggle";
import { useCliente } from "../components/context/ClienteContext";

const SpreadsheetPage = () => {
    const navigate = useNavigate();
    const { clienteId, clienteData, setClienteData, clearCliente } = useCliente();

    useEffect(() => {
        if (!clienteId) {
            navigate("/");
            return;
        }

        const fetchClientData = async () => {
            try {
                const response = await fetch(`https://backend.cobros.myccontadores.cl/api/clientes/${clienteId}`);
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                const data = await response.json();
                setClienteData(data);
            } catch (error) {
                console.error("Error fetching client data:", error);
                clearCliente();
                navigate("/");
            }
        };

        if (!clienteData) {
            fetchClientData();
        }
    }, [clienteId, clienteData, setClienteData, clearCliente, navigate]);

    if (!clienteData) {
        return <p>Cargando datos del cliente...</p>;
    }

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 p-6">
                {/* Pasamos los datos completos a ClientSummary */}
                <ClientSummary
                    summary={{
                        nombre: clienteData.nombre,
                        rut: clienteData.rut,
                        email: clienteData.email,
                        telefono: clienteData.telefono,
                        direccion: clienteData.direccion,
                        photo: clienteData.photo, // Si existe la propiedad
                    }}
                />
                <div className="indicators mt-6">
                    <ClientIndicators indicators={clienteData.indicators || {}} />
                </div>
                <div className="lower-section mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <RecentMovements movements={clienteData.movements || []} />
                    <AlertsNotifications alerts={clienteData.alerts || []} />
                </div>
            </div>
            <ThemeToggle />
        </div>
    );
};

export default SpreadsheetPage;