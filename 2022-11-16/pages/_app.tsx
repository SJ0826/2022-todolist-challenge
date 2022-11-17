import { Layout } from '@ui/components/layout'
import GlobalStyles from '@ui/core/GlobalStyles'
import { TodoStoreProvider } from 'lib/store/stores'
import { Provider } from 'mobx-react'
import type { AppContext, AppInitialProps, AppProps } from 'next/app'
import Head from 'next/head'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import React from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient())
  return (
    <>
      <Head>
        <title>투두 리스트</title>
      </Head>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <TodoStoreProvider>
            <Provider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </Provider>
          </TodoStoreProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}

MyApp.getInitialProps = async ({ Component, ctx }: AppContext): Promise<AppInitialProps> => {
  let pageProps = {}

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  return { pageProps }
}

export default MyApp
