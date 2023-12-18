// Importa la configuración de axios desde la ruta especificada
import { axiosConfig } from "../../config/axiosConfig";

// Función asincrónica para crear un caso mediante una solicitud POST
export const crear = async (caso = {}) => {
    // Establece el token de autorización en los encabezados de axios
    axiosConfig.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
    
    // Realiza una solicitud POST y retorna el resultado
    return await axiosConfig.post(
        process.env.REACT_APP_BASE_URL + "/casos", caso
    );
}
