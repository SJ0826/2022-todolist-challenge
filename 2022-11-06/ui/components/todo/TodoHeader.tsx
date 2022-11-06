import styled from 'styled-components'

interface Props {
  today: string
  dayName: string
  unDoneTask: number
}

const TodoHeader = ({ today, dayName, unDoneTask }: Props) => {
  return (
    <Header>
      <Container>
        <Title>TODO LIST</Title>
        <Today>{today}</Today>
        <DayName>{dayName}</DayName>
        <UnDonTask>할 일이 {unDoneTask}개 남았습니다.</UnDonTask>
      </Container>
    </Header>
  )
}

export default TodoHeader

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: 200px;
  background-color: #9ed5c5;
`

const Title = styled.h1`
  display: flex;
  justify-content: center;
  font-size: 50px;
  top: 24px;
  margin-top: 20px;
  margin-bottom: 10px;
`

const Container = styled.div`
  padding-left: 10px;

  color: #594545;
`

const Today = styled.div`
  font-size: 26px;
  font-weight: bold;
`

const DayName = styled.div`
  font-size: 20px;
  color: grey;
`

const UnDonTask = styled.div`
  font-size: 20px;
`
