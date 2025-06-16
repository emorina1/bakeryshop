import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Event = {
  _id: string;
  title: string;
  description: string;
  imageUrls: string[];
};

export default function UpdateEventPage() {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrls: [] as string[],
  });

  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || Array.isArray(id)) return;

    setLoading(true);
    setFetchError(null);

    fetch(`/api/events/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch event");
        return res.json();
      })
      .then((data) => {
        setFormData({
          title: data.title ?? "",
          description: data.description ?? "",
          imageUrls: Array.isArray(data.imageUrls) ? data.imageUrls : [],
        });
      })
      .catch((err) => {
        console.error(err);
        setFetchError("Failed to fetch event data");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRemoveImage = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((img) => img !== url),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id || Array.isArray(id)) {
      alert("Invalid event ID");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Event updated successfully!");
        router.push("/events");
      } else {
        const errorData = await res.json();
        alert("Failed to update event: " + (errorData.message || res.statusText));
      }
    } catch (error) {
      console.error(error);
      alert("Error updating event.");
    } finally {
      setLoading(false);
    }
  };

  if (!id) {
    return <p className="text-center text-gray-600 mt-20 text-lg">Loading event ID...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-16 p-12 bg-white rounded-2xl shadow-xl border border-yellow-300">
      <h1 className="text-4xl font-extrabold text-yellow-900 mb-12 text-center tracking-wide">
        Update Event
      </h1>

      {loading && <p className="text-center text-gray-700 text-lg">Loading...</p>}
      {fetchError && (
        <p className="text-center text-red-600 mb-8 font-semibold text-lg">{fetchError}</p>
      )}

      {!loading && !fetchError && (
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label
              htmlFor="title"
              className="block mb-3 text-lg font-semibold text-gray-800"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:border-yellow-500 transition text-lg"
              required
              placeholder="Enter event title"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block mb-3 text-lg font-semibold text-gray-800"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl shadow-sm resize-y min-h-[150px] focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:border-yellow-500 transition text-lg"
              required
              placeholder="Enter event description"
            />
          </div>

          {formData.imageUrls.length > 0 && (
            <div>
              <label className="block mb-5 text-lg font-semibold text-gray-800">
                Images
              </label>
              <div className="flex flex-wrap gap-6 justify-center">
                {formData.imageUrls.map((url) => (
                  <div
                    key={url}
                    className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-lg border border-yellow-300"
                  >
                    <img
                      src={url}
                      alt="Event image"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(url)}
                      className="absolute top-2 right-2 bg-red-700 hover:bg-red-800 text-white rounded-full w-8 h-8 flex items-center justify-center font-extrabold shadow-md transition"
                      aria-label="Remove image"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-900 text-white py-4 rounded-2xl font-bold text-xl hover:bg-yellow-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Update Event"}
          </button>
        </form>
      )}
    </div>
  );
}
