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

     <div className="min-h-screen flex items-center justify-center bg-[#fff7f2] pt-24 px-4">
  <div className="w-full max-w-2xl bg-white p-10 rounded-3xl shadow-2xl border border-[#f3d5c0]">
    <h2 className="text-5xl font-extrabold text-[#b76e79] mb-8 text-center font-serif tracking-wide">
      Create Your Bakery Account
    </h2>

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
          className="w-full px-6 py-4 text-lg border border-[#f5c6aa] rounded-lg focus:ring-2 focus:ring-[#e9a999] outline-none placeholder-[#e2a194] text-[#6e4c4c] bg-[#fffaf7]"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="w-full px-4 py-3 border border-[#f5c6aa] rounded-lg focus:ring-2 focus:ring-[#e9a999] outline-none placeholder-[#e2a194] text-[#6e4c4c] bg-[#fffaf7]"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="w-full px-4 py-3 border border-[#f5c6aa] rounded-lg focus:ring-2 focus:ring-[#e9a999] outline-none placeholder-[#e2a194] text-[#6e4c4c] bg-[#fffaf7]"
        required
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-3 bg-[#d88c9a] text-white font-semibold rounded-lg hover:bg-[#c6707d] transition-transform transform hover:scale-105 duration-300 disabled:opacity-60"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </div>
  </div>
</div>

    </>
  );
}
