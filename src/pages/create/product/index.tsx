import { useState } from "react";
import { useRouter } from "next/router";
import { Product } from "@/api/models/Product";
import useFetch from "hooks/useFetch";

export default function CreateProduct() {
  const router = useRouter();
  const [newProduct, setNewProduct] = useState<Product>({
    title: "",
    body: "",
    image: "",
    price: 0,
  });

  const { post } = useFetch<Product[]>("/api/products");

  const handleCreate = async () => {
    try {
      const result = await post(newProduct);
      console.log("✅ Product created:", result);
      router.push("/products");
    } catch (error) {
      console.error("❌ Error creating product:", error);
      alert("An error occurred while creating the product.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-pink-200 py-12 px-4">
      <div className="bg-white w-full max-w-xl p-8 rounded-2xl shadow-xl space-y-6">
        <h1 className="text-3xl font-bold text-center text-pink-700">Add New Product</h1>

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
              placeholder="Write a short description..."
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
              className="mt-1 w-full text-sm text-gray-600"
            />
          </label>

          {newProduct.image && (
            <img
              src={newProduct.image}
              alt="Preview"
              className="rounded-xl w-full h-64 object-cover border border-pink-300"
            />
          )}
        </div>

        <button
          onClick={handleCreate}
          className="w-full py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition-all shadow-md"
        >
          Create Product
        </button>
      </div>
    </section>
  );
}

CreateProduct.displayName = "CreateProduct | bakerydb";
