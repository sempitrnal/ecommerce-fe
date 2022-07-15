import Head from "next/head";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import Main from "../components/Main";

export default function Home() {
  return (
    <div className="bg-[#f0f0f0]">
      <Head>
        <title>hello world</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AnimatePresence>
        <Main />
      </AnimatePresence>
    </div>
  );
}
