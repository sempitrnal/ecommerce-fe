import Link from "next/link";
const Product = ({ product }) => {
  const { title, price, image, slug } = product.attributes;
  const { small, medium, thumbnail } = image.data.attributes.formats;

  return (
    <Link href={`product/${slug}`}>
      <div className="flex flex-col overflow-hidden justify-end  shadow-[0px_0px_10px_#00000025] rounded-md">
        <img
          src={small.url}
          alt={small.name}
          className=" cursor-pointer self-center hover:scale-105 transition-all duration-300 h-[40vh] w-full object-cover object-top"
        />
        <div className="p-5">
          <h2 className="cursor-pointer text-lg font-semibold mb-5">{title}</h2>
          <h3 className="text-gray-400 text-sm">€{price}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Product;
