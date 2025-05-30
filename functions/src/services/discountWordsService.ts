import { updateUserWordsBalance } from "../models/userModel"

export const discountWordsService = async (userUid:string,wordsToBeDiscounted:number) => {
    await updateUserWordsBalance(userUid,wordsToBeDiscounted)
}