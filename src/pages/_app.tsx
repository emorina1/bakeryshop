import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Playfair_Display } from "next/font/google";
import MainLayout from '@/components/MainLayout/index';
import { SessionProvider } from "next-auth/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <MainLayout name="My Website" className={playfair.className}>
        <Component {...pageProps} />
      </MainLayout>
    </SessionProvider>
  );
}
