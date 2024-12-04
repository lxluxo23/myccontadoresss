import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ClientSummary from "../components/SpreedSheetComp/ClientSummary";
import ClientIndicators from "../components/SpreedSheetComp/ClientIndicators";
import RecentMovements from "../components/SpreedSheetComp/RecentMovements";
import AlertsNotifications from "../components/SpreedSheetComp/AlertsNotifications";
import ThemeToggle from "../components/ThemeToggle";

const SpreadsheetPage = () => {
    const { clientId } = useParams();
    const [clientData, setClientData] = useState({
        summary: {},
        indicators: {},
        movements: [],
        alerts: [],
    });

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const response = await fetch(`/api/clients/${clientId}`);
                const data = await response.json();
                setClientData(data);
            } catch (error) {
                console.error("Error fetching client data:", error);
            }
        };

        fetchClientData();
    }, [clientId]);

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 p-6">
                <ClientSummary summary={clientData.summary}/>
                <div className="indicators mt-6">
                    <ClientIndicators indicators={clientData.indicators}/>
                </div>
                <div className="lower-section mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <RecentMovements movements={clientData.movements}/>
                    <AlertsNotifications alerts={clientData.alerts}/>
                </div>
            </div>
            <ThemeToggle/> {/* Botón de Modo Oscuro */}
        </div>
    );
};

export default SpreadsheetPage;
