import React, { createContext, useContext, useState, useEffect } from "react";

const ClienteContext = createContext();

export const ClienteProvider = ({ children }) => {
    const [clienteId, setClienteId] = useState(() => {
        const savedId = localStorage.getItem('clienteId');
        return savedId ? savedId : null;
    });
    const [clienteData, setClienteData] = useState(null);

    useEffect(() => {
        if (clienteId) {
            localStorage.setItem('clienteId', clienteId);
        } else {
            localStorage.removeItem('clienteId');
        }
    }, [clienteId]);

    const clearCliente = () => {
        setClienteId(null);
        setClienteData(null);
        localStorage.removeItem('clienteId');
    };

    return (
        <ClienteContext.Provider value={{
            clienteId,
            setClienteId,
            clienteData,
            setClienteData,
            clearCliente
        }}>
            {children}
        </ClienteContext.Provider>
    );
};

export const useCliente = () => useContext(ClienteContext);