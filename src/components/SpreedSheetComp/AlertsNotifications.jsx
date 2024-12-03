import React from "react";
import { FaExclamationTriangle, FaTimesCircle, FaInfoCircle } from "react-icons/fa";

const AlertsNotifications = ({ alerts }) => {
    const getIconByType = (type) => {
        switch (type) {
            case "warning":
                return <FaExclamationTriangle className="text-yellow-500 text-lg" />;
            case "error":
                return <FaTimesCircle className="text-red-500 text-lg" />;
            case "info":
            default:
                return <FaInfoCircle className="text-blue-500 text-lg" />;
        }
    };

    return (
        <div className="alerts-notifications bg-white dark:bg-darkCard text-gray-800 dark:text-darkText shadow-md dark:shadow-dark rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-darkText text-center">
                Alertas y Notificaciones
            </h2>
            {alerts.length > 0 ? (
                <ul className="space-y-4">
                    {alerts.map((alert, index) => (
                        <li
                            key={index}
                            className={`p-4 border-l-4 rounded-lg shadow flex items-start space-x-4 ${
                                alert.type === "warning"
                                    ? "bg-yellow-50 dark:bg-yellow-900 border-yellow-500"
                                    : alert.type === "error"
                                        ? "bg-red-50 dark:bg-red-900 border-red-500"
                                        : "bg-blue-50 dark:bg-blue-900 border-blue-500"
                            }`}
                        >
                            <div className="flex-shrink-0">
                                {getIconByType(alert.type)}
                            </div>
                            <div>
                                <div
                                    className={`font-bold ${
                                        alert.type === "warning"
                                            ? "text-yellow-700 dark:text-yellow-400"
                                            : alert.type === "error"
                                                ? "text-red-700 dark:text-red-400"
                                                : "text-blue-700 dark:text-blue-400"
                                    }`}
                                >
                                    {alert.title}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {alert.message}
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                                    {alert.date}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center">
                    No hay alertas o notificaciones en este momento.
                </p>
            )}
        </div>
    );
};

export default AlertsNotifications;
