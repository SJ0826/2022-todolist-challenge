import { TodoItemType } from 'pages/todolist6'
import { memo } from 'react'
import styled from 'styled-components'
import TodoItem from './TodoItem'

interface Props {
  todos: TodoItemType[]
  onToggleDone: (id: number, done: boolean) => Promise<void>
  onClickDelete: (id: number) => void
}
const TodoList = ({ todos, onToggleDone, onClickDelete }: Props) => {
  return (
    <Container>
      {todos.map((todo) => (
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
export default memo(TodoList)