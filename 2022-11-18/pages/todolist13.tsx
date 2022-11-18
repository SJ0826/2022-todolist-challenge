import TodoCreate from '@ui/components/todo/TodoCreate'
import TodoHeader from '@ui/components/todo/TodoHeader'
import TodoList from '@ui/components/todo/TodoList'
import { useTodoStores } from 'lib/store/stores'
import todoStore from 'lib/store/todoStore'
import getDateString from 'lib/utils/getDateString'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useCallback, useMemo, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
export interface TodoItemType {
  id: number
  text: string
  done: boolean
}

const todolist12 = () => {
  const router = useRouter()
  const { todoStore, userStore } = useTodoStores()
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

  const onClickLogout = () => {
    localStorage.clear()
    router.replace('/auth/signin')
  }

  useEffect(() => {
    // todoStore.getTodo()
    ;async () => {
      const isAuth = await userStore.getAuthUser()
      if (!isAuth) {
        alert('회원 정보가 없습니다.')
        router.replace('/auth/signin')
      }
    }
  }, [])

  useEffect(() => {
    //   console.log(toJS(todoStore.todo))
    // }, [todoStore.todo])
    todoStore.getTodo()
  }, [])

  return (
    <Container>
      <LogoutButton onClick={onClickLogout}>로그아웃</LogoutButton>
      <TodoHeader email={userStore.user?.email} today={dateString} dayName={dayName} unDoneTask={unDoneTaskLength} />
      <TodoList todos={todoStore.todo} onToggleDone={onToggleDone} onClickDelete={onClickDelete} />
      <TodoCreate
        isOpen={isOpenCreate}
        onToggle={onToggleIsOpenCreate}
        onChange={onChangeCreateInput}
        onSubmit={onSubmitCreate}
        value={createInput}
      />
    </Container>
  )
}

export default observer(todolist12)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const LogoutButton = styled.button`
  width: 100px;
`
