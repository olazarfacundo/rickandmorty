import React, {useState} from "react"
import Personaje from "./Personaje"
import ErrorNombre from "./ErrorNombre"

export default function Search(props){

    const [resultado, setResultado] = useState([])

    const [errorNombre, setErrorNombre] = useState(false)

    const tarjetas = resultado.map(item => {
        return (
            <Personaje
                key={item.id}
                name={item.name}
                status={item.status}
                img={item.image}
                location={item.location}
                origin={item.origin}
                species={item.species}
            />
        )
    })

    const selectEpisodios = props.episodios.map(episodios => {
        return (
            <option key={episodios.id} value={episodios.id} name={episodios.id}>{episodios.id}</option>
        )
    })

    function normalizar(palabra) {
        return palabra.normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
    }


    function handleChange(event) {
        if(event.target.value < 3){
            setErrorNombre(false)
        }
        if (event.target.value.length >= 3) {
            let filtradosNombre = props.personajes.filter(e => normalizar(e.name).includes(event.target.value))
            if (filtradosNombre.length === 0) {
                setErrorNombre(true)
            }else{
                setErrorNombre(false)
            }
            setResultado(() => {
                return filtradosNombre
            })
        } else {
            setResultado(() => {
                return []
            })
        }
    }

    const [busqueda, setBusqueda] = useState({
        episode: "",
        status: "todos"
    })

    function manipularEpisodio(event){
        setBusqueda(prevValue => {
            return {...prevValue, episode: event.target.value}
        })
    }
    
    function manipularEstado(event){
        setBusqueda(prevValue => {
            return {...prevValue, status: event.target.value}
        })    
    }
    
    function aplicarFiltros(event){
        setResultado([])
        event.preventDefault()
        fetch(`https://rickandmortyapi.com/api/episode/${busqueda.episode}`)
        .then(res => res.json())
        .then(data => data.characters.forEach(e => {
            fetch(e)
            .then(res => res.json())
            .then(data => {
                if(busqueda.status === "todos"){
                    setResultado(prevValue => {
                        return [...prevValue, data]
                    })
                }else if(data.status === busqueda.status){
                    setResultado(prevValue => {
                        return [...prevValue, data]
                    })
                }
            })
        }))
    }
    
    return (
        <div className="menu">
            <div className="contenedor">
                <div>
                <h3>Buscar por nombre:</h3>
                </div>
                <div>
                <form>
                    <input onChange={handleChange} />
                </form>
                </div>
            </div>
            <div className="contenedor">
                <div>
                <h3>Buscar por episodio y/o estado del personaje</h3>
                </div>
                <div>
                    <form>
                        <select onChange={manipularEpisodio}>
                            <option>Seleccionar</option>
                            {selectEpisodios}
                        </select>
                        <select onChange={manipularEstado}>
                            <option value="todos">Todos</option>
                            <option value="Alive">Vivo</option>
                            <option value="Dead">Muerto</option>
                            <option value="unknown">Desconocido</option>
                        </select>
                        <button onClick={aplicarFiltros}>Click</button>
                    </form>
                </div>
            </div>
            <div className="contenedor-personajes">{tarjetas}</div>
            {errorNombre ? <ErrorNombre /> : ""}
        </div>
    )
}