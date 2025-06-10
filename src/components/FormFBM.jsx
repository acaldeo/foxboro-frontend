// src/components/FormFBM.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";

/**
 * Formulario para dar de alta una FBM.
 * Estilizado con Bootstrap y sin dependencias externas.
 */
const FormFBM = () => {
  const [numero, setNumero] = useState("");
  const [cantidadPuntos, setCantidadPuntos] = useState("");
  const [cpId, setCpId] = useState("");
  const [ubicacion, setUbicacion] = useState("");

  const [cps, setCps] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/cps")
      .then(res => setCps(res.data))
      .catch(err => console.error("Error cargando CPs:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/fbms", {
        numero,
        cantidad_puntos: cantidadPuntos,
        cp_id: cpId,
        ubicacion
      });

      alert("✅ FBM creada correctamente");

      setNumero("");
      setCantidadPuntos("");
      setCpId("");
      setUbicacion("");
    } catch (error) {
      console.error("Error al crear FBM:", error);
      alert("❌ Error al crear FBM");
    }
  };

  return (
    <div className="card p-4 mb-4">
      <h5 className="card-title mb-3">➕ Agregar FBM</h5>
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
          <label className="form-label">Cantidad de puntos</label>
          <input
            type="number"
            className="form-control"
            value={cantidadPuntos}
            onChange={(e) => setCantidadPuntos(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Controlador (CP) asociado</label>
          <select
            className="form-select"
            value={cpId}
            onChange={(e) => setCpId(e.target.value)}
            required
          >
            <option value="">-- Seleccionar CP --</option>
            {cps.map(cp => (
              <option key={cp.id} value={cp.id}>
                {cp.numero} ({cp.tipo})
              </option>
            ))}
          </select>
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

        <button type="submit" className="btn btn-primary">Crear FBM</button>
      </form>
    </div>
  );
};

export default FormFBM;
