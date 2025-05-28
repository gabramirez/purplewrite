import { useRouter } from "next/navigation";
import { db,auth} from "@/lib/firebase/firebase"
import {doc, getDoc, setDoc } from "firebase/firestore"
import { getAuth ,createUserWithEmailAndPassword, User, signInWithEmailAndPassword, UserCredential, Auth } from "firebase/auth";
import { useAuth } from "@/app/context/AuthContext";

const createUserProfile = async (userUid:string) => {
    console.log("tentando criar conta com o seguinte userUid")
    console.log(userUid)
    try{
     await fetch(process.env.NEXT_PUBLIC_SETUP_PROFILE_ROUTE!, {method: "POST", headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ userUid: userUid})
    
});}
catch(e){
  console.log(e)
}
}

export const handleRegisterWithGoogle = async (
  signInWithGoogle: () => Promise<{ user: User }>
) => {
  try {
    const { user } = await signInWithGoogle()
    console.log(user)
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

export const handleEmailLogin = async (
  auth: Auth,
  email: string,
  password: string
): Promise<void> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Login successful:", user.uid);


  } catch (error: any) {
    if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
      alert("Email or password is incorrect.");
    } else if (error.code === "auth/invalid-email") {
      alert("The email address is invalid.");
    } else if (error.code === "auth/network-request-failed") {
      alert("Network error. Please check your internet connection.");
    } else {
      console.error("Unexpected login error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  }
};