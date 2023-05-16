import { UserContextProvider } from '@/components/UserContext'
import '@/styles/globals.sass'
import type { AppProps } from 'next/app'


export default function App({ Component, pageProps }: AppProps) {
  return <><UserContextProvider><Component {...pageProps} /></UserContextProvider></>
}
