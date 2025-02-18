import React, { useState } from "react";
import { FaEye, FaTrash, FaPlus, FaChevronLeft, FaChevronRight, FaPencilAlt } from "react-icons/fa";
import dayjs from "dayjs";
import Spinner from "./Spinner";
import Modal from "./Modal";
import { config } from '../../config/config'; 
const HonoraryList = ({
                          honorariosContables,
                          currentPage,
                          onPageChange,
                          handleViewHonorarioDetails,  // Esta es la función que manejas en el componente padre (DebtTable)
                          handleDeleteHonorario,  // Función para eliminar honorario
                          handleRegisterPayment,
                          handleEditHonorario, // Esta es la función que manejará la edición
                          openPaymentModal,
                          fetchHonorarios,
                      }) => {
    const itemsPerPage = 10;
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [honorarioToDelete, setHonorarioToDelete] = useState(null);
    const [showEditHonorarioModal, setShowEditHonorarioModal] = useState(false);
    const [nuevoMontoMensual, setNuevoMontoMensual] = useState(0);
    const [selectedHonorarioId, setSelectedHonorarioId] = useState(null);
    const [selectedMes, setSelectedMes] = useState(null);

    const paginatedData = (data, currentPage) =>
        data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleDeleteHonorarioClick = (honorario) => {
        setHonorarioToDelete(honorario);
        setShowDeleteConfirmation(true);
    };

    const confirmDeleteHonorario = async () => {
        try {
            const response = await fetch(`${config.apiUrl}/api/honorarios/${honorarioToDelete.honorarioId}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Error al eliminar el honorario.");
            }
            alert("Honorario eliminado con éxito.");
            setShowDeleteConfirmation(false);
            fetchHonorarios();  // Refresca la lista de honorarios después de la eliminación
        } catch (err) {
            console.error("Error al eliminar el honorario:", err);
            alert("No se pudo eliminar el honorario.");
            setShowDeleteConfirmation(false);
        }
    };

    const handleEditHonorarioClick = (honorarioId, mes, montoActual) => {
        setSelectedHonorarioId(honorarioId);
        setSelectedMes(mes);
        setNuevoMontoMensual(montoActual); // Prellenar con el monto actual
        setShowEditHonorarioModal(true);
    };

    const handleSubmitEdit = async () => {
        if (nuevoMontoMensual <= 0) {
            alert("Por favor, ingresa un monto válido.");
            return;
        }

        try {
            const response = await fetch(
                `${config.apiUrl}/api/honorarios/${selectedHonorarioId}/mes/${selectedMes}?nuevoMontoMensual=${nuevoMontoMensual}`,
                { method: "PUT" }
            );

            if (!response.ok) {
                throw new Error("Error al editar el honorario.");
            }

            alert("Honorario actualizado con éxito.");
            setShowEditHonorarioModal(false);
            fetchHonorarios(); // Refrescar la lista después de la edición
        } catch (err) {
            console.error("Error al editar el honorario:", err);
            alert("No se pudo editar el honorario.");
            setShowEditHonorarioModal(false);
        }
    };

    return (
        <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Honorarios Contables
            </h3>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg">
                    <thead className="bg-indigo-500 dark:bg-gray-700 text-white">
                    <tr>
                        <th className="py-3 px-6 text-center">Monto Mensual</th>
                        <th className="py-3 px-6 text-center">Monto Pagado</th>
                        <th className="py-3 px-6 text-center">Monto Restante</th>
                        <th className="py-3 px-6 text-center">Estado</th>
                        <th className="py-3 px-6 text-center">Mes</th>
                        <th className="py-3 px-6 text-center">Año</th>
                        <th className="py-3 px-6 text-center">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {honorariosContables.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="py-4 px-6 text-center text-gray-500 dark:text-gray-300">
                                <h4>No hay honorarios contables disponibles</h4>
                                <p>Revisa más tarde o agrega nuevos honorarios.</p>
                            </td>
                        </tr>
                    ) : (
                        paginatedData(honorariosContables, currentPage).map((honorario) =>
                            honorario.meses.map((mes) => (
                                <tr
                                    key={`${honorario.honorarioId}-${mes.mes}`}
                                    className="border-b dark:border-gray-700 hover:bg-indigo-100 dark:hover:bg-gray-600 transition-colors duration-200"
                                >
                                    <td className="py-4 px-6 text-center text-gray-700 dark:text-gray-300">
                                        ${Number(mes.montoMensual).toLocaleString("es-CL")}
                                    </td>
                                    <td className="py-4 px-6 text-center text-gray-700 dark:text-gray-300">
                                        {mes.montoPagado
                                            ? `$${Number(mes.montoPagado).toLocaleString("es-CL")}`
                                            : "$0"}
                                    </td>
                                    <td className="py-4 px-6 text-center text-gray-700 dark:text-gray-300">
                                        ${(
                                        Number(mes.montoMensual) - Number(mes.montoPagado)
                                    ).toLocaleString("es-CL")}
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                    mes.estado === "Pagado"
                                                        ? "bg-green-500 text-white"
                                                        : "bg-yellow-500 text-white"
                                                }`}
                                            >
                                                {mes.estado}
                                            </span>
                                    </td>
                                    <td className="py-4 px-6 text-center text-gray-700 dark:text-gray-300">
                                        {dayjs().month(mes.mes - 1).format("MMMM")}
                                    </td>
                                    <td className="py-4 px-6 text-center text-gray-700 dark:text-gray-300">
                                    {honorario.anio}
                                    </td>
                                    <td className="py-4 px-6 text-center space-x-2">
                                        {/* Ver Detalles */}
                                        <button
                                            onClick={() => handleViewHonorarioDetails(honorario.honorarioId)}
                                            title="Ver Detalles"
                                            className="text-indigo-500 dark:text-indigo-300 hover:text-indigo-700 dark:hover:text-indigo-100"
                                        >
                                            <FaEye size={20}/>
                                        </button>

                                        {/* Eliminar Honorario */}
                                        <button
                                            onClick={() => handleDeleteHonorarioClick(honorario)}
                                            title="Eliminar Honorario"
                                            className="text-red-500 dark:text-red-300 hover:text-red-700 dark:hover:text-red-100"
                                        >
                                            <FaTrash size={20}/>
                                        </button>

                                        {/* Editar Honorario */}
                                        <button
                                            onClick={() => handleEditHonorarioClick(honorario.honorarioId, mes.mes, mes.montoMensual)}
                                            title="Editar Honorario"
                                            className="text-yellow-500 dark:text-yellow-300 hover:text-yellow-700 dark:hover:text-yellow-100"
                                        >
                                            <FaPencilAlt size={20}/>
                                        </button>

                                        {/* Registrar Pago */}
                                        <button
                                            onClick={() => openPaymentModal(honorario.honorarioId, mes.mes)}
                                            title="Registrar Pago"
                                            className="text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-100"
                                        >
                                            <FaPlus size={20}/>
                                        </button>

                                    </td>
                                </tr>
                            ))
                        )
                    )}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            <div className="flex justify-between items-center mt-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    title="Página anterior"
                    className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                    <FaChevronLeft className="text-gray-500 dark:text-gray-300" />
                </button>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                    Página {currentPage} de {Math.ceil(honorariosContables.length / itemsPerPage)}
                </span>
                <button
                    disabled={currentPage === Math.ceil(honorariosContables.length / itemsPerPage)}
                    onClick={() => onPageChange(currentPage + 1)}
                    title="Página siguiente"
                    className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                    <FaChevronRight className="text-gray-500 dark:text-gray-300" />
                </button>
            </div>

            {/* Modal para Confirmación de Eliminación */}
            {showDeleteConfirmation && (
                <Modal isOpen={showDeleteConfirmation} onClose={() => setShowDeleteConfirmation(false)}>
                    <div>
                        <h3>¿Estás seguro de que deseas eliminar este honorario?</h3>
                        <div className="flex justify-between">
                            <button
                                onClick={confirmDeleteHonorario}
                                className="bg-red-500 text-white py-2 px-4 rounded"
                            >
                                Confirmar Eliminación
                            </button>
                            <button
                                onClick={() => setShowDeleteConfirmation(false)}
                                className="bg-gray-300 text-black py-2 px-4 rounded"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            {showEditHonorarioModal && (
                <Modal isOpen={showEditHonorarioModal} onClose={() => setShowEditHonorarioModal(false)}>
                    <div>
                        <h3>Editar Honorario - Mes {selectedMes}</h3>
                        <input
                            type="number"
                            value={nuevoMontoMensual}
                            onChange={(e) => setNuevoMontoMensual(e.target.value)}
                            placeholder="Nuevo monto mensual"
                            className="w-full p-2 mt-2 border rounded"
                        />
                        <button
                            onClick={handleSubmitEdit}
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            Guardar Cambios
                        </button>
                    </div>
                </Modal>
            )}

        </div>
    );
};

export default HonoraryList;