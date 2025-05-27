import { onRequest } from "firebase-functions/v2/https";
import { findUserByUserUid } from "../models/userModel";
import { UserProfile } from "../interfaces/userProfileInterface";
export const getUserProfile = onRequest({cors:true}, async (req,res) => {
    const {userUid} = req.body;
    try{
        const userRef = await findUserByUserUid(userUid)
        const userProfileRef = await userRef.get()
        const userProfile = userProfileRef.data() as UserProfile
        res.status(200).json(userProfile)
    }
    catch (e) {
        console.log(e)
        res.status(400).send("couldn't get userProfile")
    }
})