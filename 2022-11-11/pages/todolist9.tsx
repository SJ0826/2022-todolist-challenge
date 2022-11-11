import TodoCreate from '@ui/components/todo/TodoCreate'
import TodoHeader from '@ui/components/todo/TodoHeader'
import getDateString from 'lib/utils/getDateString'
import { ChangeEvent, FormEvent, memo, useCallback, useRef, useState } from 'react'

export interface TodoItemType {
  id: number
  text: string
  done: boolean
}

const todolist9 = () => {
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

  return (
    <>
      <TodoHeader today={dateString} dayName={dayName} unDoneTask={0} />
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

export default memo(todolist9)
