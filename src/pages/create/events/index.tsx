// pages/create/events/index.tsx
import { useState } from "react";

export default function CreateEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    const res = await fetch("/api/events", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Event created successfully!");
      setTitle("");
      setDescription("");
      setImage(null);
    } else {
      alert("Failed to create event.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-yellow-50 rounded-2xl shadow-md mt-12">
      <h1 className="text-4xl font-bold text-yellow-700 mb-8 text-center">
        Create New Bakery Event
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <label className="flex flex-col text-yellow-900 font-semibold">
          Event Title <span className="text-red-600">*</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 p-3 rounded-lg border"
            required
          />
        </label>

        <label className="flex flex-col text-yellow-900 font-semibold">
          Description <span className="text-red-600">*</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="mt-2 p-3 rounded-lg border resize-none"
            required
          />
        </label>

        <label className="flex flex-col text-yellow-900 font-semibold">
          Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="mt-2"
          />
        </label>

        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-full"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}
