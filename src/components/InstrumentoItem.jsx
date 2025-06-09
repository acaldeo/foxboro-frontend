// src/components/InstrumentoItem.jsx
import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';

/**
 * Componente para mostrar, editar y eliminar un instrumento individual
 */
function InstrumentoItem({ instrumento }) {
  const [modoEdicion, setModoEdicion] = useState(false);
  const [nombre, setNombre] = useState(instrumento.nombre);
  const [tipo, setTipo] = useState(instrumento.tipo);
  const { showToast } = useToast(); // Importamos sistema de toast

  const handleGuardar = () => {
    fetch(`http://localhost:3000/api/instrumentos/${instrumento.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, tipo, fbm_id: instrumento.fbm_id })
    })
      .then(res => {
        if (!res.ok) throw new Error();
        showToast('Instrumento actualizado correctamente', 'success');
        setModoEdicion(false);
      })
      .catch(() => showToast('Error al actualizar instrumento', 'error'));
  };

  const handleEliminar = () => {
    if (!window.confirm('¿Eliminar este instrumento?')) return;

    fetch(`http://localhost:3000/api/instrumentos/${instrumento.id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (!res.ok) throw new Error();
        showToast('Instrumento eliminado correctamente', 'success');
        window.location.reload();
      })
      .catch(() => showToast('Error al eliminar instrumento', 'error'));
  };

  return (
    <div style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
      {modoEdicion ? (
        <>
          <input value={nombre} onChange={e => setNombre(e.target.value)} />
          <input value={tipo} onChange={e => setTipo(e.target.value)} />
          <button onClick={handleGuardar}>Guardar</button>
          <button onClick={() => setModoEdicion(false)}>Cancelar</button>
        </>
      ) : (
        <>
          <strong>{instrumento.nombre}</strong> ({instrumento.tipo})
          <button onClick={() => setModoEdicion(true)} style={{ marginLeft: '1rem' }}>Editar</button>
          <button onClick={handleEliminar} style={{ marginLeft: '1rem' }}>Eliminar</button>
        </>
      )}
    </div>
  );
}

export default InstrumentoItem;
