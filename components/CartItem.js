import { useStateContext } from "../lib/context";
import { motion } from "framer-motion";

//react icons
import { FaPlus, FaMinus, FaRegTrashAlt } from "react-icons/fa";
const CartItem = ({ image, title, price, quantity, product }) => {
  const { onAdd, onRemove, deleteProduct } = useStateContext();
  return (
    <motion.div
      layout
      exit={{ opacity: 0, x: 300 }}
      className="flex items-center justify-between w-full  mb-7 bg-white p-[2rem_2rem] rounded-lg "
    >
      <img
        src={image}
        alt=""
        className="w-[5rem] h-[5rem] object-cover rounded-md aspect-square"
      />
      <div className="">
        <h3 className="text-lg font-semibold ">{title}</h3>
        <h3 className="text-xs text-gray-500 mb-3">{price} €</h3>
        <div className="flex items-center gap-3">
          <h3 className="text-xs">
            <span className="mr-5 font-semibold ">Quantity</span> {quantity}
          </h3>
          <div className="flex text-[.6rem] rounded-sm translate-y-[0%] ">
            <button
              className=" border rounded-l-sm  border-[#afafaf] p-[.2rem] cursor-default hover:bg-slate-100 transition-colors duration-300"
              onClick={() => {
                onRemove(product);
              }}
            >
              <FaMinus className="" />
            </button>
            <button
              className=" p-[.2rem] border-t  border-b cursor-default  hover:bg-slate-100  transition-colors duration-300 border-[#afafaf]"
              onClick={() => {
                onAdd(product, 1);
              }}
            >
              <FaPlus className="" />
            </button>
            <button
              className=" p-[.2rem] cursor-default rounded-r-sm  hover:bg-red-400 transition-colors duration-300  bg-red-500 font-semibold"
              onClick={() => {
                deleteProduct(product);
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
