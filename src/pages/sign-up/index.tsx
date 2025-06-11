import { useState } from "react";
import { useRouter } from "next/router";
import { User } from "@/api/models/User";
import Head from "next/head";

export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Gabim gjatë regjistrimit");
      } else {
        router.push("/sign-in");
      }
    } catch {
      setError("Gabim në rrjet ose server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Register | My Application</title>
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-pink-50 pt-24 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-pink-200">
          <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">Create an Account</h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full px-4 py-3 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none placeholder-pink-300 text-pink-800"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full px-4 py-3 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none placeholder-pink-300 text-pink-800"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full px-4 py-3 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none placeholder-pink-300 text-pink-800"
              required
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition-transform transform hover:scale-105 duration-300 disabled:opacity-60"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
