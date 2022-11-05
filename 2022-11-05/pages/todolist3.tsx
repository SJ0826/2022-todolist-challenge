import TodoCreate from '@ui/components/todo/TodoCreate'
import TodoHeader from '@ui/components/todo/TodoHeader'
import React, { ChangeEvent, FormEvent, useRef, useState } from 'react'

export interface TodoItemType {
  id: number
  text: string
  done: boolean
}

export default function todolist3() {
  const [todos, setTodos] = useState<TodoItemType[]>([])
  // date
  const date = new Date()
  const today = date.toLocaleDateString('ko-kr', { year: 'numeric', month: 'long', day: 'numeric' })
  const dayName = date.toLocaleString('ko-kr', { weekday: 'long' })

  // createButton
  const [isOpenCreate, setIsOpenCreate] = useState(false)
  const onToggleisOpenCreate = () => {
    setIsOpenCreate((prev) => !prev)
  }

  // 할일 입력
  const nextId = useRef(0)
  const [createInput, setCreateInput] = useState('')
  const onchangeCreateInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setCreateInput(value)
  }
  const onSubmitCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault
    nextId.current += 1
    setTodos((prev) => [...prev, { id: nextId.current, text: createInput, done: false }])
  }
  return (
    <div>
      <TodoHeader today={today} dayName={dayName} unDoneTask={0} />
      <TodoCreate
        isOpen={isOpenCreate}
        onToggle={onToggleisOpenCreate}
        onChange={onchangeCreateInput}
        onSubmit={onSubmitCreate}
        value={createInput}
      />
    </div>
  )
}
