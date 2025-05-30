
export function saveHumanizedText(id: string, text: string) {
  localStorage.setItem(`humanized_${id}`, text);
}

export function getNextHumanizedId(): number {
  let maxId = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith("humanized_")) {
      const idStr = key.replace("humanized_", "");
      const idNum = parseInt(idStr, 10);
      if (!isNaN(idNum) && idNum > maxId) {
        maxId = idNum;
      }
    }
  }

  return maxId + 1;
}

export function getAllHumanizedTexts(): Record<string, string> {
  const result: Record<string, string> = {};
     for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("humanized_")) {
      const value = localStorage.getItem(key);
      if (value !== null) {
        result[key] = value;
      }
    }
  }

  return result;
}

export function hasExactHumanizedEntry(text: string): boolean {
  const textos = getAllHumanizedTexts();
  return Object.values(textos).some(value => value.includes(text));
}

