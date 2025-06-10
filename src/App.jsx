// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Importamos las páginas/componentes del sistema
import Agregar from './components/Agregar';
import BuscarInstrumento from "./pages/BuscarInstrumento";
import BuscarFbm from "./pages/BuscarFbm";

// Componente principal de la aplicación
function App() {
  return (
    <Router>
      <div>
        {/* Barra de navegación con Bootstrap */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Sistema DCS Foxboro</Link>

            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {/* Enlaces de navegación con estilos de Bootstrap */}
                <li className="nav-item">
                  <Link className="nav-link" to="/agregar">Agregar</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/buscar-instrumento">Buscar Instrumento</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/buscar-fbm">Buscar FBM</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Contenedor general de la página */}
        <div className="container mt-4">
          <Routes>
            {/* Definimos las rutas del sistema */}
            <Route path="/agregar" element={<Agregar />} />
            <Route path="/buscar-instrumento" element={<BuscarInstrumento />} />
            <Route path="/buscar-fbm" element={<BuscarFbm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
// Para correr el frontEnd hay que correr npm run dev
