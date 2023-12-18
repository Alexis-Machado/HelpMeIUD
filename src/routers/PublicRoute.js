import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

// Componente para rutas públicas 
export default function PublicRoute({ children }) {

    const { user } = useContext(AuthContext);
    
    return (!user.logged)
        ? children
        : <Navigate to='/private/profile'/>
}

PublicRoute.propTypes = {
}
