import React from "react";
import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const Analytics = ({ finance }) => {
    if (!finance) {
        return <p>No hay datos disponibles para análisis.</p>;
    }

    const data = [
        { name: "Pagado", value: finance.totalPayments || 0 },
        { name: "Deuda", value: finance.totalDebt || 0 }
    ];

    return (
        <div className="bg-white shadow-md rounded-md p-6 h-64">
            <h3 className="text-center font-bold mb-4">Pagos vs Deudas</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Analytics;
