import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import AOS from "aos"
import type { AppProps } from 'next/app'
import 'primeicons/primeicons.css'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import { useEffect } from 'react'
import { CookiesProvider } from 'react-cookie'
import 'tailwindcss/tailwind.css'
import '../init'
import '../styles/global.scss'
config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  )
}
export default MyApp
