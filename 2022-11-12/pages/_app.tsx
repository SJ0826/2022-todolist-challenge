import type { AppProps } from 'next/app'
import Head from 'next/head'

import { Layout } from '@components/layout'
import GlobalStyles from '@ui/core/GlobalStyles'
import { Provider } from 'mobx-react'

import { TodoStoreProvider } from '../lib/store/stores'
import { store } from 'lib/store/todoStore'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>투두 리스트</title>
      </Head>
      <GlobalStyles />
      <TodoStoreProvider>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </TodoStoreProvider>
    </>
  )
}

export default MyApp
