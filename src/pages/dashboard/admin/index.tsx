import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getAllUsers } from "@/api/services/Admin";
import { getTotalProducts, getAllProducts } from "@/api/services/Product";
import { getAllMessages } from "@/api/services/Message";
import { getAllEvents } from "@/api/services/Event";
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
  title: string;
  body: string;
  image: string;
  price: number;
};

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

type Event = {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
};

type AdminDashboardProps = {
  users: User[];
  productCount: number;
  messages: Message[];
  products: Product[];
  events: Event[];
};

export default function AdminDashboard({
  users = [],
  productCount = 0,
  messages = [],
  products = [],
  events = [],
}: AdminDashboardProps) {
  const [activeMenu, setActiveMenu] = useState<
    "dashboard" | "products" | "users" | "messages" | "cart" | "events"
  >("dashboard");
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const removeFromCart = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/sign-in" });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-yellow-900 text-white flex flex-col p-6 shadow-lg justify-between">
        <div>
          {activeMenu !== "cart" && (
            <h1 className="text-3xl font-extrabold mb-10 tracking-wide">Admin Dashboard</h1>
          )}

          <nav className="flex flex-col space-y-4 text-lg">
            {["dashboard", "products", "users", "messages", "cart", "events"].map((menu) => (
              <button
                key={menu}
                className={`text-left p-3 rounded-md transition-colors duration-200 ${
                  activeMenu === menu
                    ? "bg-yellow-700 font-semibold shadow-inner"
                    : "hover:bg-yellow-800"
                }`}
                onClick={() => setActiveMenu(menu as any)}
              >
                {menu === "dashboard" && "Dashboard Overview"}
                {menu === "products" && "Products"}
                {menu === "users" && "Users"}
                {menu === "messages" && "Messages"}
                {menu === "cart" && `Cart Overview (${cartItems.length})`}
                {menu === "events" && "Events"}
              </button>
            ))}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 mt-6 p-3 rounded-md bg-red-600 hover:bg-red-700 transition text-white font-semibold"
        >
          <FiLogOut size={20} />
          Logout
        </button>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        {activeMenu === "dashboard" && (
          <section>
            <h2 className="text-2xl font-bold mb-6 border-b border-yellow-700 pb-2">Dashboard Overview</h2>
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

        {/* ... Existing sections for products, users, messages, cart ... */}

        {activeMenu === "events" && (
          <section>
            <h2 className="text-2xl font-bold mb-6 border-b border-yellow-700 pb-2">Events</h2>

            <div className="mb-6 text-right">
              <button
                onClick={() => (window.location.href = "/create/events")}
                className="bg-green-700 text-white px-5 py-2 rounded-md hover:bg-green-800 transition"
              >
                + Create Event
              </button>
            </div>

            {events.length === 0 ? (
              <p className="text-gray-600">No events found.</p>
            ) : (
              <ul className="space-y-6">
                {events.map((event) => (
                  <li
                    key={event.id}
                    className="bg-white rounded-lg shadow p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-yellow-900">{event.title}</h3>
                      <p className="text-gray-600">{event.description}</p>
                      <p className="text-sm text-gray-500">{new Date(event.date).toLocaleString()}</p>
                    </div>

                    <div className="flex flex-col gap-2 mt-4 sm:mt-0 sm:ml-6">
                      <button
                        onClick={() => (window.location.href = `/update/event/${event.id}`)}
                        className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      >
                        Update
                      </button>
                      <button
                        onClick={async () => {
                          const confirmed = confirm("Are you sure you want to delete this event?");
                          if (!confirmed) return;

                          const res = await fetch(`/api/events/${event.id}`, {
                            method: "DELETE",
                          });

                          if (res.ok) {
                            window.location.reload();
                          } else {
                            alert("Failed to delete the event.");
                          }
                        }}
                        className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
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
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session || !session.user || session.user.role !== "admin") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const [usersRaw, productsRaw, messagesRaw, productCount, eventsRaw] = await Promise.all([
    getAllUsers(),
    getAllProducts(),
    getAllMessages(),
    getTotalProducts(),
    getAllEvents(),
  ]);

  const users = Array.isArray(usersRaw)
    ? usersRaw.map((user: any) => ({
        id: user.id?.toString() ?? "",
        name: user.name ?? "",
        email: user.email ?? "",
        role: user.role ?? "user",
      }))
    : [];

  const products = Array.isArray(productsRaw)
    ? productsRaw.map((prod: any) => ({
        id: prod.id.toString(),
        title: prod.title ?? "",
        body: prod.body ?? "",
        image: prod.image ?? "",
        price: Number(prod.price) || 0,
      }))
    : [];

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

  const events = Array.isArray(eventsRaw)
    ? eventsRaw.map((event: any) => ({
        id: event.id?.toString() ?? "",
        title: event.title ?? "",
        description: event.description ?? "",
        image: event.image ?? "",
        date: event.date ?? "",
      }))
    : [];

  return {
    props: {
      users,
      productCount: productCount ?? products.length,
      messages,
      products,
      events,
    },
  };
};