import React, { useState, useEffect } from 'react'
import { FaEdit, FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Course() {

  const [courses] = useState(JSON.parse(localStorage.getItem('courses')))

  useEffect(() => {
    document.title = 'Cursos'

  })

  return (
    <div className="container mt-4">
      <div className="card">
        <h5 className="card-header blue white-text text-center">
          <strong>Cursos </strong>
          <strong className="float-right" title="Adicionar Usuário">
            <Link to="/cursos/cadastrar"> <FaPlus color="white" /></Link>
          </strong>

        </h5>
        <div className="card-body p2">
          {/*}
          <input type="text" className="form-control py-4" placeholder="Pesquisar Usuário" value={search} name="search" onChange={handleSearch} />
          */}
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Unidade</th>
                <th>Turno</th>
                <th>Codcur</th>
                <th>Codper</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(r =>
                <tr key={r.id}>
                  <td>{r.name}</td>
                  <td>{r.unity}</td>
                  <td>{r.shift}</td>
                  <td>{r.codcur}</td>
                  <td>{r.codper}</td>
                  <td><Link title="Editar Usuário" to={`/cursos/editar/${r.id}`}><FaEdit /></Link></td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

      </div>

    </div>

  )
}
export default Course