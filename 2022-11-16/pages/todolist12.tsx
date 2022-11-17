import React, { ChangeEvent, FormEvent, useEffect, useRef, useCallback, useMemo, useState } from 'react'
import getDateString from '../lib/utils/getDateString'
import TodoHeader from '@ui/components/todo/TodoHeader'
import TodoList from '@ui/components/todo/TodoList'
import TodoCreate from '@ui/components/todo/TodoCreate'
import { postTodoList } from 'lib/api/todo/postTodoList'
import { patchTodoList } from 'lib/api/todo/patchTodoList'
import { deleteTodoList } from 'lib/api/todo/deleteTodoList'
import { getTodoList } from 'lib/api/todo/getTodoList'
import router from 'next/router'
import styled from 'styled-components'
import { useMutation, useQuery } from 'react-query'

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
  // 현재 TodoList 컴포넌트의 Todo를 setState의 todos로 설정했는데
  // setTodos 함수가 사용되지 않아서 페이지가 렌더링이 되지 않음. 맞나?
  const unDoneTaskLength = useMemo(() => todos.filter((todo) => !todo.done).length, [todos])
  const { data: getTodo } = useQuery('getTodo', getTodoList)

  // console.log(getTodo)
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
  const postTodos = useMutation(postTodoList, {
    // post mutate함수
    onSuccess: () => {
      console.log('post')
    },
    onError: (e) => {
      console.error('에러발생')
    },
  })

  // const patchTodo = useMutation(patchTodoList, {
  //   onSuccess: () => {
  //     console.log('post')
  //   },
  //   onError: (e) => {
  //     console.error('에러발생')
  //   },
  // })

  const deleteTodo = useMutation(deleteTodoList, {
    onSuccess: () => {
      console.log('post')
    },
    onError: (e) => {
      console.error('에러발생')
    },
  })

  const onSubmitCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault
    addTodos(createInput)
    await getTodos()
    // nextId.current += 1
    // setTodos((prev) => [...prev, { id: nextId.current, text: createInput, done: false }])
    setIsOpenCreate(false)
    setCreateInput('')
  }

  const onToggleDone = async (id: number, done: boolean) => {
    // setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)))
    await doneTodos(id, done)
    await getTodos()
  }

  const onClickDelete = async (id: number) => {
    // setTodos((prev) => prev.filter((todo) => todo.id !== id))
    await deleteTodo.mutate(id)
    await getTodos()
  }

  const getTodos = async () => {
    try {
      // useQuery를 통해 불러온 todolist데이터를 setState함수에 사용하고 싶었지만 실패.
      // 구글링을 통해 알게 된 useEffet방법도 통하지 않음.
      // const data = getTodo
      // setTodos(data)

      // todolist 컴포넌트의 todos에 useQuery로 불러온 데이터를 넣으면
      // 브라우저에서 todo를 삭제하거나 값의 변경을 주면, 페이지가 바로 렌더링 되지 않고 새로고침해야 변경사항을 보여줌.

      const response = await getTodoList()
      setTodos(response)
      console.log(response)
    } catch (e) {
      alert('오류가 발생했습니다.')
    }
  }

  // const addTodos = async () => {
  //   try {
  //     const param = {
  //       text: createInput,
  //     }
  //     postTodos.mutate(param)
  //   } catch (d) {
  //     alert('오류가 발생했습니다.')
  //   }
  // }

  const addTodos = async (text: string) => {
    postTodos.mutate({text})
    await getTodo
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
    // 삭제버튼 누르고 새로고침해야 화면에 로드된다. 왜지?
    try {
      await deleteTodo.mutate(id)
    } catch (e) {
      alert('오류가 발생했습니다.')
    }
  }
  const onClickLogout = () => {
    localStorage.clear()
    router.replace('/auth/signin')
  }

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <>
      <LogoutButton onClick={onClickLogout}>로그아웃</LogoutButton>
      <TodoHeader today={dateString} dayName={dayName} unDoneTask={unDoneTaskLength} />
      <TodoList todos={getTodo} onToggleDone={onToggleDone} onClickDelete={onClickDelete} />
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

const LogoutButton = styled.button`
  width: 100px;
`
