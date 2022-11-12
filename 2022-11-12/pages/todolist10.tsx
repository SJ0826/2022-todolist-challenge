import TodoCreate from '@ui/components/todo/TodoCreate'
import TodoHeader from '@ui/components/todo/TodoHeader'
import getDateString from 'lib/utils/getDateString'
import { ChangeEvent, FormEvent, memo, useCallback, useRef, useState } from 'react'

interface TodoItemType {
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
  return (
    <>
      <TodoHeader today={dateString} dayName={dayName} unDoneTask={0} />
      <TodoCreate isOpen={isOpenButton} onToggle={onCreateButton} onChange={onCreateChange} onSubmit={onCreateSubmit} />
    </>
  )
}

export default memo(todolist10)
