import Layout from '@ui/components/layout/Layout'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'

import GlobalStyles from '../ui/core/GlobalStyles'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>투두 리스트</title>
      </Head>
      <GlobalStyles />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
