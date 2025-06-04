import { Product } from "@/api/models/Product";
import useFetch from "hooks/useFetch";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function UpdateProduct() {
  const router = useRouter();
  const { id } = router.query;

  const [newProduct, setNewProduct] = useState<Product>({
    title: "",
    body: "",
    image: "",
    price: 0,
  });

  const {
    data: existingProduct,
    loading,
    put,
  } = useFetch<Product>(id ? `/api/products/${id}` : "");

  useEffect(() => {
    if (existingProduct) {
      setNewProduct({
        title: existingProduct.title || "",
        body: existingProduct.body || "",
        image: existingProduct.image || "",
        price: existingProduct.price ?? 0,
      });
    }
  }, [existingProduct]);

  const handleUpdate = async () => {
    if (!newProduct.title || !newProduct.body || !id) return;
    await put(newProduct);
    router.push("/products");
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-pink-600 font-semibold text-xl animate-pulse">
        Loading...
      </p>
    );

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-pink-200 py-12 px-4">
      <div className="bg-white w-full max-w-xl p-8 rounded-2xl shadow-xl space-y-8">
        <h1 className="text-3xl font-bold text-center text-pink-700 mb-4">
          Update Product
        </h1>

        <div className="space-y-4">
          <label className="block">
            <span className="text-pink-700 font-medium">Title</span>
            <input
              type="text"
              value={newProduct.title}
              onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
              className="mt-1 w-full border border-pink-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-800"
              placeholder="Product title..."
            />
          </label>

          <label className="block">
            <span className="text-pink-700 font-medium">Description</span>
            <textarea
              value={newProduct.body}
              onChange={(e) => setNewProduct({ ...newProduct, body: e.target.value })}
              className="mt-1 w-full border border-pink-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-800 resize-none"
              rows={5}
              placeholder="Product description..."
            />
          </label>

          <label className="block">
            <span className="text-pink-700 font-medium">Price (€)</span>
            <input
              type="number"
              step="0.01"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
              className="mt-1 w-full border border-pink-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-800"
              placeholder="0.00"
            />
          </label>

          <label className="block">
            <span className="text-pink-700 font-medium">Image Upload</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const formData = new FormData();
                formData.append("image", file);

                fetch("/api/upload", {
                  method: "POST",
                  body: formData,
                })
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.url) {
                      setNewProduct((prev) => ({ ...prev, image: data.url }));
                    } else {
                      alert("Upload failed: " + (data.error || "Unknown error"));
                    }
                  })
                  .catch((err) => {
                    console.error("Upload error:", err);
                    alert("An error occurred while uploading the image.");
                  });
              }}
              className="mt-1 w-full text-sm text-gray-600 bg-pink-50 border border-pink-300 rounded cursor-pointer focus:outline-none"
            />
          </label>

          {newProduct.image && (
            <div className="relative rounded-xl w-full h-64 border border-pink-300 overflow-hidden">
              <Image
                src={newProduct.image}
                alt="Preview"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          )}
        </div>

        <div className="pt-4">
          <button
            onClick={handleUpdate}
            className="w-full py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition-all shadow-md"
          >
            Update Product
          </button>
        </div>
      </div>
    </section>
  );
}

UpdateProduct.displayName = "Update Product | My bakerydb";
