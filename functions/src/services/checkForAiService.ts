export const checkForAiService = async (inputText:string) => {
    const secretKey = process.env.GPTZERO_API_KEY!
    const responseGptZero = await fetch('https://api.gptzero.me/v2/predict/text', {
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': secretKey,
    },
    body: JSON.stringify({
        document: inputText,
        multilingual: false
    }),
    });
    console.log(responseGptZero.formData)
    const data = await responseGptZero.json();
    console.log(data)
    const completelyGeneratedProb = data.documents?.[0]?.completely_generated_prob;
    console.log(completelyGeneratedProb)
    const generatedPercent = (completelyGeneratedProb * 100).toFixed(2);
    
    const humanPercent = (100 - parseFloat(generatedPercent)).toFixed(2);
    return humanPercent
}