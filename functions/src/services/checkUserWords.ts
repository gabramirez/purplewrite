import { findUserByUserUid } from "../models/userModel"
import { UserProfile } from "../interfaces/userProfileInterface"

export const checkUserWordsService = async (userUid:string, textLength:number) => {
    const userRef = await findUserByUserUid(userUid)
    const userProfileRef = await userRef.get()
    const userProfile = userProfileRef.data() as UserProfile
    if  (textLength <= userProfile.wordsBalance) {
        return true
    }
    else{
        return false
    }
}