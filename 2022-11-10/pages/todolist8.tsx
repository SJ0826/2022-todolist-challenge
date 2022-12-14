import TodoCreate from '@ui/components/todo/TodoCreate'
import TodoHeader from '@ui/components/todo/TodoHeader'
import TodoList from '@ui/components/todo/TodoList'
import { deleteTodoList } from 'lib/api/todo/deleteTodoList'
import { getTodoList } from 'lib/api/todo/getTodoList'
import { patchTodoList } from 'lib/api/todo/patchTodoList'
import { postTodoList } from 'lib/api/todo/postTodoList'
import getDateString from 'lib/utils/getDateString'
import { ChangeEvent, FormEvent, memo, useCallback, useEffect, useMemo, useState } from 'react'

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
  const unDoneTask = useMemo(() => todos.filter((todo) => !todo.done).length, [todos])

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
      await addTodos()
      await getTodos()
      // nextId.current += 1
      // setTodos((prev) => [...prev, { id: nextId.current, text: createInput, done: false }])
      setIsOpen(false)
      setCreateInput('')
    },
    [createInput],
  )

  const onToggleDone = useCallback(
    async (id: number, done: boolean) => {
      // setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)))
      await doneTodos(id, done)
      await getTodos()
    },
    [todos],
  )
  const onClickDelete = useCallback(
    async (id: number) => {
      // setTodos((prev) => prev.filter((todo) => todo.id !== id))
      await deleteTodos(id)
      await getTodos()
    },
    [todos],
  )

  const getTodos = async () => {
    try {
      const data = await getTodoList()
      setTodos(data)
    } catch (e) {
      alert('????????? ??????????????????.')
    }
  }

  const addTodos = async () => {
    try {
      const param = {
        text: createInput,
      }
      const data = postTodoList(param)
    } catch (d) {
      alert('????????? ??????????????????.')
    }
  }

  const doneTodos = async (id: number, done: boolean) => {
    try {
      const param = {
        done,
      }
      await patchTodoList(id, param)
    } catch (e) {
      alert('????????? ??????????????????.')
    }
  }

  const deleteTodos = async (id: number) => {
    try {
      await deleteTodoList(id)
    } catch (e) {
      alert('????????? ??????????????????.')
    }
  }

  useEffect(() => {
    getTodos()
  }, [])
  return (
    <>
      <TodoHeader today={dateString} dayName={dayName} unDoneTask={unDoneTask} />
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
