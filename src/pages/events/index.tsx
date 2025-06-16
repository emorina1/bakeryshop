import useFetch from "@/src/hooks/useFetch";
import { motion } from "framer-motion";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import bakeryBg from "@/assets/delicious-caramel-vanilla-cupcakes-served-confectionery-copyspace-food-sugar-dessert-sweet-tasty-concept.jpg";
import { useSession } from "next-auth/react";

export interface Event {
  _id: string;
  title: string;
  description: string;
  imageUrls: string[];
  createdAt: string;
}

export default function Events() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const isAdmin = session?.user?.role === "admin";

  const { data, loading, error } = useFetch<Event[]>("/api/events");

  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (data) {
      const safeData = data.map((event) => ({
        ...event,
        title: event.title || "",
        description: event.description || "",
        imageUrls: event.imageUrls || [],
      }));
      setEvents(safeData);
    }
  }, [data]);

  async function handleDelete(id: string) {
    const confirmed = confirm("Delete this event?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("Deleted successfully");
        setEvents((prev) => prev.filter((e) => e._id !== id));
      } else {
        alert("Failed to delete");
      }
    } catch {
      alert("Failed to delete");
    }
  }

  if (status === "loading") {
    return (
      <p className="text-[#5C3A21] text-xl font-semibold text-center mt-20">
        Loading session...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5EBDD]">
      <Head>
        <title>Bakery Events | Sweet Moments</title>
      </Head>

      <div
        className="w-full h-64 md:h-96 bg-cover bg-center flex items-center justify-center mb-12"
        style={{ backgroundImage: `url(${bakeryBg.src})` }}
      >
        <h1 className="text-5xl md:text-7xl font-extrabold text-[#5C3A21] bg-yellow-100 bg-opacity-70 px-8 py-4 rounded-xl drop-shadow-lg max-w-[90%] text-center">
          Upcoming Bakery Events
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="flex justify-end mb-10">
          {isAdmin && (
            <Link href="/create/events" legacyBehavior>
              <a className="bg-[#5C3A21] hover:bg-[#7E5B3A] text-[#F5EBDD] font-semibold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 active:scale-95 duration-300">
                + Create Event
              </a>
            </Link>
          )}
        </div>

        {loading && (
          <p className="text-[#5C3A21] text-xl font-semibold text-center">
            Loading events...
          </p>
        )}

        {error && (
          <p className="text-red-600 text-xl font-semibold text-center">
            Failed to load events.
          </p>
        )}

        {!loading && !error && events.length === 0 && (
          <p className="text-[#5C3A21] text-xl font-semibold text-center">
            No events found
          </p>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="flex flex-wrap justify-center gap-10">
            {events.map((event) => (
              <motion.section
                key={event._id}
                className="bg-white p-8 rounded-3xl shadow-xl w-full sm:w-[48%] md:w-[30%] cursor-pointer hover:shadow-2xl transition"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.04, boxShadow: "0 12px 40px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.97 }}
              >
                <h2 className="text-2xl font-extrabold text-[#5C3A21] mb-3 uppercase tracking-wide">
                  {event.title.length > 40
                    ? event.title.slice(0, 40) + "..."
                    : event.title}
                </h2>
                <p className="text-[#7E5B3A] mb-6 leading-relaxed text-sm md:text-base">
                  {event.description.length > 150
                    ? event.description.slice(0, 150) + "..."
                    : event.description}
                </p>

                {event.imageUrls.length > 0 && (
                  <div className="flex justify-center gap-3 mb-6">
                    {event.imageUrls.slice(0, 2).map((url, idx) => (
                      <img
                        key={`${url}-${idx}`}
                        src={url}
                        alt={event.title || "event image"}
                        className="rounded-xl max-h-36 object-cover shadow-lg"
                      />
                    ))}
                  </div>
                )}

                {isAdmin && (
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => router.push(`/update/event/${event._id}`)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Update
                    </button>
                  </div>
                )}
              </motion.section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
