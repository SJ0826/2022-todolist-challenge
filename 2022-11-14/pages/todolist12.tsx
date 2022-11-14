import TodoCreate from '@ui/components/todo/TodoCreate'
import TodoHeader from '@ui/components/todo/TodoHeader'
import TodoList from '@ui/components/todo/TodoList'
import todoStore from 'lib/store/todoStore'
import getDateString from 'lib/utils/getDateString'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { ChangeEvent, FormEvent, useCallback, useMemo, useEffect, useRef, useState } from 'react'
export interface TodoItemType {
  id: number
  text: string
  done: boolean
}

const todolist12 = () => {
  const { dateString, dayName } = getDateString()
  const [isOpenCreate, setIsOpenCreate] = useState(false)
  const [createInput, setCreateInput] = useState('')

  const unDoneTaskLength = useMemo(() => todoStore.todo.filter((todo) => !todo.done).length, [todoStore.todo])

  const onToggleIsOpenCreate = useCallback(() => {
    setIsOpenCreate((prev) => !prev)
  }, [isOpenCreate])

  const onChangeCreateInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setCreateInput(value)
  }

  const onSubmitCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault
    todoStore.createTodo(createInput)
    // await addTodos()
    // await getTodos()
    // nextId.current += 1
    // setTodos((prev) => [...prev, { id: nextId.current, text: createInput, done: false }])
    setIsOpenCreate(false)
    setCreateInput('')
  }

  const onToggleDone = useCallback(
    async (id: number, done: boolean) => {
      todoStore.toggleDone(id, done)
      // setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)))
      // await doneTodos(id, done)
      // await getTodos()
    },
    [todoStore.todo],
  )

  const onClickDelete = useCallback(
    async (id: number) => {
      todoStore.deleteTodo(id)
      // setTodos((prev) => prev.filter((todo) => todo.id !== id))
      // await deleteTodos(id)
      // await getTodos()
    },
    [todoStore.todo],
  )

  useEffect(() => {
    todoStore.getTodo()
  }, [])

  useEffect(() => {
    console.log(toJS(todoStore.todo))
  }, [todoStore.todo])

  return (
    <>
      <TodoHeader today={dateString} dayName={dayName} unDoneTask={unDoneTaskLength} />
      <TodoList todos={todoStore.todo} onToggleDone={onToggleDone} onClickDelete={onClickDelete} />
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

export default observer(todolist12)
