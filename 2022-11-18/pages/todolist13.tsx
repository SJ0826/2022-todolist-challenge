import TodoCreate from '@ui/components/todo/TodoCreate'
import TodoHeader from '@ui/components/todo/TodoHeader'
import TodoList from '@ui/components/todo/TodoList'
import { deleteTodoList } from 'lib/api/todo/deleteTodoList'
import { getTodoList } from 'lib/api/todo/getTodoList'
import { patchTodoList } from 'lib/api/todo/patchTodoList'
import { postTodoList } from 'lib/api/todo/postTodoList'
import { useTodoStores } from 'lib/store/stores'
import getDateString from 'lib/utils/getDateString'
import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useCallback, useMemo, useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { useMutation } from 'react-query'
import styled from 'styled-components'
export interface TodoItemType {
  id: number
  text: string
  done: boolean
}

const todolist12 = () => {
  const router = useRouter()
  const { userStore } = useTodoStores()
  const { dateString, dayName } = getDateString()
  const [isOpenCreate, setIsOpenCreate] = useState(false)
  const [createInput, setCreateInput] = useState('')

  // Todolist 조회하기
  const { data: getTodo, refetch } = useQuery<TodoItemType[]>('getTodo', getTodoList)
  // Todo 등록하기
  const addTodo = useMutation(postTodoList)
  // Todo 완료 적용하기
  const doneTodo = useMutation(async () => patchTodoList)
  // Todo 삭제하기
  const deleteTodo = useMutation(async () => deleteTodoList)

  const unDoneTaskLength = useMemo(() => {
    if (getTodo) {
      return getTodo.filter((todo) => !todo.done).length
    }
  }, [getTodo])

  const onToggleIsOpenCreate = useCallback(() => {
    setIsOpenCreate((prev) => !prev)
  }, [isOpenCreate])

  const onChangeCreateInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setCreateInput(value)
    refetch()
  }

  const onSubmitCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault
    // 호출 순서를 보장하기 위해 mutateAsync를 사용해 Promise를 반환하게 하였다.
    await addTodo.mutateAsync({ text: createInput })

    refetch()
    setIsOpenCreate(false)
    setCreateInput('')
  }

  const onToggleDone = useCallback(
    async (id: number, done: boolean) => {
      await doneTodo.mutateAsync(await patchTodoList(id, { done }))
      refetch()
    },
    [getTodo],
  )

  const onClickDelete = useCallback(
    async (id: number) => {
      await deleteTodo.mutateAsync(await deleteTodoList(id))
      refetch()
    },
    [getTodo],
  )

  const onClickLogout = () => {
    localStorage.clear()
    router.replace('/auth/signin')
  }

  useEffect(() => {
    ;(async () => {
      const isAuth = await userStore.getAuthUser()
      if (!isAuth) {
        alert('회원 정보가 없습니다.')
        router.replace('/auth/signin')
        return
      }
      refetch()
    })()
  }, [])

  return (
    <Container>
      <LogoutButton onClick={onClickLogout}>로그아웃</LogoutButton>
      <TodoHeader email={userStore.user?.email} today={dateString} dayName={dayName} unDoneTask={unDoneTaskLength} />
      <TodoList todos={getTodo} onToggleDone={onToggleDone} onClickDelete={onClickDelete} />
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
