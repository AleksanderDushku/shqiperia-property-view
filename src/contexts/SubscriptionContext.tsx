
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserSubscription, SubscriptionTier } from '../types/subscription';
import { useLanguage } from './LanguageContext';

interface SubscriptionContextType {
  subscription: UserSubscription | null;
  tier: SubscriptionTier | null;
  hasFeature: (feature: string) => boolean;
  isWithinLimit: (limitType: string, currentUsage: number) => boolean;
  loading: boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 49,
    billingPeriod: 'monthly',
    features: ['basic_analytics', 'lead_capture', 'email_support'],
    limits: { agents: 2, clients: 100, reports: 10, apiCalls: 1000 }
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 149,
    billingPeriod: 'monthly',
    features: [
      'basic_analytics', 'lead_capture', 'email_support',
      'ai_lead_scoring', 'custom_branding', 'automated_reports',
      'property_valuation', 'client_portal'
    ],
    limits: { agents: 10, clients: 1000, reports: 100, apiCalls: 10000 }
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 399,
    billingPeriod: 'monthly',
    features: [
      'basic_analytics', 'lead_capture', 'email_support',
      'ai_lead_scoring', 'custom_branding', 'automated_reports',
      'property_valuation', 'client_portal', 'social_automation',
      'team_management', 'api_integration', 'custom_domain',
      'white_label', 'priority_support'
    ],
    limits: { agents: -1, clients: -1, reports: -1, apiCalls: -1 } // unlimited
  }
];

export const SubscriptionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [tier, setTier] = useState<SubscriptionTier | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock subscription data - in real app, fetch from API
    const mockSubscription: UserSubscription = {
      id: '1',
      user_id: 'user-1',
      tier_id: 'professional',
      status: 'active',
      current_period_start: new Date().toISOString(),
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const userTier = SUBSCRIPTION_TIERS.find(t => t.id === mockSubscription.tier_id);
    
    setSubscription(mockSubscription);
    setTier(userTier || null);
    setLoading(false);
  }, []);

  const hasFeature = (feature: string): boolean => {
    return tier?.features.includes(feature) || false;
  };

  const isWithinLimit = (limitType: string, currentUsage: number): boolean => {
    if (!tier) return false;
    const limit = tier.limits[limitType as keyof typeof tier.limits];
    return limit === -1 || (limit !== undefined && currentUsage < limit);
  };

  return (
    <SubscriptionContext.Provider value={{
      subscription,
      tier,
      hasFeature,
      isWithinLimit,
      loading
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = (): SubscriptionContextType => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
