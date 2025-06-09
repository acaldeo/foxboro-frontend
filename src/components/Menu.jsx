// src/components/Menu.jsx
import React from 'react';

/**
 * Menú superior que permite cambiar entre Buscar y Agregar
 * Props:
 * - setVista: función para cambiar la vista activa
 * - vistaActiva: la vista actual ('buscar' o 'agregar')
 */
function Menu({ setVista, vistaActiva }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <button
        onClick={() => setVista('buscar')}
        style={{ marginRight: '1rem', fontWeight: vistaActiva === 'buscar' ? 'bold' : 'normal' }}
      >
        Buscar
      </button>

      <button
        onClick={() => setVista('agregar')}
        style={{ fontWeight: vistaActiva === 'agregar' ? 'bold' : 'normal' }}
      >
        Agregar
      </button>
    </div>
  );
}

export default Menu;
