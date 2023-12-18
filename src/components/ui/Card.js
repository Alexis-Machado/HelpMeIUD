import React, { useEffect, useState } from 'react';
import './card.css';

// Componente funcional Card que representa una tarjeta con imagen y contenido
export default function Card(props) {

    // Extrae las propiedades del objeto props
    const { title, texto, subtitles, src } = props;

    // Estado para controlar si la imagen está cargando
    const [loading, setLoading] = useState(true);

    // Efecto que se ejecuta cuando la imagen cambia
    useEffect(() => {
        // Crea una nueva instancia de Image y asigna la URL de la imagen
        const img = new Image();
        img.src = src;

        // Se ejecuta cuando la imagen se carga exitosamente
        img.onload = () => {
            setLoading(false); // Cambia el estado para indicar que la imagen ha cargado
        };
    }, [src]); // Se ejecuta solo cuando la URL de la imagen cambia

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title text-center"><strong>{title}</strong></h5>
                <p className="card-text">{texto}</p>

                {/* Mapea y muestra subtítulos*/}
                {subtitles && subtitles.map((subtitle, index) => (
                    <p key={index} className="card-text text-center">
                        <small className="text-muted">
                            <strong style={{ fontSize: '1.2rem' }}>{subtitle}</strong>
                        </small>
                    </p>
                ))}
            </div>

            {/* Muestra un spinner de carga mientras la imagen está cargando */}
            {loading ? (
                <div className="spinner-border m-5" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            ) : (
                <>
                    {/* Muestra la imagen una vez que ha cargado */}
                    <img
                        {...{ src: '', ...props }}
                        alt=""
                        className="image"
                    />

                    {/* Pie de tarjeta con la fecha actual y un enlace */}
                    <div className="card-footer">
                        <small className="date">
                            {new Date().toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </small>
                        <a href="#" className="card-link"><strong>Ver más...</strong></a>
                    </div>
                </>
            )}
        </div>
    );
}
