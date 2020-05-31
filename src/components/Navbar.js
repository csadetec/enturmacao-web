import React, { useState, useEffect } from 'react'
import styled from 'styled-components' 
import { Link } from 'react-router-dom'

const Container = styled.div`
  padding-bottom:60px;
`

const Navbar = () => {
  const [home, setHome] = useState('nav-item active')
  const [meuCurso, setMeuCurso] = useState('nav-item active')
  const [logged] = useState(JSON.parse(localStorage.getItem('logged')))

  useEffect(() => {
    handleActive()
  }, [])


  const handleLogout = () => {
    localStorage.clear()
    window.location.reload()
    //console.log('baiii')
  }

  const handleActive = () => {
    setHome('nav-item')
    setMeuCurso('nav-item')
   
    let pathname = window.location.pathname
    //console.log(pathname)
    if(pathname === '/home' || pathname === '/')
      return setHome('nav-item active')
    if(pathname === '/meucurso')
      return setMeuCurso('nav-item active')
   
  }
  return (
    <Container>
      <nav className="navbar navbar-expand-lg navbar-dark blue  fixed-top">
        <a className="navbar-brand" href="/">Enturmação</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav" aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="basicExampleNav">
          <ul className="navbar-nav ml-auto mr-5 " onClick={handleActive}>
            <li className={home}>
              <Link className="nav-link" to="/home">Home</Link>
            </li>
            <li className={meuCurso}>
              <Link className="nav-link" to="/meucurso">Meu Curso</Link>
            </li>

            <li className="nav-item dropdown">
              <div className="nav-link dropdown-toggle " id="navbarDropdownMenuLink" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false" style={{cursor:'pointer'}}  >{logged.name}</div>
              <div className="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink">
              
                <Link className="dropdown-item" to="/usuarios" onClick={handleActive}  >Usuários</Link>
                <Link className="dropdown-item" to="/cursos" onClick={handleActive}  >Cursos</Link>
            
                <a className="dropdown-item" href="/" onClick={handleLogout}>Sair</a>
              </div>
            </li>

          </ul>
        </div>
      </nav>
    </Container>
  )

}

export default Navbar