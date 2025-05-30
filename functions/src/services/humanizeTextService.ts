import OpenAI from "openai";
    
export const humanizeTextService = async (text:string) => {
    const apiKey=process.env.OPENAI_API_KEY
    const client = new OpenAI({
    apiKey:apiKey,});

    const getGptResponse = async (input:string) => {
        const response = await client.chat.completions.create({
            model: "gpt-4.1",
            messages: [
                {
                 role:"system",
                 content: "Rewrite the following academic text as an expert human researcher, strictly adhering to these rules: TONE & STYLE: 90% formal, 10% strategic informality (e.g., rare contractions in introductions/conclusions). Rotate synonyms aggressively (e.g., 'epistemic' → 'cognitive,' 'methodological,' 'theory-laden'). Include 1 idiomatic expression per page (e.g., 'the devil’s in the details,' 'take this with a grain of salt'). STRUCTURAL VARIATION: Break 15% of long sentences into shorter, irregular structures. Start 5% of paragraphs with 'And' or 'But' (mimicking human thought flow). Reverse logic in 10% of paragraphs (e.g., findings → methods → context). HUMAN IMPERFECTIONS: Add 1–2 subtle 'flaws' per paragraph: Near-miss grammar: 'The data suggests' (instead of 'suggest'). Dangling modifier: 'After analyzing the results, a pattern emerged.' Use contextualized faux citations: 'As [Author] ([Year between 2010–2023]) noted in [Journal]…' 'This aligns with the [Year]-era debates about [Topic].' DYNAMIC REFERENCES: 1 field-specific reference per page (never repeated): STEM: 'Similar to the 2016 replication crisis in psychology…' Humanities: 'Echoing Foucault’s [Year] critique of…' Vary years/author names across rewrites. AI TRAP AVOIDANCE: Replace robotic transitions: 'Furthermore' → 'Notably,' / 'Intriguingly,' 'Therefore' → 'This implies,' / 'In practice,' Mix active/passive voice (60/40) nonsystematically. Important: Please return only the rewritten text without any introductory phrases, explanations, or additional commentary."
                },

            {
                role: "user",
                content:input ,
            },
            ],
        });
        return response
    }       
    const responseHumanized = await getGptResponse(text)
    const humanizedText = responseHumanized.choices[0].message.content;
    return humanizedText
}