import { CircularProgress } from "@mui/material";
import useFetch from "hooks/useFetch";
import { motion } from "framer-motion";
import Link from "next/link";
import { Product } from "@/api/models/Product";
import { useRouter } from "next/router";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Products() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  const {
    data: productsData,
    loading: productsLoading,
    remove,
  } = useFetch<Product[]>("/api/products");

  const router = useRouter();

  const handleDeleteProduct = async (id: number) => {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      await remove(`/api/products/${id}`);
      alert("Product deleted successfully.");
      router.reload();
    } catch (error) {
      alert("Error while deleting product.");
      console.error(error);
    }
  };

  const handleAddToCart = (product: Product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = [...existingCart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    toast("✅ Added to your cart", {
      className: "bg-pink-600 text-white font-semibold rounded-lg shadow-lg",
    });

    setTimeout(() => {
      router.push("/cart");
    }, 1200);
  };

  return (
    <div className="pt-12">
      <Head>
        <title>Products | Cake Shop</title>
      </Head>

      <div className="flex flex-col items-center justify-center min-h-screen gap-y-20">
        {productsLoading ? (
          <CircularProgress />
        ) : (
          <div className="bg-pink-50 py-16 px-4 w-full">
            <h1 className="text-5xl font-bold text-center text-pink-800 mb-16">
              Try Our Fresh Products
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
              {productsData && productsData.length > 0 ? (
                productsData.map((product: Product) => (
                  <motion.div
                    key={product.id}
                    className="bg-white rounded-3xl shadow-xl p-6 text-center hover:scale-105 transition transform duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-full h-48 bg-pink-100 rounded-xl flex items-center justify-center mb-6 overflow-hidden">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.title}
                          className="object-contain max-h-full max-w-full"
                        />
                      ) : (
                        <span className="text-4xl">🍰</span>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-pink-700 mb-2 uppercase">
                      {product.title}
                    </h2>
                    <p className="text-gray-500 mb-4">{product.body}</p>

                    {product.price ? (
                      <p className="text-pink-800 font-bold mb-4">~ {product.price}€</p>
                    ) : (
                      <p className="text-gray-400 italic mb-4">Price not available</p>
                    )}

                    {!isAdmin && (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-pink-500 hover:bg-pink-700 text-white px-6 py-2 rounded-full mb-4 font-semibold transition"
                      >
                        Add to Cart
                      </button>
                    )}

                    {isAdmin && product.id !== undefined && (
                      <div className="flex justify-center gap-4">
                        <Link href={`/update/product/${product.id}`}>
                          <button className="bg-[#E6007E] hover:bg-pink-800 text-white rounded-full px-5 py-2 font-semibold transition">
                            Update
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDeleteProduct(product.id!)}
                          className="bg-[#E6007E] hover:bg-pink-800 text-white rounded-full px-5 py-2 font-semibold transition"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-lg font-medium text-gray-600 col-span-3">
                  No products found in the database.
                </p>
              )}
            </div>

            {isAdmin && (
              <div className="text-center mt-16">
                <Link href="/create/product">
                  <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-3 rounded-full shadow-md transition">
                    Create Product
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </div>
  );
}
