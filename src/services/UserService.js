// Importa la configuración de axios
import { axiosConfig } from "../config/axiosConfig";

// Encabezados para la solicitud HTTP
const headers = {
    'Content-Type': 'application/json',
};

// Función asincrónica de registro usando axios
export const register = async (user) => {
    // URL para la ruta de registro
    const url = "/usuarios/signup";
    
    // Imprime el objeto de usuario en la consola
    console.log(user);
    
    // Realiza una solicitud POST y retorna el resultado
    return await axiosConfig.post(url, user, { headers });
}
