import React from "react";

const ClientIndicators = ({ indicators }) => {
    const cards = [
        { title: "Deuda Total", value: `$${indicators.totalDebt || 0}` },
        { title: "Pagos Totales", value: `$${indicators.totalPayments || 0}` },
        { title: "Deuda Mes Actual", value: `$${indicators.currentMonthDebt || 0}` },
        { title: "Última Transacción", value: `${indicators.lastTransaction.date || "Sin datos"} - $${indicators.lastTransaction.amount || 0}` },
    ];

    return (
        <>
            {cards.map((card, index) => (
                <div key={index} className="bg-white shadow h-full border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold">{card.title}</h3>
                    <p className="text-2xl font-bold">{card.value}</p>
                </div>
            ))}
        </>
    );
};

export default ClientIndicators;
