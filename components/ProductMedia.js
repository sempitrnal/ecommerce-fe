import { motion } from "framer-motion";
import { useStateContext } from "../lib/context";
const ProductMedia = ({ url, hash }) => {
  const { setProductMedia } = useStateContext();
  const toggle = () => {
    setProductMedia({ isOpen: true, url: url, hash: hash });
  };
  return (
    <motion.div layoutId={hash} className="">
      <img
        className="w-[20rem] h-[20rem] object-cover rounded-md hover:opacity-90 cursor-pointer transition-all duration-300  "
        src={url}
        alt=""
        onClick={toggle}
      />
    </motion.div>
  );
};

export default ProductMedia;
