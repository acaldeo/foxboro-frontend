// src/components/FormFBM.jsx
import React, { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';

/**
 * Formulario para crear una nueva FBM asociada a un CP existente
 */
function FormFBM() {
  const [numero, setNumero] = useState('');
  const [cantidadPuntos, setCantidadPuntos] = useState(16);
  const [cpId, setCpId] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [cps, setCps] = useState([]);
  const { showToast } = useToast(); // Importamos sistema de toast

  // Cargar CPs disponibles para el selector
  useEffect(() => {
    fetch('http://localhost:3000/api/cps')
      .then(res => res.json())
      .then(data => setCps(data));
  }, []);

  // Enviar FBM al backend
  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevaFBM = {
      numero,
      cantidad_puntos: parseInt(cantidadPuntos),
      cp_id: parseInt(cpId),
      ubicacion
    };

    fetch('http://localhost:3000/api/fbms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaFBM)
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al crear FBM');
        return res.json();
      })
      .then(() => {
        setNumero('');
        setCantidadPuntos(16);
        setUbicacion('');
        setCpId('');
        showToast('FBM creada correctamente', 'success');
      })
      .catch(err => {
        console.error(err);
        showToast('Error al crear FBM', 'error');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Agregar nueva FBM</h3>

      <div>
        <label>Número:</label><br />
        <input value={numero} onChange={(e) => setNumero(e.target.value)} required />
      </div>

      <div>
        <label>Cantidad de puntos:</label><br />
        <input
          type="number"
          value={cantidadPuntos}
          onChange={(e) => setCantidadPuntos(e.target.value)}
          min={1}
          required
        />
      </div>

      <div>
        <label>CP asociado:</label><br />
        <select value={cpId} onChange={(e) => setCpId(e.target.value)} required>
          <option value="">Seleccionar CP</option>
          {cps.map(cp => (
            <option key={cp.id} value={cp.id}>{cp.numero}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Ubicación:</label><br />
        <input value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} required />
      </div>

      <button type="submit" style={{ marginTop: '1rem' }}>Guardar FBM</button>
    </form>
  );
}

export default FormFBM;
