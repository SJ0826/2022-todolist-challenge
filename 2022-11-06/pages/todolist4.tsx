
import TodoCreate from '@ui/components/todo/TodoCreate'
import TodoHeader from '@ui/components/todo/TodoHeader'
import { useState } from 'react'
import styled from 'styled-components'

const todolist4 = () => {
  // 날짜 업데이트
  const date = new Date()
  const today = date.toLocaleDateString('ko-kr', { year: 'numeric', month: 'long', day: 'numeric' })
  const dayName = date.toLocaleDateString('ko-kr', { weekday: 'long' })

  // Todo 할일 생성하기
  const [isOpenCreate, setIsOpenCreate] = useState(true)
  const onToggleisOpenCreate = () => {
    setIsOpenCreate((prev) => !prev)
  }
  return (
    <Container>
      <TodoHeader today={today} dayName={dayName} unDoneTask={0} />
      <TodoCreate isOpen={isOpenCreate} onToggle={onToggleisOpenCreate} />
    </Container>
  )
}

export default todolist4

const Container = styled.div`
`

