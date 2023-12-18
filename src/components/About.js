import React from 'react';
import Card from './ui/Card';
import '../index.css';

// Contenido de las tarjetas
const cardsContent = [
    {
        title: '¿Quienes Somos?',
        texto: 'HelmeIUD nace para combatir la violencia, los hechos que no son noticia y quedan impunes...',
        subtitles: ['HelmeIUD💙❤️🖤'],
        src: 'https://scontent.feoh3-1.fna.fbcdn.net/v/t39.30808-6/398741040_347880704485676_315471100938545231_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=9BCXHjjQhq8AX-fPFGP&_nc_ht=scontent.feoh3-1.fna&oh=00_AfDm90ysGrspoqsYf2GR4ZyPQ3wL93KLi3aPah37spgl8g&oe=656F1848'
    },
    {
        title: 'Proyecto',
        texto: 'Contribuir en comunidad para mantenernos prevenidos ante la ola de violencia...',
        subtitles: ['Unidos Somos Más💙❤️🖤'],
        src: 'https://scontent.feoh3-1.fna.fbcdn.net/v/t39.30808-6/277678855_3160622797484108_2394099357019903080_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=c83dfd&_nc_ohc=26ioWx4yEPAAX9USPmH&_nc_ht=scontent.feoh3-1.fna&oh=00_AfANsWFzLoAP8iIn2iPGu_brRYsPIB1Y0u8w62IAVJlWzA&oe=656EC5D4'
    },
    {
        title: 'HELPMEIUD',
        texto: 'En HelpMeIUD, construimos juntos un escudo de seguridad para nuestra comunidad...',
        subtitles: ['Seguros en Comunidad💙❤️🖤'],
        src: 'https://scontent.feoh3-1.fna.fbcdn.net/v/t39.30808-6/355644768_274503611823386_5980594232475814430_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=9c7eae&_nc_ohc=ScKpODoQx2oAX9MW03O&_nc_ht=scontent.feoh3-1.fna&oh=00_AfCWbAUvd8XDX8wGGS7RWHrV0dAoxWCiIsvDZAEbYPX_dw&oe=656FD44D'
    }
]

// Componente que muestra información sobre la aplicación
export default function About() {
    return (
        <div className="container my-3">
            <div className="row row-cols-1 row-cols-md-3 g-4 needs-validation">
                {cardsContent.map(c => (
                    <div className="col" key={c.title}>
                        <Card 
                            title={c.title}
                            texto={c.texto}
                            subtitles={c.subtitles}
                            src={c.src}
                            imageStyle={{ width: '10%', height: 'auto' }}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
