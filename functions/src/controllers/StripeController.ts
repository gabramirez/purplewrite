import { onRequest } from "firebase-functions/v2/https";
import { Stripe } from "stripe";
import { createCheckoutSessionService } from "../services/createCheckoutSessionService";

export const createCheckoutSession = onRequest(async (req, res) => {
    const secretKey = process.env.STRIPE_SECRET_KEY!
    const {userUid} = req.body
    const stripe = new Stripe(secretKey, {
    apiVersion: "2025-04-30.basil",
    });
  if (req.method !== "POST") {
    res.status(405).send("Método não permitido");
    return;
  }
  try {
    const origin = req.headers.origin || "http://localhost:3000";
    const sessionUrl =  await  createCheckoutSessionService(stripe, userUid, origin)
    res.status(200).json({checkoutSession: sessionUrl});
  } catch (err: unknown) {
    const error = err as { statusCode?: number; message: string };
    console.error("Erro ao criar sessão de checkout:", error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});