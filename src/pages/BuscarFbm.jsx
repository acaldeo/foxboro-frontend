// src/pages/BuscarFbm.jsx
import React, { useState } from "react";
import axios from "axios";
import FbmResultado from "../components/FbmResultado";

/**
 * Página para buscar FBMs por número
 */
const BuscarFbm = () => {
  const [numero, setNumero] = useState("");
  const [fbm, setFbm] = useState(null);
  const [error, setError] = useState("");

  const buscar = async () => {
    try {
      const res = await axios.get(`/api/fbms/numero/${numero}`);
      setFbm(res.data);
      setError("");
    } catch (err) {
      setError("FBM no encontrada");
      setFbm(null);
    }
  };

  return (
    <div>
      <h2>Buscar FBM</h2>
      <input
        type="text"
        placeholder="Número de FBM"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
      />
      <button onClick={buscar}>Buscar</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <FbmResultado data={fbm} />
    </div>
  );
};

export default BuscarFbm;
