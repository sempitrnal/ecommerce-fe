import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useStateContext } from "../lib/context";
import { useState, useEffect } from "react";
const Product = ({ product }) => {
  const { title, price, image, slug } = product.attributes;
  const { small } = image.data.attributes.formats;

  return (
    <Link href={`product/${slug}`}>
      <div className="flex flex-col overflow-hidden justify-end   rounded-[.25rem] lg:h-[50vh] aspect-[2/3] lg:aspect-auto">
        <img
          src={small.url}
          alt={small.name}
          className=" cursor-pointer self-center hover:scale-105 transition-all duration-300 h-full w-full object-cover object-top overflow-hidden"
        />
        <div className="flex items-center justify-between bg-white  z-[1]">
          <div className="py-2 px-3  xl:p-3 flex justify-between lg:justify-start w-full flex-col">
            <h2 className="mb-1 text-xs md:text-sm lg:text-md xl:text-md  cursor-pointer">
              {title}
            </h2>
            <h3 className="text-xs md:text-sm lg:text-md xl:text-md text-[#4a2389] font-[500]">
              ₱ {price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
