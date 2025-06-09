import React from "react";
import { getEnclosureImagePath } from "../utils/getEnclosureImage";

const InstrumentoResultado = ({ data }) => {
  if (!data) return null;

  const enclosurePath = getEnclosureImagePath(data.cp.ubicacion); // CP.ubicacion es el enclosure
  return (
    <div>
      <h3>Instrumento</h3>
      <p><strong>Nombre:</strong> {data.nombre}</p>
      <p><strong>Tipo:</strong> {data.tipo}</p>

      <h4>FBM</h4>
      <p><strong>Número:</strong> {data.fbm.numero}</p>
      <p><strong>Ubicación (enclosure):</strong> {data.fbm.ubicacion}</p>

      <h4>CP</h4>
      <p><strong>Número:</strong> {data.cp.numero}</p>
      <p><strong>Tipo:</strong> {data.cp.tipo}</p>
      <p><strong>Ubicación (enclosure):</strong> {data.cp.ubicacion}</p>

      {enclosurePath && (
        <div>
          <h4>Imagen del Enclosure</h4>
          <img src={enclosurePath} alt="Enclosure" width="400" />
        </div>
      )}
    </div>
  );
};

export default InstrumentoResultado;
