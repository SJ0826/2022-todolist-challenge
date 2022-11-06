import styled, { css } from 'styled-components'

interface Props {
  isOpen: boolean
  onToggle: () => void
}
const TodoCreate = ({ isOpen, onToggle }: Props) => {
  return (
    <Container>
      <CreateForm>
        {isOpen && <CreateInput />}
        <CreateButton isOpen={isOpen} onClick={onToggle}>
          {isOpen ? '닫기' : '추가'}
        </CreateButton>
      </CreateForm>
    </Container>
  )
}
export default TodoCreate

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: auto;
  bottom: 0;
  left: 0;
`

const CreateForm = styled.form`
  position: absolute
  width: 100%

  background: #bcead5;
 
`

const CreateInput = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #fff8ea;
  width: 360px;
  height: 50px;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`

const CreateButton = styled.button<{ isOpen: boolean }>`
  width: 60px;
  height: 60px
  right: 0
  position: absolute;
  background-color: #594545;
  font-size: 15px;
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
  z-index: 5;
  transition: 0.125s all ease-in;
  ${(props) =>
    props.isOpen &&
    css`
      color: #222;
      border: 1px solid #ddd;
      width: 60px;
      height: 50px;
    `}
`
