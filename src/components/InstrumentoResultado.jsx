// src/components/InstrumentoResultado.jsx

import React from "react";

/**
 * Componente visual para mostrar el resultado de una búsqueda de instrumento.
 * Incluye información del instrumento, FBM asociada, CP asociado y punto de conexión.
 */
const InstrumentoResultado = ({ instrumento }) => {
  // Validación por si no hay datos
  if (!instrumento || !instrumento.fbm || !instrumento.cp) {
    return <div className="alert alert-warning">Instrumento no encontrado o datos incompletos.</div>;
  }

  return (
    <div className="card mt-4">
      <div className="card-header bg-primary text-white">
        🔍 Resultado de la búsqueda de instrumento
      </div>
      <div className="card-body">
        {/* Datos del instrumento */}
        <h5 className="card-title">Instrumento: {instrumento.nombre}</h5>
        <p className="card-text"><strong>Tipo:</strong> {instrumento.tipo}</p>
        <p className="card-text"><strong>Punto:</strong> {instrumento.punto || "No especificado"}</p>

        <hr />

        {/* Datos de la FBM */}
        <h6 className="card-subtitle mb-2 text-muted">FBM asociada</h6>
        <p className="card-text">
          <strong>Número:</strong> {instrumento.fbm.numero}<br />
          <strong>Ubicación (Enclosure):</strong> {instrumento.fbm.ubicacion}
        </p>

        <hr />

        {/* Datos del CP */}
        <h6 className="card-subtitle mb-2 text-muted">Controlador (CP)</h6>
        <p className="card-text">
          <strong>Número:</strong> {instrumento.cp.numero}<br />
          <strong>Tipo:</strong> {instrumento.cp.tipo}<br />
          <strong>Ubicación:</strong> {instrumento.cp.ubicacion}
        </p>
      </div>
    </div>
  );
};

export default InstrumentoResultado;
