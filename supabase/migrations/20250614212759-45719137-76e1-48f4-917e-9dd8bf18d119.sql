
-- Create user profiles table to store additional user information
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  website TEXT,
  bio TEXT,
  user_type TEXT DEFAULT 'individual' CHECK (user_type IN ('individual', 'investor', 'agent', 'developer')),
  phone TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create property watchlist table
CREATE TABLE public.property_watchlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  property_type TEXT,
  location TEXT,
  min_price INTEGER,
  max_price INTEGER,
  min_size INTEGER,
  max_size INTEGER,
  alert_frequency TEXT DEFAULT 'weekly' CHECK (alert_frequency IN ('daily', 'weekly', 'monthly')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on watchlist
ALTER TABLE public.property_watchlist ENABLE ROW LEVEL SECURITY;

-- Create policies for watchlist
CREATE POLICY "Users can view their own watchlist" ON public.property_watchlist
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own watchlist items" ON public.property_watchlist
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own watchlist items" ON public.property_watchlist
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own watchlist items" ON public.property_watchlist
  FOR DELETE USING (auth.uid() = user_id);

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create lead generation table for market reports
CREATE TABLE public.lead_generation (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  user_type TEXT CHECK (user_type IN ('buyer', 'investor', 'agent', 'developer')),
  interest_location TEXT,
  budget_range TEXT,
  report_type TEXT DEFAULT 'market_overview',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on lead generation
ALTER TABLE public.lead_generation ENABLE ROW LEVEL SECURITY;

-- Allow public access for lead generation (form submissions)
CREATE POLICY "Anyone can submit lead generation forms" ON public.lead_generation
  FOR INSERT WITH CHECK (true);

-- Only authenticated users can view leads (for admin purposes)
CREATE POLICY "Authenticated users can view leads" ON public.lead_generation
  FOR SELECT TO authenticated USING (true);
