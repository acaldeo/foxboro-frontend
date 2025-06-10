// src/components/FormInstrumento.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";

/**
 * Formulario para agregar un instrumento.
 * Incluye selección de FBM y número de punto al que está conectado.
 */
const FormInstrumento = () => {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [punto, setPunto] = useState("");
  const [fbmId, setFbmId] = useState("");
  const [fbms, setFbms] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/fbms")
      .then(res => setFbms(res.data))
      .catch(err => console.error("Error al cargar FBMs:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/instrumentos", {
        nombre,
        tipo,
        punto,
        fbm_id: fbmId,
      });

      alert("✅ Instrumento creado correctamente");

      // Limpiar formulario
      setNombre("");
      setTipo("");
      setPunto("");
      setFbmId("");
    } catch (error) {
      console.error("Error al crear instrumento:", error);
      alert("❌ Error al crear instrumento");
    }
  };

  return (
    <div className="card p-4 mb-4">
      <h5 className="card-title mb-3">➕ Agregar Instrumento</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
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
          <label className="form-label">Punto (1-32)</label>
          <input
            type="number"
            min="1"
            max="32"
            className="form-control"
            value={punto}
            onChange={(e) => setPunto(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">FBM asociada</label>
          <select
            className="form-select"
            value={fbmId}
            onChange={(e) => setFbmId(e.target.value)}
            required
          >
            <option value="">-- Seleccionar FBM --</option>
            {fbms.map((fbm) => (
              <option key={fbm.id} value={fbm.id}>
                {fbm.numero} ({fbm.ubicacion})
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Crear Instrumento</button>
      </form>
    </div>
  );
};

export default FormInstrumento;
