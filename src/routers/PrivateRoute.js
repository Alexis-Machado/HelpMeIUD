import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

// Componente para rutas privadas que requieren autenticación
export default function PrivateRoute({ children }) {

    const { user } = useContext(AuthContext);

    return (user.logged)
        ? children
        : <Navigate to='/login'/>
}

PrivateRoute.propTypes = {
   
}
