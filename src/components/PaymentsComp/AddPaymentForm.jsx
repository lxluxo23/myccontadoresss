// AddPaymentForm.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";

const AddPaymentForm = ({ onClose, userId, onPaymentAdded }) => {
    const [fechaPago, setFechaPago] = useState("");
    const [monto, setMonto] = useState("0");
    const [metodoPago, setMetodoPago] = useState("");
    const [observaciones, setObservaciones] = useState("");
    const [deudaSeleccionada, setDeudaSeleccionada] = useState("");
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

    const formatMonto = (value) => {
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const handleMontoChange = (e) => {
        const rawValue = e.target.value.replace(/\./g, ""); // Elimina los puntos antes de formatear
        if (!isNaN(rawValue)) {
            setMonto(formatMonto(rawValue));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fechaPago) {
            alert("Debe seleccionar una fecha de pago.");
            return;
        }
        if (!monto || parseFloat(monto.replace(/\./g, "")) <= 0) {
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
            const response = await axios.post(
                `https://backend.cobros.myccontadores.cl/api/pagos/registrar/${deudaSeleccionada}`,
                {
                    fechaTransaccion: fechaPago, // Agregar fechaTransaccion
                    monto: parseFloat(monto.replace(/\./g, "")), // Enviar el valor sin formato
                    metodoPago,
                    observaciones,
                }
            );

            onPaymentAdded(response.data);

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
                                {deuda.tipoDeuda || "Tipo no especificado"} - Monto Total:{" "}
                                {formatMonto(deuda.montoTotal.toString())} - Restante:{" "}
                                {formatMonto(deuda.montoRestante.toString())} - Observaciones:{" "}
                                {deuda.observaciones || "Sin observaciones"}
                            </option>
                        ))
                    ) : (
                        <option disabled>No hay deudas pendientes</option>
                    )}
                </select>
            </div>

            {deudaSeleccionada && (
                <>
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
                            type="text"
                            value={monto}
                            onChange={handleMontoChange}
                            className="w-full p-2 border rounded-md"
                            inputMode="numeric"
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
                            <option value="TRANSFERENCIA">Transferencia</option>
                            <option value="TARJETA">Tarjeta</option>
                            <option value="EFECTIVO">Efectivo</option>
                            <option value="CHEQUE">Cheque</option>
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
                </>
            )}
        </form>
    );
};

export default AddPaymentForm;
