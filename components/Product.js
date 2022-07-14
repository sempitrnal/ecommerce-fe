import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useStateContext } from "../lib/context";
import { useState, useEffect } from "react";
const Product = ({ product }) => {
  const { title, price, image, slug } = product.attributes;
  const { small } = image.data.attributes.formats;
  const { onAdd } = useStateContext();
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const watch = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", watch);
  }, []);
  console.log(width);
  return (
    <Link href={`product/${slug}`}>
      <div className="flex flex-col overflow-hidden justify-end  shadow-[0px_0px_10px_#00000025] rounded-md aspect-square ">
        <img
          src={small.url}
          alt={small.name}
          className=" cursor-pointer self-center hover:scale-105 transition-all duration-300 h-full w-full object-cover object-top overflow-hidden"
        />
        <div className="flex items-center justify-between bg-white  z-[1]">
          <div className="p-3 xl:p-5 flex justify-between lg:justify-start w-full gap-5">
            <h2 className="mb-1 text-sm sm:text-xs md:text-sm lg:text-md xl:text-md  cursor-pointer">
              {title}
            </h2>
            <h3 className="text-xs md:text-sm lg:text-md xl:text-md text-[#ff895b] font-bold">
              ₱ {price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </h3>
          </div>
          {width >= 1024 && (
            <div className="mr-5">
              <motion.button
                whileTap={{ scale: 0.9 }}
                className=" text-xs lg:flex  items-center bg-[#3a3a3a] py-1 px-3 rounded-md text-[#e6e6e6] h-5 w-24 justify-center mx-auto hover:bg-[#555] transition-colors duration-200  "
                onClick={(e) => {
                  onAdd(product.attributes, 1);
                  e.stopPropagation();
                  toast(`${title} added to your cart!`, {
                    icon: "⚡️",
                  });
                }}
              >
                Add to cart
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Product;
