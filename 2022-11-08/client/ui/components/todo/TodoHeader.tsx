import styled from 'styled-components'
import React from 'react'

interface Props {
  today: string
  dayName: string
  unDoneTask: number
}

const TodoHeader = ({ today, dayName, unDoneTask }: Props) => (
  <Container>
    <Title>TODO LIST</Title>
    <Today>{today}</Today>
    <DayName>{dayName}</DayName>
    <UnDoneTask>할일이 {unDoneTask}개 남았습니다.</UnDoneTask>
  </Container>
)

export default TodoHeader

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: 200px;
  background-color: #4fa095;
`
const Title = styled.h1`
  text-align: center;
  font-size: 40px;
  color: #153462;
`

const Today = styled.div`
  font-size: 24px;
  padding-left: 10px;
`

const DayName = styled.div`
  font-size: 20px;
  padding-left: 10px;
`

const UnDoneTask = styled.div`
  font-size: 20px;
  padding-left: 10px;
`
