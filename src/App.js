import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyContadores from './pages/MyContadores';
import SpreadsheetPage from './pages/SpreadsheetPage';
import DebtsPage from "./pages/DebtsPage";
import PaymentsPage from "./pages/PaymentsPage";
import TransactionsPage from "./pages/TransactionsPage";
import DebtsAndPaymentsPage from "./pages/DebtsAndPaymentsPage";
import { ClienteProvider } from './components/context/ClienteContext'; // Asegúrate de usar el path correcto

function App() {
    return (
        <ClienteProvider> {/* Proveedor de contexto para toda la aplicación */}
            <Router>
                <Routes>
                    {/* Ruta principal */}
                    <Route path="/" element={<MyContadores />} />

                    {/* Rutas relacionadas con clientes */}
                    <Route path="/spreadsheet/:clientId" element={<SpreadsheetPage />} />
                    <Route path="/clientes/:clientId/deudas" element={<DebtsPage />} />
                    <Route path="/clientes/:clientId/pagos" element={<PaymentsPage />} />
                    <Route path="/transactions" element={<TransactionsPage />} />
                    <Route path="/clientes/:clientId/finanzas" element={<DebtsAndPaymentsPage />} />
                </Routes>
            </Router>
        </ClienteProvider>
    );
}

export default App;
