import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "../store/store";

export default function App({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <div className="">
          <Component {...pageProps} />
        </div>
      </Provider>
    </SessionProvider>
  );
}
