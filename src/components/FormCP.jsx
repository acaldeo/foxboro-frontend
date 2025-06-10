// src/components/FormCP.jsx

import React, { useState } from "react";
import axios from "axios";

/**
 * Formulario para dar de alta un nuevo CP (Controlador de Proceso).
 * Utiliza clases de Bootstrap para el estilo.
 */
const FormCP = () => {
  const [numero, setNumero] = useState("");
  const [tipo, setTipo] = useState("");
  const [ubicacion, setUbicacion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/cps", {
        numero,
        tipo,
        ubicacion,
      });

      alert("✅ CP creado correctamente");

      setNumero("");
      setTipo("");
      setUbicacion("");
    } catch (error) {
      console.error("Error al crear CP:", error);
      alert("❌ Error al crear CP");
    }
  };

  return (
    <div className="card p-4 mb-4">
      <h5 className="card-title mb-3">➕ Agregar Controlador de Proceso (CP)</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Número</label>
          <input
            type="text"
            className="form-control"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Tipo</label>
          <input
            type="text"
            className="form-control"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Ubicación (Enclosure)</label>
          <input
            type="text"
            className="form-control"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Crear CP</button>
      </form>
    </div>
  );
};

export default FormCP;
