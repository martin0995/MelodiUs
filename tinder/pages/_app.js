import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="bg-yellow-300	 h-screen">
      <Component {...pageProps} />
    </div>
  );
}
