import TodoCreate from '@ui/components/todo/TodoCreate'
import TodoHeader from '@ui/components/todo/TodoHeader'
import TodoList from '@ui/components/todo/TodoList'
import { deleteTodoList } from 'lib/api/todo/deleteTodoList'
import { getTodoList } from 'lib/api/todo/getTodoList'
import { patchTodoList } from 'lib/api/todo/patchTodoList'
import { postTodoList } from 'lib/api/todo/postTodoList'
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
      await addTodo()
      await getTodo()
      // nextId.current += 1
      // setTodos((prev) => [...prev, { id: nextId.current, text: inputValue, done: false }])
      setIsOpenButton(false)
      setInputValue('')
    },
    [inputValue],
  )

  const onToggleDone = useCallback(
    async (id: number, done: boolean) => {
      await doneTodo(id, done)
      await getTodo()
      // setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)))
    },
    [todos],
  )

  const onClickDelete = useCallback(
    async (id: number) => {
      await deleteTodo(id)
      await getTodo()
      // setTodos((prev) => prev.filter((todo) => todo.id !== id))
    },
    [todos],
  )

  const getTodo = async () => {
    try {
      const data = await getTodoList()
      setTodos(data)
    } catch (e) {
      alert('오류가 발생했습니다.')
    }
  }

  const addTodo = async () => {
    try {
      const param = {
        text: inputValue,
      }
      postTodoList(param)
    } catch (e) {
      alert('오류가 발생했습니다.')
    }
  }

  const doneTodo = async (id: number, done: boolean) => {
    try {
      const param = {
        done,
      }
      await patchTodoList(id, param)
    } catch (e) {
      alert('오류가 발생했습니다.')
    }
  }

  const deleteTodo = async (id: number) => {
    try {
      await deleteTodoList(id)
    } catch (e) {
      alert('오류가 발생했습니다.')
    }
  }

  useEffect(() => {
    getTodo()
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
