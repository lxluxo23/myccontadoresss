import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyContadores from './pages/MyContadores';
import SpreadsheetPage from './pages/SpreadsheetPage';

function App() {
    return (
        <Router>
            <Routes>
                {/* Ruta principal */}
                <Route path="/" element={<MyContadores />} />
                {/* Ruta para la hoja de cálculo */}
                <Route path="/spreadsheet/:clientId" element={<SpreadsheetPage />} />
            </Routes>
        </Router>
    );
}

export default App;