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
        anio: existingData ? existingData.anio : new Date().getFullYear(),
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        if (existingData) {
            setHonoraryData({
                montoMensual: existingData.montoMensual,
                anio: existingData.anio || new Date().getFullYear(),
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
        if (!honoraryData.anio || Number(honoraryData.anio) <= 0) {
            setError("Debes ingresar un año válido.");
            return false;
        }
        setError(null);
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const payload = {
            montoMensual: Number(honoraryData.montoMensual).toFixed(2),
            anio: Number(honoraryData.anio),
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

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6 p-6">
            <h2 className="text-2xl font-bold text-green-500 dark:text-green-400 text-center">
                {isEdit ? "Editar Honorario Contable" : "Agregar Honorario Contable"}
            </h2>

            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            {successMessage && (
                <div className="text-green-500 text-sm text-center">{successMessage}</div>
            )}

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Monto Mensual
                </label>
                <input
                    type="number"
                    name="montoMensual"
                    value={honoraryData.montoMensual}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                    min="0"
                    step="0.01"
                    required
                />
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Año
                </label>
                <input
                    type="number"
                    name="anio"
                    value={honoraryData.anio}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                    min="1900"
                    max="2100"
                    required
                />
            </div>

            <div className="flex justify-end gap-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-700 transition-colors"
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
