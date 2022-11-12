import TodoCreate from '@ui/components/todo/TodoCreate'
import TodoHeader from '@ui/components/todo/TodoHeader'
import TodoList from '@ui/components/todo/TodoList'
import getDateString from 'lib/utils/getDateString'
import { ChangeEvent, FormEvent, memo, useCallback, useMemo, useRef, useState } from 'react'

export interface TodoItemType {
  id: number
  text: string
  done: boolean
}
const todolist10 = () => {
  const { dateString, dayName } = getDateString()
  const [isOpenButton, setIsOpenButton] = useState(true)
  const [todos, setTodos] = useState<TodoItemType[]>([])
  const nextId = useRef(0)
  const [inputValue, setInputValue] = useState('')

  const unDoneTask = useMemo(() => todos.filter((todo) => !todo.done).length, [todos])

  const onCreateButton = useCallback(() => {
    setIsOpenButton(!isOpenButton)
  }, [isOpenButton])

  const onCreateChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      setInputValue(value)
    },
    [setInputValue],
  )

  const onCreateSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault
      nextId.current += 1
      setTodos((prev) => [...prev, { id: nextId.current, text: inputValue, done: false }])
      setIsOpenButton(false)
      setInputValue('')
    },
    [inputValue],
  )

  const onToggleDone = useCallback(
    (id: number) => {
      setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)))
    },
    [todos],
  )

  const onClickDelete = useCallback(
    (id: number) => {
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
    },
    [todos],
  )
  return (
    <>
      <TodoHeader today={dateString} dayName={dayName} unDoneTask={unDoneTask} />
      <TodoList onToggleDone={onToggleDone} onClickDelete={onClickDelete} todos={todos} />
      <TodoCreate isOpen={isOpenButton} onToggle={onCreateButton} onChange={onCreateChange} onSubmit={onCreateSubmit} />
    </>
  )
}

export default memo(todolist10)
