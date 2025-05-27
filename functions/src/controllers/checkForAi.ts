import { onRequest } from "firebase-functions/v2/https";
import { checkForAiService } from "../services/checkForAiService";

export const checkForAi = onRequest({cors:true}, async(req,res) =>{
    const {inputText} = req.body
    try{
        const humanPercent =  await checkForAiService(inputText)
        console.log(humanPercent)
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