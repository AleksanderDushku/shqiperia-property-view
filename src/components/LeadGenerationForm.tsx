
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { supabase } from '../integrations/supabase/client';
import { useToast } from '../hooks/use-toast';
import { Download, Mail } from 'lucide-react';

const LeadGenerationForm: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [loading, set_loading] = useState(false);
  const [form_data, set_form_data] = useState({
    email: '',
    full_name: '',
    phone: '',
    user_type: '',
    interest_location: '',
    budget_range: '',
    report_type: 'market_overview'
  });

  const handle_submit = async (e: React.FormEvent) => {
    e.preventDefault();
    set_loading(true);

    try {
      const { error } = await supabase
        .from('lead_generation')
        .insert([form_data]);

      if (error) {
        throw error;
      }

      toast({
        title: "Success!",
        description: "Your free market report will be sent to your email shortly.",
      });

      // Reset form
      set_form_data({
        email: '',
        full_name: '',
        phone: '',
        user_type: '',
        interest_location: '',
        budget_range: '',
        report_type: 'market_overview'
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again.",
        variant: "destructive",
      });
    } finally {
      set_loading(false);
    }
  };

  const handle_change = (field: string, value: string) => {
    set_form_data(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="bg-gradient-to-br from-albania-red/5 to-albania-red/10 border-albania-red/20">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 p-3 bg-albania-red/10 rounded-full w-fit">
          <Download className="h-8 w-8 text-albania-red" />
        </div>
        <CardTitle className="text-2xl text-albania-red">
          {t('Get Your FREE Market Report')}
        </CardTitle>
        <p className="text-gray-600 dark:text-gray-400">
          {t('Comprehensive property market analysis for Albania - delivered to your inbox')}
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handle_submit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name *</Label>
              <Input
                id="full_name"
                type="text"
                value={form_data.full_name}
                onChange={(e) => handle_change('full_name', e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={form_data.email}
                onChange={(e) => handle_change('email', e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="user_type">I am a...</Label>
              <Select value={form_data.user_type} onValueChange={(value) => handle_change('user_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your profile" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buyer">First-time Buyer</SelectItem>
                  <SelectItem value="investor">Property Investor</SelectItem>
                  <SelectItem value="agent">Real Estate Agent</SelectItem>
                  <SelectItem value="developer">Developer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="interest_location">Location of Interest</Label>
              <Select value={form_data.interest_location} onValueChange={(value) => handle_change('interest_location', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tirana">Tirana</SelectItem>
                  <SelectItem value="durres">Durrës</SelectItem>
                  <SelectItem value="vlore">Vlorë</SelectItem>
                  <SelectItem value="shkoder">Shkodër</SelectItem>
                  <SelectItem value="elbasan">Elbasan</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget_range">Budget Range (EUR)</Label>
            <Select value={form_data.budget_range} onValueChange={(value) => handle_change('budget_range', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under-50k">Under €50,000</SelectItem>
                <SelectItem value="50k-100k">€50,000 - €100,000</SelectItem>
                <SelectItem value="100k-200k">€100,000 - €200,000</SelectItem>
                <SelectItem value="200k-500k">€200,000 - €500,000</SelectItem>
                <SelectItem value="500k-plus">€500,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-albania-red hover:bg-albania-red/90 text-white font-semibold py-3"
            disabled={loading}
          >
            {loading ? (
              'Processing...'
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Get My Free Report
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default LeadGenerationForm;
