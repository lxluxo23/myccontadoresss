import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import TransactionTable from "../components/TransactionComp/TransactionTable";
import FiltersButton from "../components/DebtsAndPaymentsComp/Filters";

const TransactionsPage = () => {
    const [transactions, setTransactions] = useState([]);

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 p-6 space-y-6 relative">
                {/* Encabezado */}
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                        Historial de Transacciones
                    </h1>
                    {/* Botón Flotante para Filtros */}
                    <FiltersButton />
                </div>

                {/* Tabla de Transacciones */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md">
                    {transactions.length > 0 ? (
                        <TransactionTable transactions={transactions} />
                    ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400">
                            No hay transacciones registradas.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TransactionsPage;
