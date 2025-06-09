// src/components/FormCP.jsx
import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';

/**
 * Formulario para agregar un CP
 */
function FormCP({ onCPAgregado }) {
  const [numero, setNumero] = useState('');
  const [tipo, setTipo] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const { showToast } = useToast(); // Usamos toast

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoCP = { numero, tipo, ubicacion };

    fetch('http://localhost:3000/api/cps', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoCP)
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al crear CP');
        return res.json();
      })
      .then(() => {
        setNumero('');
        setTipo('');
        setUbicacion('');
        showToast('CP creado correctamente', 'success');
        onCPAgregado(); // Recarga estructura
      })
      .catch(err => {
        console.error(err);
        showToast('Error al crear CP', 'error');
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', border: '1px solid #ddd', padding: '1rem' }}>
      <h2>Agregar nuevo CP</h2>
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
      <button type="submit" style={{ marginTop: '1rem' }}>Guardar</button>
    </form>
  );
}

export default FormCP;
