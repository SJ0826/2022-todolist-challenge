import React from 'react'
import styled from 'styled-components'
import Page from './Page'

interface Props {
  children?: React.ReactNode
  [k: string]: any
}

export default function Layout({ children, ...props }: Props) {
  return (
    <Page>
      <Container {...props}>
        <div>바보</div>
      </Container>
    </Page>
  )
}

const Container = styled.main`
  position: absolute;
  width: 100vw;
  max-width: 420px;
  height: 100vh;
  max-height: 920px;
  background-color: #9e7676;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`
