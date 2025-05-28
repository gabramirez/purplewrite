
import { onRequest } from "firebase-functions/v2/https";
import { createUserProfile } from "../models/userModel";

export const setupUserProfile = onRequest({cors:true},async (req, res) => {
    const {userUid} = req.body
    try{
        const created = await createUserProfile(userUid)
        if (created === "user profile created"){
            res.status(200).send("user profile created")
        }
        else {
            res.status(200).send("user profile created")
        }
        return
    }
    catch(e) {
        res.status(400).send("couldn't create user profile "+e )
        return
    }
})