import React from 'react'
import styled from 'styled-components'
import Task from './MyCourseStudent'
import {Droppable} from 'react-beautiful-dnd'
const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  min-width: 220px;
  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  padding: 8px;
`

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue':'white')};
  flex-grow: 1;
  min-height: 100px;

`

function Column(props) {
  return (
    <Container>
      
      <Title>{props.title}</Title>
      <Droppable droppableId={props.id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {props.tasks.map((r, index) => 
              <Task key={r.id} id={r.id} nome={r.nome} index={index} />
            )}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  )
}

export default Column