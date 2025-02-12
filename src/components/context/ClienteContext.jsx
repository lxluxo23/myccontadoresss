import React, { createContext, useContext, useState } from "react";

const ClienteContext = createContext();

export const ClienteProvider = ({ children }) => {
    const [clienteId, setClienteId] = useState(null);
    const [clienteData, setClienteData] = useState(null);

    // Función para limpiar el cliente seleccionado
    const clearCliente = () => {
        setClienteId(null);
        setClienteData(null);
    };

    return (
        <ClienteContext.Provider value={{ clienteId, setClienteId, clienteData, setClienteData, clearCliente }}>
            {children}
        </ClienteContext.Provider>
    );
};

export const useCliente = () => useContext(ClienteContext);