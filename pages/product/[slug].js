import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useQuery } from "urql";
import { useRouter } from "next/router";
import { FaPlus, FaMinus } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";
export default function ProductDetails() {
  const { query } = useRouter();
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.slug },
  });
  const { data, fetching, error } = results;
  if (fetching)
    return (
      <AnimatePresence>
        <motion.div className="h-screen justify-center items-center flex">
          <ClipLoader />
        </motion.div>
      </AnimatePresence>
    );
  if (error) return <p>oh shite {error.message}</p>;

  const { title, price, image, description } = data.products.data[0].attributes;
  const { large, medium, small, thumbnail } = image.data.attributes.formats;

  //motion variants
  const fadeIn = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  };
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="h-screen flex flex-col lg:flex-row justify-center items-center my-20 sm:my-40 lg:my-0 gap-14"
    >
      <img
        className="rounded-md w-[280px] sm:w-[400px] xl:[500px]"
        src={medium.url}
        alt={title}
      />
      <div className="flex flex-col w-[280px] sm:w-[400px] xl:w-[25rem]">
        <h1 className="text-4xl text-[#5a5a5a] mb-2">{title}</h1>
        <p className="text-2xl font-bold text-[#3c3c3c] mb-5">{price}€</p>
        <p className="text-[#ababab] mb-14">{description}</p>
        <div className="flex mb-10 items-center">
          <p className="mr-28 text-lg font-semibold">Quantity</p>
          <div className="flex gap-10 items-center ">
            <button>
              <FaMinus className="transition-colors duration-500 translate-y-[10%] text-sm text-[#232323] hover:text-[#4f4f4f] " />
            </button>
            <p className="text-2xl">0</p>
            <button>
              <FaPlus className="transition-colors duration-500 translate-y-[10%] text-sm text-[#1d1d1d]  hover:text-[#4f4f4f]" />
            </button>
          </div>
        </div>
        <button className="bg-gray-200 hover:shadow-md transition-all duration-300 p-2 rounded-md">
          Add to cart
        </button>
      </div>
    </motion.div>
  );
}
