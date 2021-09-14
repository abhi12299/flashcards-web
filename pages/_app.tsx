import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import type { AppProps } from 'next/app'
import { CookiesProvider } from 'react-cookie'
import 'tailwindcss/tailwind.css'
import '../init'
import '../styles/global.css'
config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  )
}
export default MyApp
