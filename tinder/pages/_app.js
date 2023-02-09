import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "../store/store";

export default function App({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/Music.png"></link>
        <meta name="theme-color" content="#fff" />
      </Head>
      <Provider store={store}>
        <div className="">
          <Component {...pageProps} />
        </div>
      </Provider>
    </SessionProvider>
  );
}
