import { signIn, getSession } from "next-auth/react";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

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
    } else if (res?.ok) {
      const session = await getSession();
      const user = session?.user as UserWithRole;
      const role = user?.role;

      if (role === "admin") {
        router.push("/dashboard/admin");
      } else {
        router.push("/");
      }
    }
  };

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

      <div className="min-h-screen flex items-center justify-center pt-24 px-4 transition-colors">
        <div
          style={{
            backgroundColor: darkMode ? "#1f2937" : "#ffffff",
            color: darkMode ? "#ffffff" : "#000000",
          }}
          className="w-full max-w-md p-8 rounded-2xl shadow-lg border border-pink-300"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Welcome Back</h2>

          {error && (
            <div
              style={{
                backgroundColor: darkMode ? "#fecaca" : "#fee2e2",
                color: "#b91c1c",
              }}
              className="p-3 mb-4 rounded-lg text-sm text-center"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                backgroundColor: darkMode ? "#374151" : "#fff",
                color: darkMode ? "#fff" : "#000",
                border: "1px solid #d1d5db",
              }}
              className="w-full px-4 py-3 rounded-lg outline-none"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                backgroundColor: darkMode ? "#374151" : "#fff",
                color: darkMode ? "#fff" : "#000",
                border: "1px solid #d1d5db",
              }}
              className="w-full px-4 py-3 rounded-lg outline-none"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition-transform transform hover:scale-105 duration-300"
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => signIn("google")}
              className="w-full py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition-transform transform hover:scale-105 duration-300"
            >
              Sign in with Google
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
