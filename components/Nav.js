import Link from "next/link";

import { AiOutlineShoppingCart } from "react-icons/ai";
import Cart from "./Cart";
import { useStateContext } from "../lib/context";
import { AnimatePresence } from "framer-motion";
const Nav = () => {
  const { showCart, setShowCart } = useStateContext();
  return (
    <nav className="sticky z-10 top-0 right-0 left-0 flex justify-between items-center px-[5rem] h-[10vh] bg-white shadow-lg">
      <Link href={"/"}>bo</Link>
      <button
        onClick={() => {
          setShowCart(true);
          document.body.style.overflow = "hidden";
        }}
      >
        <AiOutlineShoppingCart className="text-2xl cursor-pointer hover:text-[#a4a8cc] transition-colors duration-200" />
      </button>
      <p className="lg:hidden">burger</p>
      <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
    </nav>
  );
};

export default Nav;
