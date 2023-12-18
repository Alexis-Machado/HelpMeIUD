import React, { useEffect, useReducer, useState } from 'react';
import { InfoUsers } from '../utils/InfoUsers';
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';

// Función de inicialización para el estado del usuario
const init = () => {
    return JSON.parse(sessionStorage.getItem('user')) || { logged: false };
};

// Componente que provee el contexto de autenticación
export default function AuthProvider({ children }) {

    // Utiliza el reducer para manejar el estado de la autenticación
    const [user, dispatch] = useReducer(authReducer, {}, init);
    
    // Estado para verificar si el usuario es administrador
    const [isAdmin, setIsAdmin] = useState(false);

    // Efecto para almacenar la información del usuario en sessionStorage y verificar el rol de administrador
    useEffect(() => {
        sessionStorage.setItem('user', JSON.stringify(user));
        if (user.user) {
            sessionStorage.setItem('token', user.user.access_token);
        }
        const existe = InfoUsers.roleExiste('ROLE_ADMIN');
        setIsAdmin(existe);
    }, [user]);

    // Provee el contexto de autenticación a los componentes descendientes
    return (
        <AuthContext.Provider value={{ user, dispatch, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
}
