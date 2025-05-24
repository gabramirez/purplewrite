import { humanizeText } from "./controllers/HumanizeTextController";
import { setupUserProfile } from "./controllers/setupUserProfile";
import { createCheckoutSession } from "./controllers/StripeController";
import { handleStripeWebhook } from "./webhooks/StripeWebHook";
export {humanizeText}
export {setupUserProfile}
export {createCheckoutSession}
export {handleStripeWebhook}
import * as admin from "firebase-admin";
admin.initializeApp();