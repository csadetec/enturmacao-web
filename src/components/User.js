import React, {useState, useEffect} from 'react'
import { FaEdit, FaPlus } from 'react-icons/fa'
import {Link} from 'react-router-dom'
import api from '../service/api'

export default function User() {

  const [users, setUser] = useState(JSON.parse(localStorage.getItem('users')))
  const [search, setSearch] = useState('')

  useEffect(() => {
    document.title = 'Usuários'
  })

  async function handleSearch(e){
    setSearch(e.target.value)
    if(search.length > 2){
      const {data } = await api.get(`/users/filter/${search}`)
      setUser(data)
      return 
    }
    setUser(JSON.parse(localStorage.getItem('users')))
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <h5 className="card-header blue white-text text-center">
          <strong>Usuários </strong>
          <strong className="float-right" title="Adicionar Usuário">
            <Link to="/usuarios/cadastrar"> <FaPlus color="white" /></Link> 
          </strong>

        </h5>
        <div className="card-body p2">
            <input type="text" className="form-control py-4" placeholder="Pesquisar Usuário" value={search} name="search" onChange={handleSearch}/>
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
                  <td><Link title="Editar Usuário" to={`/usuarios/editar/${r.id}`}><FaEdit /></Link></td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

      </div>

    </div>

  )
}