import React from "react"

export default function Personaje(props){
    return (
            <div className='tarjeta'>
                <div>
                    <img src={props.img} alt={props.name} className='img-personaje'/>
                </div>
                <div className='nombre-personaje'>{props.name}</div>
                <div className="info-personaje">
                    <div className="info-estado">
                    {props.status === 'Alive' ? <span className="estado vivo">Vivo</span> : ""}
                    {props.status === 'Dead' ? <span className="estado muerto">Muerto</span> : "" }
                    {props.status === 'unknown' ? <span className="estado desconocido">Desconocido</span> : ""}
                    <span>{props.species}</span>
                    </div>
                    <div className='ubicacion-personaje'> Ultima ubicacion conocida: <br/>
                        {props.location.name} </div>
                </div>
            </div>
            )
}