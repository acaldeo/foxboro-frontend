import { enclosureImageMap } from "./imgMap";

/**
 * Devuelve la ruta de imagen asociada a un enclosure.
 */
export function getEnclosureImagePath(ubicacion) {
  return enclosureImageMap[ubicacion] || null;
}
