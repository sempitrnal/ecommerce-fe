import Head from "next/head";
import { useQuery } from "urql";
import Product from "../components/Product";
import { PRODUCT_QUERY } from "../lib/query";
import { ClipLoader } from "react-spinners";
import { AnimatePresence, motion } from "framer-motion";
import { useStateContext } from "../lib/context";
import toast from "react-hot-toast";

export default function Home() {
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
    <div>
      <Head>
        <title>hello world</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.main
        onClick={openProfileDiv ? (e) => toggle(e) : null}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen py-[5rem]"
      >
        <div
          className={`${
            products.length < 5 ? "product__grid1" : "product__grid"
          }`}
        >
          {products.map((e) => (
            <div className="flex flex-col gap-5">
              <Product key={e.attributes.slug} product={e} />
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="lg:hidden text-xs flex justify-center bg-[#3a3a3a] py-1 px-3 rounded-md text-[#e6e6e6] w-24 h-5 items-center mx-auto"
                onClick={() => {
                  onAdd(e.attributes, 1);
                  toast(`${e.attributes.title} added to your cart!`, {
                    icon: "⚡️",
                  });
                }}
              >
                Add to cart
              </motion.button>
            </div>
          ))}
        </div>
      </motion.main>
    </div>
  );
}
