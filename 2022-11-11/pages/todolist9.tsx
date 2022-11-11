import TodoCreate from '@ui/components/todo/TodoCreate'
import TodoHeader from '@ui/components/todo/TodoHeader'
import TodoList from '@ui/components/todo/TodoList'
import todoStore from 'lib/store/todoStore'
import getDateString from 'lib/utils/getDateString'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { ChangeEvent, FormEvent, memo, useCallback, useEffect, useState } from 'react'

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
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault
      todoStore.createTodo(createInput)
      // await addTodos()
      // await getTodos()
      // nextId.current += 1
      // setTodos((prev) => [...prev, { id: nextId.current, text: createInput, done: false }])
      setIsOpen(false)
      setCreateInput('')
    },
    [createInput],
  )

  const onToggleDone = useCallback(
    async (id: number, done: boolean) => {
      todoStore.toggleDone(id, done)
      // setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)))
      // await doneTodos(id, done)
      // await getTodos()
    },
    [todos],
  )

  const onClickDelete = useCallback(
    async (id: number) => {
      todoStore.deleteTodo(id)
      // setTodos((prev) => prev.filter((todo) => todo.id !== id))
      // await deleteTodos(id)
      // await getTodos()
    },
    [todos],
  )

  useEffect(() => {
    todoStore.getTodo()
  }, [])

  useEffect(() => {
    console.log(toJS(todoStore.todo))
  }, [todoStore.todo])
  return (
    <>
      <TodoHeader today={dateString} dayName={dayName} unDoneTask={0} />
      <TodoList todos={todoStore.todo} onToggleDone={onToggleDone} onClickDelete={onClickDelete} />
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

export default observer(todolist9)
