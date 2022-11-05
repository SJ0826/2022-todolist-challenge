import React from 'react'
import styled from 'styled-components'
import Page from './Page'

interface Props {
  children?: React.ReactNode
  [k: string]: any
}

const Layout = ({ children, ...props }: Props) => (
  <Page>
    <Container {...props}>{children}</Container>
  </Page>
)

export default Layout

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
