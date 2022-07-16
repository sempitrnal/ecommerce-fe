import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";

import { useStateContext } from "../lib/context";
import { AnimatePresence, motion } from "framer-motion";
import User from "./User";
import Cart from "./Cart";
const Nav = () => {
  const {
    showCart,
    setShowCart,
    getTotalQuantity,
    toggleProfileDiv,
    openProfileDiv,
  } = useStateContext();

  const toggle = (e) => {
    if (!e.target.classList.contains("profileDiv")) {
      toggleProfileDiv();
    }
  };
  return (
    <nav
      className="sticky z-10 top-0 right-0 left-0 flex justify-between items-center lg:px-[5rem] py-[1.5rem] bg-white shadow-lg px-[1.5rem] transition-all duration-200 delay-200"
      onClick={openProfileDiv ? (e) => toggle(e) : null}
    >
      <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
      <Link href={"/"}>
        <p className="font-semibold cursor-pointer hover:text-gray-700 transition-colors duration-1000">
          Magnus
        </p>
      </Link>

      <div className="flex items-center gap-5">
        <User />
        <button
          className="relative p-2 hover:text-red-700;"
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
              className="cart__quantity"
            >
              <p className="text-[.44rem] text-white">{getTotalQuantity()}</p>
            </motion.div>
          )}
          <AiOutlineShoppingCart className="text-2xl cursor-pointer hover:text-[#a4a8cc] transition-colors duration-200" />
        </button>
      </div>
    </nav>
  );
};

export default Nav;
