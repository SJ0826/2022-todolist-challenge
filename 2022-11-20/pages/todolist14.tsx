import TodoCreate from '@ui/components/todo/TodoCreate'
import TodoHeader from '@ui/components/todo/TodoHeader'
import TodoList from '@ui/components/todo/TodoList'
import { deleteTodoList } from 'lib/api/todo/deleteTodoList'
import { getTodoList } from 'lib/api/todo/getTodoList'
import { patchTodoList } from 'lib/api/todo/patchTodoList'
import { postTodoList } from 'lib/api/todo/postTodoList'
import { TodoItemType } from 'lib/interface/todo.interface'
import { RootState } from 'lib/store'
import { createTodo, deleteTodo, toggleDone } from 'lib/store/todoSlice'
import getDateString from 'lib/utils/getDateString'
import next from 'next'
import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

const todolist14 = () => {
  const dispatch = useDispatch()
  // useSelector을 사용해서 스토어의 상태를 조회할 때 상태가 바뀌지 않으면 리렌더링을 하지 않는다.
  const todoList = useSelector((state: RootState) => state.todo)

  useEffect(() => {
    console.log('todo Store >', todoList)
  })

  const { dateString, dayName } = getDateString()
  const [isOpenCreate, setIsOpenCreate] = useState(true)
  const [createInput, setCreateInput] = useState('')
  const todos = useSelector((state: RootState) => state.todo)
  const nextId = useRef(0)

  const unDoneTask = useMemo(() => todos.filter((todo) => !todo.done).length, [todos])

  const onToggleIsOpenCreate = useCallback(() => {
    setIsOpenCreate(!isOpenCreate)
  }, [isOpenCreate])

  const onChagneCreateInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setCreateInput(value)
  }

  const onSubmitCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    nextId.current += 1
    dispatch(createTodo({ id: nextId.current, text: createInput, done: false }))
    setIsOpenCreate(false)
    setCreateInput('')
  }

  const onToggleDone = async (id: number) => {
    dispatch(toggleDone(id))
  }

  const onClickDelete = async (id: number) => {
    dispatch(deleteTodo(id))
  }

  return (
    <Container>
      <TodoHeader today={dateString} dayName={dayName} unDoneTask={unDoneTask} />
      <TodoCreate
        isOpen={isOpenCreate}
        onToggle={onToggleIsOpenCreate}
        onChange={onChagneCreateInput}
        onSubmit={onSubmitCreate}
        value={createInput}
      />
      <TodoList todos={todos} onToggleDone={onToggleDone} onClickDelete={onClickDelete} />
    </Container>
  )
}

export default todolist14

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`
