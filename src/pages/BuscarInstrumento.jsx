// src/pages/BuscarInstrumento.jsx
import React, { useState } from 'react';
import axios from 'axios';
import InstrumentoResultado from '../components/InstrumentoResultado';

/**
 * Página para buscar un instrumento por nombre y mostrar su información jerárquica,
 * incluyendo la FBM y el CP al que está conectado.
 */
const BuscarInstrumento = () => {
  const [instrumento, setInstrumento] = useState(null);  // Datos del instrumento encontrado
  const [idBuscar, setIdBuscar] = useState('');          // Nombre ingresado por el usuario
  const [error, setError] = useState('');                // Mensaje de error si no se encuentra

  /**
   * Realiza la búsqueda del instrumento por nombre llamando a la API.
   */
  const buscar = async () => {
    try {
      const res = await axios.get(`/api/instrumentos/nombre/${idBuscar}`); // ✅ RUTA CORRECTA
      setInstrumento(res.data);
      console.log('✅ Instrumento recibido:', res.data);// Para depuración
      setError('');
    } catch (err) {
      setError('Instrumento no encontrado');
      setInstrumento(null);
    }
  };

  /**
   * Elimina un instrumento por su ID.
   */
  const eliminar = async (id) => {
    try {
      await axios.delete(`/api/instrumentos/${id}`);
      alert('Instrumento eliminado');
      setInstrumento(null);
    } catch (err) {
      alert('Error al eliminar instrumento');
    }
  };

  /**
   * Placeholder para la función de edición.
   */
  const editar = (data) => {
    alert(`⚠️ Función de edición pendiente para instrumento ID: ${data.id}`);
  };

  return (
    <div>
      <h2>Buscar Instrumento</h2>
      <input
        type="text"
        placeholder="Nombre del instrumento"
        value={idBuscar}
        onChange={(e) => setIdBuscar(e.target.value)}
      />
      <button onClick={buscar}>Buscar</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <InstrumentoResultado
        data={instrumento}
        onEditar={editar}
        onEliminar={eliminar}
      />
    </div>
  );
};

export default BuscarInstrumento;
