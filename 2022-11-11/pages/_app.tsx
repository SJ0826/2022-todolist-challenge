import Layout from '@ui/components/layout/Layout'
import { TodoStoreProvider } from 'lib/store/stores'
import { store } from 'lib/store/todoStore'
import { Provider } from 'mobx-react'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import GlobalStyles from '../ui/core/GlobalStyles'

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
