import * as admin from "firebase-admin";
import {DocumentReference} from "firebase-admin/firestore"
import { SubscriptionPlan } from "../interfaces/SubscriptionPlan";
import { PlanTemplate } from "../interfaces/SubscriptionPlan";
import { UserProfile } from "../interfaces/userProfileInterface";

export const findUserByUserUid = async (userUid:string) => { 
    const db = admin.firestore()
    const useQuery = await db.collection("usersProfiles").where("userId", "==", userUid).get();
    if (useQuery.docs.length > 0) {
         const doc = useQuery.docs[0].ref
         return doc
    }
    else {
        throw("there's no document with this userUid")
    }
}
export const findUserBySubscriptionId = async (subscriptionId: string) => {
    const db = admin.firestore()
    const useQuery = await db.collection("usersProfiles").where("subscriptionId", "==", subscriptionId).get();
    if (useQuery.docs.length > 0) {
         const doc = useQuery.docs[0].ref
         return doc
    }
    else {
        throw("there's no document with this userUid")
    }
}
export function updateUserSubscription(
  doc: DocumentReference,
  newSubscription: SubscriptionPlan | PlanTemplate,
  currentPeriodEnd: number
  
){

  function isSubscriptionPlan(obj: any): obj is SubscriptionPlan {
    return 'subscriptionId' in obj;
  }

  if (isSubscriptionPlan(newSubscription)) {
     doc.update({
      subscriptionId: newSubscription.subscriptionId,
      subscription: newSubscription.plan,
      wordsBalance: newSubscription.wordsBalance,
      currentPeriodEnd: currentPeriodEnd
    });
  } else {
      doc.update({
      subscription: newSubscription.plan,
      wordsBalance: newSubscription.wordsBalance,
      currentPeriodEnd: currentPeriodEnd
    });
  }
}
export const createUserProfile = async (userUid: string) => {
  const db = admin.firestore();
  const userRef = db.collection("usersProfiles").doc(userUid);
  const userSnap = await userRef.get();

  if (!userSnap.exists) {
    try {
      await userRef.set({
        userId: userUid,
        subscription: "freeplan",
        wordsBalance: 500,
        wordsPerRequest:250,
        subscriptionId: ""
      });
      return "user profile created"
    } catch (error: any) {
      console.error("Erro ao criar perfil:", error.message);
      return "error"
    }
  } else {
    return "user profile already exists"
  }
};
export const updateUserWordsBalance = async (userUid:string, wordsToBeDiscounted:number) => {
  const userRef = await findUserByUserUid(userUid)
  const user = await userRef.get()
  const userWordsBalance =  user.data() as UserProfile
  const actualWords = userWordsBalance.wordsBalance
  userRef.update({
    wordsBalance:  actualWords - wordsToBeDiscounted 
  })
}