import React, { useState, useEffect } from "react";
import axios from "axios";
import ClientRow from "./ClientRow";

function ClientList() {
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Cantidad de clientes por página
  const clientsPerPage = 10;

  useEffect(() => {
    // Carga los clientes al montar el componente
    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/clientes");
        setClients(response.data);
      } catch (error) {
        console.error("Error al obtener los clientes:", error);
      }
    };

    fetchClients();
  }, []);

  // Cálculo de índices para determinar qué clientes mostrar
  const lastIndex = currentPage * clientsPerPage;
  const firstIndex = lastIndex - clientsPerPage;
  const currentClients = clients.slice(firstIndex, lastIndex);

  // Cálculo del total de páginas
  const totalPages = Math.ceil(clients.length / clientsPerPage);

  // Funciones para cambiar de página
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

  // Botones numéricos de paginación (opcional, pero útil)
  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-1 mx-1 rounded 
            ${i === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  // Handler para eliminar clientes del estado local (tras eliminarlos vía API)
  const handleDeleteClient = (clientId) => {
    setClients((prevClients) => prevClients.filter((c) => c.clienteId !== clientId));
  };

  // Handler para editar (simplemente un ejemplo, ajusta a tus necesidades)
  const handleEditClient = (clientData) => {
    console.log("Editar cliente:", clientData);
    // Aquí podrías abrir un modal o hacer la lógica que necesites.
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4">Listado de Clientes</h2>

      {/* Renderizamos los clientes de la página actual */}
      {currentClients.map((client) => (
        <ClientRow
          key={client.clienteId}
          client={client}
          showAddClientForm={false}
          onDelete={handleDeleteClient}
          onEdit={handleEditClient}
        />
      ))}

      {/* Controles de paginación */}
      <div className="flex items-center justify-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 mr-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Anterior
        </button>

        {/* Render dinámico de los números de página */}
        {renderPageNumbers()}

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 ml-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default ClientList;
