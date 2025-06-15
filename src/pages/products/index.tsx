import { CircularProgress } from "@mui/material";
import useFetch from "hooks/useFetch";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/api/models/Product";
import { useRouter } from "next/router";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

export default function Products() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  const {
    data: productsData,
    loading: productsLoading,
    remove,
  } = useFetch<Product[]>("/api/products");

  const router = useRouter();

  useEffect(() => {
    console.log("productsData:", productsData);
    console.log("isAdmin:", isAdmin);
  }, [productsData, isAdmin]);

  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

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
      className: "bg-[#5A3E36] text-white font-semibold rounded-lg shadow-lg",
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
          <div className="bg-[#F4EDE7] py-16 px-4 w-full">
            <h1
              className="text-5xl font-bold text-center mb-16"
              style={{ color: "#5A3E36" }}
            >
              Try Our Fresh Products
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
              {productsData && productsData.length > 0 ? (
                productsData.map((product) => (
                  <motion.div
                    key={product.id}
                    className="bg-white rounded-3xl shadow-xl p-6 text-center hover:scale-105 transition-transform duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-full h-48 rounded-xl flex items-center justify-center mb-6 overflow-hidden bg-[#F4EDE7]">
                      {product.image ? (
                      <Image
  src={product.image.startsWith('/uploads/') ? product.image : `/uploads/${product.image}`}
  alt={product.title}
  width={200}
  height={180}
  style={{ objectFit: "contain" }}
  className="rounded-xl"
/>

                      ) : (
                        <span className="text-4xl">🍰</span>
                      )}
                    </div>

                    <h2 className="text-2xl font-bold text-[#5A3E36] mb-2 uppercase">
                      {product.title}
                    </h2>

                    <p className="text-gray-500 mb-4">{product.body}</p>

                    {product.price ? (
                      <p className="text-[#5A3E36] font-bold mb-4">~ {product.price}€</p>
                    ) : (
                      <p className="text-gray-400 italic mb-4">Price not available</p>
                    )}

                    {!isAdmin && (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-[#5A3E36] hover:bg-[#4b3029] text-white px-6 py-2 rounded-full mb-4 font-semibold transition"
                      >
                        Add to Cart
                      </button>
                    )}

                    {isAdmin && product.id !== undefined && (
                      <div className="flex justify-center gap-4">
                        <Link href={`/update/product/${product.id}`}>
                          <button className="bg-[#7B4A2A] hover:bg-[#5A3E36] text-white rounded-full px-5 py-2 font-semibold transition">
                            Update
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDeleteProduct(product.id!)}
                          className="bg-[#7B4A2A] hover:bg-[#5A3E36] text-white rounded-full px-5 py-2 font-semibold transition"
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
                  <button className="bg-[#5A3E36] hover:bg-[#4b3029] text-white font-semibold px-8 py-3 rounded-full shadow-md transition">
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
