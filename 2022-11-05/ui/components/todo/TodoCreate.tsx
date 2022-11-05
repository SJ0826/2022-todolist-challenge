import React, { ChangeEvent, FormEvent } from 'react'
import styled, { css } from 'styled-components'

interface Props {
  isOpen: boolean
  onToggle: () => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  value: string
}
export default function TodoCreate({ isOpen, onToggle, onSubmit, onChange, value }: Props) {
  return (
    <>
      <CreateButton isOpen={isOpen} onClick={onToggle}>
        {isOpen ? '닫기' : '추가'}
      </CreateButton>
      {isOpen && (
        <Container>
          <CreateForm onSubmit={onSubmit}>
            <Input autoFocus placeholder="입력 후 Enter를 누르세요" onChange={onChange} value={value} />
          </CreateForm>
        </Container>
      )}
    </>
  )
}

const CreateButton = styled.button<{ isOpen: boolean }>`
  width: 60px;
  height: 60px;
  padding: 0 20px;
  position: absolute;
  right: 20px;
  bottom: 15px;
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
      background-color: #fff;
      color: #222;
      border: 1px solid #ddd;
      width: 60px;
      height: 60px;
    `}
`

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: auto;
  bottom: 0;
  left: 0;
`

const CreateForm = styled.form`
  background: #f8f9fa;
  // padding: 32px 32px 72px 32px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #fff8ea;
`

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #fff8ea;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
  height: 75px;
`
