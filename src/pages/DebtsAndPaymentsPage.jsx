import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Filters from "../components/DebtsAndPaymentsComp/Filters";
import DebtTable from "../components/DebtsComp/DebtTable";
import PaymentTable from "../components/PaymentsComp/PaymentTable";

const DebtsAndPaymentsPage = ({ debts = [], payments = [] }) => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    // Filtrar deudas y pagos
    const filteredDebts = debts.filter(
        (debt) =>
            new Date(debt.fechaCreacion).getMonth() + 1 === selectedMonth &&
            new Date(debt.fechaCreacion).getFullYear() === selectedYear
    );

    const filteredPayments = payments.filter(
        (payment) =>
            new Date(payment.fechaTransaccion).getMonth() + 1 === selectedMonth &&
            new Date(payment.fechaTransaccion).getFullYear() === selectedYear
    );

    // Calcular totales
    const totalDebts = filteredDebts.reduce((sum, debt) => sum + debt.montoTotal, 0);
    const totalPayments = filteredPayments.reduce((sum, payment) => sum + payment.monto, 0);

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 p-6">
                <h2 className="text-3xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">
                    Gestión de Deudas y Pagos
                </h2>

                {/* Filtros */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md">
                        <Filters
                            selectedMonth={selectedMonth}
                            selectedYear={selectedYear}
                            onMonthChange={setSelectedMonth}
                            onYearChange={setSelectedYear}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-indigo-500 text-white p-4 rounded-md shadow-md">
                            <h3 className="text-lg font-semibold">Total Deudas</h3>
                            <p className="text-2xl font-bold">${totalDebts.toLocaleString()}</p>
                        </div>
                        <div className="bg-green-500 text-white p-4 rounded-md shadow-md">
                            <h3 className="text-lg font-semibold">Total Pagos</h3>
                            <p className="text-2xl font-bold">${totalPayments.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                {/* Tablas */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md">
                        <h3 className="text-xl font-bold mb-4 text-indigo-600">Deudas</h3>
                        <DebtTable debts={filteredDebts} />
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md">
                        <h3 className="text-xl font-bold mb-4 text-green-600">Pagos</h3>
                        <PaymentTable payments={filteredPayments} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DebtsAndPaymentsPage;