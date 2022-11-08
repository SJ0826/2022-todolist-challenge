import TodoCreate from '@ui/components/todo/TodoCreate'
import TodoHeader from '@ui/components/todo/TodoHeader'
import TodoList from '@ui/components/todo/TodoList'
import React, { ChangeEvent, FormEvent, useRef, useState } from 'react'

export interface TodoItemType {
  id: number
  text: string
  done: boolean
}
const todolist4 = () => {
  const date = new Date()
  const today = date.toLocaleDateString('ko-kr', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const dayName = date.toLocaleDateString('ko-kr', { weekday: 'long' })

  const [isOpen, setIsOpen] = useState(false)
  const [createInput, setCreateInput] = useState('')
  const [todos, setTodos] = useState<TodoItemType[]>([])

  const nextId = useRef(0)

  const onCreateToggle = () => {
    setIsOpen(!isOpen)
  }

  const onChangeCreate = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setCreateInput(value)
  }

  const onSubmitCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault
    nextId.current += 1
    setTodos(prev => [
      ...prev,
      { id: nextId.current, text: createInput, done: false },
    ])
    setIsOpen(false)
    setCreateInput('')
  }

  const onToggleDone = (id: number) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
    )
  }
  const onClickDelete = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const onDoneTask = todos.length
  return (
    <>
      <TodoHeader today={today} dayName={dayName} unDoneTask={onDoneTask} />
      <TodoList
        todos={todos}
        onToggleDone={onToggleDone}
        onClickDelete={onClickDelete}
      />
      <TodoCreate
        isOpen={isOpen}
        onToggle={onCreateToggle}
        onChange={onChangeCreate}
        onSubmit={onSubmitCreate}
        value={createInput}
      />
    </>
  )
}

export default todolist4
