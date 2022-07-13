import { useStateContext } from "../lib/context";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
//react icons
import { FaPlus, FaMinus, FaRegTrashAlt } from "react-icons/fa";
const CartItem = ({ image, title, price, quantity, product, slug }) => {
  const { onAdd, onRemove, deleteProduct, setShowCart } = useStateContext();
  const route = useRouter();
  return (
    <motion.div
      layout
      exit={{ opacity: 0, x: 100, transition: { duration: 0.1 } }}
      className="flex items-center justify-between w-full  mb-7 bg-white p-[2rem_2rem] rounded-lg cursor-pointer hover:shadow-md transition-shadow duration-500"
      onClick={() => {
        route.push(`/product/${slug}`);
        setShowCart(false);
      }}
    >
      <img
        src={image}
        alt=""
        className="w-[5rem] h-[5rem] object-cover rounded-md aspect-square"
      />
      <div className="">
        <h3 className="text-lg font-bold mb-1 ">{title}</h3>
        <h3 className="text-xs text-gray-500 mb-3">
          ₱ {price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </h3>
        <div className="flex items-center gap-3">
          <h3 className="text-xs">
            <span className="mr-5 font-semibold ">Quantity</span> {quantity}
          </h3>
          <div className="flex text-[.8rem] rounded-sm translate-y-[0%] ">
            <button
              className=" border rounded-l-sm  border-[#afafaf] p-[.2rem]  hover:bg-slate-100 transition-colors duration-300"
              onClick={(e) => {
                onRemove(product);
                e.stopPropagation();
              }}
            >
              <FaMinus className="" />
            </button>
            <button
              className=" p-[.2rem] border-t  border-b   hover:bg-slate-100  transition-colors duration-300 border-[#afafaf]"
              onClick={(e) => {
                onAdd(product, 1);
                e.stopPropagation();
              }}
            >
              <FaPlus className="" />
            </button>
            <button
              className=" p-[.2rem]  rounded-r-sm  hover:bg-red-400 transition-colors duration-300  bg-red-500 font-semibold"
              onClick={(e) => {
                deleteProduct(product);
                e.stopPropagation();
              }}
            >
              <FaRegTrashAlt className="font-semibold text-white" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;
