import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
    FaTachometerAlt,
    FaMoneyCheckAlt,
    FaFileInvoiceDollar,
    FaExchangeAlt,
    FaCog,
    FaBars,
} from "react-icons/fa";

const Sidebar = () => {
    const navigate = useNavigate();
    const { clientId } = useParams();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Detectar tamaño de pantalla al cargarse
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsSidebarOpen(true); // Mostrar Sidebar en pantallas grandes
            } else {
                setIsSidebarOpen(false); // Ocultar Sidebar en pantallas pequeñas
            }
        };

        handleResize(); // Ejecutar al inicio
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const menuItems = [
        {
            icon: FaTachometerAlt,
            text: "Dashboard",
            path: `/spreadsheet/${1}`,
            action: () => navigate(`/spreadsheet/${clientId}`),
        },
        {
            icon: FaMoneyCheckAlt,
            text: "Pagos",
            path: `/clientes/${clientId}/pagos`,
            action: () => navigate(`/clientes/${clientId}/pagos`),
        },
        {
            icon: FaFileInvoiceDollar,
            text: "Deudas",
            path: `/clientes/${clientId}/deudas`, // Cambiar la ruta para incluir el clientId
            action: () => navigate(`/clientes/${clientId}/deudas`), // Actualizar la acción para redirigir a la ruta correcta
        },
    ];

    return (
        <div className="relative">
            {/* Botón Hamburguesa */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={`absolute top-4 ${
                    isSidebarOpen ? "left-64" : "left-4"
                } z-50 p-2 bg-indigo-500 dark:bg-gray-800 text-white rounded-md shadow-md transition-all duration-300 lg:hidden`}
            >
                <FaBars className="text-xl" />
            </button>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full bg-indigo-500 dark:bg-darkCard text-white dark:text-white border-r border-gray-200 dark:border-gray-700 shadow-lg p-6 flex flex-col transform transition-transform duration-300 z-40 ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 lg:static lg:w-64`}
            >
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
                            <button
                                onClick={item.action}
                                className={`w-full flex items-center space-x-3 p-3 rounded-md transition-all duration-300 ${
                                    location.pathname === item.path
                                        ? "bg-indigo-600 dark:bg-gray-800 text-white"
                                        : "hover:bg-indigo-600 dark:hover:bg-gray-700 text-gray-100 dark:text-gray-300"
                                }`}
                                style={{
                                    minHeight: "48px",
                                    justifyContent: "start",
                                }}
                            >
                                <item.icon className="text-xl" />
                                <span className="font-medium">{item.text}</span>
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Footer */}
                <div className="mt-auto border-t border-gray-300 dark:border-gray-600 pt-4 text-center text-xs text-gray-200 dark:text-gray-400">
                    <p>© 2024 MyCcontadores</p>
                    <p>Todos los derechos reservados</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
