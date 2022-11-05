import React from 'react'
import styled from 'styled-components'

interface Props {
  title: string
}
export default function TodoHeader({ title }: Props) {
  return (
    <Header>
      <Title>{title}</Title>
    </Header>
  )
}

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: 200px;
  background-color: #815b5b;
`
const Title = styled.div`
  font-size: 50px;
`
