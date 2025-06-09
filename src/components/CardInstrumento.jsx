// src/components/CardInstrumento.jsx
import React, { useState } from 'react';

/**
 * Componente para visualizar y editar/eliminar un instrumento individual
 */
function CardInstrumento({ instrumento, onActualizado }) {
  const [modoEdicion, setModoEdicion] = useState(false);
  const [nombre, setNombre] = useState(instrumento.nombre);
  const [tipo, setTipo] = useState(instrumento.tipo);

  const handleActualizar = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/api/instrumentos/${instrumento.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, tipo, fbm_id: instrumento.fbm_id })
    })
      .then(() => {
        setModoEdicion(false);
        onActualizado();
      });
  };

  const handleEliminar = () => {
    if (!window.confirm('¿Eliminar instrumento?')) return;

    fetch(`http://localhost:3000/api/instrumentos/${instrumento.id}`, {
      method: 'DELETE'
    })
      .then(() => onActualizado());
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      {modoEdicion ? (
        <form onSubmit={handleActualizar}>
          <h4>Editando instrumento</h4>
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          <input value={tipo} onChange={(e) => setTipo(e.target.value)} required />
          <br />
          <button type="submit">Guardar</button>
          <button type="button" onClick={() => setModoEdicion(false)} style={{ marginLeft: '1rem' }}>
            Cancelar
          </button>
        </form>
      ) : (
        <>
          <strong>{instrumento.nombre}</strong> ({instrumento.tipo})<br />
          FBM ID: {instrumento.fbm_id}<br />
          <button onClick={() => setModoEdicion(true)}>Editar</button>
          <button onClick={handleEliminar} style={{ marginLeft: '1rem' }}>Eliminar</button>
        </>
      )}
    </div>
  );
}

export default CardInstrumento;
