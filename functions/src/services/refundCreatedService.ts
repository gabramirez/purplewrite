import Stripe from "stripe";
import { CustomInvoiceParent } from "../interfaces/CustomInvoiceParent";
import { findUserBySubscriptionId, updateUserSubscription } from "../models/userModel";
import { PLANS } from "../interfaces/SubscriptionPlan";
export const refundCreatedService = async (refund : Stripe.RefundCreateParams, stripe: Stripe) => {
    const paymentIntentId = refund.payment_intent as string
    const invoicePayments = await stripe.invoicePayments.list({});
    const matchingPayment = invoicePayments.data.find(payment => 
        payment.payment?.payment_intent === paymentIntentId
    );
    const invoiceId = matchingPayment?.invoice as string     
    const invoice = await stripe.invoices.retrieve(invoiceId)
    const parent = invoice.parent as CustomInvoiceParent
    const subscriptionDetails = parent.subscription_details
    const subscriptionId = subscriptionDetails.subscription 
    const userRef = await findUserBySubscriptionId(subscriptionId)
    updateUserSubscription(userRef, PLANS.FREE)
}