import { useStateContext } from "../lib/context";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import CartItem from "./CartItem";

import { FaArrowRight } from "react-icons/fa";
import getStripe from "../lib/getStripe";
function Cart() {
  const { cartItems, setShowCart, getTotalPrice } = useStateContext();
  const toggleCart = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setShowCart(false);
      document.body.style.overflow = "auto";
    }
  };
  const handleCheckout = async () => {
    const stripe = await getStripe();
    const res = await fetch("/api/stripe", {
      method: "POST",
      headers: { "Content-Type": "application//json" },
      body: JSON.stringify(cartItems),
    });
    const data = await res.json();
    await stripe.redirectToCheckout({ sessionId: data.id });
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(e) => toggleCart(e)}
      className=" fixed right-0 left-0 h-screen top-0  w-full overflow-y-hidden z-30 bg-[#00000081] flex justify-end backdrop"
    >
      <motion.div
        initial={{ x: 600 }}
        animate={{ x: 0 }}
        exit={{ x: 600 }}
        transition={{ duration: 0.2 }}
        layout
        className="w-[40%] bg-[#f1f1f1] overflow-y-scroll  min-h-screen relative"
      >
        <div className="h-screen">
          {cartItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute left-0 flex justify-center w-full top-[47%] first-letter:items-center"
            >
              <h1>No items in cart.</h1>
            </motion.div>
          )}
          <div className=" p-[2rem_3rem] min-h-[87.5vh]">
            <AnimatePresence>
              {cartItems.map((e) => {
                return (
                  <CartItem
                    key={e.slug}
                    image={e.image.data.attributes.formats.thumbnail.url}
                    title={e.title}
                    price={e.price}
                    quantity={e.quantity}
                    product={e}
                  />
                );
              })}
            </AnimatePresence>
          </div>
          {cartItems.length > 0 && (
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{
                delay: 0.3,
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
              className=" text-[#ffffff] items-center justify-between flex flex-col lg:flex-row sticky bottom-0  bg-[#333] px-5 py-7 rounded-t-xl"
            >
              <p>
                <span className="font-semibold mr-3 text-sm text-[#fff]">
                  Subtotal
                </span>
                {getTotalPrice()} €
              </p>
              <button
                className=" flex items-center gap-3 justify-center text-[#333333d6] bg-[#fff] py-2 px-4  rounded-lg hover:bg-[#ffffffe6] transition-all duration-300 hover:translate-x-[-2px]"
                onClick={handleCheckout}
              >
                <p>Checkout</p>
                <FaArrowRight />
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Cart;
