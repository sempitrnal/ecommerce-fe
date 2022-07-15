import React from "react";
import { useQuery } from "urql";
import Product from "../components/Product";
import { PRODUCT_QUERY } from "../lib/query";
import { ClipLoader } from "react-spinners";
import { AnimatePresence, motion } from "framer-motion";
import { useStateContext } from "../lib/context";
const Main = () => {
  const { toggleProfileDiv, openProfileDiv, onAdd } = useStateContext();
  const [results] = useQuery({ query: PRODUCT_QUERY });
  const { data, fetching, error } = results;
  if (fetching)
    return (
      <AnimatePresence>
        <motion.div exit={{ opacity: 0 }} className="center">
          <ClipLoader />
        </motion.div>
      </AnimatePresence>
    );

  if (error) return <p>oh shite {error.message}</p>;
  const products = data.products.data;

  const toggle = (e) => {
    if (!e.target.classList.contains("profileDiv")) {
      toggleProfileDiv();
    }
  };
  return (
    <motion.main
      onClick={openProfileDiv ? (e) => toggle(e) : null}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-[5rem]"
    >
      <div className="product__grid">
        {products.map((e) => (
          <div className="flex flex-col gap-5">
            <Product key={e.attributes.slug} product={e} />
          </div>
        ))}
      </div>
    </motion.main>
  );
};

export default Main;
