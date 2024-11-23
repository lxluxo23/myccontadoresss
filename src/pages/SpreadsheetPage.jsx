// SpreadsheetPage.js
import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import PaymentForm   from "../components/SpreedSheetComp/PaymentForm";
import DebtForm from "../components/SpreedSheetComp/DebtForm";
import PaymentsTable from "../components/SpreedSheetComp/PaymentsTable";
import DebtsTable from "../components/SpreedSheetComp/DebtsTable";

function SpreadsheetPage() {
    const [clientData, setClientData] = useState([
        {
            date: '2024-01-15',
            month: 'Enero',
            honorarios: 500000,
            iva: 95000,
            imposiciones: 20000,
            multas: 0,
            totalPagoCliente: 615000,
            formaPago: 'Transferencia',
            talonario: 'T-001',
            observaciones: 'Pago mensual, sin multas',
        },
        {
            date: '2024-02-18',
            month: 'Febrero',
            honorarios: 500000,
            iva: 95000,
            imposiciones: 20000,
            multas: 0,
            totalPagoCliente: 615000,
            formaPago: 'Efectivo',
            talonario: 'T-002',
            observaciones: 'Pago mensual, sin multas',
        },
    ]);

    const [debtData, setDebtData] = useState([
        {
            id: 1,
            date: '2024-03-10',
            month: 'Marzo',
            amount: 200000,
            description: 'Pago pendiente de servicios',
            status: 'Pendiente',
        },
    ]);

    const [newPayment, setNewPayment] = useState({
        date: '',
        month: '',
        honorarios: 0,
        iva: 0,
        imposiciones: 0,
        multas: 0,
        totalPagoCliente: 0,
        formaPago: '',
        talonario: '',
        observaciones: '',
    });

    const [newDebt, setNewDebt] = useState({
        date: '',
        month: '',
        amount: 0,
        description: '',
        status: 'Pendiente',
    });

    const [editingDebt, setEditingDebt] = useState(null);

    const [isPaymentFormVisible, setIsPaymentFormVisible] = useState(false);
    const [isDebtFormVisible, setIsDebtFormVisible] = useState(false);

    // Función para obtener el nombre del mes a partir de una fecha
    const getMonthName = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const monthNames = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
        ];
        return monthNames[date.getMonth()];
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPayment((prev) => {
            const updatedPayment = { ...prev, [name]: value };

            if (name === 'date' && value) {
                updatedPayment.month = getMonthName(value);
            }

            return updatedPayment;
        });
    };

    const handleDebtInputChange = (e) => {
        const { name, value } = e.target;
        setNewDebt((prev) => {
            const updatedDebt = { ...prev, [name]: value };

            if (name === 'date' && value) {
                updatedDebt.month = getMonthName(value);
            }

            return updatedDebt;
        });
    };

    const handleEditDebtInputChange = (e) => {
        const { name, value } = e.target;
        setEditingDebt((prev) => {
            const updatedDebt = { ...prev, [name]: value };

            if (name === 'date' && value) {
                updatedDebt.month = getMonthName(value);
            }

            return updatedDebt;
        });
    };

    const handleAddPayment = (e) => {
        e.preventDefault();
        if (!newPayment.date || !newPayment.formaPago) {
            alert('Por favor, complete todos los campos obligatorios.');
            return;
        }

        // Calcula 'totalPagoCliente' si es necesario
        const totalPagoCliente =
            parseFloat(newPayment.honorarios) +
            parseFloat(newPayment.iva) +
            parseFloat(newPayment.imposiciones) +
            parseFloat(newPayment.multas);

        const paymentToAdd = {
            ...newPayment,
            totalPagoCliente,
        };

        setClientData((prevData) => [...prevData, paymentToAdd]);
        setNewPayment({
            date: '',
            month: '',
            honorarios: 0,
            iva: 0,
            imposiciones: 0,
            multas: 0,
            totalPagoCliente: 0,
            formaPago: '',
            talonario: '',
            observaciones: '',
        });
        setIsPaymentFormVisible(false);
    };

    const handleAddDebt = (e) => {
        e.preventDefault();
        if (!newDebt.date || !newDebt.amount || !newDebt.description) {
            alert('Por favor, complete todos los campos obligatorios.');
            return;
        }

        setDebtData((prevData) => [
            ...prevData,
            { ...newDebt, id: debtData.length + 1 },
        ]);
        setNewDebt({
            date: '',
            month: '',
            amount: 0,
            description: '',
            status: 'Pendiente',
        });
        setIsDebtFormVisible(false);
    };

    const handleEditDebt = (debt) => {
        setEditingDebt(debt);
        setIsDebtFormVisible(false);
        setIsPaymentFormVisible(false);
    };

    const handleSaveEditedDebt = (e) => {
        e.preventDefault();
        setDebtData((prevData) =>
            prevData.map((debt) => (debt.id === editingDebt.id ? editingDebt : debt))
        );
        setEditingDebt(null);
    };

    const handleDeleteDebt = (id) => {
        setDebtData((prevData) => prevData.filter((debt) => debt.id !== id));
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
                Registro de Pagos y Deudas de Cliente
            </h1>

            <div className="flex justify-center gap-4 mb-8">
                <button
                    onClick={() => {
                        setIsPaymentFormVisible(!isPaymentFormVisible);
                        setIsDebtFormVisible(false);
                        setEditingDebt(null);
                    }}
                    className="bg-indigo-600 text-white py-3 px-6 rounded-md shadow-lg hover:bg-indigo-700 transition duration-300"
                >
                    Agregar Pago
                </button>
                <button
                    onClick={() => {
                        setIsDebtFormVisible(!isDebtFormVisible);
                        setIsPaymentFormVisible(false);
                        setEditingDebt(null);
                    }}
                    className="bg-red-600 text-white py-3 px-6 rounded-md shadow-lg hover:bg-red-700 transition duration-300"
                >
                    Agregar Deuda
                </button>
            </div>

            {isPaymentFormVisible && (
                <PaymentForm
                    newPayment={newPayment}
                    handleInputChange={handleInputChange}
                    handleAddPayment={handleAddPayment}
                />
            )}

            {(isDebtFormVisible || editingDebt) && (
                <DebtForm
                    editingDebt={editingDebt}
                    newDebt={newDebt}
                    handleDebtInputChange={handleDebtInputChange}
                    handleEditDebtInputChange={handleEditDebtInputChange}
                    handleAddDebt={handleAddDebt}
                    handleSaveEditedDebt={handleSaveEditedDebt}
                />
            )}

            <PaymentsTable clientData={clientData} />

            <DebtsTable
                debtData={debtData}
                handleEditDebt={handleEditDebt}
                handleDeleteDebt={handleDeleteDebt}
            />
        </div>
    );
}

export default SpreadsheetPage;