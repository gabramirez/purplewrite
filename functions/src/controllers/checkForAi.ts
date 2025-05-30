import { onRequest } from "firebase-functions/v2/https";
import { checkForAiService } from "../services/checkForAiService";
import { checkUserWordsService } from "../services/checkUserWords";
import { discountWordsService } from "../services/discountWordsService";
export const checkForAi = onRequest({cors:true}, async(req,res) =>{
    const {inputText} = req.body as { inputText: string };
    const {userUid} = req.body

    if (!userUid) {
         res.status(400).send("user uid wasn't provided")
        return
    }
    const textWordsCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0
    const haveWords =  await checkUserWordsService(userUid, textWordsCount)
    if(!haveWords){
        res.status(403).send("User don't have word balance")
        return
    }
 
    try{
        const humanPercent =  await checkForAiService(inputText)
        discountWordsService(userUid,textWordsCount)
        res.status(200).json({
            humanPercent: humanPercent    
        })
}
    catch (e){
        console.log(e)
        res.status(200).json({
            error: "couldn't humanize the text"
        })
    }
})