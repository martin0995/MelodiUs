import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { Figtree } from "@next/font/google";

const gotham = Figtree({ subsets: ["latin"] });
export default function App({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <main className={gotham.className}>
          <Component {...pageProps} />
        </main>
      </Provider>
    </SessionProvider>
  );
}
