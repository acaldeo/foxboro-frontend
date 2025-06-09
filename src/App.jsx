// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BuscarInstrumento from "./pages/BuscarInstrumento";
import BuscarFbm from "./pages/BuscarFbm";

function App() {
  return (
    <Router>
      <div>
        <h1>Sistema DCS Foxboro</h1>
        <nav>
          <ul>
            <li><Link to="/buscar-instrumento">Buscar Instrumento</Link></li>
            <li><Link to="/buscar-fbm">Buscar FBM</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/buscar-instrumento" element={<BuscarInstrumento />} />
          <Route path="/buscar-fbm" element={<BuscarFbm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
