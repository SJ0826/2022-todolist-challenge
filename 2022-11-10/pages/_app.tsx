import GlobalStyles from '@ui/core/GlobalStyles'
import { AppProps } from 'next/app'
import Head from 'next/head'

function NyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>투두 리스트</title>
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}
