import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KY is not defined");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string,{
    apiVersion:"2025-04-30.basil"
});

export default stripe;