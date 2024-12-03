import React from "react";

const Sidebar = () => {
    return (
        <div className="sidebar w-64 bg-indigo-600 text-white min-h-screen p-4">
            <h2 className="text-2xl font-bold mb-6">Menú</h2>
            <ul className="space-y-4">
                <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
                <li><a href="/payments" className="hover:underline">Pagos</a></li>
                <li><a href="/debts" className="hover:underline">Deudas</a></li>
                <li><a href="/transactions" className="hover:underline">Transacciones</a></li>
                <li><a href="/settings" className="hover:underline">Configuración</a></li>
            </ul>
        </div>
    );
};

export default Sidebar;
