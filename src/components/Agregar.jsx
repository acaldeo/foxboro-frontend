// src/components/Agregar.jsx
import React, { useState } from 'react';
import FormCP from './FormCP';
import FormFBM from './FormFBM';
import FormInstrumento from './FormInstrumento';

/**
 * Vista para agregar entidades: CP, FBM, Instrumento.
 * Usa tabs para seleccionar el tipo de formulario.
 */
function Agregar() {
  const [tipo, setTipo] = useState('cp'); // 'cp', 'fbm' o 'instrumento'

  return (
    <div>
      <h2>Agregar nuevo elemento</h2>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setTipo('cp')} style={{ marginRight: '1rem' }}>CP</button>
        <button onClick={() => setTipo('fbm')} style={{ marginRight: '1rem' }}>FBM</button>
        <button onClick={() => setTipo('instrumento')}>Instrumento</button>
      </div>

      {tipo === 'cp' && <FormCP onCPAgregado={() => {}} />}
      {tipo === 'fbm' && <FormFBM />}
      {tipo === 'instrumento' && <FormInstrumento />}
    </div>
  );
}

export default Agregar;
