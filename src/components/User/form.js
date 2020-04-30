import React, { useState, useEffect } from 'react'
import api from '../../service/api'
import logout from '../../utils/logout'
import Loading from '../Loading'
import { Link } from 'react-router-dom'

export default function User(props) {

  const [user, setUser] = useState({ email: '', password: '', name: '', profile_name: '' })
  const [alert, setAlert] = useState({ message: '', color: '' })
  const [btn, setBtn] = useState({ label: 'Salvar', disabled: false })
  const [loading, setLoading] = useState(true)
  const [header, setHeader] = useState('Cadastrar Usuário')

  const profiles = JSON.parse(localStorage.getItem('profiles'))
  const {id} = props.match.params
  useEffect(() => {
  
    if (id === undefined) {
      document.title = 'Cadastrar Usuário'
      setLoading(false)
      return
    }

    async function load() {
      const { data } = await api.get(`/users/${id}`)
      setUser(data)
      document.title = 'Editar Usuário'
      setHeader('Editar Usuário')
      setLoading(false)
    }
    load()
  }, [id])

  async function handleSubmit(e) {
    e.preventDefault()
    setBtn({label:'Salvando...', disabled:true})
    try{
      if(id){
        const {status} = await api.put(`/users/${id}`, user)

        if(status === 200){
          setAlert({message: 'Usuário Atualizado com Sucesso!', color: 'success'})
          setBtn({label: 'Salvar', disabled:false})
          console.log('update success')

        }
        return
      }

      const {data} =  await api.post('/users', user)
      const {message} = data
      if(message){
        setAlert({message, color: 'warning'})
      }




    }catch(e){
      logout()
    }

  }

  const updateField = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (

    <div className="container">
      {
        loading ?
          <Loading />
          :
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card">
                <h5 className="card-header blue white-text text-center">
                  <strong>{header}</strong>
                </h5>
                <div className="card-body p2">
                  <form className="text-center" onSubmit={handleSubmit}>

                    <div className="md-form mt-3">
                      <input type="email" name="email" id="email" className="form-control" value={user.email}
                        onChange={updateField} placeholder="Email" required />
                      {user.email &&
                        <label htmlFor="email" >E-mail</label>
                      }
                    </div>
                    <div className="md-form mt-3">
                      <input type="password" name="password" id="password" className="form-control" value={user.password}
                        onChange={updateField} placeholder="Password" />
                      {user.password &&
                        <label htmlFor="email" >Password</label>
                      }
                    </div>
                    <div className="md-form mt-3">
                      <input type="text" name="name" id="name" className="form-control" value={user.name}
                        onChange={updateField} placeholder="Name" required />
                      {user.name &&
                        <label htmlFor="name" >Name</label>
                      }
                    </div>

                    <div className="form-row">
                      <select value={user.profile_name} className="form-control"
                        onChange={updateField} name="profile_name" required>
                        <option value="">Selecione o Perfil</option>
                        {profiles.map(r =>
                          <option key={r.id} value={r.name}>{r.name}</option>
                        )}
                      </select>
                    </div>

                    <button className="btn btn-outline-indigo" type="submit" disabled={btn.disabled}>{btn.label}</button>
                    <Link className="btn btn-outline-danger" to='/usuarios'>Fechar</Link>


                  </form>
                </div>

              </div>

            </div>
          </div>
      }
    </div>

  )
}