// src/components/Buscar.jsx
import React, { useState, useEffect } from 'react';
import CPItem from './CPItem';
import FBMItem from './FBMItem';
import InstrumentoItem from './InstrumentoItem';

/**
 * Componente Buscar
 * Permite al usuario buscar por CP, FBM o Instrumento.
 * Muestra resultados editables y eliminables en línea.
 */
function Buscar() {
  const [tipo, setTipo] = useState('cp');       // Tipo seleccionado para buscar
  const [filtro, setFiltro] = useState('');      // Texto de búsqueda
  const [resultados, setResultados] = useState([]); // Resultados filtrados

  // Carga datos cada vez que cambian el tipo o el filtro
  useEffect(() => {
    if (filtro === '') {
      setResultados([]);
      return;
    }

    const endpoint = {
      cp: 'cps',
      fbm: 'fbms',
      instrumento: 'instrumentos'
    }[tipo];

    fetch(`http://localhost:3000/api/${endpoint}`)
      .then(res => res.json())
      .then(data => {
        const filtrados = data.filter(item =>
          JSON.stringify(item).toLowerCase().includes(filtro.toLowerCase())
        );
        setResultados(filtrados);
      });
  }, [filtro, tipo]);

  return (
    <div>
      <h2>Buscar</h2>

      {/* Selector de tipo de búsqueda */}
      <div>
        <label>Buscar en:</label>
        <select value={tipo} onChange={e => setTipo(e.target.value)} style={{ marginLeft: '0.5rem' }}>
          <option value="cp">CP</option>
          <option value="fbm">FBM</option>
          <option value="instrumento">Instrumento</option>
        </select>
      </div>

      {/* Input de texto para buscar */}
      <input
        type="text"
        placeholder="Buscar por texto..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        style={{ marginTop: '1rem', width: '100%' }}
      />

      {/* Resultados */}
      <div style={{ marginTop: '2rem' }}>
        {tipo === 'cp' && resultados.map(item => <CPItem key={item.id} cp={item} />)}
        {tipo === 'fbm' && resultados.map(item => <FBMItem key={item.id} fbm={item} />)}
        {tipo === 'instrumento' && resultados.map(item => <InstrumentoItem key={item.id} instrumento={item} />)}
      </div>
    </div>
  );
}

export default Buscar;
