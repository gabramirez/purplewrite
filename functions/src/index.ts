import { getUserProfile } from "./controllers/getUserProfile";
import { humanizeText } from "./controllers/HumanizeTextController";
import { setupUserProfile } from "./controllers/setupUserProfile";
import { createCheckoutSession} from "./controllers/StripeController";
import { handleStripeWebhook } from "./webhooks/StripeWebHook";
import { checkForAi } from "./controllers/checkForAi";
export {checkForAi}
export {humanizeText}
export {setupUserProfile}
export {handleStripeWebhook}
export {getUserProfile}
export {createCheckoutSession}
import * as admin from "firebase-admin";
admin.initializeApp();