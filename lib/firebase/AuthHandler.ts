import { useRouter } from "next/navigation";
import { db,auth} from "@/lib/firebase/firebase"
import {doc, getDoc, setDoc } from "firebase/firestore"
import { getAuth ,createUserWithEmailAndPassword, User, UserCredential, Auth } from "firebase/auth";
import { useAuth } from "@/app/context/AuthContext";

export const createUserProfile = async (user: User) => {
  const userRef = doc(db, "usersProfiles", user.uid)
  const userSnap = await getDoc(userRef)

  if (!userSnap.exists()) {
    try{
      await setDoc(userRef, {
      userId: user.uid,
      subscription: "freeplan",
      wordsBalance: 250,
    })} 
    catch (error: any){

    }

  } else {

  }
}

export const handleRegisterWithGoogle = async (
  signInWithGoogle: () => Promise<{ user: User }>
) => {
  try {
    const { user } = await signInWithGoogle()
    console.log(user)
    await createUserProfile(user)
  } catch (error: any) {

  }
}

export const handleEmailRegister = async (
  auth: Auth,
  email: string,
  password: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await createUserProfile(userCredential.user)
  } catch (error: any) {

  }
}