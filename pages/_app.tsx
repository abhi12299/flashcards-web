import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../init'
import { ApolloProvider } from '@apollo/client'
import { createApolloClient } from '../utils/createApolloClient'

const apolloClient = createApolloClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
export default MyApp
