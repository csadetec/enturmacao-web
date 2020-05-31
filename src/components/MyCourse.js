import React, { useState, useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'
import api from '../service/api'
import Loading from './Loading'

import Column from './MyCourseClassColumn'

const Container = styled.div`
  display: flex;
`
const Select = styled.select`
  background-color: white;
  border: none;
  border-bottom: 1px solid #4950575c;
  border-radius: 0 ;
  padding: 10px;
  width: 450px;
  
  font-weight: 400;
  font-size: 1.2rem;
  margin-bottom: 2rem;
`

function MyCourse(props) {

  const [course, setCourse] = useState([])
  const [classes, setClasses] = useState([])
  const logged = JSON.parse(localStorage.getItem('logged'))
  const firstCourse = logged.courses[0].id

  useEffect(() => {
    async function load() {
      const { data } = await api.get(`/courses/${firstCourse}`)
      //console.log(data)
      setCourse(data)
      setClasses(data.classes)

      document.title = `${data.name} - ${data.shift}`
    }
    load()
  }, [firstCourse])

  const onDragEnd = result => {
    const { destination, source, draggableId } = result

    if (!destination)
      return

    if (destination.draggableId === source.droppableId && destination.index === source.index)
      return

    const start = classes.find(r => r.name === source.droppableId)
    const finish = classes.find(r => r.name === destination.droppableId)
    // const classColumn = classes.find(r => r.name === source.droppableId)
    const studentChange = start.students.find(r => r.id === draggableId)

    if (start === finish) {
      let newStudents = start.students.filter((r) => r.id !== draggableId)
      newStudents.splice(destination.index, 0, studentChange)
      return

    }

    //Moving from one list to another

    start.students.splice(source.index, 1)
    finish.students.splice(destination.index, 0, studentChange)

    console.log('student_id', draggableId)
    console.log('class_id', finish.id)
    handleUpdate(finish.id, draggableId)
    return

    /** */
  }

  async function handleUpdate(class_id, student_id) {
    try {
      const { data } = await api.put(`/students/${student_id}`, { class_id })
      console.log(data)
    } catch (r) {
      window.location.reload()
    }
  }

  async function  handleChangeCourse(courseId) {
    const { data } = await api.get(`/courses/${courseId}`)
      //console.log(data)
      setCourse(data)
      setClasses(data.classes)

      document.title = `${data.name} - ${data.shift}`
  }
  return (

    <div className="container-fluid mt-4" >
      {}
      <div className="row text-center">
        <div className="col-md-12 ">
          <Select onChange={e => handleChangeCourse(e.target.value)}>
            {logged.courses.map(r =>
              <option key={r.id} value={r.id}>{r.unity} - {r.name} - {r.shift}</option>
            )}
          </Select>

        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container className="row justify-content-center">
          {course.classes && course.classes.map(r =>
            <Column key={r.id} id={r.name} title={r.name} tasks={r.students} />
          )}
        </Container>
      </DragDropContext>

    </div>
  )
}

export default MyCourse