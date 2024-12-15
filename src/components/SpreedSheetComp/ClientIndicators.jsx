import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { FaDollarSign, FaCalendar, FaChartBar, FaExchangeAlt } from "react-icons/fa";

const ClientIndicators = ({ indicators }) => {
    useEffect(() => {
        console.log("ClientIndicators cargado.");
        console.log("Datos de indicadores recibidos:", indicators);

        if (!indicators || Object.keys(indicators).length === 0) {
            console.warn("Los indicadores están vacíos o no definidos.");
        }
    }, [indicators]);

    const formatCurrency = (amount) => {
        if (amount === null || amount === undefined) {
            console.warn("El valor de 'amount' no está definido o es nulo:", amount);
            return "$0,00";
        }
        return `$${amount?.toLocaleString("es-CL", { minimumFractionDigits: 2 }) || "0,00"}`;
    };

    const lastTransaction = indicators.lastTransaction || { date: "Sin datos", amount: 0 };

    console.log("Última transacción procesada:", lastTransaction);

    const cards = [
        {
            title: "Pagos Totales",
            value: formatCurrency(indicators.totalPayments),
            description: "Pagos recibidos en el año actual",
            icon: FaChartBar,
            bgColor: "bg-gradient-to-r from-blue-400 to-blue-600",
            iconColor: "text-blue-50",
        },
        {
            title: "Deuda Total",
            value: formatCurrency(indicators.totalDebt),
            description: "Monto total de la deuda acumulada",
            icon: FaDollarSign,
            bgColor: "bg-gradient-to-r from-red-400 to-red-600",
            iconColor: "text-red-50",
        },
        {
            title: "Deuda Mes Actual",
            value: formatCurrency(indicators.currentMonthDebt),
            description: "Deuda pendiente en este mes",
            icon: FaCalendar,
            bgColor: "bg-gradient-to-r from-orange-400 to-orange-600",
            iconColor: "text-orange-50",
        },
        {
            title: "Última Transacción",
            value: `${lastTransaction.date} - ${formatCurrency(lastTransaction.amount)}`,
            description: "Detalles de la última transacción registrada",
            icon: FaExchangeAlt,
            bgColor: "bg-gradient-to-r from-green-400 to-green-600",
            iconColor: "text-green-50",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className="bg-white dark:bg-darkCard text-gray-800 dark:text-darkText shadow-md dark:shadow-dark rounded-lg p-6 flex flex-col items-center space-y-4 transform transition-transform duration-300 hover:scale-105"
                    aria-label={`Indicador: ${card.title}`}
                >
                    <div
                        className={`flex items-center justify-center ${card.bgColor} rounded-full shadow-md`}
                        style={{ width: "3.5rem", height: "3.5rem" }}
                        aria-hidden="true"
                    >
                        <card.icon className={`${card.iconColor} text-2xl`} />
                    </div>
                    <div className="text-center">
                        <h3 className="text-lg font-semibold">{card.title}</h3>
                        <p className="text-2xl font-bold">{card.value}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{card.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

ClientIndicators.propTypes = {
    indicators: PropTypes.shape({
        totalPayments: PropTypes.number,
        totalDebt: PropTypes.number,
        currentMonthDebt: PropTypes.number,
        lastTransaction: PropTypes.shape({
            date: PropTypes.string,
            amount: PropTypes.number,
        }),
    }),
};

export default ClientIndicators;
