import React, { useEffect, useState } from "react";
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
    const { clienteId, setClienteData, clearCliente } = useCliente();
    const [clienteData, setLocalClienteData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!clienteId) {
            console.warn("Cliente ID no está definido. Redirigiendo al inicio.");
            navigate("/");
            return;
        }

        const fetchClientData = async () => {
            try {
                setIsLoading(true);
                console.log("Cargando datos para cliente ID:", clienteId);

                const [clientResponse, indicatorsResponse, movementsResponse] = await Promise.all([
                    fetch(`https://backend.cobros.myccontadores.cl/api/clientes/${clienteId}`),
                    fetch(`https://backend.cobros.myccontadores.cl/api/clientes/${clienteId}/indicadores`),
                    fetch(`https://backend.cobros.myccontadores.cl/api/clientes/${clienteId}/movimientos`),
                ]);

                if (!clientResponse.ok || !indicatorsResponse.ok || !movementsResponse.ok) {
                    throw new Error("Error al cargar datos del cliente.");
                }

                const [clientData, indicators, movements] = await Promise.all([
                    clientResponse.json(),
                    indicatorsResponse.json(),
                    movementsResponse.json(),
                ]);

                const combinedData = {
                    ...clientData,
                    indicators,
                    movements,
                };

                console.log("Datos combinados del cliente:", combinedData);

                setClienteData(combinedData); // Actualiza el contexto global (si es necesario)
                setLocalClienteData(combinedData); // Actualiza el estado local
            } catch (error) {
                console.error("Error al cargar datos del cliente:", error);
                setError("No se pudieron cargar los datos del cliente.");
                clearCliente();
                navigate("/");
            } finally {
                setIsLoading(false);
            }
        };

        fetchClientData();
    }, [clienteId]); // Solo se ejecutará cuando `clienteId` cambie

    if (isLoading) {
        return (
            <div className="text-center mt-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-500">Cargando datos del cliente...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 mt-20">
                <p>{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    if (!clienteData) {
        return <p>No se encontraron datos del cliente.</p>;
    }

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 p-6">
                <ClientSummary
                    summary={{
                        nombre: clienteData.nombre,
                        rut: clienteData.rut,
                        email: clienteData.email,
                        telefono: clienteData.telefono,
                        direccion: clienteData.direccion,
                        photo: clienteData.photo,
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
