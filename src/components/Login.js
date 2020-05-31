import React, { useState, useEffect } from 'react'
import api from '../service/api'

import Alert from './Alert'

function Login() {
  const [loggin, setLoggin] = useState({
    'email':'',
    'password':''
  })
  const [alert, setAlert] = useState({
    'message':'',
    'color':''
  })
  const [btnLabel, setBtnLabel] = useState('ENTRAR')
  const [btnStatus, setBtnStatus] = useState(false)

  useEffect(() => {
    document.title = 'Enturmação | Login'
  })

  async function handleSubmit(e) {
    e.preventDefault()
    setBtnLabel('Carregando ...')
    setBtnStatus(true)
   
    try {

      const { data } = await api.post('/login', loggin)
      console.log(data)

      localStorage.setItem('logged', JSON.stringify(data.user))
      localStorage.setItem('token', data.token)
      
      window.location.reload()
      /** */
    } catch (e) {
      setBtnLabel('ENTRAR')
      setBtnStatus(false)
      console.log(e)
      if (!e.response) {
        return setAlert({msg:'Erro no Servidor!', color:'warning'})
      }
      
      let { field } = e.response.data[0]
      console.log(field)

      if (field === 'email') {
        return setAlert({msg:'E-mail não cadastrado!', color:'warning'})
      }
      setAlert({msg:'Senha Errada!', color:'warning'})
      /** */
    }


  }

  const updateField =(e) =>{
    setAlert(false)
    setLoggin({...loggin, [e.target.name]:e.target.value })

  }
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <div className="card  mt-5">

            <h5 className="card-header blue white-text text-center py-4">
              <strong>Enturmação</strong>
            </h5>
            <div className="card-body px-lg-5 pt-1">
              <form className="text-center" onSubmit={handleSubmit}>

                <div className="md-form">
                  <input type="text" name="email" id="email" className="form-control" 
                    placeholder='E-mail'
                    value={loggin.email} onChange={updateField} autoFocus required />
                    {loggin.email &&
                      <label htmlFor="email" >E-mail</label>
                    }
              

                </div>
                <div className="md-form">
                  <input type="password" id="password" name="password" className="form-control" 
                    placeholder="Senha" 
                    value={loggin.password} onChange={updateField} required />
                  {loggin.password &&
                    <label htmlFor="password">Senha</label>
                  }
                </div>
                <button disabled={btnStatus} className="btn btn-outline-primary btn-rounded btn-block" type="submit">
                  {btnLabel}
                </button>
              </form>
            </div>
          </div>
          <Alert message={alert.msg} color={alert.color} />

        </div>
      </div>
    </div>
  )
}

export default Login