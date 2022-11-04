import TodoCreate from '@ui/components/todo/TodoCreate'
import TodoHeader from '@ui/components/todo/TodoHeader'
import TodoList from '@ui/components/todo/TodoList'
import React, { ChangeEvent, FormEvent, useState, useRef } from 'react'
import styled from 'styled-components'

export interface TodoItemType {
  id: number
  text: string
  done: boolean
}

export default function todolist2() {
  const today = new Date()
  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const dayName = today.toLocaleDateString('ko-KR', {
    weekday: 'long',
  })

  const [isOpenCreate, setIsOpenCreate] = useState(false)
  const [createInput, setCreateInput] = useState('')
  const [todos, setTodos] = useState<TodoItemType[]>([])

  const unDoneTaskLength = () => {
    return todos.filter((todo) => !todo.done).length
  }

  const nextId = useRef(0)

  const onToggleisOpenCreate = () => {
    setIsOpenCreate((prev) => !prev)
  }

  const onChangeCreateInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setCreateInput(value)
  }

  const onSubmitCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    nextId.current += 1
    setTodos((prev) => [...prev, { id: nextId.current, text: createInput, done: false }])
    setIsOpenCreate(false)
    setCreateInput('')
  }

  const onToggleDone = (id: number) => {
    setTodos((prev) => prev.map((el) => (el.id === id ? { ...el, done: !el.done } : el)))
  }

  const onClickDelete = (id: number) => {
    setTodos((prev) => prev.filter((el) => el.id !== id))
  }
  return (
    <Container>
      <TodoHeader dateString={dateString} dayName={dayName} unDoneTaskLength={unDoneTaskLength()} />
      <TodoList todos={todos} onToggleDone={onToggleDone} onClickDelete={onClickDelete} />
      <TodoCreate
        isOpen={isOpenCreate}
        onToggle={onToggleisOpenCreate}
        onChange={onChangeCreateInput}
        onSubmit={onSubmitCreate}
        value={createInput}
      />
    </Container>
  )
}

const Container = styled.div`
  diplay: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`
