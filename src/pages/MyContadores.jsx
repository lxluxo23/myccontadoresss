import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/MyCcontadoresComp/SidebarMyC";
import FilterSection from "../components/MyCcontadoresComp/FilterSection";
import TableHeader from "../components/MyCcontadoresComp/TableHeader";
import ClientRow from "../components/MyCcontadoresComp/ClientRow";
import Pagination from "../components/MyCcontadoresComp/Pagination";
import EditClientForm from "../components/MyCcontadoresComp/EditClientForm";
import FloatingExcelButton from "../components/MyCcontadoresComp/FloatingExcelButton";  // Importar el nuevo botón flotante

function MyContadores() {
    const [clients, setClients] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [loading, setLoading] = useState(false);
    const [editingClient, setEditingClient] = useState(null);

    useEffect(() => {
        const fetchClients = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:8080/api/clientes");
                const sortedClients = response.data.sort((a, b) => a.nombre.localeCompare(b.nombre));
                setClients(sortedClients);
            } catch (error) {
                console.error("Error al cargar los clientes:", error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    const handleEditClick = (client) => {
        setEditingClient(client);
    };

    const handleSaveClient = (updatedClient) => {
        setClients((prevClients) =>
            prevClients.map((client) =>
                client.clienteId === updatedClient.clienteId ? updatedClient : client
            )
        );
        setEditingClient(null);
    };

    const handleCancelEdit = () => {
        setEditingClient(null);
    };

    const handleDeleteClient = (deletedClientId) => {
        setClients((prevClients) =>
            prevClients.filter((client) => client.clienteId !== deletedClientId)
        );
    };

    const filteredClients = clients.filter((client) =>
        client.nombre.toLowerCase().includes(searchName.toLowerCase())
    );

    const handleSortChange = (newSortOrder) => {
        setSortOrder(newSortOrder);
        const sortedClients = [...clients].sort((a, b) => {
            if (newSortOrder === "asc") {
                return a.nombre.localeCompare(b.nombre);
            } else {
                return b.nombre.localeCompare(a.nombre);
            }
        });
        setClients(sortedClients);
    };

    // Función para descargar el archivo Excel
    const descargarExcel = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/honorarios/exportar/deudas-pagos/clienteId');  // Cambia "clienteId" por el id correspondiente
            if (!response.ok) {
                throw new Error("No se pudo descargar el archivo Excel.");
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "deudas_y_pagos_clientes.xlsx"; // Nombre del archivo
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Error al descargar el archivo Excel:", err);
        }
    };

    if (loading) {
        return <p className="text-center mt-6 text-lg">Cargando clientes...</p>;
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar />

            {/* Contenido Principal */}
            <main className="flex-1 p-6">
                <div className="max-w-7xl mx-auto">

                    {/* Filtros y búsqueda */}
                    <FilterSection
                        onAddClient={(clientData) => setClients((prev) => [...prev, clientData])}
                        onSearchNameChange={setSearchName}
                    />

                    {/* Tabla de clientes */}
                    <div className="bg-white rounded-lg shadow mt-6">
                        <TableHeader sortOrder={sortOrder} onSortChange={handleSortChange} />

                        {filteredClients.length > 0 ? (
                            <div>
                                {filteredClients.map((client) => (
                                    <ClientRow
                                        key={client.clienteId}
                                        client={client}
                                        onDelete={handleDeleteClient}
                                        onEdit={handleEditClick}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500 py-6">No se encontraron clientes.</p>
                        )}
                    </div>

                    {/* Paginación */}
                    <Pagination />

                    {/* Modal para edición */}
                    {editingClient && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <EditClientForm
                                client={editingClient}
                                onSave={handleSaveClient}
                                onCancel={handleCancelEdit}
                            />
                        </div>
                    )}
                </div>
            </main>

            {/* Botón Flotante para Descargar el Excel */}
            <FloatingExcelButton onClick={descargarExcel} /> {/* El botón flotante que descarga el Excel */}
        </div>
    );
}

export default MyContadores;
