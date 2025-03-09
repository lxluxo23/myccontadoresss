import React, { useState, useEffect } from "react";

export const EditDebtForm = ({ debt, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        tipoDeuda: debt.tipoDeuda || "",
        montoTotal: debt.montoTotal ? debt.montoTotal.toString() : "",
        fechaInicio: debt.fechaInicio || "",
        fechaVencimiento: debt.fechaVencimiento || "",
        observaciones: debt.observaciones || "",
    });
    const [displayMontoTotal, setDisplayMontoTotal] = useState("");
    const [errors, setErrors] = useState({});

    // Inicializar display con el monto formateado
    useEffect(() => {
        if (formData.montoTotal) {
            const numericValue = formData.montoTotal.toString();
            const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            setDisplayMontoTotal(formattedValue);
        }
    }, [formData.montoTotal]);

    // Sincronizar formData.montoTotal cuando cambia el display
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

        const isValid = validate();
        let proceed = true;
        if (formData.fechaInicio && formData.fechaVencimiento) {
            const inicio = new Date(formData.fechaInicio);
            const venc = new Date(formData.fechaVencimiento);
            if (venc < inicio) {
                const userConfirmed = window.confirm(
                    "La fecha de vencimiento es anterior a la fecha de inicio. ¿Desea continuar?"
                );
                if (!userConfirmed) {
                    proceed = false;
                }
            }
        }

        if (!isValid || !proceed) return;

        const montoNumber = parseFloat(formData.montoTotal);
        const debtData = {
            tipoDeuda: formData.tipoDeuda,
            montoTotal: montoNumber,
            fechaInicio: formData.fechaInicio,
            fechaVencimiento: formData.fechaVencimiento,
            observaciones: formData.observaciones || null,
        };

        onSubmit(debt.deudaId, debtData);
    };

    // Se deshabilita el botón si hay errores (exceptuando el de fecha, que se puede confirmar)
    const isDisabled = Object.keys(errors).length > 0 && !errors.fechaVencimiento;

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6 bg-white dark:bg-gray-800 dark:text-gray-100 p-6">
            <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 text-center">
                Editar Deuda
            </h2>

            {/* Campo Tipo de Deuda */}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Tipo de Deuda
                </label>
                <select
                    name="tipoDeuda"
                    value={formData.tipoDeuda}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center appearance-none"
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
                {errors.tipoDeuda && (
                    <p className="text-red-500 text-sm">{errors.tipoDeuda}</p>
                )}
            </div>

            {/* Campo Monto Total */}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Monto Total
                </label>
                <input
                    type="text"
                    name="montoTotal"
                    value={displayMontoTotal}
                    onChange={handleMontoChange}
                    required
                    className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.montoTotal && (
                    <p className="text-red-500 text-sm">{errors.montoTotal}</p>
                )}
            </div>

            {/* Campo Fecha Inicio */}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Fecha Inicio
                </label>
                <input
                    type="date"
                    name="fechaInicio"
                    value={formData.fechaInicio}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            {/* Campo Fecha Vencimiento */}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Fecha Vencimiento
                </label>
                <input
                    type="date"
                    name="fechaVencimiento"
                    value={formData.fechaVencimiento}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.fechaVencimiento && (
                    <p className="text-red-500 text-sm">{errors.fechaVencimiento}</p>
                )}
            </div>

            {/* Campo Observaciones */}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Observaciones
                </label>
                <textarea
                    name="observaciones"
                    value={formData.observaciones}
                    onChange={handleChange}
                    placeholder="Opcional"
                    rows="3"
                    className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-600 dark:text-gray-200 text-gray-800 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className={`px-4 py-2 rounded-md shadow text-white transition-colors ${
                        isDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500"
                    }`}
                    disabled={isDisabled}
                >
                    Guardar Cambios
                </button>
            </div>
        </form>
    );
};
