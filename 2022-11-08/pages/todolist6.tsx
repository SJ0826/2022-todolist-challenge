import TodoCreate from '@ui/components/todo/TodoCreate'
import TodoHeader from '@ui/components/todo/TodoHeader'
import { ChangeEvent, FormEvent, memo, useRef, useState, useMemo, useCallback } from 'react'

export interface TodoItemType {
  id: number
  text: string
  done: boolean
}

const todolist4 = () => {
  const date = new Date()
  const today = date.toLocaleDateString('ko-kr', { year: 'numeric', month: 'long', day: 'numeric' })
  const dayName = date.toLocaleDateString('ko-kr', { weekday: 'long' })
  const [isOpen, setIsOpen] = useState(true)
  const [todos, setTodos] = useState<TodoItemType[]>([])
  const [createInput, setCreateInput] = useState('')
  const nextId = useRef(0)

  const onCreateToggle = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  const onCreateSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault
      nextId.current += 1
      setTodos((prev) => [...prev, { id: nextId.current, text: createInput, done: false }])
      setIsOpen(false)
      setCreateInput('')
    },
    [nextId, setTodos, setIsOpen, setCreateInput],
  )

  const onCreateChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      setCreateInput(value)
    },
    [setCreateInput],
  )

  return (
    <>
      <TodoHeader today={today} dayName={dayName} unDoneTask={0} />
      <TodoCreate
        isOpen={isOpen}
        onToggle={onCreateToggle}
        onSubmit={onCreateSubmit}
        onChange={onCreateChange}
        value={createInput}
      />
    </>
  )
}
export default memo(todolist4)
