// src/components/FBM.jsx
import React from 'react';
import Instrumento from './Instrumento';

/**
 * Componente que representa una FBM (Field Bus Module)
 * Recibe como prop el objeto `fbm` con sus instrumentos
 */
function FBM({ fbm }) {
  return (
    <div style={{ marginLeft: '1rem', marginTop: '1rem' }}>
      <h3>{fbm.numero}</h3>
      <p><strong>Ubicación:</strong> {fbm.ubicacion} | <strong>Puntos:</strong> {fbm.cantidad_puntos}</p>

      {/* Mapeamos los instrumentos conectados a la FBM */}
      <ul>
        {fbm.instrumentos.map(instr => (
          <Instrumento key={instr.id} instrumento={instr} />
        ))}
      </ul>
    </div>
  );
}

export default FBM;
