import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Playfair_Display } from "next/font/google";

// Importo fontin me opsionet e duhura
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={playfair.className}>
      <Component {...pageProps} />
    </main>
  );
}
