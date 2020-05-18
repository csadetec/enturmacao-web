import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../service/api'

function MyCourse(props) {
  
  const [students, setStudents] = useState([])
  const {codcur, codper, shift } = props.match.params
  useEffect(() => {
    async function load(){
      const {data} = await api.get(`/courses/${codcur}/${codper}/${shift}`)
      console.log(data.students)
      setStudents(data.students)
      document.title = `${data.name} - ${data.shift}`
    }
    load()
  

  }, [codcur, codper, shift])


  return (
    <div className="container mt-4">
     <ul className="list-group">
       {students.map( r => 
          <li className="list-group-item" key={r.id}>
            {r.nome}
          </li>
        )}
     </ul>

    </div>

  )
}
export default MyCourse