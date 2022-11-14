import TodoCreate from '@ui/components/todo/TodoCreate'
import TodoHeader from '@ui/components/todo/TodoHeader'
import TodoList from '@ui/components/todo/TodoList'
import { deleteTodoList } from 'lib/utils/api/todo/deleteTodoList'
import { getTodoList } from 'lib/utils/api/todo/getTodoList'
import { patchTodoList } from 'lib/utils/api/todo/patchTodoList'
import { postTodoList } from 'lib/utils/api/todo/postTodoList'
import getDateString from 'lib/utils/getDateString'
import { ChangeEvent, FormEvent, useCallback, useMemo, useEffect, useRef, useState } from 'react'

export interface TodoItemType {
  id: number
  text: string
  done: boolean
}

const todolist12 = () => {
  const { dateString, dayName } = getDateString()
  const [isOpenCreate, setIsOpenCreate] = useState(true)
  const [createInput, setCreateInput] = useState('')
  const [todos, setTodos] = useState<TodoItemType[]>([])

  const nextId = useRef(0)

  const unDoneTaskLength = useMemo(() => todos.filter((todo) => !todo.done).length, [todos])

  const onToggleIsOpenCreate = useCallback(() => {
    setIsOpenCreate(!isOpenCreate)
  }, [isOpenCreate])

  const onChangeCreateInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      setCreateInput(value)
    },
    [setCreateInput],
  )

  const onSubmitCreate = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault
      await addTodos()
      await getTodos()
      // nextId.current += 1
      // setTodos((prev) => [...prev, { id: nextId.current, text: createInput, done: false }])
      setIsOpenCreate(false)
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
      alert('오류가 발생했습니다.')
    }
  }

  const addTodos = async () => {
    try {
      const param = {
        text: createInput,
      }
      const data = postTodoList(param)
    } catch (d) {
      alert('오류가 발생했습니다.')
    }
  }

  const doneTodos = async (id: number, done: boolean) => {
    try {
      const param = {
        done,
      }
      await patchTodoList(id, param)
    } catch (e) {
      alert('오류가 발생했습니다.')
    }
  }

  const deleteTodos = async (id: number) => {
    try {
      await deleteTodoList(id)
    } catch (e) {
      alert('오류가 발생했습니다.')
    }
  }

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <>
      <TodoHeader today={dateString} dayName={dayName} unDoneTask={unDoneTaskLength} />
      <TodoList todos={todos} onToggleDone={onToggleDone} onClickDelete={onClickDelete} />
      <TodoCreate
        isOpen={isOpenCreate}
        onToggle={onToggleIsOpenCreate}
        onChange={onChangeCreateInput}
        onSubmit={onSubmitCreate}
        value={createInput}
      />
    </>
  )
}

export default todolist12
