import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Product } from "@/api/models/Product";

export default function AdminCart() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/");
    }
  }, [session, status, router]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  if (status === "loading") {
    return <p className="text-center pt-24">Loading...</p>;
  }

  return (
    <div className="pt-24 px-6 pb-12 min-h-screen bg-white">
      <Head><title>Admin Cart | Cake Shop</title></Head>
      <h1 className="text-4xl font-bold text-pink-700 mb-8 text-center">🛒 Admin Cart View</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">No cart data found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {cartItems.map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold text-pink-700">{item.title}</h2>
              <p className="text-gray-500">{item.body}</p>
              <p className="text-pink-600 font-bold mt-2">{item.price}€</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
