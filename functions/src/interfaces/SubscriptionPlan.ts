export interface PlanTemplate {
  wordsBalance: number;
  wordsPerRequest:number;
  plan: 'basic' | 'pro' | 'ultra' | 'freeplan';
  features?: string[]; // Opcional
}
export interface SubscriptionPlan extends PlanTemplate {
  subscriptionId: string;
}

export const PLANS = {
  BASIC: {
    wordsBalance: 5000,
    wordsPerRequest: 500,
    plan: 'basic' as const,
  },
  PRO: {
    wordsBalance: 15000,
    wordsPerRequest:1500,
    plan: 'pro' as const,
  },
  ULTRA: {
    wordsBalance: 30000,
    wordsPerRequest:3000,
    plan: 'ultra' as const,
  },
  FREE: {
    wordsPerRequest:250,
    wordsBalance: 500,
    plan: 'freeplan' as const
  }
} satisfies Record<string, PlanTemplate>; 