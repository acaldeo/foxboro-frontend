import React from "react";
import { getEnclosureImagePath } from "../utils/getEnclosureImage";

/**
 * Muestra la información de una FBM y su CP relacionado,
 * junto con la imagen del enclosure si está disponible.
 */
const FbmResultado = ({ data }) => {
  if (!data) return null;

  const enclosurePath = getEnclosureImagePath(data.cp.ubicacion); 

  return (
    <div>
      <h3>FBM</h3>
      <p><strong>Número:</strong> {data.numero}</p>
      <p><strong>Ubicación:</strong> {data.ubicacion}</p>
      <p><strong>Cantidad de puntos:</strong> {data.cantidad_puntos}</p>

      <h4>Controlador de Proceso (CP)</h4>
      <p><strong>Número:</strong> {data.cp.numero}</p>
      <p><strong>Tipo:</strong> {data.cp.tipo}</p>
      <p><strong>Ubicación:</strong> {data.cp.ubicacion}</p>

      {enclosurePath && (
        <div>
          <h4>Imagen del Enclosure</h4>
          <img src={enclosurePath} alt={`Enclosure ${data.cp.ubicacion}`} width="400" />
        </div>
      )}
    </div>
  );
};

export default FbmResultado;
