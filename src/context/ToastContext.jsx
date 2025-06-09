// src/context/ToastContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Creamos el contexto de Toast
const ToastContext = createContext();

// Hook personalizado para usar el contexto en cualquier componente
export const useToast = () => useContext(ToastContext);

// Componente proveedor que envuelve toda la app
export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null); // Estado del mensaje activo

  // Función para mostrar el toast con mensaje y tipo ('success' o 'error')
  const showToast = (message, type = 'success') => {
    setToast({ message, type });

    // Oculta el toast después de 3 segundos
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Componente visual del toast */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            background: toast.type === 'success' ? '#4caf50' : '#f44336',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
            zIndex: 9999,
            fontWeight: 'bold',
          }}
        >
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
};
