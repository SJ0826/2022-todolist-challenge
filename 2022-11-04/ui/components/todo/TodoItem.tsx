import { TodoItemType } from 'pages/todolist2'
import React from 'react'
import styled, { css } from 'styled-components'
import { MdDelete, MdDone } from 'react-icons/md'

interface Props {
  onToggleDone: (id: number) => void
  onClickDelete: (id: number) => void
}
export default function TodoItem({ id, text, done, onToggleDone, onClickDelete }: Props & TodoItemType) {
  return (
    <Container>
      <CheckCircle
        done={done}
        onClick={() => {
          onToggleDone(id)
        }}
      >
        {done && <MdDone />}
      </CheckCircle>
      <Text done={done}>{text}</Text>
      <Remove
        onClick={() => {
          onClickDelete(id)
        }}
      >
        <MdDelete />
      </Remove>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: white;
`

const CheckCircle = styled.div<{ done: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid black;
      color: black;
    `}
`

const Text = styled.div<{ done: boolean }>`
  flex: 1;
  font-size: 21px;
  color: black;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
      text-decoration: line-trough;
    `}
`

const Remove = styled.div`
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #2478ff;
  }
`
