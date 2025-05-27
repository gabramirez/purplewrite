import Stripe from "stripe"
import { findUserByUserUid } from "../models/userModel";
import { updateUserSubscription } from "../models/userModel";
import { CustomLineItem } from "../interfaces/CustomLineItem";

import { SubscriptionPlan } from "../interfaces/SubscriptionPlan";
import { CustomInvoiceParent } from "../interfaces/CustomInvoiceParent";
export const invoicePaidService =  async (invoice : Stripe.Invoice, stripe: Stripe) => {
    const parent = invoice.parent as CustomInvoiceParent
    const subscriptionDetails = parent.subscription_details
    const userUid = subscriptionDetails.metadata.userUid as string
    const subscriptionId = subscriptionDetails.subscription
    const lineItems = await stripe.invoices.listLineItems(invoice.id!)
    const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ['items.data'], // importante para acessar os items diretamente
    });
    const currentPeriodEnd = subscription.items.data[0]?.current_period_end;
    const planProduct = lineItems.data[0] as CustomLineItem;
    const productId = planProduct.pricing.price_details.product
    let subscriptionPlan: SubscriptionPlan;
    switch (productId) {
        case 'prod_SLe5pog9aGsDOw': // basic
        subscriptionPlan = {
            subscriptionId:subscriptionId,
            wordsBalance: 5000,
            plan: 'basic',
        };
        break;
        case 'prod_SLe5GI3s3VjnA7': // pro
        subscriptionPlan = {
            subscriptionId:subscriptionId,
            wordsBalance: 15000,
            plan: 'pro',
            };
        break;
        case 'prod_SLe67diN0hGAAF': // ultra
            subscriptionPlan = {
                subscriptionId:subscriptionId,
                wordsBalance: 30000,
                plan: 'ultra',
            };
        break;
        default:
            subscriptionPlan = {
                subscriptionId:subscriptionId,
                wordsBalance: 250,
                plan: 'freeplan',
              };
        break;
          }
        const userRef = await findUserByUserUid(userUid)
        try{
            updateUserSubscription(userRef, subscriptionPlan, currentPeriodEnd)
        }  
        catch (e){
    }
}
            
