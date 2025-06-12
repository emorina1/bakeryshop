import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getAllUsers } from "@/api/services/Admin";
import { getTotalProducts, getAllProducts } from "@/api/services/Product";
import { getAllMessages } from "@/api/services/Message";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "next-auth/react";


type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
};

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
};

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

type AdminDashboardProps = {
  users: User[];
  productCount: number;
  messages: Message[];
  products: Product[];
};

export default function AdminDashboard({
  users = [],
  productCount = 0,
  messages = [],
  products = [],
}: AdminDashboardProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeMenu, setActiveMenu] = useState<
    "dashboard" | "products" | "users" | "messages" | "cart"
  >("dashboard");
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const removeFromCart = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

 const handleLogout = () => {
  signOut({ callbackUrl: "/sign-in" }); // kjo të ridrejton te sign-in pas logout-it
};

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-yellow-900 text-white flex flex-col p-6 shadow-lg justify-between">
        <div>
          {activeMenu !== "cart" && (
            <h1 className="text-3xl font-extrabold mb-10 tracking-wide">Admin Dashboard</h1>
          )}

          <nav className="flex flex-col space-y-4 text-lg">
            {["dashboard", "products", "users", "messages", "cart"].map((menu) => (
              <button
                key={menu}
                className={`text-left p-3 rounded-md transition-colors duration-200 ${
                  activeMenu === menu
                    ? "bg-yellow-700 font-semibold shadow-inner"
                    : "hover:bg-yellow-800"
                }`}
                onClick={() => {
                  setActiveMenu(menu as any);
                  setSelectedProduct(null);
                }}
              >
                {menu === "dashboard" && "Dashboard Overview"}
                {menu === "products" && "Products"}
                {menu === "users" && "Users"}
                {menu === "messages" && "Messages"}
                {menu === "cart" && `Cart Overview (${cartItems.length})`}
              </button>
            ))}
          </nav>
        </div>

        {/* Logout button */}
      <button
  onClick={handleLogout}
  className="flex items-center gap-2 mt-6 p-3 rounded-md bg-red-600 hover:bg-red-700 transition text-white font-semibold"
  title="Logout"
>
 

          <FiLogOut size={20} />
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10 overflow-y-auto">
        {activeMenu === "dashboard" && (
          <section>
            <h2 className="text-2xl font-bold mb-6 border-b border-yellow-700 pb-2">
              Dashboard Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-xl font-semibold text-yellow-900">{productCount}</p>
                <p className="text-gray-600 mt-1">Total Products</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-xl font-semibold text-yellow-900">{users.length}</p>
                <p className="text-gray-600 mt-1">Total Users</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-xl font-semibold text-yellow-900">{messages.length}</p>
                <p className="text-gray-600 mt-1">Total Messages</p>
              </div>
            </div>
          </section>
        )}

        {activeMenu === "products" && (
          <section>
            <h2 className="text-2xl font-bold mb-6 border-b border-yellow-700 pb-2">
              Products
            </h2>
            {products.length === 0 ? (
              <p className="text-gray-600">No products found.</p>
            ) : (
              <ul className="space-y-6">
                {products.map((product) => (
                  <li
                    key={product.id}
                    className="bg-white rounded-lg shadow p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center"
                  >
                    <div>
                      <strong className="text-lg text-yellow-900">{product.name}</strong>{" "}
                      - <span className="text-gray-700 font-semibold">${product.price.toFixed(2)}</span>
                      <p className="mt-1 text-gray-600">{product.description}</p>
                    </div>
                    <button
                      className="mt-4 sm:mt-0 px-4 py-2 bg-yellow-900 text-white rounded-md hover:bg-yellow-800 transition"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {activeMenu === "users" && (
          <section>
            <h2 className="text-2xl font-bold mb-6 border-b border-yellow-700 pb-2">Users</h2>
            {users.length === 0 ? (
              <p className="text-gray-600">No users found.</p>
            ) : (
              <ul className="divide-y divide-gray-200 bg-white rounded shadow overflow-hidden">
                {users.map((user) => (
                  <li
                    key={user.id}
                    className="px-6 py-4 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold text-yellow-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        user.role === "admin"
                          ? "bg-green-200 text-green-800"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {activeMenu === "messages" && (
          <section>
            <h2 className="text-2xl font-bold mb-6 border-b border-yellow-700 pb-2">
              Messages
            </h2>
            {messages.length === 0 ? (
              <p className="text-gray-600">No messages found.</p>
            ) : (
              <ul className="space-y-4">
                {messages.map((msg) => (
                  <li
                    key={msg.id}
                    className="bg-white p-5 rounded-lg shadow border border-yellow-300"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-semibold text-yellow-900">{msg.name}</p>
                      <span className="text-sm text-gray-500">
                        {new Date(msg.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{msg.message}</p>
                    <p className="mt-2 text-sm italic text-gray-500">{msg.email}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {activeMenu === "cart" && (
          <section>
            <h2 className="text-2xl font-bold mb-6 border-b border-yellow-700 pb-2">
              Cart Overview
            </h2>
            {cartItems.length === 0 ? (
              <p className="text-gray-600">Your cart is empty.</p>
            ) : (
              <ul className="space-y-3 bg-white rounded shadow p-5">
                {cartItems.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center border-b border-gray-200 pb-2 last:border-b-0"
                  >
                    <span className="text-yellow-900 font-semibold">{item.name}</span>
                    <span>${item.price.toFixed(2)}</span>
                    <button
                      className="text-red-600 hover:text-red-800 ml-4"
                      onClick={() => removeFromCart(idx)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

AdminDashboard.noLayout = true;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Kontroll sesioni dhe roli i përdoruesit
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session || !session.user || session.user.role !== "admin") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // Merr të dhënat nga DB
  const [usersRaw, productsRaw, messagesRaw, productCount] = await Promise.all([
    getAllUsers(),
    getAllProducts(),
    getAllMessages(),
    getTotalProducts(),
  ]);

  // Procesimi i përdoruesve
  const users = Array.isArray(usersRaw)
    ? usersRaw.map((user: any) => ({
        id: user.id?.toString() ?? "",
        name: user.name ?? "",
        email: user.email ?? "",
        role: user.role ?? "user",
      }))
    : [];

  // Procesimi i produkteve
  const products = Array.isArray(productsRaw)
    ? productsRaw
        .filter((prod: any) => prod && prod.id && prod.title) // në kodin tënd produktet kanë 'title' jo 'name'
        .map((prod: any) => ({
          id: prod.id.toString(),
          title: prod.title ?? "",
          body: prod.body ?? "",
          image: prod.image ?? "",
          price: Number(prod.price) || 0,
        }))
    : [];

  // Procesimi i mesazheve
  const messages = Array.isArray(messagesRaw)
    ? messagesRaw.map((msg: any) => ({
        id: msg.id?.toString() ?? "",
        name: msg.name ?? "",
        email: msg.email ?? "",
        message: msg.message ?? "",
        createdAt:
          msg.createdAt instanceof Date
            ? msg.createdAt.toISOString()
            : msg.createdAt ?? "",
      }))
    : [];

  return {
    props: {
      users,
      productCount: productCount ?? products.length,
      messages,
      products,
    },
  };
};