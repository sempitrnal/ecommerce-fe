import Link from "next/link";

import { AiOutlineShoppingCart } from "react-icons/ai";
import Cart from "./Cart";
import { useStateContext } from "../lib/context";
import { AnimatePresence, motion } from "framer-motion";
const Nav = () => {
  const { showCart, setShowCart, getTotalQuantity } = useStateContext();
  return (
    <nav className="sticky z-10 top-0 right-0 left-0 flex justify-between items-center px-[5rem] py-[1.5rem] bg-white shadow-lg">
      <Link href={"/"}>bo</Link>
      <button
        className="relative p-2"
        onClick={() => {
          setShowCart(true);
          document.body.style.overflow = "hidden";
        }}
      >
        {getTotalQuantity() > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute w-3 h-3 rounded-[50%] bg-red-500 right-1 top-1 flex justify-center items-center  p-[.4rem]"
          >
            <p className="text-[.44rem] text-white">{getTotalQuantity()}</p>
          </motion.div>
        )}
        <AiOutlineShoppingCart className="text-2xl cursor-pointer hover:text-[#a4a8cc] transition-colors duration-200" />
      </button>
      <p className="lg:hidden">burger</p>
      <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
    </nav>
  );
};

export default Nav;
