import Link from "next/link";

import { AiOutlineShoppingCart } from "react-icons/ai";
const Nav = () => {
  return (
    <nav className="sticky z-10 top-0 right-0 left-0 flex justify-between items-center px-[5rem] h-[10vh] bg-white shadow-lg">
      <Link href={"/"}>bo</Link>
      <AiOutlineShoppingCart />
      <p className="lg:hidden">burger</p>
    </nav>
  );
};

export default Nav;
