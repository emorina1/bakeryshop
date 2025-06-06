import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import cs from "classnames";
// import Logo from "@/assets/logo.png";
import { Menu, X, ShoppingCart } from "lucide-react";

export function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = router.pathname;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const items = [
    { name: "Home", pathName: "/" },
    { name: "About Us", pathName: "/about" },
    { name: "Contact", pathName: "/contact" },
    { name: "Products", pathName: "/products" },
    { name: "Events", pathName: "/events" },
    { name: "Recipes", pathName: "/recipes" },
    { name: "Cart", pathName: "/cart" }, // kjo mundet të mbetet për mobile menu
  ];

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="py-3 fixed z-50 bg-[#fff0f0] border-b border-pink-200 w-full shadow-md transition-all duration-300 font-serif">
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        {/* <Link href="/" onClick={closeMenu}>
          <Image src={Logo} alt="Bakery Logo" width={48} height={48} className="drop-shadow-md" />
        </Link> */}

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 gap-10 items-center justify-center">
          {items
            .filter((item) => item.name !== "Cart") /* heq Cart nga navigation sepse do e kemi me ikonë */
            .map((item) => (
              <Link
                key={item.pathName}
                href={item.pathName}
                className={cs(
                  "text-[#7a3b2e] text-lg hover:text-[#a84634] transition-colors duration-200",
                  {
                    "underline underline-offset-4 decoration-[#e88c7d] font-bold": pathname === item.pathName,
                  }
                )}
              >
                {item.name}
              </Link>
            ))}
        </div>

        {/* Auth Buttons + Cart Icon (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/cart" className="text-[#7a3b2e] hover:text-[#a84634] transition-colors duration-200">
            <ShoppingCart size={24} />
          </Link>

          {status === "authenticated" ? (
            <button
              onClick={() => signOut({ callbackUrl: "/sign-in" })}
              className="bg-[#e88c7d] hover:bg-[#d47363] text-white px-5 py-2 rounded-xl transition-all duration-300 hover:scale-105"
            >
              Log out
            </button>
          ) : (
            <>
              <button
                onClick={() => router.push("/sign-up")}
                className="bg-[#e88c7d] hover:bg-[#d47363] text-white px-5 py-2 rounded-xl transition-all duration-300 hover:scale-105"
              >
                Register
              </button>
              <button
                onClick={() => router.push("/sign-in")}
                className="bg-white border border-[#e88c7d] text-[#d47363] hover:bg-[#fff7f6] px-5 py-2 rounded-xl transition-all duration-300 hover:scale-105"
              >
                Login
              </button>
            </>
          )}
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-[#a84634]">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4 bg-[#fff0f0] border-t border-pink-200">
          {/* Cart Icon me tekst */}
          <Link
            href="/cart"
            onClick={closeMenu}
            className="text-[#7a3b2e] hover:text-[#a84634] transition-colors duration-200 flex items-center gap-2 text-base font-medium"
          >
            <ShoppingCart size={20} /> Cart
          </Link>

          {items
            .filter((item) => item.name !== "Cart")
            .map((item) => (
              <Link
                key={item.pathName}
                href={item.pathName}
                onClick={closeMenu}
                className={cs(
                  "text-[#7a3b2e] text-base font-medium hover:text-[#a84634] transition-colors duration-200",
                  {
                    "underline underline-offset-4 decoration-[#e88c7d] font-bold": pathname === item.pathName,
                  }
                )}
              >
                {item.name}
              </Link>
            ))}

          {status === "authenticated" ? (
            <button
              onClick={() => {
                closeMenu();
                signOut({ callbackUrl: "/sign-in" });
              }}
              className="mt-2 bg-[#e88c7d] hover:bg-[#d47363] text-white px-5 py-2 rounded-xl transition-all"
            >
              Log out
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  router.push("/sign-up");
                  closeMenu();
                }}
                className="mt-2 bg-[#e88c7d] hover:bg-[#d47363] text-white px-5 py-2 rounded-xl transition-all"
              >
                Register
              </button>
              <button
                onClick={() => {
                  router.push("/sign-in");
                  closeMenu();
                }}
                className="bg-white border border-[#e88c7d] text-[#d47363] hover:bg-[#fff7f6] px-5 py-2 rounded-xl transition-all"
              >
                Login
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;
