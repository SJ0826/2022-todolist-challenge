import TodoCreate from '@ui/components/todo/TodoCreate'
import TodoHeader from '@ui/components/todo/TodoHeader'
import getDateString from 'lib/utils/getDateString'
import { ChangeEvent, FormEvent, useCallback, useMemo, useRef, useState } from 'react'

export interface TodoItemType {
  id: number
  text: string
  done: boolean
}
const todolist14 = () => {
  const { dateString, dayName } = getDateString()
  const [isOpenCreate, setIsOpenCreate] = useState(true)
  const [createInput, setCreateInput] = useState('')
  const [todos, setTodos] = useState<TodoItemType[]>([])
  const nextId = useRef(0)

  const unDoneTask = useMemo(() => todos.filter((todo) => !todo.done).length, [todos])

  const onToggleIsOpenCreate = useCallback(() => {
    setIsOpenCreate(!isOpenCreate)
  }, [isOpenCreate])

  const onChagneCreateInput = (e: ChangeEvent<HTMLInputElement>) => {
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
  return (
    <>
      <TodoHeader today={dateString} dayName={dayName} unDoneTask={0} />
      <TodoCreate
        isOpen={isOpenCreate}
        onToggle={onToggleIsOpenCreate}
        onChange={onChagneCreateInput}
        onSubmit={onSubmitCreate}
        value={createInput}
      />
    </>
  )
}

export default todolist14
