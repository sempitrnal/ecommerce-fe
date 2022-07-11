import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function getServerSideProps(params) {
  const order = await stripe.checkout.sessions.retrieve(
    params.query.session_id,
    {
      expand: ["line_items"],
    }
  );
  return { props: { order } };
}
const success = ({ order }) => {
  console.log(order);
  const amount = order.amount_total / 100;
  const { customer_details, line_items } = order;
  const { address, name, email } = customer_details;
  const scaleUp = {
    hidden: {
      opacity: 0,
      scale: 0.5,
    },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.15,
      },
    },
  };
  useEffect(() => {
    localStorage.setItem("cart", []);
  }, []);
  return (
    <motion.div
      variants={scaleUp}
      initial="hidden"
      animate="show"
      className="success__page"
    >
      <div className="success__wrapper">
        <h1 className="success__message">
          ✅ Success! Thank you for your order 😁
        </h1>
        <h2 className="success__confirmationMessage">
          A confirmation e-mail has been sent to{" "}
          <span className="success__email">{email}</span>{" "}
        </h2>

        <div className="success__customerdeets">
          <div className="">
            <h3 className="success__title">Address</h3>
            <p className="success__text">
              {address.line1}, {address.city}, {address.country}
            </p>
          </div>
          <div className="success__product_wrapper">
            <h3 className="success__title">Products</h3>
            {line_items.data.map((e) => {
              return (
                <motion.div variants={scaleUp} className="success__products">
                  <p className="w-[8rem]">{e.description}</p>
                  <p className="hidden md:block">
                    <span className="mr-5 text-[#9a9a9a] ">Quantity</span>
                    {e.quantity}
                  </p>
                  <p variants={scaleUp} className="w-[8rem] hidden md:block">
                    <span className="flex justify-end">
                      ₱ {parseFloat(e.amount_subtotal / 100).toFixed(2)}
                    </span>
                  </p>
                  <div className="flex flex-col md:hidden items-end">
                    <p className="mb-1">
                      <span className="mr-5 text-[#9a9a9a] ">Quantity</span>
                      {e.quantity}
                    </p>
                    <p className="w-[8rem]">
                      <span className="flex justify-end">
                        ₱ {parseFloat(e.amount_subtotal / 100).toFixed(2)}
                      </span>
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <motion.p variants={scaleUp} className="success__total">
            Total: ₱{parseFloat(amount).toFixed(2)}{" "}
          </motion.p>
        </div>
        <motion.button variants={scaleUp} className="success__continue">
          <Link href={"/"}>Continue shopping</Link>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default success;
