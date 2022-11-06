
import TodoHeader from '@ui/components/todo/TodoHeader'
import styled from 'styled-components'

const todolist4 = () => {
  // 날짜 업데이트
  const date = new Date()
  const today = date.toLocaleDateString('ko-kr', { year: 'numeric', month: 'long', day: 'numeric' })
  const dayName = date.toLocaleDateString('ko-kr', { weekday: 'long' })
  return (
    <Container>
      <TodoHeader today={today} dayName={dayName} unDoneTask={0} />
    </Container>
  )
}

export default todolist4

const Container = styled.div`
`

