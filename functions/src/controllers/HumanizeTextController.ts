import { onRequest } from "firebase-functions/v2/https";
import { humanizeTextService } from "../services/humanizeTextService";
import { checkUserWordsService } from "../services/checkUserWords";
import { discountWordsService } from "../services/discountWordsService";
export const humanizeText = onRequest({cors:true}, async (request,res) => {
    const {text} = request.body as {text: string};
    const {userUid} = request.body

      if (!userUid) {
         res.status(400).send("user uid wasn't provided")
        return
    }
    const textWordsCount = text.trim() ? text.trim().split(/\s+/).length : 0
    const haveWords =  await checkUserWordsService(userUid, textWordsCount)
        if(!haveWords){
            res.status(403).send("User don't have word balance")
            return
        }

    const response =  await humanizeTextService(text)
    discountWordsService(userUid,textWordsCount)
    res.status(200).json({textHumanizado:response})
})          

