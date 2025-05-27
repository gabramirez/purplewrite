import { findUserBySubscriptionId, updateUserSubscription } from "../models/userModel";
import { PLANS } from "../interfaces/SubscriptionPlan";
import { SubscriptionPlan } from "../interfaces/SubscriptionPlan";
export const subscriptionDeletedService = async (subscriptionId: string) => {
    const userRef = await findUserBySubscriptionId(subscriptionId)
    const subscriptionPlan: SubscriptionPlan = {
        ...PLANS.FREE,
        subscriptionId:""
    }
    updateUserSubscription(userRef, subscriptionPlan,0)
}