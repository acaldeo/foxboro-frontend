// src/components/FBMItem.jsx
import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';

/**
 * Componente para mostrar, editar y eliminar una FBM
 */
function FBMItem({ fbm }) {
  const [modoEdicion, setModoEdicion] = useState(false);
  const [numero, setNumero] = useState(fbm.numero);
  const [ubicacion, setUbicacion] = useState(fbm.ubicacion);
  const [puntos, setPuntos] = useState(fbm.cantidad_puntos);
  const { showToast } = useToast();

  const handleGuardar = () => {
    fetch(`http://localhost:3000/api/fbms/${fbm.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        numero,
        ubicacion,
        cantidad_puntos: puntos,
        cp_id: fbm.cp_id
      })
    })
      .then(res => {
        if (!res.ok) throw new Error();
        showToast('FBM actualizada correctamente', 'success');
        setModoEdicion(false);
      })
      .catch(() => showToast('Error al actualizar FBM', 'error'));
  };

  const handleEliminar = () => {
    if (!window.confirm('¿Eliminar esta FBM?')) return;
    fetch(`http://localhost:3000/api/fbms/${fbm.id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (!res.ok) throw new Error();
        showToast('FBM eliminada correctamente', 'success');
        window.location.reload();
      })
      .catch(() => showToast('Error al eliminar FBM', 'error'));
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      {modoEdicion ? (
        <>
          <input value={numero} onChange={e => setNumero(e.target.value)} />
          <input value={ubicacion} onChange={e => setUbicacion(e.target.value)} />
          <input type="number" value={puntos} onChange={e => setPuntos(e.target.value)} />
          <button onClick={handleGuardar}>Guardar</button>
          <button onClick={() => setModoEdicion(false)}>Cancelar</button>
        </>
      ) : (
        <>
          <strong>{fbm.numero}</strong> ({fbm.ubicacion} - {fbm.cantidad_puntos} puntos)
          <button onClick={() => setModoEdicion(true)} style={{ marginLeft: '1rem' }}>Editar</button>
          <button onClick={handleEliminar} style={{ marginLeft: '1rem' }}>Eliminar</button>
        </>
      )}
    </div>
  );
}

export default FBMItem;
