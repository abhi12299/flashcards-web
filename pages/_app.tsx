import type { AppProps } from 'next/app'
import { CookiesProvider } from 'react-cookie'
import 'tailwindcss/tailwind.css'
import '../init'
import '../styles/global.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  )
}
export default MyApp
