import { ChangeEvent, FormEvent, memo } from 'react'
import styled from 'styled-components'

interface Props {
  isOpen: boolean
  onToggle: () => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  value: string
}
const TodoCreate = ({ isOpen, onToggle, onChange, value, onSubmit }: Props) => {
  return (
    <Container>
      {isOpen && (
        <form onSubmit={onSubmit}>
          <CreateInput autoFocus placeholder="할 일을 입력 후 Enter를 누르세요" onChange={onChange} value={value} />
        </form>
      )}
      <CreateButton onClick={onToggle}>{isOpen ? '닫기' : '추가'}</CreateButton>
    </Container>
  )
}

export default memo(TodoCreate)
const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 50px;
  bottom: 0;
  left: 0;
`

const CreateInput = styled.input`
  position: absolute;
  width: 370px;
  height: 60px;
  left: 0;
  bottom: 0;
  outline: none;
  border: none;
  font-size: 24px;
  background-color: #f4eeff;
`

const CreateButton = styled.button`
  position: absolute;
  width: 60px;
  height: 60px;
  right: 0;
  bottom: 0;
  outline: 0;
  border: 0;
  background-color: #424874;
  font-size: 16px;
  color: #f9f7f7;
`
