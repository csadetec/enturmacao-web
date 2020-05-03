import React, {useState, useEffect} from 'react'
import { FaEdit, FaPlus } from 'react-icons/fa'
import {Link} from 'react-router-dom'

export default function User() {

  const [users] = useState(JSON.parse(localStorage.getItem('users')))

  useEffect(() => {
    document.title = 'Usuários'
  })

  return (
    <div className="container">
      <div className="card">
        <h5 className="card-header blue white-text text-center">
          <strong>Usuários </strong>
          <strong className="float-right" title="Adicionar Usuário">
            <Link to="/usuarios/cadastrar"> <FaPlus color="white" /></Link> 
          </strong>

        </h5>
        <div className="card-body p2">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Perfil</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {users.map(r =>
                <tr key={r.id}>
                  <td>{r.name}</td>
                  <td>{r.email}</td>
                  <td>{r.profile_name}</td>
                  <td><Link to={`/usuarios/editar/${r.id}`}><FaEdit /></Link></td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

      </div>

    </div>

  )
}