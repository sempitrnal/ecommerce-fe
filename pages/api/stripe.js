import Stripe from "stripe";
import CartItem from "../../components/CartItem";
const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    try {
      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
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
            quantity: e.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/cancelled`,
      });
      res.status(200).json(session);
    } catch (error) {
      res.status(error.statusCode || 500).json(error.message);
    }
  }
}
