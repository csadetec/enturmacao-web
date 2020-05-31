import React, { useState, useEffect } from 'react'
import api from '../service/api'
import logout from '../utils/logout'
import Loading from './Loading'
import { Link, useHistory } from 'react-router-dom'
import AlertModal from './AlertModal'
import { loadCourses } from '../utils/load'


function Course(props) {

 // const [course, setCourse] = useState({  name: '', shift:'', unity: '', codcur: '', codper: '' })
  const [course, setCourse] = useState({  name: 'EF 5º Ano', shift:'TARDE', unity: 'CONTAGEM', codcur: '22', codper: '5' })

  const [alert, setAlert] = useState({ message: '', color: '' })
  const [btn, setBtn] = useState({ label: 'Salvar', disabled: false })
  const [loading, setLoading] = useState(true)
  const [header, setHeader] = useState('Cadastrar Curso')
  const [modalShow, setModalShow] = useState(false)
  const { id } = props.match.params
  const history = useHistory()

  useEffect(()=> {
    //console.log(props.match.params)
    window.scrollTo(0, 0)
    if (id === undefined) {
      document.title = 'Cadastrar Curso'
      setLoading(false)
      return
    }
    async function load() {
      const { data } = await api.get(`/courses/${id}`)
      //console.log(data)
      //console.log('id ', id)
      setCourse(data)
      document.title = 'Editar Curso'
      setHeader('Editar Curso')
      setLoading(false)
    }

    load()
    
  }, [id])

  async function handleSubmit(e) {
    e.preventDefault()
    setBtn({ label: 'Salvando...', disabled: true })
   
    
    try {
      if (id) {
        const { status, data } = await api.put(`/courses/${id}`, course)
        console.log(data)
        if (status === 200) {
          
          setAlert({ message: 'Usuário Atualizado com Sucesso!', color: 'success' })
          setModalShow(true)
          setBtn({ label: 'Salvar', disabled: false })
          //loadAgain()


        }
        return
      }

      const { data } = await api.post('/courses', course)
      const { message } = data
      if (message) {
        setAlert({ message, color: 'warning' })
        setModalShow(true)
        setBtn({ label: 'Salvar', disabled: false })
        return;
      }
      loadCourses()
      setAlert({ message: 'Cadastrado com Sucesso', color: 'success' })
      setModalShow(true)
      setBtn({ label: 'Salvar', disabled: false })
      history.push(`/cursos/editar/${data.id}`)

    } catch (e) {
      logout()
    }
    /** */

  }

  const updateField = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value })
  }
  return (
    <>
      {
        loading ?
          <Loading />
          :
          <div className="container-fluid mt-5">

            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="card">
                  <h5 className="card-header blue white-text text-center">
                    <strong>{header}</strong>
                  </h5>
                  <div className="card-body p2">

                    <div className="md-form mt-1">
                      <input type="text" name="name" id="name" className="form-control" value={course.name}
                        onChange={updateField} placeholder="Nome" required />
                      {course.name &&
                        <label htmlFor="name" >Nome</label>
                      }
                    </div>
                    <div className="md-form">
                      <select value={course.shift} className="form-control select-form-control"
                        onChange={updateField} name="shift" id="shift" required>
                        <option value="">Turno</option>
                        <option value="MANHÃ">MANHÃ</option>
                        <option value="MANHÃ2">MANHÃ2</option>
                        <option value="MANHÃ6">MANHÃ6</option>
                        <option value="TARDE">TARDE</option>
                        <option value="TARDE2">TARDE2</option>
                        <option value="TARDE3">TARDE3</option>
                      </select>
                      {course.unity &&
                        <label htmlFor="shift" style={{ 'marginLeft': 5 }} >Turno</label>
                      }
                    </div>
                    <div className="md-form">
                      <select value={course.unity} className="form-control select-form-control"
                        onChange={updateField} name="unity" id="unity" required>
                        <option value="">Unidade</option>
                          <option value="BELO HORIZONTE">BELO HORIZONTE</option>
                          <option value="CONTAGEM">CONTAGEM</option>
                          <option value="GUTIERREZ">GUTIERREZ</option>
                          <option value="NOVA LIMA">NOVA LIMA</option>                        
                      </select>
                      {course.unity &&
                        <label htmlFor="unity" style={{ 'marginLeft': 5 }} >Unidade</label>
                      }
                    </div>
                    <div className="md-form form-row mt-2">
                      <div className="col-md-6">
                        <input type="number" name="codcur" id="codcur" className="form-control" value={course.codcur}
                          onChange={updateField} placeholder="Código Curso" required />
                        {course.codcur &&
                          <label htmlFor="codcur" style={{ 'marginLeft': 5 }} >Código Curso</label>
                        }
                      </div>
                      <div className="col-md-6">
                        <input type="number" name="codper" id="codper" className="form-control" value={course.codper}
                          onChange={updateField} placeholder="Código Período" required />
                        {course.codper > 0 &&
                          <label htmlFor="codper" style={{ 'marginLeft': 5 }} >Código Período</label>
                        }
                      </div>
                    </div>
                    <div className="md-form text-center">
                      <button className="btn btn-outline-indigo" disabled={btn.disabled} onClick={handleSubmit}>{btn.label}</button>

                      <Link className="btn btn-outline-danger " to='/cursos'>Fechar</Link>
                    </div>

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

export default Course