import "../styles/globals.css";
import { createClient, Provider } from "urql";
import Nav from "../components/Nav";
import { StateContext } from "../lib/context";
import { UserProvider } from "@auth0/nextjs-auth0";
const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <UserProvider>
        <Provider value={client}>
          <Nav />
          <Component {...pageProps} />
        </Provider>
      </UserProvider>
    </StateContext>
  );
}

export default MyApp;
