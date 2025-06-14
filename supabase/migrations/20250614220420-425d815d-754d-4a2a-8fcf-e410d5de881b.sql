
-- Create market_data table to store daily market updates
CREATE TABLE public.market_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  average_price_per_sqm DECIMAL(10,2) NOT NULL,
  total_listings INTEGER NOT NULL,
  quarterly_change DECIMAL(5,2) NOT NULL,
  yearly_change DECIMAL(5,2) NOT NULL,
  most_active_region TEXT NOT NULL,
  growth_regions TEXT[] NOT NULL,
  market_sentiment TEXT NOT NULL CHECK (market_sentiment IN ('bullish', 'bearish', 'neutral')),
  opportunity_index INTEGER NOT NULL CHECK (opportunity_index >= 0 AND opportunity_index <= 100),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create unique index to ensure one record per date
CREATE UNIQUE INDEX idx_market_data_date ON public.market_data(date);

-- Enable RLS
ALTER TABLE public.market_data ENABLE ROW LEVEL SECURITY;

-- Allow public read access to market data (no authentication required)
CREATE POLICY "Anyone can view market data" 
  ON public.market_data 
  FOR SELECT 
  TO public
  USING (true);

-- Create regional_prices table for regional market data
CREATE TABLE public.regional_prices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  region TEXT NOT NULL,
  price_per_sqm DECIMAL(10,2) NOT NULL,
  quarterly_change DECIMAL(5,2) NOT NULL,
  property_count INTEGER NOT NULL,
  market_activity TEXT NOT NULL CHECK (market_activity IN ('high', 'medium', 'low')),
  luxury_percentage DECIMAL(5,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(date, region)
);

-- Create index for efficient queries
CREATE INDEX idx_regional_prices_date_region ON public.regional_prices(date, region);

-- Enable RLS
ALTER TABLE public.regional_prices ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Anyone can view regional prices" 
  ON public.regional_prices 
  FOR SELECT 
  TO public
  USING (true);

-- Enable pg_cron extension for scheduled jobs
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Create function to update daily market data
CREATE OR REPLACE FUNCTION update_daily_market_data()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  -- Insert or update today's market data
  INSERT INTO public.market_data (
    date,
    average_price_per_sqm,
    total_listings,
    quarterly_change,
    yearly_change,
    most_active_region,
    growth_regions,
    market_sentiment,
    opportunity_index
  ) VALUES (
    CURRENT_DATE,
    1850.00 + (RANDOM() * 100 - 50), -- Mock data with variation
    15000 + FLOOR(RANDOM() * 1000),
    5.5 + (RANDOM() * 5 - 2.5),
    12.3 + (RANDOM() * 3 - 1.5),
    'Tiranë',
    ARRAY['Tiranë', 'Vlorë', 'Durrës'],
    CASE 
      WHEN RANDOM() > 0.6 THEN 'bullish'
      WHEN RANDOM() > 0.3 THEN 'neutral'
      ELSE 'bearish'
    END,
    85 + FLOOR(RANDOM() * 15)
  ) ON CONFLICT (date) 
  DO UPDATE SET
    average_price_per_sqm = EXCLUDED.average_price_per_sqm,
    total_listings = EXCLUDED.total_listings,
    quarterly_change = EXCLUDED.quarterly_change,
    yearly_change = EXCLUDED.yearly_change,
    most_active_region = EXCLUDED.most_active_region,
    growth_regions = EXCLUDED.growth_regions,
    market_sentiment = EXCLUDED.market_sentiment,
    opportunity_index = EXCLUDED.opportunity_index,
    updated_at = now();

  -- Insert regional data
  INSERT INTO public.regional_prices (date, region, price_per_sqm, quarterly_change, property_count, market_activity, luxury_percentage)
  VALUES 
    (CURRENT_DATE, 'Tiranë Center', 2100 + (RANDOM() * 200 - 100), 8.5 + (RANDOM() * 3), 1250, 'high', 35.0),
    (CURRENT_DATE, 'Durrës Coast', 1200 + (RANDOM() * 100 - 50), 6.2 + (RANDOM() * 2), 890, 'medium', 25.0),
    (CURRENT_DATE, 'Vlorë Bay', 1450 + (RANDOM() * 150 - 75), 15.7 + (RANDOM() * 3), 420, 'high', 40.0),
    (CURRENT_DATE, 'Sarandë Riviera', 1650 + (RANDOM() * 200 - 100), 18.2 + (RANDOM() * 2), 320, 'high', 60.0)
  ON CONFLICT (date, region) DO NOTHING;
END;
$$;

-- Schedule the job to run daily at 6 AM
SELECT cron.schedule(
  'daily-market-update',
  '0 6 * * *',
  'SELECT update_daily_market_data();'
);

-- Insert initial data
SELECT update_daily_market_data();
