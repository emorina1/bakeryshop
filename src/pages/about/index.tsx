"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import bakeryImg from "@/assets/bread1.png";
import teamImg from "@/assets/bread1.png"; // mund ta zevendesosh me ndonje foto te ekipit

// Shembull fotosh punetore (vendos fotot reale me path e tyre)
import worker1 from "@/assets/caffe.png";
import worker2 from "@/assets/caffe.png";
import worker3 from "@/assets/caffe.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const workers = [
  { name: "Arber", role: "Pastry Chef", image: worker1 },
  { name: "Elira", role: "Baker", image: worker2 },
  { name: "Bekim", role: "Front Staff", image: worker3 },
];

const AboutUsWithTeamSlider = () => {
  return (
    <div className="space-y-20">
      {/* OUR STORY */}
      <motion.section
        className="py-16 px-4 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        {/* Foto në anën e majtë */}
        <Image
          src={bakeryImg}
          alt="Inside our bakery"
          className="rounded-xl shadow-md w-full h-auto"
        />

        {/* Teksti në anën e djathtë, por i vendosur majtas */}
        <div className="text-left">
          <h2 className="text-3xl font-bold mb-4 text-[#4a2e21]">Our Story</h2>
          <p className="text-[#6d4e3a]">
            Born from a love for fresh bakes and warm smiles, our bakery has
            been serving the community since 2010. Each loaf, cake, and
            croissant is handcrafted with passion, using only the finest
            ingredients.
          </p>
        </div>
        
      </motion.section>
       {/* MEET THE TEAM */}
      <motion.section
        className="py-16 px-4 bg-[#f7eee7]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Teksti në anën e majtë */}
          <div className="text-left">
            <h2 className="text-3xl font-bold mb-4 text-[#4a2e21]">
              Meet the Team
            </h2>
            <p className="text-[#6d4e3a]">
              From our head pastry chef to our friendly front staff, every team
              member shares the same goal: to brighten your day with a little
              sweetness and a lot of heart.
            </p>
          </div>

          {/* Foto në anën e djathtë */}
          <Image
            src={teamImg}
            alt="Our Team"
            className="rounded-xl shadow-md w-full h-auto"
          />
        </div>
      </motion.section>

      {/* MEET THE TEAM */}
      <motion.section
        className="py-16 px-4 bg-[#f7eee7]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-[#4a2e21] text-center">
            Meet the Team
          </h2>

          <Carousel
            showArrows={true}
            infiniteLoop={true}
            showThumbs={false}
            autoPlay={true}
            interval={4000}
            showStatus={false}
            swipeable={true}
            emulateTouch={true}
            className="max-w-3xl mx-auto"
          >
            {workers.map(({ name, role, image }) => (
              <div key={name} className="p-4">
                <Image
                  src={image}
                  alt={name}
                  className="rounded-xl shadow-md mx-auto max-h-64 object-cover"
                />
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-semibold text-[#5e3e2f]">{name}</h3>
                  <p className="text-[#7d5f4a]">{role}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutUsWithTeamSlider;
