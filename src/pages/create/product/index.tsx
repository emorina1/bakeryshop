import { useState } from "react";
import { useRouter } from "next/router";

export default function CreateProduct() {
  const router = useRouter();

  const [newProduct, setNewProduct] = useState({
    title: "",
    body: "",
    image: "",
    price: 0,
  });

  const handleCreate = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) throw new Error("Failed to create product");

      const data = await res.json();
      console.log("✅ Product created:", data);
      router.push("/products");
    } catch (error) {
      console.error("❌ Error creating product:", error);
      alert("An error occurred while creating the product.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-yellow-100 py-12 px-4">
      <div className="bg-white w-full max-w-xl p-8 rounded-2xl shadow-xl space-y-6">
        <h1 className="text-3xl font-bold text-center text-amber-900">Add New Product</h1>

        <div className="space-y-4">
          <label className="block">
            <span className="text-amber-900 font-medium">Title</span>
            <input
              type="text"
              value={newProduct.title}
              onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
              className="mt-1 w-full border border-amber-300 rounded-lg px-4 py-3"
              placeholder="Product title..."
              required
            />
          </label>

          <label className="block">
            <span className="text-amber-900 font-medium">Description</span>
            <textarea
              value={newProduct.body}
              onChange={(e) => setNewProduct({ ...newProduct, body: e.target.value })}
              className="mt-1 w-full border border-amber-300 rounded-lg px-4 py-3 resize-none"
              rows={5}
              placeholder="Write a short description..."
              required
            />
          </label>

          <label className="block">
            <span className="text-amber-900 font-medium">Price (€)</span>
            <input
              type="number"
              step="0.01"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
              className="mt-1 w-full border border-amber-300 rounded-lg px-4 py-3"
              placeholder="0.00"
              required
            />
          </label>

          <label className="block">
            <span className="text-amber-900 font-medium">Image Upload</span>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const formData = new FormData();
                formData.append("image", file);

                try {
                  const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                  });
                  const data = await res.json();

                  if (data.url) {
                    setNewProduct((prev) => ({ ...prev, image: data.url }));
                  } else {
                    alert("Upload failed: " + (data.error || "Unknown error"));
                  }
                } catch (err) {
                  console.error("Upload error:", err);
                  alert("An error occurred while uploading the image.");
                }
              }}
              className="mt-1 w-full text-sm text-gray-600"
            />
          </label>

          {newProduct.image && (
            <img
              src={newProduct.image}
              alt="Preview"
              className="rounded-xl w-full h-64 object-cover border border-amber-300"
            />
          )}
        </div>

        <button
          onClick={handleCreate}
          className="w-full py-3 bg-amber-700 text-white font-semibold rounded-lg hover:bg-amber-800 transition-all shadow-md"
        >
          Create Product
        </button>
      </div>
    </section>
  );
}
