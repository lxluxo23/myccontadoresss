import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ClientSummary from "../components/SpreedSheetComp/ClientSummary";
import ClientIndicators from "../components/SpreedSheetComp/ClientIndicators";
import RecentMovements from "../components/SpreedSheetComp/RecentMovements";
import AlertsNotifications from "../components/SpreedSheetComp/AlertsNotifications";
import ThemeToggle from "../components/ThemeToggle";

const SpreadsheetPage = () => {
    const { clientId } = useParams(); // Captura el clienteId de la URL
    const [clientData, setClientData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/clients/${clientId}`);
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                const data = await response.json();
                console.log("Datos del cliente:", data); // Verifica los datos recibidos
                setClientData(data);
            } catch (err) {
                console.error("Error al cargar los datos del cliente:", err.message);
                setError(err.message); // Muestra el error
            } finally {
                setLoading(false);
            }
        };

        fetchClientData();
    }, [clientId]);

    if (loading) return <p>Cargando datos del cliente...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 p-6">
                <ClientSummary summary={clientData.summary} />
                <div className="indicators mt-6">
                    <ClientIndicators indicators={clientData.indicators} />
                </div>
                <div className="lower-section mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <RecentMovements movements={clientData.movements} />
                    <AlertsNotifications alerts={clientData.alerts} />
                </div>
            </div>
            <ThemeToggle />
        </div>
    );
};

export default SpreadsheetPage;
