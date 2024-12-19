import React, { useState, useEffect } from "react";
import { FaHome, FaBars } from "react-icons/fa";

const Sidebar = () => {
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

    return (
        <div className="relative">
            {/* Botón Hamburguesa */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={`absolute top-4 ${
                    isSidebarOpen ? "left-64" : "left-4"
                } z-50 p-2 bg-indigo-500 text-white rounded-md shadow-md transition-all duration-300 lg:hidden`}
            >
                <FaBars className="text-xl" />
            </button>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full bg-indigo-500 text-white border-r border-gray-200 shadow-lg p-6 flex flex-col transform transition-transform duration-300 z-40 ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 lg:static lg:w-64`}
            >
                {/* Header */}
                <div className="mb-6 border-b border-gray-300 pb-4">
                    <h2 className="text-2xl font-bold text-center">MyCcontadores</h2>
                    <p className="text-sm text-center text-gray-200">
                        Sociedad Monsalve y Céspedes
                    </p>
                </div>

                {/* Menú con solo "Inicio" */}
                <ul className="space-y-4 flex-1">
                    <li>
                        <button
                            className={`w-full flex items-center space-x-3 p-3 rounded-md transition-all duration-300 bg-indigo-600 hover:bg-indigo-700`}
                            style={{
                                minHeight: "48px",
                                justifyContent: "start",
                            }}
                        >
                            <FaHome className="text-xl" />
                            <span className="font-medium">Inicio</span>
                        </button>
                    </li>
                </ul>

                {/* Footer */}
                <div className="mt-auto border-t border-gray-300 pt-4 text-center text-xs text-gray-200">
                    <p>© 2024 MyCcontadores</p>
                    <p>Todos los derechos reservados</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
