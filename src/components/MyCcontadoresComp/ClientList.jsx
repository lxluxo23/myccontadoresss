import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import ClientRow from "./ClientRow";
import { config } from "../../config/config";

// Componente de paginación reutilizable
const Pagination = React.memo(({ currentPage, totalPages, onPageChange, onPrevious, onNext }) => {
  const renderPageNumbers = useMemo(() => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
          <button
              key={i}
              onClick={() => onPageChange(i)}
              className={`px-3 py-1 mx-1 rounded ${
                  i === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
          >
            {i}
          </button>
      );
    }
    return pages;
  }, [totalPages, currentPage, onPageChange]);

  return (
      <div className="flex items-center justify-center mt-4">
        <button
            onClick={onPrevious}
            disabled={currentPage === 1}
            className="px-4 py-2 mr-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        {renderPageNumbers}
        <button
            onClick={onNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 ml-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
  );
});

function ClientList() {
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const clientsPerPage = 10;

  // Carga los clientes al montar el componente
  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${config.apiUrl}/api/clientes`);
        setClients(response.data);
      } catch (err) {
        console.error("Error al obtener los clientes:", err);
        setError("Error al obtener los clientes.");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  // Calcula el total de páginas
  const totalPages = useMemo(() => Math.ceil(clients.length / clientsPerPage), [clients.length]);

  // Calcula los clientes de la página actual
  const currentClients = useMemo(() => {
    const lastIndex = currentPage * clientsPerPage;
    const firstIndex = lastIndex - clientsPerPage;
    return clients.slice(firstIndex, lastIndex);
  }, [clients, currentPage, clientsPerPage]);

  // Handlers memorizados para evitar recreación en cada render
  const handlePreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  // Handler para eliminar un cliente del estado
  const handleDeleteClient = useCallback((clientId) => {
    setClients((prevClients) => prevClients.filter((c) => c.clienteId !== clientId));
  }, []);

  // Handler para editar un cliente (lógica de ejemplo)
  const handleEditClient = useCallback((clientData) => {
    console.log("Editar cliente:", clientData);
    // Aquí podrías abrir un modal o ejecutar otra lógica necesaria.
  }, []);

  return (
      <div className="container mx-auto p-4">
        <h2 className="text-lg font-semibold mb-4">Listado de Clientes</h2>

        {loading ? (
            <p>Cargando clientes...</p>
        ) : error ? (
            <p className="text-red-500">{error}</p>
        ) : (
            <>
              {currentClients.map((client) => (
                  <ClientRow
                      key={client.clienteId}
                      client={client}
                      showAddClientForm={false}
                      onDelete={handleDeleteClient}
                      onEdit={handleEditClient}
                  />
              ))}

              {clients.length > clientsPerPage && (
                  <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      onPrevious={handlePreviousPage}
                      onNext={handleNextPage}
                  />
              )}
            </>
        )}
      </div>
  );
}

export default ClientList;
