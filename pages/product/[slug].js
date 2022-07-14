import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useQuery } from "urql";
import { useRouter } from "next/router";
import { useStateContext } from "../../lib/context";
//icons and motion
import { FaPlus, FaMinus } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";
import ProductMedia from "../../components/ProductMedia";
import ProductMediaModal from "../../components/ProductMediaModal";
import toast from "react-hot-toast";
import { useEffect } from "react";
import getStripe from "../../lib/getStripe";
export default function ProductDetails() {
  const { qty, qtyPlus, qtyMinus, onAdd, productMedia, setQty } =
    useStateContext();
  useEffect(() => {
    setQty(1);
  }, []);
  const { query } = useRouter();
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.slug },
  });
  const { data, fetching, error } = results;

  if (fetching)
    return (
      <AnimatePresence>
        <motion.div className="center">
          <ClipLoader />
        </motion.div>
      </AnimatePresence>
    );
  if (error) return <p>oh shite {error.message}</p>;
  const prod = data.products.data[0].attributes;
  const { title, price, image, description, slug, media } =
    data.products.data[0].attributes;
  const { large, medium, small, thumbnail } = image.data.attributes.formats;
  const prodMedia = media.data;

  //motion variants
  const fadeIn = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  };
  //toast
  const addedProduct = (e) => {
    toast(`${title} added to your cart!`, {
      icon: "🤙",
    });
  };
  const handleCheckout = async () => {
    const stripe = await getStripe();
    const res = await fetch("/api/stripe", {
      method: "POST",
      headers: { "Content-Type": "application//json" },
      body: JSON.stringify([
        {
          ...prod,
          quantity: qty,
        },
      ]),
    });
    const data = await res.json();
    await stripe.redirectToCheckout({ sessionId: data.id });
  };
  return (
    <motion.div className="product_wrapper">
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="product"
      >
        <img
          className="rounded-md transition-all delay-300 duration-300 w-full xs:w-[400px] sm:h-[400px]  xl:w-[500px] xl:h-[500px] object-cover"
          src={medium ? medium.url : small.url}
          alt={title}
        />
        <div className="flex flex-col w-full sm:w-[400px] xl:w-[25rem]">
          <h1 className="text-4xl text-[#2f2f2f] mb-2">{title}</h1>
          <p className="text-2xl font-bold text-[#ff895b] mb-5">
            ₱{" "}
            {price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <p className="text-[#ababab] mb-14">{description}</p>
          <div className="flex items-center mb-10 justify-between">
            <p className="text-lg font-semibold mr-28">Quantity</p>
            <div className="flex items-center xl:gap-10 gap-5 ">
              <FaMinus
                onClick={qtyMinus}
                className={`transition-colors duration-500 translate-y-[10%] text-sm
                  ${
                    qty === 1
                      ? "text-gray-200"
                      : "text-[#232323] hover:text-[#4f4f4f] cursor-pointer"
                  }
                  `}
              />
              <p className="text sm xl:text-2xl w-[3rem] text-center">{qty}</p>
              <button onClick={qtyPlus}>
                <FaPlus className="plus__quantity" />
              </button>
            </div>
          </div>
          <div className="flex w-full justify-between gap-5">
            <button
              className="add-to-cart"
              onClick={() => {
                onAdd(data.products.data[0].attributes, qty);
                addedProduct(title);
              }}
            >
              Add to cart
            </button>
            <button className="buy_now" onClick={handleCheckout}>
              Buy now
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {productMedia.isOpen && <ProductMediaModal />}
      </AnimatePresence>

      {prodMedia.length > 0 && (
        <div className="flex flex-col w-[60%] justify-center mx-auto">
          <h2 className="text-4xl font-semibold mb-5">Product Images</h2>
          <div className="flex justify-center w-full py-5 gap-3 overflow-x-hidden">
            {prodMedia.map((e) => {
              return (
                <ProductMedia
                  hash={e.attributes.formats.small.hash}
                  key={e.attributes.formats.small.hash}
                  url={e.attributes.formats.small.url}
                />
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
}
