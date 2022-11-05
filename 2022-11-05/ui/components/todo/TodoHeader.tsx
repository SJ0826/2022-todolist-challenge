import React, { memo } from 'react'
import styled from 'styled-components'

interface Props {
  today: string
  dayName: string
  unDoneTask: number
}
const TodoHeader = ({ today, dayName, unDoneTask }: Props) => {
  return (
    <Header>
      <Title>TODO LIST</Title>
      <Container>
        <Today>{today}</Today>
        <Description>{dayName}</Description>
        <UnDoneTask>할일이 {unDoneTask}개 남았습니다.</UnDoneTask>
      </Container>
    </Header>
  )
}

export default memo(TodoHeader)
const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: 200px;
  background-color: #815b5b;
`
const Title = styled.h1`
  display: flex;
  justify-content: center;
  font-size: 50px;
  top: 24px;
  margin-top: 20px;
  margin-bottom: 10px;
`

const Today = styled.div`
  font-size: px;
`

const Description = styled.div``

const UnDoneTask = styled.div``

const Container = styled.h3`
  padding-left: 10px;
  font-size: 18px;
  color: #594545;
`
