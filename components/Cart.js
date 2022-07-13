import { useStateContext } from "../lib/context";
import { GrClose } from "react-icons/gr";
import { AnimatePresence, motion } from "framer-motion";
import CartItem from "./CartItem";
import { FaArrowRight } from "react-icons/fa";
import getStripe from "../lib/getStripe";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";

function Cart() {
  const { cartItems, setShowCart, subtotal } = useStateContext();
  const route = useRouter();
  const { user } = useUser();
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
      animate={{
        opacity: 1,
        transition: {
          duration: 0.2,
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.1,
        },
      }}
      onClick={(e) => toggleCart(e)}
      className="backdrop"
    >
      <motion.div
        initial={{ x: 600 }}
        animate={{ x: 0 }}
        exit={{ x: 600, transition: { duration: 0.1 } }}
        transition={{
          duration: 0.2,
          type: "spring",
          damping: 20,
          stiffness: 140,
        }}
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
          <motion.div layout className="cart-products__wrapper">
            <AnimatePresence>
              {cartItems.map((e) => {
                return (
                  <CartItem
                    slug={e.slug}
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
          </motion.div>
          <AnimatePresence>
            {cartItems.length > 0 && (
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{
                  delay: 0.35,
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
                exit={{ y: 100 }}
                className="cart__summary"
              >
                <p className="cart__subtotal">
                  <span className="cart__subtotal">Subtotal</span>₱{" "}
                  {subtotal.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
                </p>
                {!user && (
                  <div className=" flex items-center gap-5">
                    <p
                      className="text-white cursor-pointer hover:underline underline-offset-2"
                      onClick={() => route.push("/api/auth/login")}
                    >
                      Login
                    </p>
                    <div className="w-[1px] h-7 bg-white"></div>
                    <button
                      className="cart-summary__wrapper"
                      onClick={handleCheckout}
                    >
                      <p>Checkout as Guest</p>
                      <FaArrowRight />
                    </button>
                  </div>
                )}
                {user && (
                  <button
                    className="cart-summary__wrapper"
                    onClick={handleCheckout}
                  >
                    <p>Checkout</p>
                    <FaArrowRight />
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Cart;
