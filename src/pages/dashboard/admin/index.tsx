import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getAllUsers, getTotalRecipes } from "@/api/services/Admin";
import { getTotalProducts } from "@/api/services/Product";
import { getAllMessages } from "@/api/services/Message";
import Link from "next/link";

type User = {
  id: number; // për MySQL id është numër
  name: string;
  email: string;
  role: "admin" | "user";
};

type Message = {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

type AdminDashboardProps = {
  users: User[];
  recipeCount: number;
  productCount: number;
  messages: Message[];
};

export default function AdminDashboard({
  users = [],
  recipeCount = 0,
  productCount = 0,
  messages = [],
}: AdminDashboardProps) {
  return (
    <div className="p-10">
      <h1 className="pt-24 p-10 text-3xl font-bold mb-6 text-pink-600">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold text-pink-600">Total Users</h2>
          <p className="text-2xl text-pink-600">{users.length}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold text-pink-600">Total Recipes</h2>
          <p className="text-2xl text-pink-600">{recipeCount}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold text-pink-600">Total Products</h2>
          <p className="text-2xl text-pink-600">{productCount}</p>
        </div>

        <div className="bg-white p-6 rounded shadow flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold text-pink-600 mb-2">🛒 Cart Overview</h2>
            <p className="text-pink-500 text-sm">View current cart details.</p>
          </div>
          <Link
            href="/dashboard/admin/cart"
            className="mt-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold px-4 py-2 rounded-lg text-center transition"
          >
            Go to Cart
          </Link>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4 text-pink-600">Users</h2>
        <ul className="space-y-2">
          {users.map((user) => (
            <li key={user.id} className="bg-gray-100 p-3 rounded shadow-sm text-pink-600">
              <span className="font-medium">{user.name}</span> – {user.email} ({user.role})
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4 text-pink-600">Contact Messages</h2>
        <ul className="space-y-4">
          {messages.map((msg) => (
            <li key={msg.id} className="bg-white p-4 border-l-4 border-pink-500 shadow-sm rounded">
              <p className="text-pink-600 font-semibold">{msg.name} ({msg.email})</p>
              <p className="text-sm text-gray-700 mt-1">{msg.message}</p>
              <p className="text-xs text-gray-400 mt-1">{new Date(msg.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session || session.user.role !== "admin") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const users = await getAllUsers();
  const recipeCount = await getTotalRecipes();
  const productCount = await getTotalProducts();
  const messages = await getAllMessages();

  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
      recipeCount,
      productCount,
      messages: JSON.parse(JSON.stringify(messages)),
    },
  };
};
