export interface PlanTemplate {
  wordsBalance: number;
  plan: 'basic' | 'pro' | 'ultra' | 'freeplan';
  features?: string[]; // Opcional
}
export interface SubscriptionPlan extends PlanTemplate {
  subscriptionId: string;
}

export const PLANS = {
  BASIC: {
    wordsBalance: 5000,
    plan: 'basic' as const,
    features: ['Acesso básico']
  },
  PRO: {
    wordsBalance: 15000,
    plan: 'pro' as const,
    features: ['Acesso completo']
  },
  ULTRA: {
    wordsBalance: 30000,
    plan: 'ultra' as const,
    features: ['Acesso premium']
  },
  FREE: {
    wordsBalance: 250,
    plan: 'freeplan' as const
  }
} satisfies Record<string, PlanTemplate>; 