
import TodoHeader from '@ui/components/todo/TodoHeader'
import styled from 'styled-components'

const todolist4 = () => {
return (
  <Container>
    <TodoHeader today='오늘 날짜가 업데이트 됩니다.' dayName='요일이 업데이트 됩니다.' unDoneTask={0} />
  </Container>
)
}

export default todolist4

const Container = styled.div`
`

