// src/components/FormInstrumento.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";

/**
 * Formulario para agregar un instrumento.
 * Utiliza Bootstrap CSS para estilos.
 */
const FormInstrumento = () => {
  // Estado local para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [fbmId, setFbmId] = useState("");
  const [fbms, setFbms] = useState([]);

  // Al cargar el componente, obtener todas las FBMs disponibles
  useEffect(() => {
    axios.get("http://localhost:3000/api/fbms")
      .then(res => setFbms(res.data))
      .catch(err => console.error("Error al cargar FBMs:", err));
  }, []);

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/instrumentos", {
        nombre,
        tipo,
        fbm_id: fbmId,
      });

      alert("✅ Instrumento creado correctamente");

      // Limpiar el formulario
      setNombre("");
      setTipo("");
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
        {/* Campo: Nombre */}
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

        {/* Campo: Tipo */}
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

        {/* Campo: FBM asociada */}
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

        {/* Botón de envío */}
        <button type="submit" className="btn btn-primary">Crear Instrumento</button>
      </form>
    </div>
  );
};

export default FormInstrumento;
