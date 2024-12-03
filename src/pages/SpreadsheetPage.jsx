import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/SpreedSheetComp/Sidebar";
import ClientSummary from "../components/SpreedSheetComp/ClientSummary";
import ClientIndicators from "../components/SpreedSheetComp/ClientIndicators";
import RecentMovements from "../components/SpreedSheetComp/RecentMovements";
import AlertsNotifications from "./AlertsNotifications";

const SpreadsheetPage = () => {
    const { clientId } = useParams();
    const [clientData, setClientData] = useState({
        summary: {},
        indicators: {
            totalDebt: 0,
            totalPayments: 0,
            currentMonthDebt: 0,
            lastTransaction: { date: "Sin datos", amount: 0 },
        },
        movements: [],
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
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar/>
            <div className="flex-1 p-6 max-w-full">
                {/* Contenido */}
                <ClientSummary summary={clientData.summary}/>
                <div className="indicators mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <ClientIndicators indicators={clientData.indicators}/>
                </div>
                <div className="lower-section mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    <div className="recent-movements bg-white shadow-md rounded-lg p-6 h-full border border-gray-200">
                        <RecentMovements movements={clientData.movements}/>
                    </div>
                    <div
                        className="alerts-notifications bg-white shadow-md rounded-lg p-6 h-full border border-gray-200">
                        <AlertsNotifications alerts={clientData.alerts || []}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpreadsheetPage;
