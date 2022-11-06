
import TodoCreate from '@ui/components/todo/TodoCreate'
import TodoHeader from '@ui/components/todo/TodoHeader'
import TodoList from '@ui/components/todo/TodoList'
import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import styled from 'styled-components'

export interface TodoItemTypes {
  id: number
  text: string
  done: boolean
}
const todolist4 = () => {
  const [todos, setTodos] = useState<TodoItemTypes[]>([])
  // 날짜 업데이트
  const date = new Date()
  const today = date.toLocaleDateString('ko-kr', { year: 'numeric', month: 'long', day: 'numeric' })
  const dayName = date.toLocaleDateString('ko-kr', { weekday: 'long' })

  // Todo 할일 생성하기
  const nextId = useRef(0)
  const [createInput, setCreateInput] = useState('')
  const [isOpenCreate, setIsOpenCreate] = useState(false)
  const onToggleisOpenCreate = () => {
    setIsOpenCreate((prev) => !prev)
  }
  const onChangeCreateInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setCreateInput(value)
  }

  const onSubmitCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault
    nextId.current += 1
    setTodos((prev) => [...prev, { id: nextId.current, text: createInput, done: false }])
    setIsOpenCreate(false)
    setCreateInput('')
  }

  // TodoList 만들기

  const onToggleDone = (id: number) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)))
  }
  const onClickDelete = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }
  const onDoneTask = todos.length
  return (
    <>
      <TodoHeader today={today} dayName={dayName} unDoneTask={onDoneTask} />
      <TodoList todos={todos} onToggleDone={onToggleDone} onClickDelete={onClickDelete} />
      <TodoCreate
        isOpen={isOpenCreate}
        onToggle={onToggleisOpenCreate}
        onChange={onChangeCreateInput}
        onSubmit={onSubmitCreate}
        value={createInput}
      />
    </>
  )
}

export default todolist4


