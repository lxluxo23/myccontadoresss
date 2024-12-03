import React from "react";

const AlertsNotifications = ({ alerts }) => {
    return (
        <div className="alerts-notifications bg-white dark:bg-darkCard text-gray-800 dark:text-darkText shadow-md dark:shadow-dark rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-darkText">Alertas y Notificaciones</h2>
            {alerts.length > 0 ? (
                <ul className="space-y-3">
                    {alerts.map((alert, index) => (
                        <li
                            key={index}
                            className="p-4 border-l-4 rounded-lg bg-gray-50 dark:bg-gray-700 shadow"
                        >
                            <div
                                className={`font-bold ${
                                    alert.type === "warning"
                                        ? "text-yellow-600"
                                        : "text-red-600"
                                }`}
                            >
                                {alert.title}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                {alert.message}
                            </p>
                            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                                {alert.date}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 dark:text-gray-400">
                    No hay alertas o notificaciones en este momento.
                </p>
            )}
        </div>
    );
};

export default AlertsNotifications;
