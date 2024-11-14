import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Usando React Router
import MyContadores from './pages/MyContadores';  // Asegúrate de importar correctamente
import SpreadsheetPage from './pages/SpreadsheetPage';  // Asegúrate de importar SpreadsheetPage

function App() {
    return (
        <Router>
            <Routes>
                {/* Ruta principal */}
                <Route path="/" element={<MyContadores />} />
                {/* Ruta para la hoja de cálculo */}
                <Route path="/spreadsheet" element={<SpreadsheetPage />} />
            </Routes>
        </Router>
    );
}

export default App;