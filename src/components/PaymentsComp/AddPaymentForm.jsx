import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../../config/config";

const AddPaymentForm = ({ onClose, userId, onPaymentAdded }) => {
    const [fechaPago, setFechaPago] = useState("");
    const [monto, setMonto] = useState("0");
    const [metodoPago, setMetodoPago] = useState("");
    const [observaciones, setObservaciones] = useState("");
    const [deudaSeleccionada, setDeudaSeleccionada] = useState("");
    const [deudas, setDeudas] = useState([]);
    const [comprobante, setComprobante] = useState(null);

    useEffect(() => {
        if (userId) {
            axios
                .get(`${config.apiUrl}/api/deudas/usuario/${userId}/pendientes`)
                .then((response) => {
                    const deudasPendientes = Array.isArray(response.data)
                        ? response.data
                        : [];
                    setDeudas(deudasPendientes);
                })
                .catch((error) => {
                    console.error("Error al obtener las deudas pendientes:", error);
                    setDeudas([]);
                });
        }
    }, [userId]);

    // Función para formatear el monto con separadores de miles
    const formatMonto = (value) =>
        value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    const handleMontoChange = (e) => {
        const rawValue = e.target.value.replace(/\./g, "");
        if (!isNaN(rawValue)) {
            setMonto(formatMonto(rawValue));
        }
    };

    const handleFileChange = (e) => {
        setComprobante(e.target.files[0]);
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

        const formData = new FormData();
        formData.append("montoPago", parseFloat(monto.replace(/\./g, "")));
        if (comprobante) {
            formData.append("comprobante", comprobante);
        }
        formData.append("fechaPagoReal", fechaPago);
        formData.append("metodoPago", metodoPago);
        if (observaciones) {
            formData.append("observaciones", observaciones);
        }

        try {
            const response = await axios.post(
                `${config.apiUrl}/api/pagos/${deudaSeleccionada}/registrar`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            onPaymentAdded(response.data);
            alert("Pago registrado con éxito.");
            onClose();
        } catch (error) {
            console.error(
                "Error al registrar el pago:",
                error.response?.data || error.message
            );
            alert("Hubo un error al registrar el pago. Intente nuevamente.");
        }
    };

    // Condición para desactivar el botón de envío si faltan los datos mínimos
    const isDisabled =
        !fechaPago ||
        !monto ||
        parseFloat(monto.replace(/\./g, "")) <= 0 ||
        !metodoPago ||
        !deudaSeleccionada;

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-indigo-600 text-center">
                Registrar Pago
            </h2>
            <div>
                <label className="block mb-1 text-gray-700 dark:text-gray-300">
                    Seleccionar Deuda
                </label>
                <select
                    value={deudaSeleccionada}
                    onChange={(e) => setDeudaSeleccionada(e.target.value)}
                    className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center appearance-none"
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
                        <label className="block mb-1 text-gray-700 dark:text-gray-300">
                            Fecha de Pago
                        </label>
                        <input
                            type="date"
                            value={fechaPago}
                            onChange={(e) => setFechaPago(e.target.value)}
                            className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-700 dark:text-gray-300">
                            Monto
                        </label>
                        <input
                            type="text"
                            value={monto}
                            onChange={handleMontoChange}
                            className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            inputMode="numeric"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-700 dark:text-gray-300">
                            Método de Pago
                        </label>
                        <select
                            value={metodoPago}
                            onChange={(e) => setMetodoPago(e.target.value)}
                            className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center appearance-none"
                        >
                            <option value="">Seleccione</option>
                            <option value="TRANSFERENCIA">Transferencia</option>
                            <option value="TARJETA">Tarjeta</option>
                            <option value="EFECTIVO">Efectivo</option>
                            <option value="CHEQUE">Cheque</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-700 dark:text-gray-300">
                            Comprobante (opcional)
                        </label>
                        <input
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={handleFileChange}
                            className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-700 dark:text-gray-300">
                            Observaciones
                        </label>
                        <textarea
                            value={observaciones}
                            onChange={(e) => setObservaciones(e.target.value)}
                            className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            rows="3"
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-md transition-colors ${
                            isDisabled ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={isDisabled}
                    >
                        Agregar Pago
                    </button>
                </>
            )}
        </form>
    );
};

export default AddPaymentForm;
