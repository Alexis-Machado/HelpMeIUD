// Importa la configuración de axios
import { axiosConfig } from "../config/axiosConfig";

// Credenciales codificadas en Base64 para la autorización
const credenciales = btoa(process.env.REACT_APP_NAME + ':' + process.env.REACT_APP_AUTH_PASSWORD);

// Encabezados para la solicitud HTTP de inicio de sesión
const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + credenciales,
};

// Función asincrónica para realizar la solicitud de inicio de sesión
export const login = async (user) => {
    // Crea un objeto de parámetros de solicitud
    const params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.username);
    params.set('password', user.password);
    
    // Realiza una solicitud POST y retorna el resultado
    return await axiosConfig.post(
        process.env.REACT_APP_AUTH_URL,
        params,
        { headers: headers }
    );
}

// Función para cerrar sesión y limpiar la sesión en sessionStorage
export const logout = () => {
    console.log('logout auth service');
    sessionStorage.clear();
}
