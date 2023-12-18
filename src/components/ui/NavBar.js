import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { logout } from '../../services/AuthService';
import { types } from '../../types/types';
import './NavBar.css';

// Componente funcional que representa la barra de navegación
export default function NavBar() {

  // Estado para controlar si el menú de navegación está colapsado
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  // Objeto de ubicación actual
  const location = useLocation();

  // Hooks del contexto de autenticación para obtener información del usuario
  const { user: { user }, dispatch, isAdmin } = useContext(AuthContext);

  // Navegador personalizado
  const history = useNavigate();

  // Maneja la acción de cerrar sesión
  const sendLogout = (e) => {
    e.preventDefault();
    history('/login', { replace: true });
    dispatch({
      type: types.logout,
    });
    logout();
  };

  // Maneja el colapso del menú de navegación
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  // No renderiza el NavBar en la pantalla de inicio de sesión
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <nav id="navbar-example2" className="navbar navbar-expand-lg navbar-light bg-light px-3">
      {/* Enlace al inicio */}
      <Link to="/private/profile" className="navbar-brand neon" tabIndex={0} aria-label="Ir al Inicio">
        HelpMeIUD
      </Link>

      {/* Botón de alternancia para menú colapsado */}
      <button
        className="custom-toggler navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExample09"
        aria-controls="navbarsExample09"
        aria-expanded={!isNavCollapsed ? true : false}
        aria-label="Toggle navigation"
        onClick={handleNavCollapse}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Menú de navegación */}
      <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarsExample09">
        <ul className="navbar-nav">
          {/* Enlaces para usuarios no autenticados */}
          {!user && (
            <NavLink tabIndex={1} className="nav-item nav-link" to="/login">
              <strong>Inicar sesión</strong>
            </NavLink>
          )}
          {!user && (
            <NavLink tabIndex={2} className="nav-item nav-link" to="/register">
              <strong>Regístrate</strong>
            </NavLink>
          )}

          {/* Enlaces para todos los usuarios */}
          <NavLink tabIndex={3} className="nav-item nav-link" to="/public/map">
            <strong>Mapa</strong>
          </NavLink>
          <NavLink tabIndex={4} className="nav-item nav-link" to="/public/about">
            <strong>Acerca</strong>
          </NavLink>

          {/* Enlaces y menú desplegable para usuarios autenticados */}
          {user && (
            <>
              <NavLink className="nav-item nav-link" to="/private/report">
                <strong>Reportar</strong>
              </NavLink>
              {(user && isAdmin) && (
                <NavLink className="nav-item nav-link" to="/private/delitos">
                  <strong>Delitos</strong>
                </NavLink>
              )}
              <li className="nav-item dropdown logout">
                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                  <strong>{user.nombre}</strong>
                </a>
                {/* Menú desplegable para opciones de usuario */}
                <ul className="dropdown-menu">
                  <NavLink className="dropdown-item" to="/private/profile">
                    <strong> Mi Perfil</strong>
                  </NavLink>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={sendLogout}>
                      <strong>Salir</strong>
                    </a>
                  </li>
                </ul>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Información Integrantes*/}
      <div className='integrantes'>
          <a href='/portada.html' style={{ textDecoration: 'none', color: '#000000' }}><strong>Alexis Machado</strong></a>
          <br />
          <a href='/portada.html' style={{ textDecoration: 'none', color: '#000000' }}><strong>Julián Martínez</strong></a>
          <br />
          <a href='/portada.html' style={{ textDecoration: 'none', color: '#000000' }}><strong>Kevin Sepulveda</strong></a>
      </div>

      {/* Logo */}
      <div>
        <img
          src="https://th.bing.com/th/id/R.76e1e37100b73602df45713eb2045d40?rik=rdFS7DZ3lP9Bcg&pid=ImgRaw&r=0"
          alt="logo"
          className="smallLogo"
        />
      </div>
    </nav>
  );
}
