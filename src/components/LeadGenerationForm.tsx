
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useDarkMode } from '../contexts/DarkModeContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { supabase } from '../integrations/supabase/client';
import { useToast } from '../hooks/use-toast';
import { Download, TrendingUp, MapPin, DollarSign, Mail, User, Phone } from 'lucide-react';

const LeadGenerationForm: React.FC = () => {
  const { language, t } = useLanguage();
  const { dark_mode } = useDarkMode();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    phone: '',
    user_type: '',
    interest_location: '',
    budget_range: '',
    report_type: 'market_overview'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.full_name) {
      toast({
        title: language === 'sq' ? 'Gabim' : 'Error',
        description: language === 'sq' ? 'Ju lutem plotësoni të gjitha fushat e detyrueshme.' : 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('lead_generation')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: language === 'sq' ? 'Sukses!' : 'Success!',
        description: language === 'sq' 
          ? 'Raporti juaj i tregut do të dërgohet së shpejti në email.' 
          : 'Your market report will be sent to your email shortly.',
      });

      setFormData({
        email: '',
        full_name: '',
        phone: '',
        user_type: '',
        interest_location: '',
        budget_range: '',
        report_type: 'market_overview'
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: language === 'sq' ? 'Gabim' : 'Error',
        description: language === 'sq' 
          ? 'Ndodhi një gabim. Ju lutem provoni përsëri.' 
          : 'Something went wrong. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: <TrendingUp className="h-6 w-6 text-albania-red" />,
      title: language === 'sq' ? 'Trendet e Tregut' : 'Market Trends',
      description: language === 'sq' ? 'Analizë e detajuar e çmimeve dhe prognozave' : 'Detailed price analysis and forecasts'
    },
    {
      icon: <MapPin className="h-6 w-6 text-albania-red" />,
      title: language === 'sq' ? 'Zonat më të Mira' : 'Best Areas',
      description: language === 'sq' ? 'Identifikimi i zonave me potencial investimi' : 'Identify high-potential investment areas'
    },
    {
      icon: <DollarSign className="h-6 w-6 text-albania-red" />,
      title: language === 'sq' ? 'Analiza ROI' : 'ROI Analysis',
      description: language === 'sq' ? 'Kthimi i investimit për zona të ndryshme' : 'Investment returns across different areas'
    }
  ];

  return (
    <div className={`py-16 ${dark_mode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-white'}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-albania-red to-red-600 bg-clip-text text-transparent">
              {language === 'sq' ? 'Merrni Raportin Falas të Tregut' : 'Get Your Free Market Report'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {language === 'sq' 
                ? 'Analiza ekskluzive të tregut të pasurive të paluajtshme në Shqipëri, të personalizuara për nevojat tuaja të investimit.'
                : 'Exclusive Albanian real estate market analysis, personalized for your investment needs.'}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Benefits Section */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 dark:text-white">
                  {language === 'sq' ? 'Çfarë do të merrni:' : 'What you\'ll receive:'}
                </h3>
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 p-3 bg-albania-red/10 rounded-xl">
                        {benefit.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2 dark:text-white">{benefit.title}</h4>
                        <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-albania-red/5 to-red-500/5 dark:from-albania-red/10 dark:to-red-500/10 p-6 rounded-2xl border border-albania-red/20">
                <div className="flex items-center gap-3 mb-3">
                  <Download className="h-5 w-5 text-albania-red" />
                  <span className="font-semibold text-albania-red">
                    {language === 'sq' ? '100% Falas' : '100% Free'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'sq' 
                    ? 'Asnjë kartë krediti nuk kërkohet. Merrni qasje të menjëhershme në të dhënat më të fundit të tregut.'
                    : 'No credit card required. Get instant access to the latest market data.'}
                </p>
              </div>
            </div>

            {/* Form Section */}
            <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold">
                  {language === 'sq' ? 'Dërgo Kërkesën' : 'Request Report'}
                </CardTitle>
                <CardDescription>
                  {language === 'sq' 
                    ? 'Plotësoni formën për të marrë raportin tuaj të personalizuar'
                    : 'Fill out the form to receive your personalized report'}
                </CardDescription>
              </CardHeader>
              
              <Separator className="mb-6" />
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <User className="h-4 w-4 text-albania-red" />
                        {language === 'sq' ? 'Emri i Plotë *' : 'Full Name *'}
                      </label>
                      <Input
                        type="text"
                        value={formData.full_name}
                        onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                        placeholder={language === 'sq' ? 'Shkruani emrin tuaj' : 'Enter your name'}
                        className="rounded-xl border-2 focus:border-albania-red"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Mail className="h-4 w-4 text-albania-red" />
                        {language === 'sq' ? 'Email *' : 'Email *'}
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder={language === 'sq' ? 'example@email.com' : 'example@email.com'}
                        className="rounded-xl border-2 focus:border-albania-red"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Phone className="h-4 w-4 text-albania-red" />
                      {language === 'sq' ? 'Telefoni' : 'Phone'}
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder={language === 'sq' ? '+355...' : '+355...'}
                      className="rounded-xl border-2 focus:border-albania-red"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        {language === 'sq' ? 'Lloji i Investitorit' : 'Investor Type'}
                      </label>
                      <Select value={formData.user_type} onValueChange={(value) => setFormData({...formData, user_type: value})}>
                        <SelectTrigger className="rounded-xl border-2 focus:border-albania-red">
                          <SelectValue placeholder={language === 'sq' ? 'Zgjidhni llojin' : 'Select type'} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="buyer">{language === 'sq' ? 'Blerës i Parë' : 'First-time Buyer'}</SelectItem>
                          <SelectItem value="investor">{language === 'sq' ? 'Investitor' : 'Investor'}</SelectItem>
                          <SelectItem value="agent">{language === 'sq' ? 'Agent' : 'Agent'}</SelectItem>
                          <SelectItem value="developer">{language === 'sq' ? 'Zhvillues' : 'Developer'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        {language === 'sq' ? 'Zona e Interesit' : 'Area of Interest'}
                      </label>
                      <Select value={formData.interest_location} onValueChange={(value) => setFormData({...formData, interest_location: value})}>
                        <SelectTrigger className="rounded-xl border-2 focus:border-albania-red">
                          <SelectValue placeholder={language === 'sq' ? 'Zgjidhni zonën' : 'Select area'} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tirana">{language === 'sq' ? 'Tiranë' : 'Tirana'}</SelectItem>
                          <SelectItem value="durres">{language === 'sq' ? 'Durrës' : 'Durres'}</SelectItem>
                          <SelectItem value="vlore">{language === 'sq' ? 'Vlorë' : 'Vlora'}</SelectItem>
                          <SelectItem value="sarande">{language === 'sq' ? 'Sarandë' : 'Saranda'}</SelectItem>
                          <SelectItem value="shkoder">{language === 'sq' ? 'Shkodër' : 'Shkodra'}</SelectItem>
                          <SelectItem value="all">{language === 'sq' ? 'Të gjitha' : 'All Areas'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {language === 'sq' ? 'Buxheti' : 'Budget Range'}
                    </label>
                    <Select value={formData.budget_range} onValueChange={(value) => setFormData({...formData, budget_range: value})}>
                      <SelectTrigger className="rounded-xl border-2 focus:border-albania-red">
                        <SelectValue placeholder={language === 'sq' ? 'Zgjidhni buxhetin' : 'Select budget'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-50k">€0 - €50,000</SelectItem>
                        <SelectItem value="50k-100k">€50,000 - €100,000</SelectItem>
                        <SelectItem value="100k-200k">€100,000 - €200,000</SelectItem>
                        <SelectItem value="200k-500k">€200,000 - €500,000</SelectItem>
                        <SelectItem value="500k+">{language === 'sq' ? 'Mbi €500,000' : '€500,000+'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-albania-red to-red-600 hover:from-albania-red/90 hover:to-red-600/90 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isSubmitting ? (
                      language === 'sq' ? 'Duke dërguar...' : 'Sending...'
                    ) : (
                      <>
                        <Download className="h-5 w-5 mr-2" />
                        {language === 'sq' ? 'Merr Raportin Falas' : 'Get Free Report'}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadGenerationForm;
