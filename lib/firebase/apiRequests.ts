export const getUserProfile = async (userUid:string) => {
        return await fetch("http://127.0.0.1:8080/purplewrite-719f8/us-central1/getUserProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userUid: userUid}),
      });

}

export const postHumanizeText = async (userUid:string, inputText:string) => {
        return await fetch("http://127.0.0.1:8080/purplewrite-719f8/us-central1/humanizeText)", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userUid: userUid, inputText:inputText }),
      });
}

export const postCheckAi = async (userUid:string, inputText:string) => {
        return await fetch("http://127.0.0.1:8080/purplewrite-719f8/us-central1/getUserProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userUid: userUid, inputText:inputText }),
      });
}

export const postCheckoutSession = async (priceId:string , userUid:string | undefined) => {
    const res = await fetch('http://127.0.0.1:8080/purplewrite-719f8/us-central1/createCheckoutSession', {
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
