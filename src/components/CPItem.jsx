// src/components/CPItem.jsx
import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';

/**
 * Componente para mostrar, editar y eliminar un CP
 */
function CPItem({ cp }) {
  const [modoEdicion, setModoEdicion] = useState(false);
  const [numero, setNumero] = useState(cp.numero);
  const [tipo, setTipo] = useState(cp.tipo);
  const [ubicacion, setUbicacion] = useState(cp.ubicacion);
  const { showToast } = useToast();

  const handleGuardar = () => {
    fetch(`http://localhost:3000/api/cps/${cp.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numero, tipo, ubicacion })
    })
      .then(res => {
        if (!res.ok) throw new Error();
        showToast('CP actualizado correctamente', 'success');
        setModoEdicion(false);
      })
      .catch(() => showToast('Error al actualizar CP', 'error'));
  };

  const handleEliminar = () => {
    if (!window.confirm('¿Eliminar este CP?')) return;
    fetch(`http://localhost:3000/api/cps/${cp.id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (!res.ok) throw new Error();
        showToast('CP eliminado correctamente', 'success');
        window.location.reload();
      })
      .catch(() => showToast('Error al eliminar CP', 'error'));
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      {modoEdicion ? (
        <>
          <input value={numero} onChange={e => setNumero(e.target.value)} />
          <input value={tipo} onChange={e => setTipo(e.target.value)} />
          <input value={ubicacion} onChange={e => setUbicacion(e.target.value)} />
          <button onClick={handleGuardar}>Guardar</button>
          <button onClick={() => setModoEdicion(false)}>Cancelar</button>
        </>
      ) : (
        <>
          <strong>{cp.numero}</strong> ({cp.tipo} - {cp.ubicacion})
          <button onClick={() => setModoEdicion(true)} style={{ marginLeft: '1rem' }}>Editar</button>
          <button onClick={handleEliminar} style={{ marginLeft: '1rem' }}>Eliminar</button>
        </>
      )}
    </div>
  );
}

export default CPItem;
