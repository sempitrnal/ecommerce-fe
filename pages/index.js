import Head from "next/head";
import { useQuery } from "urql";
import Product from "../components/Product";
import { PRODUCT_QUERY } from "../lib/query";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";
import { useStateContext } from "../lib/context";

export default function Home() {
  const { toggleProfileDiv, openProfileDiv, onAdd } = useStateContext();
  const [results] = useQuery({ query: PRODUCT_QUERY });
  const { data, fetching, error } = results;
  if (fetching)
    return (
      <motion.div exit={{ opacity: 0 }} className="center">
        <ClipLoader />
      </motion.div>
    );

  if (error) return <p>oh shite {error.message}</p>;
  const products = data.products.data;

  const toggle = (e) => {
    if (!e.target.classList.contains("profileDiv")) {
      toggleProfileDiv();
    }
  };
  return (
    <div className="bg-[#f0f0f0]">
      <Head>
        <title>hello world</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.main
        onClick={openProfileDiv ? (e) => toggle(e) : null}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
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
    </div>
  );
}
