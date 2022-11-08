import { TodoItemType } from 'pages/todolist6'
import styled, { css } from 'styled-components'
import { MdDelete, MdDone } from 'react-icons/md'

interface Props {
  onToggleDone: (id: number) => void
  onClickDelete: (id: number) => void
}

const TodoItem = ({ id, text, done, onToggleDone, onClickDelete }: TodoItemType & Props) => {
  return (
    <Container>
      <CheckCircle done={done} onClick={() => onToggleDone(id)}>
        {done && <MdDone />}
      </CheckCircle>
      <Text done={done}>{text}</Text>
      <Remove onClick={() => onClickDelete(id)}>
        <MdDelete />
      </Remove>
    </Container>
  )
}

export default TodoItem

const Remove = styled.div`
  align-items: center;
  justify-content: center;
  color: #594545;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #2478ff;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: #DEF5E5
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`
const CheckCircle = styled.div<{ done: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #8ec3b0;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #2478ff;
      color: #2478ff;
    `}
`
const Text = styled.div<{ done: boolean }>`
  flex: 1;
  font-size: 21px;
  color: #black;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
      text-decoration: line-through;
    `};
`
