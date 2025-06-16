import { useEffect, useState } from "react";
import Head from "next/head";
import * as XLSX from "xlsx";
import Papa from "papaparse";

interface Product {
  id: number;
  title: string;
  body: string;
  price: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCartItems(parsed);
      } catch {
        setCartItems([]);
      }
    }
  }, []);

  const handleRemove = (id: number) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // Export
  const exportCartJSON = () => {
    const dataStr = JSON.stringify(cartItems, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cart.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportCartCSV = () => {
    const csv = Papa.unparse(cartItems);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cart.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportCartExcel = () => {
    const ws = XLSX.utils.json_to_sheet(cartItems);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Cart");
    XLSX.writeFile(wb, "cart.xlsx");
  };

  const importCartJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const text = ev.target?.result as string;
        const importedCart: Product[] = JSON.parse(text);
        setCartItems(importedCart);
        localStorage.setItem("cart", JSON.stringify(importedCart));
        alert("Cart imported successfully!");
      } catch (error) {
        alert("Error importing JSON file");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="pt-24 px-8 pb-12 min-h-screen bg-white">
      <Head>
        <title>Your Cart</title>
      </Head>

      <h1 className="text-5xl font-bold text-pink-700 mb-12 text-center">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-lg text-center">Your cart is empty.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold text-pink-800">{item.title}</h2>
              <p className="text-gray-600 mb-2">{item.body}</p>
              <p className="text-pink-600 font-bold mb-4">{item.price}€</p>
              <button
                onClick={() => handleRemove(item.id)}
                className="bg-pink-500 hover:bg-pink-700 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Export / Import */}
      <section className="mt-16 space-y-4 max-w-md mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-2">Export / Import Cart</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={exportCartJSON}
            className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded"
          >
            Export JSON
          </button>
          <button
            onClick={exportCartCSV}
            className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded"
          >
            Export CSV
          </button>
          <button
            onClick={exportCartExcel}
            className="bg-yellow-600 hover:bg-yellow-800 text-white px-4 py-2 rounded"
          >
            Export Excel
          </button>
          <label
            htmlFor="import-cart"
            className="cursor-pointer bg-purple-600 hover:bg-purple-800 text-white px-4 py-2 rounded"
          >
            Import JSON
          </label>
          <input
            type="file"
            id="import-cart"
            accept=".json"
            onChange={importCartJSON}
            className="hidden"
          />
        </div>
      </section>
    </div>
  );
}
