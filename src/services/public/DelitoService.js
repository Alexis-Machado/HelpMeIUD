// Importa la configuración de axios desde la ruta específica
import { axiosConfig } from "../../config/axiosConfig";

// Función para obtener todos los delitos haciendo una solicitud GET
export const obtenerTodos = () => {
    return axiosConfig.get("/delitos");
}
