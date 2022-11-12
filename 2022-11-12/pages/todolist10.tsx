import TodoCreate from '@ui/components/todo/TodoCreate'
import TodoHeader from '@ui/components/todo/TodoHeader'
import TodoList from '@ui/components/todo/TodoList'
import { deleteTodoList } from 'lib/api/todo/deleteTodoList'
import { getTodoList } from 'lib/api/todo/getTodoList'
import { patchTodoList } from 'lib/api/todo/patchTodoList'
import { postTodoList } from 'lib/api/todo/postTodoList'
import todoStore from 'lib/store/todoStore'
import getDateString from 'lib/utils/getDateString'
import { ChangeEvent, FormEvent, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'

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
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault
      todoStore.createTodo(inputValue)
      setIsOpenButton(false)
    },
    [inputValue],
  )

  const onToggleDone = useCallback(
    async (id: number, done: boolean) => {
      todoStore.toggleDone(id, done)
    },
    [todos],
  )

  const onClickDelete = useCallback(
    async (id: number) => {
      todoStore.deleteTodo(id)
    },
    [todos],
  )

  useEffect(() => {
    todoStore.getTodo()
  }, [])
  return (
    <>
      <TodoHeader today={dateString} dayName={dayName} unDoneTask={unDoneTask} />
      <TodoList onToggleDone={onToggleDone} onClickDelete={onClickDelete} todos={todos} />
      <TodoCreate isOpen={isOpenButton} onToggle={onCreateButton} onChange={onCreateChange} onSubmit={onCreateSubmit} />
    </>
  )
}

export default memo(todolist10)
