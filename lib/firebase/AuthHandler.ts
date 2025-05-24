import { useRouter } from "next/navigation";
import { db,auth} from "@/lib/firebase/firebase"
import {doc, getDoc, setDoc } from "firebase/firestore"
import { getAuth ,createUserWithEmailAndPassword, User, UserCredential, Auth } from "firebase/auth";
import { useAuth } from "@/app/context/AuthContext";

const createUserProfile = async (userUid:string) => {
    const res = await fetch("http://127.0.0.1:8080/purplewrite-719f8/us-central1/setupUserProfile", {method: "POST", headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ userUid: userUid})
});
}

export const handleRegisterWithGoogle = async (
  signInWithGoogle: () => Promise<{ user: User }>
) => {
  try {
    const { user } = await signInWithGoogle()
    createUserProfile(user.uid)

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
    createUserProfile(userCredential.user.uid)
    
  } catch (error: any) {

  }
}