// AddAccountingHonorary.jsx
import React, { useState, useEffect } from "react";

const AddAccountingHonorary = ({
                                   onSubmit,
                                   clienteId,
                                   onClose,
                                   existingData = null,
                                   isEdit = false,
                               }) => {
    const [honoraryData, setHonoraryData] = useState({
        montoMensual: existingData ? existingData.montoMensual : "",
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        if (existingData && existingData.meses) {
            const pagos = {};
            existingData.meses.forEach((mes) => {
                pagos[mes.mes] = mes.montoPagado;
            });
            setHonoraryData({
                montoMensual: existingData.montoMensual,
            });
        }
    }, [existingData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHonoraryData((prevData) => ({
            ...prevData,
            [name]: value,
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

        const payload = {
            montoMensual: Number(honoraryData.montoMensual).toFixed(2), // Asegura dos decimales
        };

        try {
            await onSubmit(clienteId, payload);
            setSuccessMessage(
                isEdit
                    ? "Honorario contable actualizado exitosamente."
                    : "Honorario contable agregado exitosamente."
            );
            setTimeout(() => {
                setSuccessMessage(null);
                onClose();
            }, 2000);
        } catch (error) {
            setError("Ocurrió un error al enviar los datos. Por favor, inténtalo de nuevo.");
        }
    };

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

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-green-500 dark:text-green-400">
                {isEdit ? "Editar Honorario Contable" : "Agregar Honorario Contable"}
            </h2>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {successMessage && (
                <div className="text-green-500 text-sm">{successMessage}</div>
            )}
            <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Monto Mensual
                </label>
                <input
                    type="number"
                    name="montoMensual"
                    value={honoraryData.montoMensual}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500"
                    min="0"
                    step="0.01"
                    required
                />
            </div>
            <div className="flex justify-end gap-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-700 transition-colors"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded-lg hover:bg-green-600 dark:hover:bg-green-700 transition-colors"
                >
                    {isEdit ? "Actualizar" : "Agregar"}
                </button>
            </div>
        </form>
    );
};

export default AddAccountingHonorary;
