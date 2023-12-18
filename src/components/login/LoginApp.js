import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';
import { messages } from '../../utils/messages';
import Swal from 'sweetalert2';
import { login } from '../../services/AuthService';
import './Login.css';

export default function LoginApp() {
    const history = useNavigate();

    const [off, setOff] = useState('off');
    const [loading, setLoading] = useState(false);
    const { dispatch } = useContext(AuthContext);
    const [req] = useState(false);
    const [usr, setUsr] = useState({
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        username: '',
        password: '',
    });

    useEffect(() => {
        setOff('off');
    }, []);

    const handleValidation = () => {
        let errors = {};
        let isValid = true;
        if (!usr.username) {
            isValid = false;
            errors['username'] = 'Email requerido';
        } else if (
            typeof usr.username !== 'undefined' &&
            usr.username !== ''
        ) {
            let lastAtPos = usr.username.lastIndexOf('@');
            let lastDotPos = usr.username.lastIndexOf('.');

            if (
                !(
                    lastAtPos < lastDotPos &&
                    lastAtPos > 0 &&
                    usr.username.indexOf('@@') === -1 &&
                    lastDotPos > 2 &&
                    usr.username.length - lastDotPos > 2
                )
            ) {
                isValid = false;
                errors['username'] = 'Email no válido';
            }
        } else {
            errors['username'] = '';
        }
        // password
        if (!usr.password) {
            isValid = false;
            errors['password'] = 'Contraseña requerida';
        } else {
            errors['password'] = '';
        }
        setErrors({ ...errors });
        return isValid;
    };

    const sendLogin = (e) => {
        e.preventDefault();
        if (handleValidation()) {
            setLoading(true);
            login(usr)
                .then((r) => {
                    const lastPath =
                        localStorage.getItem('lastPath') || '/private/profile';
                    dispatch({
                        type: types.login,
                        payload: {
                            user: r.data,
                        },
                    });
                    history(lastPath, { replace: true });
                    setLoading(false);
                })
                .catch((e) => {
                    const { data } = e.response;
                    console.log(data);
                    setLoading(false);
                    if (data.message)
                        return Swal.fire('Error', data.message, 'error');
                    return Swal.fire('Error', messages.CREDS_INVALIDAS, 'error');
                });
        }
    };

    const handleChange = (e) => {
        setUsr({
            ...usr,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <header className="header" style={{ paddingTop: '1px' }}>
                <nav className="navbar">
                    <a href="/login"><strong>Inicio</strong></a>
                    <a href="/register"><strong>Regístrate</strong></a>
                    <a href="/public/map"><strong>Mapa</strong></a>
                    <a href="/public/about"><strong>Acerca</strong></a>
                    <a href="#"><strong>Contáctanos</strong></a>
                </nav>
                <form action="" className="search-bar">
                    <input type="text" placeholder="Buscar..." />
                    <button>
                        <i className="bx bx-search"></i>
                    </button>
                </form>
            </header>

            <div className="background"></div>
            <div className="container2">
                <div className="item">
                    <h2 className="logo">
                        <img src="https://th.bing.com/th/id/R.76e1e37100b73602df45713eb2045d40?rik=rdFS7DZ3lP9Bcg&pid=ImgRaw&r=0" alt="Logo" />
                    </h2>
                    <div className="text-item">
                        <h2>
                            <strong>❤️¡Bienvenido a 💙 HelpMeIUD!🖤</strong> <br /><br></br>
                            <span className="smallText"><strong>Estamos encantados de tenerte de nuevo</strong></span>
                        </h2>
                        <p>
                            <strong>
                                Únete a nuestra comunidad para mejorar la seguridad
                                en el área metropolitana de Medellín. Registra
                                Casos, delitos, mantente informado, previene
                                incidentes y contribuye a construir una cuidad mas segura.
                            </strong>
                        </p>
                        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"></link>

                        <div className="social-icon"><br></br>
                            <a href="https://wa.me/6045200750">
                                <i className="bx bxl-whatsapp" style={{ color: 'green' }}></i>
                            </a>
                            <a href="https://www.youtube.com/@IUDigitalDeAntioquia">
                                <i className="bx bxl-youtube" style={{ color: '#FF0000' }}></i>
                            </a>
                            <a href="https://www.instagram.com/iudigital/">
                                <i className="bx bxl-instagram" style={{ color: '#FF1493' }}></i>
                            </a>
                            <a href="https://www.facebook.com/soyiudigital/">
                                <i className="bx bxl-facebook" style={{ color: 'blue' }}></i>
                            </a>
                            <a href="#">
                                <i className="bx bxl-twitter" style={{ color: 'blue' }}></i>
                            </a>
                            <a href="#">
                                <i className="bx bxl-tiktok" style={{ color: '#33C695' }}></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="login-section" style={{ background: 'transparent' }}>
                    <div className="form-box login">
                        <form onSubmit={sendLogin}>
                            <h2>Iniciar Sesión</h2>
                            <div className="input-box">
                                <span className="icon">
                                    <i className="bx bxs-user-account"></i>
                                </span>
                                <input
                                    type="text"
                                    required
                                    name="username"
                                    onChange={handleChange}
                                />
                                <label><strong>Correo Electrónico</strong></label>
                            </div>
                            <div className="input-box">
                                <span className="icon">
                                    <i className="bx bxs-lock-alt"></i>
                                </span>
                                <input
                                    type="password"
                                    required
                                    name="password"
                                    onChange={handleChange}
                                />
                                <label><strong>Contraseña</strong></label>
                            </div>
                            <div className="remember-password">
                                <label for="">
                                    <input type="checkbox" /> <strong>Recuérdame</strong>
                                </label>
                                <a href="#"><strong>Olvidaste tu Contraseña</strong></a>
                            </div>
                            <button className="btn" disabled={loading}>
                                {loading && (
                                    <span
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                )}
                                <strong>Ingresar</strong>
                            </button>
                            <div className="create-account">
                                <p>
                                    <strong>¿Aún no tienes cuenta?</strong>
                                    <Link to="/register" className="register-link">
                                        ‎ <strong>Regístrate</strong>
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
            <script src="loginHandler.js"></script>
        </>
    );
}
