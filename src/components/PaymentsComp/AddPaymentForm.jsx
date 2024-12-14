import React, { useState, useEffect } from "react";
import axios from "axios";

const AddPaymentForm = ({ onSubmit, onClose, userId }) => {
    const [fechaPago, setFechaPago] = useState("");
    const [monto, setMonto] = useState("0");
    const [metodoPago, setMetodoPago] = useState("");
    const [observaciones, setObservaciones] = useState("");
    const [deudaSeleccionada, setDeudaSeleccionada] = useState(null);
    const [deudas, setDeudas] = useState([]);

    useEffect(() => {
        if (userId) {
            axios
                .get(`https://backend.cobros.myccontadores.cl/api/deudas/usuario/${userId}/pendientes`)
                .then((response) => {
                    const deudasPendientes = Array.isArray(response.data) ? response.data : [];
                    setDeudas(deudasPendientes);
                })
                .catch((error) => {
                    console.error("Error al obtener las deudas pendientes:", error);
                    setDeudas([]);
                });
        }
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones del formulario
        if (!fechaPago) {
            alert("Debe seleccionar una fecha de pago.");
            return;
        }
        if (!monto || isNaN(parseFloat(monto)) || parseFloat(monto) <= 0) {
            alert("Debe ingresar un monto válido mayor a 0.");
            return;
        }
        if (!metodoPago) {
            alert("Debe seleccionar un método de pago.");
            return;
        }
        if (!deudaSeleccionada) {
            alert("Debe seleccionar una deuda pendiente para registrar el pago.");
            return;
        }

        try {
            // Enviar datos al backend
            await axios.post(
                `https://backend.cobros.myccontadores.cl/api/pagos/registrar/${deudaSeleccionada}`,
                {
                    fechaPago,
                    monto: parseFloat(monto),
                    metodoPago,
                    observaciones,
                }
            );
            alert("Pago registrado con éxito.");
            onClose();
        } catch (error) {
            console.error("Error al registrar el pago:", error.response?.data || error.message);
            alert("Hubo un error al registrar el pago. Intente nuevamente.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-gray-700 dark:text-gray-300">Fecha de Pago</label>
                <input
                    type="date"
                    value={fechaPago}
                    onChange={(e) => setFechaPago(e.target.value)}
                    className="w-full p-2 border rounded-md"
                />
            </div>
            <div>
                <label className="block text-gray-700 dark:text-gray-300">Monto</label>
                <input
                    type="number"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                    className="w-full p-2 border rounded-md"
                />
            </div>
            <div>
                <label className="block text-gray-700 dark:text-gray-300">Método de Pago</label>
                <select
                    value={metodoPago}
                    onChange={(e) => setMetodoPago(e.target.value)}
                    className="w-full p-2 border rounded-md"
                >
                    <option value="">Seleccione</option>
                    <option value="Transferencia">Transferencia</option>
                    <option value="Tarjeta">Tarjeta</option>
                    <option value="Efectivo">Efectivo</option>
                    <option value="Cheque">Cheque</option>
                </select>
            </div>
            <div>
                <label className="block text-gray-700 dark:text-gray-300">Seleccionar Deuda</label>
                <select
                    value={deudaSeleccionada}
                    onChange={(e) => setDeudaSeleccionada(e.target.value)}
                    className="w-full p-2 border rounded-md"
                >
                    <option value="">Seleccione una deuda pendiente</option>
                    {deudas.length > 0 ? (
                        deudas.map((deuda) => (
                            <option key={deuda.deudaId} value={deuda.deudaId}>
                                {deuda.descripcion || "Sin descripción"}
                            </option>
                        ))
                    ) : (
                        <option disabled>No hay deudas pendientes</option>
                    )}
                </select>
            </div>
            <div>
                <label className="block text-gray-700 dark:text-gray-300">Observaciones</label>
                <textarea
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                    className="w-full p-2 border rounded-md"
                />
            </div>
            <button type="submit" className="w-full bg-indigo-500 text-white py-2 rounded-md">
                Agregar Pago
            </button>
        </form>
    );
};

export default AddPaymentForm;