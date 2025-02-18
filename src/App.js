import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';  // Importación modificada
import MyContadores from './pages/MyContadores';
import SpreadsheetPage from './pages/SpreadsheetPage';
import DebtsPage from "./pages/DebtsPage";
import PaymentsPage from "./pages/PaymentsPage";
import { ClienteProvider } from './components/context/ClienteContext';

function App() {
    return (
        <ClienteProvider>
            <HashRouter>  
                <Routes>
                    <Route path="/" element={<MyContadores />} />
                    <Route path="/spreadsheet/:clientId" element={<SpreadsheetPage />} />
                    <Route path="/clientes/:clientId/deudas" element={<DebtsPage />} />
                    <Route path="/clientes/:clientId/pagos" element={<PaymentsPage />} />
                </Routes>
            </HashRouter>
        </ClienteProvider>
    );
}

export default App;