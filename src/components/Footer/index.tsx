import Link from "next/link";
import { motion } from "framer-motion";

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function Footer() {
  return (
    <footer className="bg-[#F5F1EC] text-[#6B4C3B] select-none">
      {/* SVG Curve Divider */}
      <div className="relative overflow-hidden leading-[0] -mt-[1px]">
        <svg
          className="relative block w-full h-[80px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M0,0 V0 Q600,120 1200,0 V0 Z" fill="#EDE6DA" />
        </svg>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        {/* Services */}
        <div>
          <h4 className="text-lg font-bold mb-6 tracking-wide text-[#4B3621]">SERVICES</h4>
          <motion.ul
            className="space-y-3 text-[#6B4C3B]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={listVariants}
          >
            <motion.li variants={itemVariants} className="hover:text-[#A67853] transition cursor-pointer">
              <Link href="/blogs">Products</Link>
            </motion.li>
            <motion.li variants={itemVariants} className="hover:text-[#A67853] transition cursor-pointer">
              <Link href="/about">Our Story</Link>
            </motion.li>
            <motion.li variants={itemVariants} className="hover:text-[#A67853] transition cursor-pointer">
              <Link href="#">Privacy Policy</Link>
            </motion.li>
            <motion.li variants={itemVariants} className="hover:text-[#A67853] transition cursor-pointer">
              <Link href="#">Terms & Conditions</Link>
            </motion.li>
          </motion.ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-lg font-bold mb-6 tracking-wide text-[#4B3621]">SUPPORT</h4>
          <motion.ul
            className="space-y-3 text-[#6B4C3B]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={listVariants}
          >
            <motion.li variants={itemVariants} className="hover:text-[#A67853] transition cursor-pointer">
              <Link href="/contact">Contact</Link>
            </motion.li>
            <motion.li variants={itemVariants} className="hover:text-[#A67853] transition cursor-pointer">
              <Link href="/about">About</Link>
            </motion.li>
            <motion.li variants={itemVariants} className="hover:text-[#A67853] transition cursor-pointer">
              <Link href="/recipes">Recipes</Link>
            </motion.li>
            <motion.li variants={itemVariants} className="hover:text-[#A67853] transition cursor-pointer">
              <Link href="/login">Log In</Link>
            </motion.li>
          </motion.ul>
        </div>

        {/* Payment Methods */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-lg font-bold mb-6 tracking-wide text-[#4B3621]">PAYMENT METHODS</h4>
          <p className="mt-4 text-sm text-[#6B4C3B] max-w-xs text-center md:text-left">
            We accept all major credit cards and PayPal for your convenience.
          </p>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-[#A67853] bg-[#EDE6DA]">
        <div className="max-w-7xl mx-auto py-6 px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#6B4C3B] text-center md:text-left select-text">
            © {new Date().getFullYear()} Cake Shop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
