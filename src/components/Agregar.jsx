// src/components/Agregar.jsx

import React, { useState } from "react";
import FormCP from "./FormCP";
import FormFBM from "./FormFBM";
import FormInstrumento from "./FormInstrumento";

/**
 * Componente contenedor con Tabs de Bootstrap para mostrar:
 * - Formulario de alta de CP
 * - Formulario de alta de FBM
 * - Formulario de alta de Instrumento
 */
const Agregar = () => {
  const [activeTab, setActiveTab] = useState("cp"); // Tab activo: 'cp' | 'fbm' | 'instrumento'

  return (
    <div className="container mt-4">
      <h2 className="mb-4">➕ Alta de elementos</h2>

      {/* Navegación por Tabs de Bootstrap */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "cp" ? "active" : ""}`}
            onClick={() => setActiveTab("cp")}
          >
            Controlador (CP)
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "fbm" ? "active" : ""}`}
            onClick={() => setActiveTab("fbm")}
          >
            Tarjeta (FBM)
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "instrumento" ? "active" : ""}`}
            onClick={() => setActiveTab("instrumento")}
          >
            Instrumento
          </button>
        </li>
      </ul>

      {/* Contenido de cada tab */}
      {activeTab === "cp" && <FormCP />}
      {activeTab === "fbm" && <FormFBM />}
      {activeTab === "instrumento" && <FormInstrumento />}
    </div>
  );
};

export default Agregar;
