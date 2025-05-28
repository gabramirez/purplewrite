type DetectorStatus = "detected" | "warning" | "passed";

export interface AIDetector {
  name: string;
  status: DetectorStatus;
  percentage?: number;
}

const IA_NAMES = ["GPTZero", "CopyLeaks", "Turnitin"] as const;

export function generateDetectorResults(humanProbability: number): AIDetector[] {
  const aiTotal = 100 - humanProbability;
  const weights = IA_NAMES.map(() => Math.random());
  const weightSum = weights.reduce((a, b) => a + b, 0);

  // Distribui a porcentagem restante entre os 3 detectores
  let distribution = weights.map(w => Math.round((w / weightSum) * aiTotal));

  // Corrige soma para 100 no total
  const assigned = distribution.reduce((a, b) => a + b, 0);
  if (assigned !== aiTotal) {
    distribution[0] += aiTotal - assigned;
  }

  // Mapeia os detectores com o status baseado na porcentagem
  return IA_NAMES.map((name, i) => {
    const percent = distribution[i];
    let status: DetectorStatus;

    if (percent > 60) status = "passed";
    else if (percent >= 20) status = "warning";
    else status = "detected";

    return {
      name,
      status,
    };
  });
}