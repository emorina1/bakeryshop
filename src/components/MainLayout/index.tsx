import Head from "next/head";
import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/router"; // import router

interface Props {
  children?: ReactNode;
  name?: string;
  className?: string;
}

export function MainLayout(props: Props) {
  const router = useRouter();
  const isHomePage = router.pathname === "/"; // kontrollo nëse je në Home

  return (
    <div className={props.className}>
      <Head>
        <title>{props.name}</title>
      </Head>
      <Header />
      <main className="bg-white">{props.children}</main>

      {/* Shfaq Footer vetëm nëse NUK je në Home */}
      {!isHomePage && <Footer />}
    </div>
  );
}

export default MainLayout;
