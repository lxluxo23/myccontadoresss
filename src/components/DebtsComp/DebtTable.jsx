// DebtTable.jsx
import React, { useState, useEffect } from "react";
import {
    FaEye,
    FaChevronLeft,
    FaChevronRight,
    FaTrash,
    FaPlus,
} from "react-icons/fa";
import dayjs from "dayjs";
import AddAccountingHonorary from "./AddAccountingHonorary"; // Asegúrate de que esta ruta sea correcta
import ConfirmationModal from "./ConfirmationModal"; // Asegúrate de que esta ruta sea correcta
import Spinner from "./Spinner"; // Asegúrate de que esta ruta sea correcta
import Modal from "./Modal"; // Tu componente Modal personalizado

const DebtTable = ({ debts = [], honorariosContables = [], clienteId }) => {
    // Estados para Deudas
    const [currentPageDebts, setCurrentPageDebts] = useState(1);
    const itemsPerPage = 10;

    // Estados para Honorarios Contables
    const [currentPageHonorarios, setCurrentPageHonorarios] = useState(1);
    const [honorariosData, setHonorariosData] = useState([]);
    const [loadingHonorarios, setLoadingHonorarios] = useState(false);
    const [selectedHonorario, setSelectedHonorario] = useState(null);
    const [showAddHonorarioModal, setShowAddHonorarioModal] = useState(false);
    // Eliminados: showEditHonorarioModal, setShowEditHonorarioModal
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [honorarioToDelete, setHonorarioToDelete] = useState(null);
    const [error, setError] = useState(null);

    // Estados para Detalles de Deuda
    const [selectedDebtId, setSelectedDebtId] = useState(null);
    const [detailedDebt, setDetailedDebt] = useState(null);
    const [loadingDetails, setLoadingDetails] = useState(false);

    // Estados para Eliminar Deuda
    const [showDeleteDebtConfirmation, setShowDeleteDebtConfirmation] = useState(false);
    const [debtToDelete, setDebtToDelete] = useState(null);

    // Fetch Honorarios Contables al cargar el componente o al cambiar de página
    useEffect(() => {
        fetchHonorarios();
    }, [currentPageHonorarios]);

    const fetchHonorarios = async () => {
        setLoadingHonorarios(true);
        try {
            const response = await fetch(`https://backend.cobros.myccontadores.cl/api/honorarios/cliente/${clienteId}`);
            if (!response.ok) {
                throw new Error("Error al obtener los honorarios contables.");
            }
            const data = await response.json();
            setHonorariosData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoadingHonorarios(false);
        }
    };

    const paginatedData = (data, currentPage) =>
        data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const obtenerNombreMes = (numeroMes) => {
        const meses = [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
        ];
        return meses[numeroMes - 1] || "Mes desconocido";
    };

    // Manejo de Detalles de Deuda
    const handleViewDetails = async (debt) => {
        setSelectedDebtId(debt.deudaId);
        setLoadingDetails(true);
        try {
            const response = await fetch(`https://backend.cobros.myccontadores.cl/api/deudas/${debt.deudaId}/detalle`);
            if (!response.ok) {
                throw new Error("Error al obtener detalles de la deuda");
            }
            const data = await response.json();
            setDetailedDebt(data);
        } catch (error) {
            console.error("No se pudieron cargar los detalles de la deuda:", error);
        } finally {
            setLoadingDetails(false);
        }
    };

    const closeDetails = () => {
        setDetailedDebt(null);
        setSelectedDebtId(null);
    };

    // Manejo de Honorarios Contables
    const handleAddHonorario = () => {
        setShowAddHonorarioModal(true);
    };

    // Eliminado: handleEditHonorario

    const handleDeleteHonorario = (honorario) => {
        setHonorarioToDelete(honorario);
        setShowDeleteConfirmation(true);
    };

    const confirmDeleteHonorario = async () => {
        try {
            const response = await fetch(`hhttps://backend.cobros.myccontadores.cl/api/honorarios/${honorarioToDelete.honorarioId}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Error al eliminar el honorario contable.");
            }
            // Refrescar los honorarios
            fetchHonorarios();
            setShowDeleteConfirmation(false);
            setHonorarioToDelete(null);
        } catch (err) {
            setError(err.message);
            setShowDeleteConfirmation(false);
            setHonorarioToDelete(null);
        }
    };

    const handleSubmitHonorario = async (clienteId, payload) => {
        try {
            const response = await fetch(`https://backend.cobros.myccontadores.cl/api/honorarios/${clienteId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Error al crear el honorario contable.");
            }
            // Refrescar los honorarios
            fetchHonorarios();
        } catch (err) {
            setError(err.message);
            throw err; // Para manejar el error en el formulario
        }
    };

    // Eliminado: handleUpdateHonorario

    // Manejo de Eliminación de Deuda
    const handleDeleteDebt = (debt) => {
        setDebtToDelete(debt);
        setShowDeleteDebtConfirmation(true);
    };

    const confirmDeleteDebt = async () => {
        try {
            const response = await fetch(`https://backend.cobros.myccontadores.cl/api/deudas/${debtToDelete.deudaId}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Error al eliminar la deuda.");
            }
            // Refrescar la lista de deudas
            // Asumiendo que hay una función para obtener las deudas, si no, necesitarías implementar una
            // Por ejemplo:
            // fetchDebts();
            // Si no, puedes manejarlo pasando la lista de deudas como props desde un componente padre
            // Aquí, para simplificar, filtramos localmente
            // setDebts(prevDebts => prevDebts.filter(d => d.deudaId !== debtToDelete.deudaId));
            // Pero dado que debts viene como prop, deberías manejarlo en el componente padre
            // Así que notificamos al usuario que la deuda ha sido eliminada
            setError(null);
            alert("Deuda eliminada exitosamente.");
            setShowDeleteDebtConfirmation(false);
            setDebtToDelete(null);
            // Opcional: Refrescar la página o notificar al componente padre de la eliminación
        } catch (err) {
            setError(err.message);
            setShowDeleteDebtConfirmation(false);
            setDebtToDelete(null);
        }
    };

    return (
        <div className="space-y-6 bg-white dark:bg-gray-900 rounded-xl shadow-md dark:shadow-gray-700 p-6 transition-colors duration-300">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 text-center">
                Gestión de Deudas y Honorarios Contables
            </h2>

            {/* Deudas Normales */}
            <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Deudas Normales
                </h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg">
                        <thead className="bg-indigo-500 dark:bg-gray-700 text-white">
                        <tr>
                            <th className="py-3 px-6 text-center">Tipo de Deuda</th>
                            <th className="py-3 px-6 text-center">Monto Total</th>
                            <th className="py-3 px-6 text-center">Monto Restante</th>
                            <th className="py-3 px-6 text-center">Estado</th>
                            <th className="py-3 px-6 text-center">Fecha Inicio</th>
                            <th className="py-3 px-6 text-center">Fecha Vencimiento</th>
                            <th className="py-3 px-6 text-center">Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {paginatedData(debts, currentPageDebts).map((debt, index) => (
                            <tr
                                key={debt.deudaId}
                                className={`border-b dark:border-gray-700 ${
                                    index % 2 === 0
                                        ? "bg-gray-50 dark:bg-gray-800"
                                        : "bg-white dark:bg-gray-700"
                                } hover:bg-indigo-100 dark:hover:bg-gray-600 transition-colors duration-200`}
                            >
                                <td className="py-4 px-6 text-center text-gray-700 dark:text-gray-300">
                                    {debt.tipoDeuda || "Desconocido"}
                                </td>
                                <td className="py-4 px-6 text-center text-gray-700 dark:text-gray-300">
                                    {debt.montoTotal
                                        ? `$${Number(debt.montoTotal).toLocaleString("es-CL")}`
                                        : "N/A"}
                                </td>
                                <td className="py-4 px-6 text-center text-gray-700 dark:text-gray-300">
                                    {debt.montoRestante
                                        ? `$${Number(debt.montoRestante).toLocaleString("es-CL")}`
                                        : "N/A"}
                                </td>
                                <td className="py-4 px-6 text-center">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                debt.estadoDeuda === "Pagado"
                                                    ? "bg-green-500 text-white"
                                                    : "bg-red-500 text-white"
                                            }`}
                                        >
                                            {debt.estadoDeuda || "Desconocido"}
                                        </span>
                                </td>
                                <td className="py-4 px-6 text-center text-gray-700 dark:text-gray-300">
                                    {debt.fechaInicio
                                        ? dayjs(debt.fechaInicio).format("DD/MM/YYYY")
                                        : "Sin fecha"}
                                </td>
                                <td className="py-4 px-6 text-center text-gray-700 dark:text-gray-300">
                                    {debt.fechaVencimiento
                                        ? dayjs(debt.fechaVencimiento).format("DD/MM/YYYY")
                                        : "Sin fecha"}
                                </td>
                                <td className="py-4 px-6 text-center space-x-2">
                                    <button
                                        onClick={() => handleViewDetails(debt)}
                                        title="Ver Detalles"
                                        className="text-indigo-500 dark:text-indigo-300 hover:text-indigo-700 dark:hover:text-indigo-100"
                                    >
                                        <FaEye size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteDebt(debt)}
                                        title="Eliminar Deuda"
                                        className="text-red-500 dark:text-red-300 hover:text-red-700 dark:hover:text-red-100"
                                    >
                                        <FaTrash size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                {/* Paginación de Deudas */}
                <div className="flex justify-between items-center mt-4">
                    <button
                        disabled={currentPageDebts === 1}
                        onClick={() => setCurrentPageDebts((prev) => prev - 1)}
                        title="Página anterior"
                        className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                        <FaChevronLeft className="text-gray-500 dark:text-gray-300" />
                    </button>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        Página {currentPageDebts} de {Math.ceil(debts.length / itemsPerPage)}
                    </span>
                    <button
                        disabled={currentPageDebts === Math.ceil(debts.length / itemsPerPage)}
                        onClick={() => setCurrentPageDebts((prev) => prev + 1)}
                        title="Página siguiente"
                        className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                        <FaChevronRight className="text-gray-500 dark:text-gray-300" />
                    </button>
                </div>
            </div>

            {/* Honorarios Contables */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        Honorarios Contables
                    </h3>
                    <button
                        onClick={handleAddHonorario}
                        title="Agregar Honorario Contable"
                        className="flex items-center px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded-lg hover:bg-green-600 dark:hover:bg-green-700 transition-colors duration-200"
                    >
                        <FaPlus className="mr-2" /> Agregar Honorario
                    </button>
                </div>
                {error && (
                    <div className="text-red-500 text-sm mb-2">{error}</div>
                )}
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
                        {loadingHonorarios ? (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="py-4 px-6 text-center text-gray-700 dark:text-gray-300"
                                >
                                    <Spinner />
                                </td>
                            </tr>
                        ) : honorariosData.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="py-4 px-6 text-center text-gray-700 dark:text-gray-300"
                                >
                                    No hay honorarios contables disponibles.
                                </td>
                            </tr>
                        ) : (
                            paginatedData(
                                honorariosData,
                                currentPageHonorarios
                            ).map((honorario) =>
                                honorario.meses.map((mes) => (
                                    <tr
                                        key={`${honorario.honorarioId}-${mes.mes}`}
                                        className={`border-b dark:border-gray-700 ${
                                            mes.estado === "Pagado"
                                                ? "bg-green-50 dark:bg-green-900"
                                                : mes.estado === "Pendiente"
                                                    ? "bg-yellow-50 dark:bg-yellow-900"
                                                    : "bg-white dark:bg-gray-800"
                                        } hover:bg-indigo-100 dark:hover:bg-indigo-700 transition-colors duration-200`}
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
                                            Number(mes.montoMensual) -
                                            (Number(mes.montoPagado) || 0)
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
                                            {obtenerNombreMes(mes.mes)}
                                        </td>
                                        <td className="py-4 px-6 text-center text-gray-700 dark:text-gray-300">
                                            {honorario.anio}
                                        </td>
                                        <td className="py-4 px-6 text-center space-x-2">
                                            {/* Eliminado: Botón de Editar */}
                                            <button
                                                onClick={() => handleDeleteHonorario(honorario)}
                                                title="Eliminar Honorario"
                                                className="text-red-500 dark:text-red-300 hover:text-red-700 dark:hover:text-red-100"
                                            >
                                                <FaTrash size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )
                        )}
                        </tbody>
                    </table>
                </div>
                {/* Paginación de Honorarios */}
                <div className="flex justify-between items-center mt-4">
                    <button
                        disabled={currentPageHonorarios === 1}
                        onClick={() => setCurrentPageHonorarios((prev) => prev - 1)}
                        title="Página anterior"
                        className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                        <FaChevronLeft className="text-gray-500 dark:text-gray-300" />
                    </button>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        Página {currentPageHonorarios} de {Math.ceil(honorariosData.length / itemsPerPage)}
                    </span>
                    <button
                        disabled={
                            currentPageHonorarios === Math.ceil(honorariosData.length / itemsPerPage)
                        }
                        onClick={() => setCurrentPageHonorarios((prev) => prev + 1)}
                        title="Página siguiente"
                        className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                        <FaChevronRight className="text-gray-500 dark:text-gray-300" />
                    </button>
                </div>
            </div>

            {/* Modal para Agregar Honorario */}
            {showAddHonorarioModal && (
                <Modal isOpen={showAddHonorarioModal} onClose={() => setShowAddHonorarioModal(false)}>
                    <AddAccountingHonorary
                        onSubmit={handleSubmitHonorario}
                        clienteId={clienteId}
                        onClose={() => setShowAddHonorarioModal(false)}
                    />
                </Modal>
            )}

            {/* Modal para Confirmar Eliminación de Honorario */}
            {showDeleteConfirmation && honorarioToDelete && (
                <ConfirmationModal
                    isOpen={showDeleteConfirmation}
                    onClose={() => setShowDeleteConfirmation(false)}
                    onConfirm={confirmDeleteHonorario}
                    message={`¿Estás seguro de que deseas eliminar el honorario contable del año ${honorarioToDelete.anio}? Esta acción no se puede deshacer.`}
                />
            )}

            {/* Modal para Confirmar Eliminación de Deuda */}
            {showDeleteDebtConfirmation && debtToDelete && (
                <ConfirmationModal
                    isOpen={showDeleteDebtConfirmation}
                    onClose={() => setShowDeleteDebtConfirmation(false)}
                    onConfirm={confirmDeleteDebt}
                    message={`¿Estás seguro de que deseas eliminar la deuda de tipo "${debtToDelete.tipoDeuda}" por un monto de $${Number(debtToDelete.montoTotal).toLocaleString("es-CL")}? Esta acción no se puede deshacer.`}
                />
            )}

            {/* Modal para Detalles de Deuda */}
            {detailedDebt && !loadingDetails && (
                <Modal isOpen={!!detailedDebt} onClose={closeDetails}>
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                            Detalles de la Deuda
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            <strong>Tipo de Deuda:</strong> {detailedDebt.tipoDeuda}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            <strong>Monto Total:</strong> $
                            {Number(detailedDebt.montoTotal).toLocaleString("es-CL")}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            <strong>Monto Restante:</strong> $
                            {Number(detailedDebt.montoRestante).toLocaleString("es-CL")}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            <strong>Estado:</strong> {detailedDebt.estadoDeuda}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            <strong>Fecha Creación:</strong>{" "}
                            {dayjs(detailedDebt.fechaCreacion).format("DD/MM/YYYY")}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            <strong>Fecha Inicio:</strong>{" "}
                            {detailedDebt.fechaInicio
                                ? dayjs(detailedDebt.fechaInicio).format("DD/MM/YYYY")
                                : "N/A"}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            <strong>Fecha Vencimiento:</strong>{" "}
                            {detailedDebt.fechaVencimiento
                                ? dayjs(detailedDebt.fechaVencimiento).format("DD/MM/YYYY")
                                : "N/A"}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            <strong>Observaciones:</strong>{" "}
                            {detailedDebt.observaciones || "N/A"}
                        </p>

                        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            Pagos Asociados
                        </h4>
                        {detailedDebt.pagos && detailedDebt.pagos.length > 0 ? (
                            <ul className="list-disc pl-5 space-y-2">
                                {detailedDebt.pagos.map((pago, idx) => (
                                    <li key={idx} className="border-b pb-2">
                                        <p className="text-gray-600 dark:text-gray-400">
                                            <strong>Fecha:</strong>{" "}
                                            {dayjs(pago.fechaTransaccion).format("DD/MM/YYYY")}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            <strong>Monto:</strong> $
                                            {Number(pago.monto).toLocaleString("es-CL")}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            <strong>Método:</strong> {pago.metodoPago}
                                        </p>
                                        {pago.observaciones && (
                                            <p className="text-gray-600 dark:text-gray-400">
                                                <strong>Obs:</strong> {pago.observaciones}
                                            </p>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600 dark:text-gray-400">
                                No hay pagos asociados.
                            </p>
                        )}
                    </div>
                </Modal>
            )}

            {/* Spinner de Carga para Honorarios */}
            {loadingHonorarios && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
                        <Spinner />
                        <p className="mt-4 text-gray-700 dark:text-gray-300">
                            Cargando honorarios...
                        </p>
                    </div>
                </div>
            )}
        </div>
    );

};

export default DebtTable;
