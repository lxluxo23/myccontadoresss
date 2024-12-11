import React, { useState } from "react";

const AddAccountingHonorary = ({ onSubmit, clienteId, onClose }) => {
    const [honoraryData, setHonoraryData] = useState({
        montoMensual: "",
    });
    const [selectedMonths] = useState(Array.from({ length: 12 }, (_, i) => i + 1)); // Preselección automática de 12 meses
    const [comprobantes, setComprobantes] = useState({});
    const [pagosMeses, setPagosMeses] = useState({});
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHonoraryData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleComprobanteChange = (month, file) => {
        setComprobantes((prev) => ({
            ...prev,
            [month]: file,
        }));
    };

    const handlePagoChange = (month, value) => {
        setPagosMeses((prev) => ({
            ...prev,
            [month]: value,
        }));
    };

    const validateForm = () => {
        if (!honoraryData.montoMensual || Number(honoraryData.montoMensual) <= 0) {
            setError("El monto mensual debe ser mayor a 0.");
            return false;
        }

        setError(null);
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const mesesData = selectedMonths.map((month) => ({
            mes: month,
            comprobante: comprobantes[month] || null,
            montoPagado: pagosMeses[month] ? Number(pagosMeses[month]) : 0,
        }));

        const payload = {
            montoMensual: honoraryData.montoMensual,
            mesesData,
        };

        try {
            await onSubmit(clienteId, payload);
            onClose();
        } catch (error) {
            setError("Ocurrió un error al enviar los datos. Por favor, inténtalo de nuevo.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-6">
            <h2 className="text-2xl font-bold text-green-500">
                Agregar Honorario Contable
            </h2>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div>
                <label className="block text-sm font-medium mb-1">Monto Mensual</label>
                <input
                    type="number"
                    name="montoMensual"
                    value={honoraryData.montoMensual}
                    onChange={handleChange}
                    className="no-spinner w-full p-2 border rounded-lg"
                    min="0"
                    step="0.01"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-2">Seleccionar Meses y Pagos</label>
                <div className="grid grid-cols-3 gap-4">
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                        <div
                            key={month}
                            className="flex flex-col items-center p-3 border rounded-md bg-gray-50 shadow-sm"
                        >
                            <label className="text-sm font-semibold mb-2 capitalize">
                                {new Date(0, month - 1).toLocaleString("es-ES", {
                                    month: "short",
                                })}
                            </label>
                            <input
                                type="number"
                                value={pagosMeses[month] || ""}
                                onChange={(e) => handlePagoChange(month, e.target.value)}
                                placeholder="Monto Pagado"
                                className="no-spinner w-full p-2 border rounded-lg text-center focus:outline-none focus:ring focus:ring-green-300"
                                min="0"
                                step="0.01"
                            />
                            <input
                                type="file"
                                onChange={(e) => handleComprobanteChange(month, e.target.files[0])}
                                className="w-full mt-2 text-sm text-gray-500"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-end gap-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                    Agregar
                </button>
            </div>
        </form>
    );
};

export default AddAccountingHonorary;
