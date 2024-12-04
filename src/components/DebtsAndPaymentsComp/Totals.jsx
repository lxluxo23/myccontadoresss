import React from "react";

const Totals = ({ totalDebts, totalPayments }) => {
    return (
        <div className="flex justify-between items-center bg-indigo-200 p-4 rounded-md shadow-md mb-6">
            <div>
                <h3 className="text-lg font-bold">Total Deudas:</h3>
                <p className="text-xl font-semibold">${totalDebts.toLocaleString()}</p>
            </div>
            <div>
                <h3 className="text-lg font-bold">Total Pagos:</h3>
                <p className="text-xl font-semibold">${totalPayments.toLocaleString()}</p>
            </div>
        </div>
    );
};

export default Totals;
