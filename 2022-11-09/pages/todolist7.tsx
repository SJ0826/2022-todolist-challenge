import TodoCreate from '@ui/components/todo/TodoCreate'
import TodoHeader from '@ui/components/todo/TodoHeader'
import getDateString from 'lib/utils/getDateString'
import { ChangeEvent, FormEvent, memo, useCallback, useRef, useState } from 'react'

export interface TodoItemType {
  id: number
  text: string
  done: boolean
}

const TodoList7 = () => {
  const { dateString, dayName } = getDateString()

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
      <TodoHeader today={dateString} dayName={dayName} unDoneTask={0} />
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

export default memo(TodoList7)
