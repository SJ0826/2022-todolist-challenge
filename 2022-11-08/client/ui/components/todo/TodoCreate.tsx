import React, { ChangeEvent, FormEvent } from 'react'
import styled from 'styled-components'

interface Props {
  isOpen: boolean
  onToggle: () => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  value: string
}
const TodoCreate = ({ isOpen, onToggle, onSubmit, onChange, value }: Props) => (
  <Container>
    {isOpen && (
      <CreateForm onSubmit={onSubmit}>
        <CreateInput autoFocus placeholder="내용을 입력 후 Enter를 누르세요" onChange={onChange} value={value} />
      </CreateForm>
    )}
    <CreateButton onClick={onToggle}>{isOpen ? '닫기' : '추가'}</CreateButton>
  </Container>
)

export default TodoCreate

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 50px;
  bottom: 0;
  left: 0;
`

const CreateForm = styled.form``

const CreateInput = styled.input`
  position: absolute;
  width: 370px;
  height: 60px;
  left: 0;
  bottom: 0;
  outline: none;
  border: none;
  font-size: 24px;
  background-color: #bcead5;
`

const CreateButton = styled.button`
  position: absolute;
  width: 60px;
  height: 60px;
  right: 0;
  bottom: 0;
  outline: 0;
  border: 0;
  background-color: #153462;
  font-size: 16px;
  color: white;
  cursor: pointer;
  z-index: 5;
  transition: 0.125s all ease-in;
`
