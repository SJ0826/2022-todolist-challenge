import { Layout } from '@ui/components/layout'
import GlobalStyles from '@ui/core/GlobalStyles'
import { TodoStoreProvider } from 'lib/store/stores'
import { Provider } from 'mobx-react'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>투두 리스트</title>
      </Head>
      <GlobalStyles />
      <TodoStoreProvider>
        <Provider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </TodoStoreProvider>
    </>
  )
}

export default MyApp
