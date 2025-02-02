import type { AppProps } from 'next/app'
import '../styles/globals.Module.css'
import 'bootstrap/dist/css/bootstrap.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
