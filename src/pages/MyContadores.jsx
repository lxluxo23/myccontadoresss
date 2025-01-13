import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/MyCcontadoresComp/SidebarMyC";
import FilterSection from "../components/MyCcontadoresComp/FilterSection";
import TableHeader from "../components/MyCcontadoresComp/TableHeader";
import ClientRow from "../components/MyCcontadoresComp/ClientRow";
import Pagination from "../components/MyCcontadoresComp/Pagination";
import EditClientForm from "../components/MyCcontadoresComp/EditClientForm";
import FloatingExcelButton from "../components/MyCcontadoresComp/FloatingExcelButton";
import MonthYearModal from "../components/MyCcontadoresComp/MonthYearModal";

function MyContadores() {
    const [clients, setClients] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [loading, setLoading] = useState(false);
    const [editingClient, setEditingClient] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    // Estados para la paginación
    const [currentPage, setCurrentPage] = useState(1);
    const clientsPerPage = 10;

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

    // Lógica de paginación
    const lastIndex = currentPage * clientsPerPage;
    const firstIndex = lastIndex - clientsPerPage;
    const currentClients = filteredClients.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Abrir y cerrar el modal
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Descargar el archivo Excel con los parámetros de mes y año
    const handleDownloadExcel = async (month, year) => {
        setIsDownloading(true);
        try {
            const response = await fetch(
                `http://localhost:8080/api/clientes/exportar/excel?mes=${month}&anio=${year}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("No se pudo descargar el archivo Excel.");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `clientes_saldo_pendiente_${month}_${year}.xlsx`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);

            alert("Descarga de Excel completada exitosamente.");
        } catch (err) {
            console.error("Error al descargar el archivo Excel:", err);
            alert("Hubo un error al descargar el archivo Excel. Por favor, intenta nuevamente.");
        } finally {
            setIsDownloading(false);
            handleCloseModal();
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

                        {currentClients.length > 0 ? (
                            <div>
                                {currentClients.map((client) => (
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

                    {/* Controles de paginación */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPrevious={handlePreviousPage}
                        onNext={handleNextPage}
                        onPageClick={handlePageClick}
                    />

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

            {/* Modal para selección de mes y año */}
            <MonthYearModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={(month, year) => handleDownloadExcel(month, year)}
            />

            {/* Botón Flotante para Abrir el Modal */}
            <FloatingExcelButton onClick={handleOpenModal} disabled={isDownloading} />
        </div>
    );
}

export default MyContadores;
