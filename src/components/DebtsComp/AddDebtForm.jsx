import React, { useState, useEffect } from "react";

export const AddDebtForm = ({ onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        tipoDeuda: "",
        montoTotal: "",
        fechaInicio: "",
        fechaVencimiento: "",
        observaciones: "",
    });

    const [displayMontoTotal, setDisplayMontoTotal] = useState("");
    const [errors, setErrors] = useState({});

    // Actualizar formData cuando cambia displayMontoTotal
    useEffect(() => {
        const numericValue = displayMontoTotal.replace(/\./g, "");
        if (!isNaN(numericValue) && numericValue !== "") {
            setFormData((prev) => ({
                ...prev,
                montoTotal: numericValue,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                montoTotal: "",
            }));
        }
    }, [displayMontoTotal]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleMontoChange = (e) => {
        const { value } = e.target;
        const numericValue = value.replace(/\D/g, "");
        const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        setDisplayMontoTotal(formattedValue);
    };

    const validate = () => {
        let newErrors = {};

        if (!formData.tipoDeuda) {
            newErrors.tipoDeuda = "Debe seleccionar un tipo de deuda.";
        }

        const montoNumber = parseFloat(formData.montoTotal);
        if (isNaN(montoNumber) || montoNumber <= 0) {
            newErrors.montoTotal = "El monto debe ser mayor que 0.";
        }

        if (formData.fechaInicio && formData.fechaVencimiento) {
            const inicio = new Date(formData.fechaInicio);
            const venc = new Date(formData.fechaVencimiento);
            if (venc < inicio) {
                // No agregamos error aquí, ya que se maneja en el submit con confirmación
                newErrors.fechaVencimiento = "La fecha de vencimiento es anterior a la fecha de inicio.";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        validate();
    }, [formData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validamos primero
        const isValid = validate();

        // Chequear fechas
        let proceed = true;
        if (formData.fechaInicio && formData.fechaVencimiento) {
            const inicio = new Date(formData.fechaInicio);
            const venc = new Date(formData.fechaVencimiento);
            if (venc < inicio) {
                // Preguntar confirmación al usuario
                const userConfirmed = window.confirm("La fecha de vencimiento es anterior a la fecha de inicio. ¿Desea continuar?");
                if (!userConfirmed) {
                    proceed = false;
                }
            }
        }

        if (!isValid || !proceed) {
            return; // No enviar si hay errores o el usuario canceló
        }

        const montoNumber = parseFloat(formData.montoTotal);

        const debtData = {
            tipoDeuda: formData.tipoDeuda,
            montoTotal: montoNumber,
            fechaInicio: formData.fechaInicio,
            fechaVencimiento: formData.fechaVencimiento,
            observaciones: formData.observaciones || null,
        };

        onSubmit(debtData);
    };

    const isDisabled = Object.keys(errors).length > 0 && !errors.fechaVencimiento;

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 dark:text-gray-100 p-6 rounded-md">
            <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Agregar Nueva Deuda</h2>

            <div className="space-y-2">
                <label className="block text-gray-700 dark:text-gray-200">Tipo de Deuda</label>
                <select
                    name="tipoDeuda"
                    value={formData.tipoDeuda}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-400"
                >
                    <option value="">Seleccione</option>
                    <option value="Imposiciones">Imposiciones</option>
                    <option value="Impuesto IVA">Impuesto IVA</option>
                    <option value="Talonarios">Talonarios</option>
                    <option value="Multas">Multas</option>
                    <option value="Impuesto Renta">Impuesto Renta</option>
                    <option value="Contribuciones">Contribuciones</option>
                    <option value="Otros">Otros</option>
                </select>
                {errors.tipoDeuda && <p className="text-red-500 text-sm">{errors.tipoDeuda}</p>}
            </div>

            <div className="space-y-2">
                <label className="block text-gray-700 dark:text-gray-200">Monto Total</label>
                <input
                    type="text"
                    name="montoTotal"
                    value={displayMontoTotal}
                    onChange={handleMontoChange}
                    required
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-400"
                />
                {errors.montoTotal && <p className="text-red-500 text-sm">{errors.montoTotal}</p>}
            </div>

            <div className="space-y-2">
                <label className="block text-gray-700 dark:text-gray-200">Fecha Inicio</label>
                <input
                    type="date"
                    name="fechaInicio"
                    value={formData.fechaInicio}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-400"
                />
            </div>

            <div className="space-y-2">
                <label className="block text-gray-700 dark:text-gray-200">Fecha Vencimiento</label>
                <input
                    type="date"
                    name="fechaVencimiento"
                    value={formData.fechaVencimiento}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-400"
                />
                {errors.fechaVencimiento && <p className="text-red-500 text-sm">{errors.fechaVencimiento}</p>}
            </div>

            <div className="space-y-2">
                <label className="block text-gray-700 dark:text-gray-200">Observaciones</label>
                <textarea
                    name="observaciones"
                    value={formData.observaciones}
                    onChange={handleChange}
                    placeholder="Opcional"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-400"
                />
            </div>

            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-600 dark:text-gray-200 text-gray-800 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className={`px-4 py-2 rounded-md shadow text-white ${
                        isDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"
                    } dark:bg-indigo-600 dark:hover:bg-indigo-500`}
                    disabled={isDisabled}
                >
                    Agregar
                </button>
            </div>
        </form>
    );
};
