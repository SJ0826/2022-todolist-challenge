import { memo } from 'react'
import styled from 'styled-components'

interface Props {
  today: string
  dayName: string
  unDoneTask: number
}
const TodoHeader = ({ today, dayName, unDoneTask }: Props) => {
  return (
    <Container>
      <Title>TODO LIST 7</Title>
      <Today>{today}</Today>
      <DayName>{dayName}</DayName>
      <UnDoneTask>할 일이 {unDoneTask}개 남았습니다</UnDoneTask>
    </Container>
  )
}

export default memo(TodoHeader)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: 200px;
  background-color: #e3fdfd;
`

const Title = styled.h1`
  text-align: center;
  font-size: 40px;
  color: #71c9ce;
`

const Today = styled.div`
  font-size: 24px;
  padding-left: 10px;
  color: #71c9ce;
`

const DayName = styled.div`
  font-size: 20px;
  padding-left: 10px;
  color: #71c9ce;
`

const UnDoneTask = styled.div`
  font-size: 20px;
  padding-left: 10px;
  color: #71c9ce;
`
