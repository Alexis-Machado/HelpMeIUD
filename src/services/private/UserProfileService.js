// Importa la configuración de axios desde la ruta especificada
import { axiosConfig } from "../../config/axiosConfig";

// Función asincrónica para obtener información del usuario por ID
export const getUserById = async () => {
    axiosConfig.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
    const url = "/usuarios/usuario";
    const resp = await axiosConfig.get(url);
    return resp.data;
}

// Función asincrónica para editar información del usuario
export const edit = async (user) => {
    axiosConfig.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
    const url = "/usuarios/usuario";
    console.log(user);
    return await axiosConfig.put(url, user);
}

// Función asincrónica para subir una imagen del usuario
export const uploadImage = async (file) => {
    axiosConfig.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
    const url = "/usuarios/upload";
    const formData = new FormData();
    formData.append("image", file);
    const resp = await axiosConfig.post(url, formData);
    return resp.data;
}
