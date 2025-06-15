
export interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  billingPeriod: 'monthly' | 'yearly';
  features: string[];
  limits: {
    agents?: number;
    clients?: number;
    reports?: number;
    apiCalls?: number;
  };
}

export interface UserSubscription {
  id: string;
  user_id: string;
  tier_id: string;
  status: 'active' | 'inactive' | 'trial' | 'cancelled';
  current_period_start: string;
  current_period_end: string;
  trial_end?: string;
  created_at: string;
  updated_at: string;
}

export interface CompanyProfile {
  id: string;
  user_id: string;
  company_name: string;
  logo_url?: string;
  primary_color: string;
  secondary_color: string;
  website?: string;
  phone?: string;
  address?: string;
  custom_domain?: string;
  created_at: string;
  updated_at: string;
}
