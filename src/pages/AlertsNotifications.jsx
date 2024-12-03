import React from "react";

const AlertsNotifications = ({ alerts }) => {
    return (
        <div
            className="alerts-notifications p-6 flex flex-col">
            <h2 className="text-lg font-bold mb-4">Alertas y Notificaciones</h2>
            {alerts.length > 0 ? (
                <ul className="space-y-3">
                    {alerts.map((alert, index) => (
                        <li key={index} className="p-4 border-l-4 rounded-lg bg-gray-50">
                            <div
                                className={`font-bold ${alert.type === "warning" ? "text-yellow-600" : "text-red-600"}`}>
                                {alert.title}
                            </div>
                            <p className="text-sm text-gray-600">{alert.message}</p>
                            <p className="text-sm text-gray-400 mt-1">{alert.date}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No hay alertas o notificaciones en este momento.</p>
            )}
        </div>
    );
};

export default AlertsNotifications;
