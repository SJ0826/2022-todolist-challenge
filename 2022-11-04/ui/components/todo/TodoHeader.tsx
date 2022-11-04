import React from 'react'
import styled from 'styled-components'

interface Props {
  title: string
}
export default function TodoHeader({ title }: Props) {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding: 24px;
  box-sizing: content-box;
  background-color: #5da7db;
`

const Title = styled.h3`
  font-size: 36px;
  font-weight: 700;
  letter-spacing: 12px;
  color: white;
`
