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
      <Title>TODO LIST 11</Title>
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
  background-color: #112d4e;
`

const Title = styled.h1`
  text-align: center;
  font-size: 40px;
  color: #f9f7f7;
`

const Today = styled.div`
  font-size: 24px;
  padding-left: 10px;
  color: #f9f7f7;
`

const DayName = styled.div`
  font-size: 20px;
  padding-left: 10px;
  color: #f9f7f7;
`

const UnDoneTask = styled.div`
  font-size: 20px;
  padding-left: 10px;
  color: #f9f7f7;
`
