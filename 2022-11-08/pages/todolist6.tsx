import TodoCreate from '@ui/components/todo/TodoCreate'
import TodoHeader from '@ui/components/todo/TodoHeader'
import TodoList from '@ui/components/todo/TodoList'
import { deleteTodoList } from 'lib/api/todo/deleteTodoList'
import { getTodoList } from 'lib/api/todo/getTodoList'
import { patchTodoList } from 'lib/api/todo/patchTodoList'
import { postTodoList } from 'lib/api/todo/postTodoList'
import { ChangeEvent, FormEvent, memo, useState, useCallback, useMemo, useEffect } from 'react'

export interface TodoItemType {
  id: number
  text: string
  done: boolean
}

const todolist4 = () => {
  const date = new Date()
  const today = date.toLocaleDateString('ko-kr', { year: 'numeric', month: 'long', day: 'numeric' })
  const dayName = date.toLocaleDateString('ko-kr', { weekday: 'long' })
  const [isOpen, setIsOpen] = useState(true)
  const [todos, setTodos] = useState<TodoItemType[]>([])
  const [createInput, setCreateInput] = useState('')
  const unDoneTask = useMemo(() => todos.filter((todo) => !todo.done).length, [todos])

  const onCreateToggle = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  const onCreateChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      setCreateInput(value)
    },
    [setCreateInput],
  )

  const onCreateSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault
    await addTodo
    await getTodos
    // nextId.current += 1
    // setTodos((prev) => [...prev, { id: nextId.current, text: createInput, done: false }])
    setIsOpen(false)
    setCreateInput('')
  }

  const onToggleDone = async (id: number, done: boolean) => {
    await doneTodo(id, done)
    await getTodos()
    // (id: number) => {
    //   setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)))
    // },
  }

  const onClickDelete = async (id: number) => {
    await deleteTodo(id)
    await getTodos()
    // setTodos((prev) => prev.filter((todo) => todo.id !== id))
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
      <TodoHeader today={today} dayName={dayName} unDoneTask={unDoneTask} />
      <TodoList todos={todos} onToggleDone={onToggleDone} onClickDelete={onClickDelete} />
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
export default memo(todolist4)
