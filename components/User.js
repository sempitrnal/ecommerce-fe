import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import { useStateContext } from "../lib/context";
import { useUser } from "@auth0/nextjs-auth0";
import { AnimatePresence, motion } from "framer-motion";
const User = () => {
  const route = useRouter();
  const { openProfileDiv, toggleProfileDiv } = useStateContext();
  const { user, error, isLoading } = useUser();
  return (
    <div>
      <div
        className="flex flex-col justify-center items-center translate-y-[12%] cursor-pointer"
        onClick={user ? toggleProfileDiv : () => route.push("/api/auth/login")}
      >
        {user ? (
          <img
            src={user.picture}
            width={30}
            className="rounded-[50%] hover:opacity-80 transition-all duration-300"
          />
        ) : (
          <FaUserCircle className="w-[30px]" />
        )}
        {!user && <p className="text-xs">Login</p>}
      </div>
      <AnimatePresence>
        {openProfileDiv && (
          <motion.div
            initial={{ opacity: 1, scale: 0, x: 105, y: -63 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0, x: 105, y: -63 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 120,
            }}
            className="absolute p-3 right-[10.5rem] bg-white shadow-[0px_0px_10px_#00000024] rounded-lg text-sm"
          >
            <div className="flex  p-1 px-3 cursor-pointer hover:bg-gray-50 mb-1 transition-all duration-300 rounded-md">
              <img
                src={user.picture}
                alt=""
                width={20}
                className="rounded-[50%] mr-2"
              />
              <p>{user.name}</p>
            </div>
            <hr />
            <p
              className="cursor-pointer hover:bg-gray-50 p-1 px-3 transition-all duration-300 rounded-md my-1"
              onClick={() => route.push("/api/auth/logout")}
            >
              Log out
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default User;
