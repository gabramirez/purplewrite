import { onRequest } from "firebase-functions/v2/https";
import { Stripe } from "stripe";
import { invoicePaidService } from "../services/invoicePaidService";
import { refundCreatedService } from "../services/refundCreatedService";
import { subscriptionDeletedService } from "../services/subscriptionDeletedService";

export const handleStripeWebhook = onRequest({ cors: false }, async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-04-30.basil",
  });
  const endpointSecret = "whsec_223b39ef3dece451c2ecd88da8108adfa76ea126dc0d577cff1faf19994a7d4e";
  const sig = req.headers["stripe-signature"] as string;
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err: any) {
    console.error("Erro ao validar webhook:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return
  }
  if (event){
    if (event.type === "invoice.paid") {
      const invoice = event.data.object as Stripe.Invoice 
      try{
        invoicePaidService(invoice, stripe)
        res.status(200).send("")
        return
      }
        catch (e) {
        res.status(400).send(e)
        return
      }
    }
    }
    if (event!.type === "refund.created"){
      const refund = event.data.object as Stripe.RefundCreateParams
      try{
        refundCreatedService(refund, stripe)
        res.status(200).send("")
        return
      }
      catch (e){
        res.status(400).send(e)
        return
      }
    }
    if (event!.type === "customer.subscription.deleted"){
      const subDeleted = event as Stripe.CustomerSubscriptionDeletedEvent;
      const subscriptionId = subDeleted.data.object.id
      try{
        subscriptionDeletedService(subscriptionId)
        res.status(200).send("")
      }
      catch (e) {
        res.status(400).send(e)
      }
    }
  }
 
);