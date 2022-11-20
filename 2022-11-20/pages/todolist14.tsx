import TodoCreate from '@ui/components/todo/TodoCreate'
import TodoHeader from '@ui/components/todo/TodoHeader'
import TodoList from '@ui/components/todo/TodoList'
import { deleteTodoList } from 'lib/api/todo/deleteTodoList'
import { getTodoList } from 'lib/api/todo/getTodoList'
import { patchTodoList } from 'lib/api/todo/patchTodoList'
import { postTodoList } from 'lib/api/todo/postTodoList'
import { TodoItemType } from 'lib/interface/todo.interface'
import getDateString from 'lib/utils/getDateString'
import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'

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

  const onSubmitCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await addTodo()
    await getTodos()
    setIsOpenCreate(false)
    setCreateInput('')
  }

  const onToggleDone = async (id: number, done: boolean) => {
    await doneTodo(id, done)
    await getTodos()
  }

  const onClickDelete = async (id: number) => {
    await deleteTodo(id)
    await getTodos()
  }

  const getTodos = async () => {
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
        text: createInput,
      }
      await postTodoList(param)
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
    getTodos()
  }, [])

  return (
    <>
      <TodoHeader today={dateString} dayName={dayName} unDoneTask={unDoneTask} />
      <TodoCreate
        isOpen={isOpenCreate}
        onToggle={onToggleIsOpenCreate}
        onChange={onChagneCreateInput}
        onSubmit={onSubmitCreate}
        value={createInput}
      />
      <TodoList todos={todos} onToggleDone={onToggleDone} onClickDelete={onClickDelete} />
    </>
  )
}

export default todolist14
