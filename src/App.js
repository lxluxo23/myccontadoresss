import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyContadores from './pages/MyContadores';
import SpreadsheetPage from './pages/SpreadsheetPage';
import DebtsPage from "./pages/DebtsPage";
import PaymentsPage from "./pages/PaymentsPage";
import TransactionsPage from "./pages/TransactionsPage";
import DebtsAndPaymentsPage from "./pages/DebtsAndPaymentsPage";

function App() {
    return (
        <Router>
            <Routes>
                {/* Ruta principal */}
                <Route path="/" element={<MyContadores />} />
                {/* Ruta para la hoja de cálculo */}
                <Route path="/spreadsheet/:clientId" element={<SpreadsheetPage />} />
                {/* Ruta para deudas */}
                <Route path="/clientes/:clientId/deudas" element={<DebtsPage />} />
                <Route path="/clientes/:clientId/pagos" element={<PaymentsPage/>} />
                <Route path="/transactions" element={<TransactionsPage />} />
                <Route path="/finance" element={<DebtsAndPaymentsPage />} />
            </Routes>
        </Router>
    );
}

export default App;