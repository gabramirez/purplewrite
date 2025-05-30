 import { AIDetector } from "@/lib/firebase/mockDetection"
 export const zeroDetectors = [
    { name: "Turnitin", status: "detected" as const },
    { name: "GPTZero", status: "detected" as const },
    { name: "OpenAI", status: "detected" as const },
    { name: "Writer", status: "detected" as const },
    { name: "CrossPlag", status: "detected" as const },
    { name: "CopyLeaks", status: "detected" as const },
    { name: "Sapling", status: "detected" as const },
    { name: "Originality", status: "detected" as const },
    { name: "ZeroGPT", status: "detected" as const },
  ] as AIDetector[]

export const halfResultDetectors = [
    { name: "Turnitin", status: "warning" as const },
    { name: "GPTZero", status: "detected" as const },
    { name: "OpenAI", status: "passed" as const },
    { name: "Writer", status: "passed" as const },
    { name: "CrossPlag", status: "warning" as const },
    { name: "CopyLeaks", status: "detected" as const },
    { name: "Sapling", status: "detected" as const },
    { name: "Originality", status: "warning" as const },
    { name: "ZeroGPT", status: "detected" as const },
  ] as AIDetector[]

  export const goodResultDetectors = [
    { name: "Turnitin", status: "passed" as const },
    { name: "GPTZero", status: "passed" as const },
    { name: "OpenAI", status: "passed" as const },
    { name: "Writer", status: "passed" as const },
    { name: "CrossPlag", status: "passed" as const },
    { name: "CopyLeaks", status: "passed" as const },
    { name: "Sapling", status: "passed" as const },
    { name: "Originality", status: "passed" as const },
    { name: "ZeroGPT", status: "passed" as const },
  ] as AIDetector[]