import { useState } from "react";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import bgImage from "@/assets/bg.png"; // background image që ke përdorur më herët

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        toast.success("Message sent successfully!", {
          className: "bg-green-600 text-white font-semibold rounded-md",
        });
        setName("");
        setEmail("");
        setMessage("");
      } else {
        toast.error("Failed to send message.");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us | Cake Shop</title>
      </Head>

      <div
        className="min-h-screen flex items-center justify-center px-4 py-16 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage.src})` }}
      >
        <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-10 md:flex md:gap-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Form</h1>
            <form onSubmit={handleSubmit}>
              <label className="block mb-2 text-sm font-medium text-gray-700">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your name"
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
              />

              <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
              />

              <label className="block mb-2 text-sm font-medium text-gray-700">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Type your message"
                rows={4}
                className="w-full mb-6 px-4 py-2 border border-gray-300 rounded"
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-md text-white font-semibold transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Optional Image section */}
          <div className="flex-1 hidden md:block relative">
            <Image
              src={bgImage}
              alt="Bakery Contact"
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </>
  );
}
