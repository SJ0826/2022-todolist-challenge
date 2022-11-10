import TodoCreate from '@ui/components/todo/TodoCreate'
import TodoHeader from '@ui/components/todo/TodoHeader'
import TodoList from '@ui/components/todo/TodoList'
import getDateString from 'lib/utils/getDateString'
import { ChangeEvent, FormEvent, memo, useCallback, useRef, useState } from 'react'

export interface TodoItemType {
  id: number
  text: string
  done: boolean
}

const todolist8 = () => {
  const { dateString, dayName } = getDateString()

  const [todos, setTodos] = useState<TodoItemType[]>([])
  const [isOpen, setIsOpen] = useState(true)
  const [createInput, setCreateInput] = useState('')
  const nextId = useRef(0)

  const onCreateToggle = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  const onCreateInput = useCallback(
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
    [createInput],
  )

  const onToggleDone = (id: number) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)))
  }
  const onClickDelete = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  return (
    <>
      <TodoHeader today={dateString} dayName={dayName} unDoneTask={0} />
      <TodoList todos={todos} onToggleDone={onToggleDone} onClickDelete={onClickDelete} />
      <TodoCreate
        isOpen={isOpen}
        onToggle={onCreateToggle}
        onChange={onCreateInput}
        onSubmit={onCreateSubmit}
        value={createInput}
      />
    </>
  )
}

export default memo(todolist8)
