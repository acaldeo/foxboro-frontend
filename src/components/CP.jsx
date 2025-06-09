// src/components/CP.jsx
import React, { useState } from 'react';
import FBM from './FBM';

/**
 * Componente que representa un CP
 * Incluye funcionalidad de edición y eliminación
 */
function CP({ cp, onActualizar }) {
  // Estado para mostrar/ocultar el formulario de edición
  const [modoEdicion, setModoEdicion] = useState(false);

  // Estados locales para edición
  const [numero, setNumero] = useState(cp.numero);
  const [tipo, setTipo] = useState(cp.tipo);
  const [ubicacion, setUbicacion] = useState(cp.ubicacion);

  // Función para eliminar el CP
  const handleEliminar = () => {
    if (!window.confirm('¿Estás seguro de que querés eliminar este CP?')) return;

    fetch(`http://localhost:3000/api/cps/${cp.id}`, {
      method: 'DELETE'
    })
      .then(() => onActualizar())
      .catch(err => console.error('Error al eliminar CP:', err));
  };

  // Función para actualizar el CP
  const handleEditar = (e) => {
    e.preventDefault();

    const cpActualizado = { numero, tipo, ubicacion };

    fetch(`http://localhost:3000/api/cps/${cp.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cpActualizado)
    })
      .then(() => {
        setModoEdicion(false);
        onActualizar();
      })
      .catch(err => console.error('Error al actualizar CP:', err));
  };

  return (
    <div style={{ border: '1px solid #aaa', margin: '1rem 0', padding: '1rem' }}>
      {modoEdicion ? (
        // Modo edición: formulario
        <form onSubmit={handleEditar}>
          <h3>Editando CP</h3>
          <div>
            <label>Número:</label><br />
            <input value={numero} onChange={(e) => setNumero(e.target.value)} required />
          </div>
          <div>
            <label>Tipo:</label><br />
            <input value={tipo} onChange={(e) => setTipo(e.target.value)} required />
          </div>
          <div>
            <label>Ubicación:</label><br />
            <input value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} required />
          </div>
          <button type="submit">Guardar</button>
          <button type="button" onClick={() => setModoEdicion(false)} style={{ marginLeft: '1rem' }}>
            Cancelar
          </button>
        </form>
      ) : (
        // Modo visual normal
        <>
          <h2>{cp.numero} - {cp.tipo}</h2>
          <p><strong>Ubicación:</strong> {cp.ubicacion}</p>

          {/* Botones de edición y eliminación */}
          <button onClick={() => setModoEdicion(true)}>Editar</button>
          <button onClick={handleEliminar} style={{ marginLeft: '1rem' }}>Eliminar</button>

          {/* Lista de FBMs */}
          {cp.fbms.map(fbm => (
            <FBM key={fbm.id} fbm={fbm} />
          ))}
        </>
      )}
    </div>
  );
}

export default CP;
