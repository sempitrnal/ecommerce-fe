import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useQuery } from "urql";
import { useRouter } from "next/router";
import { useStateContext } from "../../lib/context";
//icons and motion
import { FaPlus, FaMinus } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
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
  const route = useRouter();
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.slug },
  });
  const { data, fetching, error } = results;
  console.log(results);
  if (fetching)
    return (
      <motion.div
        className="h-[90vh] flex justify-center items-center text-5xl "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { delay: 0.5 } }}
      >
        <ClipLoader />
      </motion.div>
    );
  if (error)
    return (
      <motion.div
        className="h-[90vh] flex justify-center items-center text-5xl "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { delay: 0.5 } }}
      >
        <ClipLoader />
      </motion.div>
    );
  const prod = data.products.data[0].attributes;
  const { title, price, image, description, slug, media } =
    data.products.data[0].attributes;
  const { large, medium, small, thumbnail } = image.data.attributes.formats;
  const prodMedia = media.data;

  //motion variants
  const fadeIn = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
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
    <motion.div
      className="product_wrapper  "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { delay: 0.5 } }}
    >
      <div
        className="text-xl lg:text-2xl my-10 flex gap-2 items-center cursor-pointer hover:text-[#888888] transition-all duration-500 w-[90%] lg:w-[80%] mx-auto"
        onClick={() => route.push("/")}
      >
        <BiArrowBack />
        <p className="text-lg lg:text-xl">Back</p>
      </div>
      <motion.div className="product">
        <img
          className="xs:rounded-md transition-all delay-300 duration-300 w-full h-[400px] xs:w-[400px] sm:h-[400px]  xl:w-[500px] xl:h-[500px] object-cover "
          src={medium ? medium.url : small.url}
          alt={title}
        />
        <div className="flex flex-col  xs:w-[400px] xl:w-[25rem] mb-[5rem] w-full p-3 xs:p-0 text-sm transition-all duration-300 delay-300">
          <h1 className="text-2xl lg:text-4xl text-[#2f2f2f] mb-2">{title}</h1>
          <p className="text-lg lg:text-2xl font-bold text-[#ff895b] mb-5">
            ₱{" "}
            {price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <p className="text-[#ababab] text-xm lg:text-sm mb-14">
            {description}
          </p>
          <div className="flex items-center mb-10 justify-between">
            <p className="text-lg font-semibold mr-28">Quantity</p>
            <div className="flex items-center xl:gap-10 xs:gap-5  w-full justify-end">
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
        <div className="flex flex-col w-[80%] justify-center mx-auto">
          <h2 className="text-lg lg:text-2xl font-semibold mb-5">
            Product Images
          </h2>
          <div className="flex flex-wrap justify-center w-full py-5 gap-3 overflow-x-hidden">
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
