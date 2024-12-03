import React from "react";
import { FaDollarSign, FaCalendar, FaChartBar, FaExchangeAlt } from "react-icons/fa";

const ClientIndicators = ({ indicators }) => {
    const lastTransaction = indicators.lastTransaction || { date: "Sin datos", amount: 0 };

    const cards = [
        { title: "Pagos Totales", value: `$${indicators.totalPayments || 0}`, icon: FaChartBar, color: "text-green-600" },
        { title: "Deuda Total", value: `$${indicators.totalDebt || 0}`, icon: FaDollarSign, color: "text-red-600" },
        { title: "Deuda Mes Actual", value: `$${indicators.currentMonthDebt || 0}`, icon: FaCalendar, color: "text-orange-600" },
        { title: "Última Transacción", value: `${lastTransaction.date} - $${lastTransaction.amount}`, icon: FaExchangeAlt, color: "text-blue-600" },
    ];

    return (
        <>
            {cards.map((card, index) => (
                <div
                    key={index}
                    className="bg-white dark:bg-darkCard text-gray-800 dark:text-darkText shadow-md dark:shadow-dark rounded-lg p-6 flex items-center space-x-4 transform transition-transform duration-300"
                >
                    <card.icon className={`text-3xl ${card.color}`} />
                    <div>
                        <h3 className="text-lg font-semibold">{card.title}</h3>
                        <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ClientIndicators;
