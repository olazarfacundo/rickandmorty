import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleUp } from "@fortawesome/free-solid-svg-icons"
import React from "react"

export default function BotonSubir(){

    function subir(){
        var scrollActual = document.documentElement.scrollTop
        if (scrollActual > 0){
            window.requestAnimationFrame(subir)
            window.scrollTo (0, scrollActual - (scrollActual / 10))
        }
    }

    return(
        <div onClick={subir}>
            <button id="boton-subir">
            <FontAwesomeIcon icon={faAngleUp} className="icon"/>
            </button>
        </div>
    )
}