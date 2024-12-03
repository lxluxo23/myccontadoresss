import React from "react";
import {
    FaTachometerAlt,
    FaMoneyCheckAlt,
    FaFileInvoiceDollar,
    FaExchangeAlt,
    FaCog,
} from "react-icons/fa";

const Sidebar = () => {
    const menuItems = [
        { icon: FaTachometerAlt, text: "Dashboard", link: "/dashboard" },
        { icon: FaMoneyCheckAlt, text: "Pagos", link: "/payments" },
        { icon: FaFileInvoiceDollar, text: "Deudas", link: "/debts" },
        { icon: FaExchangeAlt, text: "Transacciones", link: "/transactions" },
        { icon: FaCog, text: "Configuración", link: "/settings" },
    ];

    return (
        <div
            className="sidebar w-64 bg-indigo-500 dark:bg-darkCard text-white dark:text-white border-r border-gray-200 dark:border-gray-700 shadow-lg min-h-screen p-6 flex flex-col">
            {/* Header */}
            <div className="mb-6 border-b border-gray-300 dark:border-gray-600 pb-4">
                <h2 className="text-2xl font-bold text-center">MyCcontadores</h2>
                <p className="text-sm text-center text-gray-200 dark:text-gray-400">
                    Sociedad Monsalve y Céspedes
                </p>
            </div>

            {/* Menu Items */}
            <ul className="space-y-4 flex-1">
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <a
                            href={item.link}
                            className="flex items-center space-x-3 p-3 rounded-md transition-colors duration-300
                                       hover:bg-indigo-600 dark:hover:bg-gray-700 dark:border-gray-700 text-gray-100 dark:text-gray-300"
                        >
                            <item.icon className="text-xl" />
                            <span className="font-medium">{item.text}</span>
                        </a>
                    </li>
                ))}
            </ul>

            {/* Footer */}
            <div className="mt-auto border-t border-gray-300 dark:border-gray-600 pt-4 text-center text-xs text-gray-200 dark:text-gray-400">
                <p>© 2024 MyCcontadores</p>
                <p>Todos los derechos reservados</p>
            </div>
        </div>
    );
};

export default Sidebar;
