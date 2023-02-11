import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { Figtree } from "@next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const gotham = Figtree({ subsets: ["latin"] });
export default function App({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Provider store={store}>
        <main className={gotham.className}>
          <Component {...pageProps} />
        </main>
      </Provider>
    </SessionProvider>
  );
}
