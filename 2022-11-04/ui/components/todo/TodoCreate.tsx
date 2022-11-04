import React, { ChangeEvent, FormEvent } from 'react'
import styled, { css } from 'styled-components'

interface Props {
  isOpen: boolean
  onToggle: () => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  value: string
}
// {
//   isOpen, isToggle, onChange, onSubmit, value
// }
export default function TodoCreate({ isOpen, onToggle, onSubmit, onChange, value }: Props) {
  return (
    <>
      <CreateButton isOpen={isOpen} onClick={onToggle}>
        {isOpen ? '닫기' : '추가'}
      </CreateButton>
      {isOpen && (
        <CreateContainer>
          <CreateForm onSubmit={onSubmit}>
            <Input autoFocus placeholder="Enter를 눌러 입력하세요." onChange={onChange} value={value} />
          </CreateForm>
        </CreateContainer>
      )}
    </>
  )
}

const CreateButton = styled.button<{ isOpen: boolean }>`
  width: 60px;
  height: 40px;
  position: absolute;
  right: 20px;
  bottom: 4px;
  background-color: #5837d0;
  font-size: 20px;
  color: white;
  border-radius: 6px;
  border: none;
  outline: none;
  cursor: pointer;
  z-index: 5;
  transition: 0.125s all ease-in;

  ${(props) =>
    props.isOpen &&
    css`
      background-color: #fff;
      color: #5837d0;
      border: #ddd;
    `}
`

const CreateContainer = styled.div`
  position: absolute;
  width: 100%;
  height: auto;
  bottom: 0;
  left: 0;
`

const CreateForm = styled.form`
  background: #81c6e8
  padding: 32px 32px 72px 32px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #7DE5ED;
`

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #7de5ed;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`
