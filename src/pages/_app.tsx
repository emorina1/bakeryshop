import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Playfair_Display } from "next/font/google";
import MainLayout from "@/components/MainLayout";
import { SessionProvider } from "next-auth/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps & { Component: { noLayout?: boolean } }) {
  const noLayout = Component.noLayout;

  useEffect(() => {
    // Krijojmë socket vetëm kur komponenti mountohet
    const socket: Socket = io({
      path: "/api/socket",
    });

    socket.on("notification", (data) => {
      alert(`📢 ${data.title}\n${data.message}`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SessionProvider session={session}>
      <div className={playfair.className}>
        {noLayout ? (
          <Component {...pageProps} />
        ) : (
          <MainLayout name="My Website">
            <Component {...pageProps} />
          </MainLayout>
        )}
      </div>
    </SessionProvider>
  );
}
