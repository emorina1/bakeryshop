"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import Footer from "@/components/Footer";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import heroBg from "@/assets/bake.jpg";
import bread1 from "@/assets/bread.png";
import cakes from "@/assets/cake.png";
import croissant from "@/assets/croissant.png";
import pastry from "@/assets/pastry.png";
import cake from "@/assets/cake.png";
import coffee from "@/assets/caffe.png";

export default function Home() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="font-serif text-[18px] leading-relaxed bg-[#fcf5ee] text-[#3b2e25]">
      {/* Hero Section */}
      <section className="relative w-full h-[650px] flex items-center justify-center overflow-hidden">
        <Image
          src={heroBg}
          alt="Bakery Background"
          fill
          className="object-cover brightness-95"
          priority
        />
        <motion.div
          className="absolute z-10 text-white text-center px-8 max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
   <h1
  className="text-5xl md:text-7xl font-extrabold leading-tight drop-shadow-[3px_3px_4px_#5c4033]"
  style={{ marginLeft: '100px' }}
>
  Freshly Baked, Just for You!
</h1>


        </motion.div>
      </section>

      {/* Featured Section */}
      <motion.section
        className="py-20 px-6 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="text-4xl font-bold text-center mb-14 text-[#4a2e21]">
          Featured
        </h2>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            className="relative h-80 w-full overflow-hidden rounded-2xl shadow-lg"
            variants={fadeInUp}
          >
            <Image
              src={bread1}
              alt="Pastries"
              fill
              className="object-cover hover:scale-110 transition-transform duration-300"
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <h3 className="text-3xl font-bold mb-3 text-[#5e3e2f]">
              Delicious Pastries
            </h3>
            <p className="text-lg text-[#7d5f4a]">
              Enjoy our handmade pastries, crafted fresh every morning with love.
            </p>
          </motion.div>

          <motion.div className="order-2 md:order-1" variants={fadeInUp}>
            <h3 className="text-3xl font-bold mb-3 text-[#5e3e2f]">
              Fresh Cakes
            </h3>
            <p className="text-lg text-[#7d5f4a]">
              Treat yourself to our soft, rich cakes made from high-quality ingredients.
            </p>
          </motion.div>
          <motion.div
            className="relative h-80 w-full overflow-hidden rounded-2xl shadow-lg order-1 md:order-2"
            variants={fadeInUp}
          >
            <Image
              src={cakes}
              alt="Cakes"
              fill
              className="object-cover hover:scale-110 transition-transform duration-300"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Why Choose Us Section */}
      <motion.section
        className="bg-[#f4e9df] py-20 px-6"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="text-4xl font-bold text-center mb-14 text-[#4a2e21]">
          Why Choose Us?
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              title: "Artisan Breads",
              image: croissant,
              description:
                "Handcrafted using traditional recipes and natural ingredients.",
            },
            {
              title: "Sweet Pastries",
              image: pastry,
              description: "A delicious variety of pastries made fresh daily.",
            },
            {
              title: "Custom Cakes",
              image: cake,
              description: "Celebrate with personalized cakes for every occasion.",
            },
          ].map(({ title, image, description }) => (
            <motion.div
              key={title}
              className="bg-white p-6 rounded-xl shadow-xl text-center hover:shadow-2xl transition duration-300"
              variants={fadeInUp}
            >
              <div className="relative h-48 w-full mb-5">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-[#5e3e2f]">{title}</h3>
              <p className="text-md text-[#7d5f4a]">{description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Our Creations Gallery */}
      <motion.section
        className="py-20 px-6 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="text-4xl font-bold text-center mb-14 text-[#4a2e21]">
          Our Creations
        </h2>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="rounded-xl"
        >
          {[cakes, croissant, bread1, coffee].map((img, i) => (
            <SwiperSlide key={i}>
              <div className="relative h-72 w-full overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                <Image
                  src={img}
                  alt={`Gallery image ${i}`}
                  fill
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
