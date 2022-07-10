import Head from "next/head";
import { useQuery } from "urql";
import Product from "../components/Product";
import { PRODUCT_QUERY } from "../lib/query";
import { ClipLoader } from "react-spinners";
import { AnimatePresence, motion } from "framer-motion";
import Nav from "../components/Nav";
import { useStateContext } from "../lib/context";

export default function Home() {
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
  const { toggleProfileDiv, openProfileDiv } = useStateContext();
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
        className="min0h-screen py-[5rem]"
      >
        <div className="product__grid">
          {products.map((e) => (
            <Product key={e.attributes.slug} product={e} />
          ))}
        </div>
      </motion.main>
    </div>
  );
}
