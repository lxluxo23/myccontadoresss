import React from "react";
import { FaDollarSign, FaCalendar, FaChartBar, FaExchangeAlt } from "react-icons/fa";

const ClientIndicators = ({ indicators = {} }) => {
    const lastTransaction = indicators.lastTransaction || { date: "Sin datos", amount: 0 };

    const cards = [
        {
            title: "Pagos Totales",
            value: `$${indicators.totalPayments || 0}`,
            icon: FaChartBar,
            bgColor: "bg-blue-100",
            iconColor: "text-blue-500",
        },
        {
            title: "Deuda Total",
            value: `$${indicators.totalDebt || 0}`,
            icon: FaDollarSign,
            bgColor: "bg-red-100",
            iconColor: "text-red-500",
        },
        {
            title: "Deuda Mes Actual",
            value: `$${indicators.currentMonthDebt || 0}`,
            icon: FaCalendar,
            bgColor: "bg-orange-100",
            iconColor: "text-orange-500",
        },
        {
            title: "Última Transacción",
            value: `${lastTransaction.date} - $${lastTransaction.amount}`,
            icon: FaExchangeAlt,
            bgColor: "bg-green-100",
            iconColor: "text-green-500",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className="bg-white dark:bg-darkCard text-gray-800 dark:text-darkText shadow-md dark:shadow-dark rounded-lg p-6 flex items-center space-x-4 transform transition-transform duration-300"
                >
                    <div
                        className={`flex items-center justify-center ${card.bgColor} rounded-full`}
                        style={{ width: "3rem", height: "3rem" }}
                    >
                        <card.icon className={`${card.iconColor} text-2xl`} />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">{card.title}</h3>
                        <p className="text-2xl font-bold">{card.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ClientIndicators;
