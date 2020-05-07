import React, { useState, useEffect } from 'react'
import api from '../../service/api'
import logout from '../../utils/logout'
import Loading from '../Loading'
import { Link } from 'react-router-dom'
import AlertModal from '../AlertModal'
import { FaTrash } from 'react-icons/fa'

function User(props) {

  const [user, setUser] = useState({ email: '', password: '', name: '', profile_name: '',  courses: [], coursesDelete:[] })
  const [alert, setAlert] = useState({ message: '', color: '' })
  const [btn, setBtn] = useState({ label: 'Salvar', disabled: false })
  const [loading, setLoading] = useState(true)
  const [header, setHeader] = useState('Cadastrar Usuário')
  const [modalShow, setModalShow] = useState(false)
  const profiles = JSON.parse(localStorage.getItem('profiles'))
  const courses = JSON.parse(localStorage.getItem('courses'))
  const { id } = props.match.params
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
    setBtn({ label: 'Salvando...', disabled: true })

    try {
      if (id) {
        const { status, data } = await api.put(`/users/${id}`, user)

        if (status === 200) {
          console.log(data)
          /*
          setAlert({ message: 'Usuário Atualizado com Sucesso!', color: 'success' })
          setModalShow(true)
           /** */
          setBtn({ label: 'Salvar', disabled: false })
         
       
        }
        return
      }

      const { data } = await api.post('/users', user)
   
      const { message } = data
      if (message) {
        setAlert({ message, color: 'warning' })
      }




    } catch (e) {
      logout()
    }
   
  }
  const handleDeleteCourse = (id) => {
    
    setUser({
      ...user,
      courses: user.courses.filter(r =>  r.id !== id),
      coursesDelete:[...user.coursesDelete, user.courses.find((r) => r.id === parseInt(id))]   
    })
    /** */
   
  }
  const handleAddCourse = (id) => {
    
    const courseVerify = user.courses.find( r => r.id === parseInt(id))

    if(courseVerify)
      return;

    setUser({
      ...user,
      courses: [...user.courses, courses.find(r => r.id === parseInt(id))],
      coursesDelete: user.coursesDelete.filter(r => r.id !== id )
    })
    /** */

  }
  const updateField = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <>
      {
        loading ?
          <Loading />
          :
          <div className="container-fluid">

            <div className="row">
              <div className="col-md-12">
                <Link className="btn btn-outline-danger float-right" to='/usuarios'>Fechar</Link>

                <button className="btn btn-outline-indigo float-right"  disabled={btn.disabled} onClick={handleSubmit}>{btn.label}</button>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="card">
                  <h5 className="card-header blue white-text text-center">
                    <strong>{header}</strong>
                  </h5>
                  <div className="card-body p2">

                    <div className="md-form mt-1">
                      <input type="email" name="email" id="email" className="form-control" value={user.email}
                        onChange={updateField} placeholder="Email" required />
                      {user.email &&
                        <label htmlFor="email" >E-mail</label>
                      }
                    </div>
                    <div className="md-form form-row mt-2">
                      <div className="col-md-6">
                        <input type="email" name="email_sup" id="email_sup" className="form-control" value={user.email_sup}
                          onChange={updateField} placeholder="E-mail Supervisão" required />
                        {user.email_sup &&
                          <label htmlFor="email" style={{ 'marginLeft': 5 }} >E-mail Supervisão</label>
                        }
                      </div>
                      <div className="col-md-6">
                        <input type="email" name="email_secretary" id="email_secretary" className="form-control" value={user.email_secretary}
                          onChange={updateField} placeholder="E-mail Secretaria" required />
                        {user.email &&
                          <label htmlFor="email_secretary" style={{ 'marginLeft': 5 }} >E-mail Secretaria</label>
                        }
                      </div>
                    </div>

                    <div className="md-form ">
                      <input type="password" name="password" id="password" className="form-control" value={user.password}
                        onChange={updateField} placeholder="Password" />
                      {user.password &&
                        <label htmlFor="email" >Password</label>
                      }
                    </div>
                    <div className="md-form ">
                      <input type="text" name="name" id="name" className="form-control" value={user.name}
                        onChange={updateField} placeholder="Name" required />
                      {user.name &&
                        <label htmlFor="name" >Name</label>
                      }
                    </div>

                    <div className="md-form">
                      <select value={user.profile_name} className="form-control select-form-control"
                        onChange={updateField} name="profile_name" required>
                        <option value="">Selecione o Perfil</option>
                        {profiles.map(r =>
                          <option key={r.id} value={r.name}>{r.name}</option>
                        )}
                      </select>

                    </div>
                  </div>

                </div>

              </div>
              <div className="col-md-6">
                <div className="card">
                  <h5 className="card-header blue white-text text-center">
                    <strong>Cursos</strong>
                  </h5>
                  <div className="card-body p2">
                    <div className="md-form mt-0">
                      <select className="form-control select-form-control"
                        onChange={e => handleAddCourse(e.target.value)} value="" name="profile_name" required>
                        <option value="">Selecione o Curso</option>
                        {courses.map(r =>
                          <option key={r.id} value={r.id}>{r.unity} | {r.name}</option>
                        )}
                      </select>

                    </div>
                    <table className="table">
                      <tbody>
                        {user.courses.map(r =>
                          <tr key={r.id}>
                            <td>{r.unity}</td>
                            <td>{r.name}</td>
                            <td title="Excluir curso" style={{ 'cursor': 'pointer' }} onClick={() => handleDeleteCourse(r.id)}>
                              <FaTrash />
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <AlertModal
              show={modalShow}
              color={alert.color}
              message={alert.message}
              onHide={() => setModalShow(false)}
            />
          </div>
      }
    </>
  )
}

export default User