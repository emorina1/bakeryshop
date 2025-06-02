import { useState } from "react";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import bgImage from "@/assets/bg.png";
import bakeryImage from "@/assets/croissant.png"; // sigurohu që fotoja ekziston në këtë path

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
        toast.success("Message sent successfully!");
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
        <title>Contact Us | Bakery Shop</title>
      </Head>

        <div
      className="min-h-screen flex items-center justify-center px-4 py-16 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage.src})` }}
    >


        {/* sfond kaftë i lehtë (tan color) */}
        <div className="max-w-6xl w-full bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden">
          {/* Form Section */}
          <div className="md:w-1/2 p-10">
            <h1 className="text-3xl font-extrabold text-[#7B4B1B] mb-8 text-center">Get in Touch</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-semibold text-[#7B4B1B]">Your Name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-[#C49E67] rounded-md focus:outline-none focus:ring-2 focus:ring-[#A67B5B] text-[#5C3A00]"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 font-semibold text-[#7B4B1B]">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-[#C49E67] rounded-md focus:outline-none focus:ring-2 focus:ring-[#A67B5B] text-[#5C3A00]"
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 font-semibold text-[#7B4B1B]">Message</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="Write your message here..."
                  rows={5}
                  className="w-full px-4 py-3 border border-[#C49E67] rounded-md focus:outline-none focus:ring-2 focus:ring-[#A67B5B] text-[#5C3A00]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-bold text-white transition ${
                  loading ? "bg-[#CBB994] cursor-not-allowed" : "bg-[#7B4B1B] hover:bg-[#6B3E13]"
                }`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 relative hidden md:block">
            <Image
              src={bakeryImage}
              alt="Bakery Shop"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme="colored"
      />
    </>
  );
}
