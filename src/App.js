import React, { useState, useEffect } from "react"
import About from "./Components/About"
import BotonSubir from "./Components/BotonSubir"
import Header from "./Components/Header"
import Search from "./Components/Search"


export default function App(){

  const [episodios, setEpisodios] = useState([])

  const [personajes, setPersonajes] = useState([])

  useEffect(() => {
    (async () => {
      const resultadosEpisodios = await getAllEpisodios()
      setEpisodios(resultadosEpisodios)
      const resultadosPersonajes = await getAllPersonajes()
      setPersonajes(resultadosPersonajes)
    })()
  }, [])

  const getEpisodios = async (page) =>
    fetch(`https://rickandmortyapi.com/api/episode?page=${page}`)
      .then(res => res.json())
      .then(data => data.results)

  const getAllEpisodios = async () => {
    return new Promise((resolve, reject) => {
      let episodiosPromises = []
      for (let i = 1; i <= 3; i++) {
        episodiosPromises.push(getEpisodios(i))
      }

      Promise.all(episodiosPromises).then((values) => {
        const episodios = values
          .flatMap(value => [...value])
          .sort((a, b) => a.id > b.id)
        resolve(episodios)
      })
    })
  }

  const getPersonajes = async (page) =>
    fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then(res => res.json())
      .then(data => data.results)

  const getAllPersonajes = async () => {
    return new Promise((resolve, reject) => {
      let personajesPromises = []
      for (let i = 1; i <= 42; i++) {
        personajesPromises.push(getPersonajes(i))
      }

      Promise.all(personajesPromises).then((values) => {
        const personajes = values
          .flatMap(value => [...value])
          .sort((a, b) => a.id > b.id)
        resolve(personajes)
      })
    })
  }

  const [subir, setSubir] = useState(false)

  window.onscroll = function(){
    var scroll = document.documentElement.scrollTop;
    if (scroll > 700) {
      setSubir(true)
    } else if (scroll < 500) {
      setSubir(false)
    }
  }

  return (
    <>
      <Header />
      <About />
      <Search episodios={episodios} personajes={personajes} />
      {subir ? <BotonSubir /> : ""}
    </>
  )
}
