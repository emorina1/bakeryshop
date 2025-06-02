"use client";

import Image from "next/image";
import User1 from "@/assets/bread1.png";
import User2 from "@/assets/croissant.png";

export default function TestimonialsSlider() {
  return (
    <div className="text-center py-16">
      <h2 className="text-5xl font-extrabold text-pink-600 mb-12">What Our Customers Say</h2>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <Image src={User1} alt="User 1" width={80} height={80} className="mx-auto rounded-full mb-4" />
          <p className="text-gray-700 text-lg italic">“The best cake I’ve ever had! Fresh and delicious.”</p>
          <p className="mt-2 text-pink-600 font-semibold">— Elsa</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <Image src={User2} alt="User 2" width={80} height={80} className="mx-auto rounded-full mb-4" />
          <p className="text-gray-700 text-lg italic">“Croissants are heavenly. I keep coming back!”</p>
          <p className="mt-2 text-pink-600 font-semibold">— Ardit</p>
        </div>
      </div>
    </div>
  );
}
