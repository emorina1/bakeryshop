import Head from "next/head";
import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Props {
  children?: ReactNode;
  name?: string;
  className?: string;   // shtuar
}

export function MainLayout(props: Props) {
  return (
    <div className={props.className}>
      <Head>
        <title>{props.name}</title>
      </Head>
      <Header />
      <main className="bg-white">{props.children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
