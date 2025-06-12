import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

interface UserWithRole {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}

export default function SignIn() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Load theme from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "dark") {
        document.body.className = "dark";
        setDarkMode(true);
      } else {
        document.body.className = "light";
        setDarkMode(false);
      }
    }
  }, []);
if (status === "authenticated") {
  const user = session?.user as UserWithRole;
  console.log("User role on login:", user?.role);
  if (user?.role === "admin") {
    router.push("/dashboard/admin");
  } else {
    router.push("/dashboard/user");
  }
}

  // Redirect if authenticated
  useEffect(() => {
    if (status === "authenticated") {
      const user = session?.user as UserWithRole;
      if (user?.role === "admin") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/user");
      }
    }
  }, [session, status, router]);

  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    document.body.className = newTheme;
    localStorage.setItem("theme", newTheme);
    setDarkMode(newTheme === "dark");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError(res.error);
    }
  };

  if (status === "loading") {
    return <p className="text-center pt-24">Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>Sign In | My App</title>
      </Head>

      <button
        onClick={toggleTheme}
        style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          zIndex: 9999,
          fontSize: "1.5rem",
          padding: "0.5rem 1rem",
          borderRadius: "9999px",
          background: "#ec4899",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
<div className="min-h-screen flex items-center justify-center pt-24 px-4 transition-colors bg-[#f7efe8] dark:bg-[#3a352f]">
  <div
    style={{
      backgroundColor: darkMode ? "#5c5147" : "#fefcf9",
      color: darkMode ? "#e3d7c6" : "#5a4d41",
    }}
    className="w-full max-w-2xl p-10 rounded-3xl shadow-2xl border border-[#d7c4b7] dark:border-[#7a6f61]"
  >
    <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-center font-serif text-[#9e6f5a] dark:text-[#d8bfa3]">
      Welcome Back to SweetBites
    </h2>

    {error && (
      <div
        style={{
          backgroundColor: darkMode ? "#f5c6aa" : "#fde8dc",
          color: "#b44318",
        }}
        className="p-3 mb-6 rounded-lg text-sm text-center"
      >
        {error}
      </div>
    )}

    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          backgroundColor: darkMode ? "#7a6f61" : "#fff8f2",
          color: darkMode ? "#e3d7c6" : "#5a4d41",
          border: "1px solid #d7c4b7",
        }}
        className="w-full px-6 py-4 text-lg rounded-lg outline-none placeholder-[#c1a68c]"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          backgroundColor: darkMode ? "#7a6f61" : "#fff8f2",
          color: darkMode ? "#e3d7c6" : "#5a4d41",
          border: "1px solid #d7c4b7",
        }}
        className="w-full px-6 py-4 text-lg rounded-lg outline-none placeholder-[#c1a68c]"
        required
      />
      <button
        type="submit"
        className="w-full py-4 text-lg bg-[#b67a58] text-white font-semibold rounded-lg hover:bg-[#a26644] transition-transform transform hover:scale-105 duration-300"
      >
        Log In
      </button>
      <button
        type="button"
        onClick={() => signIn("google")}
        className="w-full py-4 text-lg bg-[#b67a58] text-white font-semibold rounded-lg hover:bg-[#a26644] transition-transform transform hover:scale-105 duration-300"
      >
        Sign in with Google
      </button>
    </form>
  </div>
</div>



    </>
  );
}
