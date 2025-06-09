// src/components/Instrumento.jsx
import React from 'react';

/**
 * Componente que representa un instrumento individual
 * Recibe como prop el objeto `instrumento`
 */
function Instrumento({ instrumento }) {
  return (
    <li>
      {instrumento.nombre} ({instrumento.tipo})
    </li>
  );
}

export default Instrumento;
