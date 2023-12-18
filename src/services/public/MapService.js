// Importa la configuración de axios desde la ruta especificada
import { axiosConfig } from '../../config/axiosConfig';

// Función para obtener todos los casos mediante una solicitud GET
export const getAllCasos = () => {
    const URL = '/casos';
    return axiosConfig.get(URL);
}
