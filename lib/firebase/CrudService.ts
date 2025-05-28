import { collection, query, getDocs, where} from "firebase/firestore"
import { db } from "@/lib/firebase/firebase"
export interface UserProfile{
    subscription: string,
    userId: string,
    wordsBalance: number
    currentPeriodEnd: number
}

export const findUserByUserId = async (userId: string) => {
  const usersRef = collection(db, "usersProfiles");

  const q = query(usersRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot.docs[0].data())
  if (querySnapshot.empty) {
    console.log("Usuário não encontrado");
    return null;
  }
  return querySnapshot.docs[0].data() as UserProfile; 
};