import { Layout } from '@ui/components/layout'
import GlobalStyles from '@ui/core/GlobalStyles'
import { TodoStoreProvider } from 'lib/store/stores'
import { Provider } from 'mobx-react'
import type { AppContext, AppInitialProps, AppProps } from 'next/app'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>투두 리스트</title>
      </Head>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <TodoStoreProvider>
          <Provider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </TodoStoreProvider>
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
