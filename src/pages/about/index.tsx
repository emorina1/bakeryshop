"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import bakeryImg from "@/assets/ourstory.jpg";
import teamImg from "@/assets/beautiful-girls-buys-buns-bakery.jpg";
import worker1 from "@/assets/elsu.jpg";
import worker2 from "@/assets/smiling-male-baker-holding-loaf-showing-ok-hand-sign-gesture.jpg";
import worker3 from "@/assets/medium-shot-smiley-woman-holding-tray.jpg";
import worker4 from "@/assets/front-view-smiley-woman-kitchen.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const workers = [
  { name: "Elsa Morina", role: "Owner Baker", image: worker1 },
  { name: "Doni Krasniqi", role: "Pastry Chef", image: worker2 },
  { name: "Lira Beqiri", role: "Dough Specialist", image: worker3 },
  { name: "Arta Dushi", role: "Cake Designer", image: worker4 },
];

export default function MeetOurBakers() {
  return (
    <motion.section
      className="py-20 px-6 bg-[#fffaf5]"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <div className="space-y-32">

<motion.div
  className="w-full bg-[#f7eee7] py-20"
  variants={fadeInUp}
>
<div className="w-full text-center py-20">
  <h1 className="text-5xl md:text-7xl font-italic leading-tight text-[#4a2e21] drop-shadow-[3px_3px_4px_#5c4033]">
    About Us
  </h1>
  <p className="text-lg text-[#6d4e3a] leading-relaxed drop-shadow-sm mt-4">
    Welcome to our world of warmth and freshly baked dreams. Every bite tells a story — 
    and this is where ours begins. From a simple love of baking to a bustling bakery filled with smiles,
    get to know who we are and what we stand for.  
    <br/>
    Every day, we rise early to knead, bake, and serve with love. From our ovens to your table, we bring more than just bread — we bring a feeling of home.  
    <br/>
    Quality ingredients, traditional recipes, and a touch of innovation are at the heart of everything we do. We’re more than a bakery — we’re a part of your everyday moments.
  </p>
</div>

</motion.div>




        {/* OUR STORY */}
        <motion.div
          className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
          variants={fadeInUp}
        >
          <Image
            src={bakeryImg}
            alt="Inside our bakery"
            className="rounded-3xl shadow-lg w-full h-auto"
          />
          <div>
            <h2 className="text-4xl font-bold mb-5 text-[#4a2e21]">Our Story</h2>
            <p className="text-lg text-[#6d4e3a] leading-relaxed">
              At the heart of every loaf, there's a story — a story of early
              mornings, flour-dusted aprons, and a passion that rises with the
              dough. Since 2010, our bakery has been more than just a place for
              pastries; it's been a home for tradition, community, and flavor.
            </p>
          </div>
        </motion.div>

        {/* MEET THE TEAM */}
        <motion.div
          className="py-16 bg-[#f7eee7]"
          variants={fadeInUp}
        >
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6">
            <div>
              <h2 className="text-4xl font-bold mb-5 text-[#4a2e21]">
                Meet the Team
              </h2>
              <p className="text-lg text-[#6d4e3a] leading-relaxed">
                Behind every perfect bake is a person with a passion. Our team is
                a blend of experienced hands and warm hearts — from the ones who
                knead the dough to those who welcome you with a smile.
              </p>
            </div>
            <Image
              src={teamImg}
              alt="Our Team"
              className="rounded-3xl shadow-lg w-full h-auto"
            />
          </div>
        </motion.div>

        {/* MEET OUR BAKERS */}
        <motion.div
          className="max-w-6xl mx-auto text-center space-y-6"
          variants={fadeInUp}
        >
          <h2 className="text-4xl font-bold text-[#4a2e21]">Meet Our Bakers</h2>
          <p className="text-[#6d4e3a] text-lg">
            Our cheerful and dedicated team makes every bake a special treat.
            Here’s who’s behind the magic!
          </p>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto mt-10 px-4">
          {workers.map(({ name, role, image }) => (
            <motion.div
              key={name}
              className="bg-[#fdf7f2] rounded-2xl p-5 shadow-md hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              variants={fadeInUp}
            >
              <Image
                src={image}
                alt={name}
                width={300}
                height={300}
                className="rounded-xl w-full h-64 object-cover mb-4"
              />
              <div className="text-center">
                <h3 className="text-xl font-semibold text-[#4a2e21]">{name}</h3>
                <p className="text-[#7a5e4c]">{role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* BUTTON */}
        <div className="text-center mt-16">
          <a
            href="/staff"
            className="inline-block bg-[#eac49f] hover:bg-[#d29b72] text-[#4a2e21] font-semibold py-3 px-8 rounded-xl transition-all shadow-md hover:shadow-lg"
          >
            Visit Us
          </a>
        </div>
      </div>
    </motion.section>
  );
}
