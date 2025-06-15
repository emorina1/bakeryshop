import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Event = {
  _id: string;  // Në MongoDB është _id, jo id
  title: string;
  description: string;
  date: string;
};

export default function UpdateEventPage() {
  const router = useRouter();
  const { id } = router.query;

  const [event, setEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    if (!id) return; // presim që id të jetë i disponueshëm

    // fetch event nga API
    fetch(`/api/events/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch event");
        return res.json();
      })
      .then((data) => {
        setEvent(data);
        setFormData({
          title: data.title,
          description: data.description,
          // nëse data.date ekziston dhe është string, ndaj pjesën e datës
          date: data.date ? data.date.split("T")[0] : "",
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load event data");
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) {
      alert("Event ID is missing");
      return;
    }

    const res = await fetch(`/api/events/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Event updated successfully!");
      router.push("/admin/dashboard"); // redirect
    } else {
      alert("Failed to update event.");
    }
  };

  if (!event) return <p className="p-10">Loading event...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold text-yellow-900 mb-6">Update Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-yellow-900 text-white px-5 py-2 rounded hover:bg-yellow-800 transition"
        >
          Update Event
        </button>
      </form>
    </div>
  );
}
