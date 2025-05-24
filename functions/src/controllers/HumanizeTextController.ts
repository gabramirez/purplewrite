import { onRequest } from "firebase-functions/v2/https";
import OpenAI from "openai";

export const humanizeText = onRequest({cors:true}, async (request,res) => {
    const apiKey=process.env.OPENAI_API_KEY
    const client = new OpenAI({
    apiKey:apiKey,
    });
    const { text } = request.body
    const response = await client.chat.completions.create({
        model: "gpt-4.1",
        messages: [
        {
            role: "user",
            content: "Humanize this text in its language, and return only the humanized text, nothing more. " + text,
        },
        ],
    });
    res.status(200).json({textHumanizado:response.choices[0].message.content})
})

