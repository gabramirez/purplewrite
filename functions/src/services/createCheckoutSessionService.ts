
import Stripe from "stripe";

   
export const createCheckoutSessionService = async (stripe:Stripe, userUid:string, origin: string ) => {   
   const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: "price_1RQwmsQ96ai7WSnx5gl8SkOC",
          quantity: 1,
        },
      ],
      mode: "subscription",
      payment_method_types: ["card"],
      subscription_data: {
        metadata: {
          userUid: userUid,
        },
      },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
    });
    const sessionUrl = session.url
    return sessionUrl
}