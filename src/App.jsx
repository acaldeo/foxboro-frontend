// src/App.jsx
import React, { useState } from 'react';
import Menu from './components/Menu';
import Agregar from './components/Agregar';
import Buscar from './components/Buscar';

/**
 * Componente principal.
 * Muestra el menú y la vista actual seleccionada: Buscar o Agregar.
 */
function App() {
  const [vista, setVista] = useState('buscar'); // 'buscar' o 'agregar'

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Arquitectura IAS</h1>

      {/* Menú de navegación */}
      <Menu setVista={setVista} vistaActiva={vista} />

      {/* Vista dinámica según selección */}
      {vista === 'agregar' && <Agregar />}
      {vista === 'buscar' && <Buscar />}
    </div>
  );
}

export default App;
