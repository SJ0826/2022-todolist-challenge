import { TodoItemType } from 'pages/todolist2'
import React from 'react'
import styled from 'styled-components'
import TodoItem from './TodoItem'

interface Props {
  todos: TodoItemType[]
  onToggleDone: (id: number) => void
  onClickDelete: (id: number) => void
}
export default function TodoList({ todos, onToggleDone, onClickDelete }: Props) {
  return (
    <Container>
      {todos.map((todo: any) => (
        <TodoItem key={todo.id} {...todo} onToggleDone={onToggleDone} onClickDelete={onClickDelete} />
      ))}
    </Container>
  )
}

const Container = styled.div`
  flex: 1;
  padding: 20px 32px 48px 32px;
  overflow-y: auto;
`
