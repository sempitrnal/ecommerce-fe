import Stripe from "stripe";
const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);
import { getSession } from "@auth0/nextjs-auth0";

export default async function handler(req, res) {
  const session = getSession(req, res);
  const user = session?.user;
  const stripeId = user[`http://localhost:3000/stripe_customer_id`];
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    try {
      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        customer: stripeId,
        payment_method_types: ["card"],
        shipping_address_collection: {
          allowed_countries: ["PH"],
        },
        allow_promotion_codes: true,
        shipping_options: [{ shipping_rate: "shr_1LIdPKGg3ORiNIWsLnINhgIc" }],
        line_items: data.map((e) => {
          return {
            price_data: {
              currency: "php",
              product_data: {
                name: e.title,
                images: [e.image.data.attributes.formats.thumbnail.url],
              },
              unit_amount: e.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
            },
            quantity: e.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/`,
      });
      res.status(200).json(session);
    } catch (error) {
      res.status(error.statusCode || 500).json(error.message);
    }
  }
}
