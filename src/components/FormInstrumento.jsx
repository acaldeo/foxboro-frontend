// src/components/FormInstrumento.jsx
import React, { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';

/**
 * Formulario para agregar un nuevo instrumento
 * Requiere seleccionar una FBM existente
 */
function FormInstrumento() {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [fbmId, setFbmId] = useState('');
  const [fbms, setFbms] = useState([]);
  const { showToast } = useToast(); // Importamos el toast

  // Cargar FBMs disponibles para el selector
  useEffect(() => {
    fetch('http://localhost:3000/api/fbms')
      .then(res => res.json())
      .then(data => setFbms(data));
  }, []);

  // Enviar instrumento
  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoInstrumento = {
      nombre,
      tipo,
      fbm_id: parseInt(fbmId)
    };

    fetch('http://localhost:3000/api/instrumentos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoInstrumento)
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al crear instrumento');
        return res.json();
      })
      .then(() => {
        setNombre('');
        setTipo('');
        setFbmId('');
        showToast('Instrumento creado correctamente', 'success');
      })
      .catch(err => {
        console.error(err);
        showToast('Error al crear instrumento', 'error');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Agregar nuevo instrumento</h3>

      <div>
        <label>Nombre:</label><br />
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      </div>

      <div>
        <label>Tipo:</label><br />
        <input value={tipo} onChange={(e) => setTipo(e.target.value)} required />
      </div>

      <div>
        <label>FBM asociada:</label><br />
        <select value={fbmId} onChange={(e) => setFbmId(e.target.value)} required>
          <option value="">Seleccionar FBM</option>
          {fbms.map(fbm => (
            <option key={fbm.id} value={fbm.id}>{fbm.numero}</option>
          ))}
        </select>
      </div>

      <button type="submit" style={{ marginTop: '1rem' }}>Guardar Instrumento</button>
    </form>
  );
}

export default FormInstrumento;
