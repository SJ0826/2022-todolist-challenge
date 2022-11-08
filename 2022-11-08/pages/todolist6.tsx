import TodoCreate from '@ui/components/todo/TodoCreate'
import TodoHeader from '@ui/components/todo/TodoHeader'
import TodoList from '@ui/components/todo/TodoList'
import { ChangeEvent, FormEvent, memo, useRef, useState, useCallback, useMemo } from 'react'

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
  const unDoneTask = useMemo(() => todos.filter((todo) => !todo.done).length, [todos])

  const onCreateToggle = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  const onCreateChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      setCreateInput(value)
    },
    [setCreateInput],
  )

  const onCreateSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault
      nextId.current += 1
      setTodos((prev) => [...prev, { id: nextId.current, text: createInput, done: false }])
      setIsOpen(false)
      setCreateInput('')
    },
    [nextId, createInput, setTodos, setIsOpen, setCreateInput],
  )

  const onToggleDone = useCallback(
    (id: number) => {
      setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)))
    },
    [setTodos],
  )
  const onClickDelete = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  return (
    <>
      <TodoHeader today={today} dayName={dayName} unDoneTask={unDoneTask} />
      <TodoList todos={todos} onToggleDone={onToggleDone} onClickDelete={onClickDelete} />
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
