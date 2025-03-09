import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCliente } from "../context/ClienteContext";
// import ExpandedClientRow from "./ExpandedClientRow"; // Componente expandido desactivado
import axios from "axios";
import { FaEdit, FaTrashAlt, FaEllipsisH, FaUser } from "react-icons/fa";
import { config } from "../../config/config";

function ClientRow({ client = {}, showAddClientForm, onDelete, onEdit }) {
    // Para activar la funcionalidad expandida, descomenta la siguiente línea:
    // const [expanded, setExpanded] = useState(false);
    const { setClienteId } = useCliente();
    const navigate = useNavigate();

    const handleDetailClick = useCallback(
        (event) => {
            event.stopPropagation();
            setClienteId(client.clienteId);
            navigate(`/spreadsheet/${client.clienteId}`);
        },
        [client.clienteId, navigate, setClienteId]
    );

    const handleEditClick = useCallback(
        (event) => {
            event.stopPropagation();
            onEdit(client);
        },
        [client, onEdit]
    );

    const handleDeleteClick = useCallback(
        async (event) => {
            event.stopPropagation();
            if (
                window.confirm(
                    `¿Está seguro de que desea eliminar al cliente ${client.nombre}?`
                )
            ) {
                try {
                    await axios.delete(`${config.apiUrl}/api/clientes/${client.clienteId}`);
                    alert(`Cliente ${client.nombre} eliminado exitosamente.`);
                    onDelete(client.clienteId);
                } catch (error) {
                    console.error(
                        "Error al eliminar el cliente:",
                        error.response?.data || error.message
                    );
                    alert("Hubo un problema al intentar eliminar el cliente.");
                }
            }
        },
        [client, onDelete]
    );

    // Handler para el botón "Más"
    const handleMoreClick = useCallback((e) => {
        e.stopPropagation();
        alert("Más funcionalidades aún no implementadas.");
    }, []);

    // Se memorizan las clases de la fila para evitar recomputación en cada render.
    const rowClasses = useMemo(
        () =>
            "grid grid-cols-4 items-center px-6 py-4 w-full border border-gray-200 rounded-lg cursor-pointer transition-transform duration-200 hover:scale-105 hover:bg-gray-100" +
            (showAddClientForm ? " pointer-events-none opacity-50" : ""),
        [showAddClientForm]
    );

    return (
        <div>
            <div
                className={rowClasses}
                // onClick={handleRowClick} // Descomentar para activar la funcionalidad expandida
            >
                {/* Información del cliente */}
                <div className="text-gray-800 font-medium text-sm truncate">
                    {client.nombre || "Nombre no disponible"}
                </div>
                <div className="text-gray-600 font-normal text-sm truncate text-center">
                    {client.email || "Correo no disponible"}
                </div>
                <div className="text-gray-600 font-normal text-sm truncate text-center">
                    {client.rut || "RUT no disponible"}
                </div>

                {/* Botones de acción */}
                <div className="flex justify-end items-center gap-3">
                    <button
                        className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-all"
                        onClick={handleDetailClick}
                    >
                        <FaUser className="w-4 h-4" />
                        Ver Cliente
                    </button>
                    <FaEdit
                        className="text-gray-500 hover:text-gray-700 cursor-pointer"
                        title="Editar"
                        onClick={handleEditClick}
                    />
                    <FaTrashAlt
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                        title="Eliminar"
                        onClick={handleDeleteClick}
                    />
                    <FaEllipsisH
                        className="text-gray-400 hover:text-gray-600 cursor-pointer"
                        title="Más"
                        onClick={handleMoreClick}
                    />
                </div>
            </div>

            {/*
        Componente expandido desactivado:
        Para activar la funcionalidad expandida, descomenta el siguiente bloque y
        la lógica relacionada en la fila principal (incluyendo el estado "expanded" y
        el handler "handleRowClick").

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          expanded ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ExpandedClientRow />
      </div>
      */}
        </div>
    );
}

// Se utiliza React.memo para evitar renderizados innecesarios si los props no cambian.
export default React.memo(ClientRow);
