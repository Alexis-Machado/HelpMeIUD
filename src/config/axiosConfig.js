import axios from "axios";

// Configuración de axios con la URL base
export const axiosConfig = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

// Intercepta las respuestas para manejar el código de estado 401
axiosConfig.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        // Maneja el error si el código de estado es 401 o 403
        if (error && error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Limpia el almacenamiento local y de sesión
            localStorage.clear();
            sessionStorage.clear();
            // Redirige a la página de inicio de sesión 
        }
        return Promise.reject(error);
    }
);
