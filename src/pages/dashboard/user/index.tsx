import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";

export default function Redirecting() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  // Redirect ALL logged in users to homepage (ose mund të bësh redirect për role të ndryshme)
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};
