import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useQuery } from "urql";
import { useRouter } from "next/router";
import { useStateContext } from "../../lib/context";
//icons and motion
import { FaPlus, FaMinus } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import ProductMedia from "../../components/ProductMedia";
import ProductMediaModal from "../../components/ProductMediaModal";
import toast from "react-hot-toast";
import { useEffect } from "react";
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
    toast.success(`Added ${e} to cart!`, {});
  };

  return (
    <motion.div className="">
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="product__details"
      >
        <img
          className="rounded-md w-[280px] sm:w-[400px] xl:[500px]"
          src={medium ? medium.url : small.url}
          alt={title}
        />
        <div className="flex flex-col w-[280px] sm:w-[400px] xl:w-[25rem]">
          <h1 className="text-4xl text-[#5a5a5a] mb-2">{title}</h1>
          <p className="text-2xl font-bold text-[#3c3c3c] mb-5">₱ {price}</p>
          <p className="text-[#ababab] mb-14">{description}</p>
          <div className="flex items-center mb-10">
            <p className="text-lg font-semibold mr-28">Quantity</p>
            <div className="flex items-center gap-10 ">
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
              <p className="text-2xl w-[3rem] text-center">{qty}</p>
              <button onClick={qtyPlus}>
                <FaPlus className="plus__quantity" />
              </button>
            </div>
          </div>
          <button
            className="add-to-cart"
            onClick={() => {
              onAdd(data.products.data[0].attributes, qty);
              addedProduct(title);
            }}
          >
            Add to cart
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {productMedia.isOpen && <ProductMediaModal />}
      </AnimatePresence>

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
    </motion.div>
  );
}
