import { useStateContext } from "../lib/context";
import { GrClose } from "react-icons/gr";
import { AnimatePresence, motion } from "framer-motion";
import CartItem from "./CartItem";

import { FaArrowRight } from "react-icons/fa";
import getStripe from "../lib/getStripe";
function Cart() {
  const { cartItems, setShowCart, subtotal } = useStateContext();

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
      className="backdrop"
    >
      <motion.div
        initial={{ x: 600 }}
        animate={{ x: 0 }}
        exit={{ x: 600 }}
        transition={{ duration: 0.2 }}
        layout
        className="cart__wrapper"
      >
        <div
          className="lg:hidden px-10 cursor-pointer pt-5 text-xl flex justify-end"
          onClick={() => setShowCart((prev) => !prev)}
        >
          <GrClose />
        </div>
        <div className="h-screen">
          {cartItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="no__item"
            >
              <h1>No items in cart.</h1>
            </motion.div>
          )}
          <div className="cart-products__wrapper">
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
                delay: 0.2,
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
              className="cart__summary"
            >
              <p className="cart__subtotal">
                <span className="cart__subtotal">Subtotal</span>₱{" "}
                {subtotal.toLocaleString()}
              </p>
              <button
                className="cart-summary__wrapper"
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
