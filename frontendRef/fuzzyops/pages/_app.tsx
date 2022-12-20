import '../styles/globals.css'; 
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <>
        <Head>
          <title>FuzzyOps</title>
          <link rel="incon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@300;400;500;800&family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet"/>
        </Head>
        <Component {...pageProps} />
      </>
    </Provider>
  );
}
