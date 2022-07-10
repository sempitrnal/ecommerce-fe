import { useRouter } from "next/router";
const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = getSession(ctx.req, ctx.res);
    const stripeId = session.user[`${process.env.BASE_URL}/stripe_customer_id`];
    const paymentIntents = await stripe.paymentIntents.list({
      customer: stripeId,
    });
    return { props: { orders: paymentIntents } };
  },
});

export default function Profile({ user, orders }) {
  const route = useRouter();
  console.log(orders.data);
  return (
    user && (
      <div className="min-h-screen items-center flex flex-col py-[5rem] gap-10">
        {orders &&
          orders.data.map((e) => {
            return (
              <div
                className="flex p-10 rounded-lg bg-white shadow-md gap-10 flex-wrap"
                key={e.id}
              >
                <div className="s">
                  <p className="text-[#c5c5c5] font-bold uppercase text-[.6rem]">
                    Order number
                  </p>
                  <p>{e.id}</p>
                </div>
                <div className="">
                  <p className="text-[#c5c5c5] font-bold uppercase text-[.6rem]">
                    Email
                  </p>
                  <p>{e.charges.data.map((a) => a.billing_details.email)}</p>
                </div>
                <div className="">
                  <p className="text-[#c5c5c5] font-bold uppercase text-[.6rem]">
                    Amount Paid
                  </p>
                  <p>
                    <span className="font-semibold">
                      ₱ {(e.amount / 100).toLocaleString("en-US")}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    )
  );
}
