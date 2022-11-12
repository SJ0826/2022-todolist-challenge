import GlobalStyles from '@ui/core/GlobalStyles'
import { Layout } from '@ui/components/layout'
import { AppProps } from 'next/app'
import Head from 'next/head'

function NyApp({ Component, pageProps }: AppProps) {
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

export default NyApp
