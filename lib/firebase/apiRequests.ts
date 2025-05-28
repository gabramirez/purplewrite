export const getUserProfile = async (userUid:string) => {
        return await fetch(process.env.NEXT_PUBLIC_GETUSER_ROUTE!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userUid: userUid}),
      });

}

export const postHumanizeText = async (userUid:string | undefined, inputText:string) => {
        return await fetch(process.env.NEXT_PUBLIC_HUMANIZE_ROUTE!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userUid: userUid, text:inputText }),
      });
}

export const postCheckAi = async (userUid:string | undefined, inputText:string) => {
        console.log("requisição executada em "+ process.env.NEXT_PUBLIC_CHECKAI_ROUTE! )
        return await fetch(process.env.NEXT_PUBLIC_CHECKAI_ROUTE!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userUid: userUid, inputText:inputText }),
      });
      
}

export const postCheckoutSession = async (priceId:string , userUid:string | undefined) => {
    console.log(process.env.NEXT_PUBLIC_CHECKOUT_SESSION!)
    const res = await fetch(process.env.NEXT_PUBLIC_CHECKOUT_SESSION!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId, userUid }),
    });
    const data = await res.json();
    if (data.checkoutSession) {
      window.location.href = data.checkoutSession;
    } else {
      console.error('Erro ao criar sessão de checkout');
    }
  };
