
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Building2, Percent, Clock, Phone, Globe, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useDarkMode } from '../contexts/DarkModeContext';

interface BankData {
  name: string;
  logo: string;
  mortgage_rate: {
    min: number;
    max: number;
  };
  down_payment_min: number;
  max_term_years: number;
  processing_time_days: number;
  rating: number;
  contact: {
    phone: string;
    website: string;
  };
  special_offers: string[];
  requirements: string[];
  features: string[];
}

const albanianBanks: BankData[] = [
  {
    name: 'Raiffeisen Bank Albania',
    logo: '🏦',
    mortgage_rate: { min: 3.2, max: 4.8 },
    down_payment_min: 20,
    max_term_years: 30,
    processing_time_days: 14,
    rating: 4.5,
    contact: {
      phone: '+355 4 2381 381',
      website: 'www.raiffeisen.al'
    },
    special_offers: [
      'First-time buyer discount: -0.3%',
      'Green building certification: -0.2%',
      'Salary account bonus: -0.1%'
    ],
    requirements: [
      'Minimum 3 months employment',
      'Debt-to-income ratio < 50%',
      'Life insurance required'
    ],
    features: [
      'Online application',
      'Express approval',
      'Multi-currency options'
    ]
  },
  {
    name: 'Banka Kombëtare Tregtare (BKT)',
    logo: '🏛️',
    mortgage_rate: { min: 3.5, max: 5.2 },
    down_payment_min: 15,
    max_term_years: 25,
    processing_time_days: 21,
    rating: 4.2,
    contact: {
      phone: '+355 4 2419 419',
      website: 'www.bkt.com.al'
    },
    special_offers: [
      'Young professionals (under 35): -0.2%',
      'Property in Tirana center: -0.1%',
      'Existing customers: -0.15%'
    ],
    requirements: [
      'Minimum 6 months employment',
      'Property valuation required',
      'Income verification'
    ],
    features: [
      'Flexible payment schedule',
      'Grace period options',
      'Investment property loans'
    ]
  },
  {
    name: 'Alpha Bank Albania',
    logo: '🅰️',
    mortgage_rate: { min: 3.1, max: 4.6 },
    down_payment_min: 25,
    max_term_years: 30,
    processing_time_days: 10,
    rating: 4.6,
    contact: {
      phone: '+355 4 2280 000',
      website: 'www.alphabank.al'
    },
    special_offers: [
      'Premium banking clients: -0.4%',
      'Energy-efficient homes: -0.25%',
      'Quick approval in 7 days'
    ],
    requirements: [
      'Minimum salary 60,000 ALL/month',
      'Stable employment history',
      'Property insurance mandatory'
    ],
    features: [
      'Premium customer service',
      'Mobile banking integration',
      'Foreign currency loans'
    ]
  },
  {
    name: 'Credins Bank',
    logo: '💳',
    mortgage_rate: { min: 3.8, max: 5.5 },
    down_payment_min: 20,
    max_term_years: 20,
    processing_time_days: 18,
    rating: 4.0,
    contact: {
      phone: '+355 4 2234 096',
      website: 'www.credins.al'
    },
    special_offers: [
      'Diaspora special rates',
      'Construction loans available',
      'No early payment penalties'
    ],
    requirements: [
      'Age limit: 70 years at maturity',
      'Regular income proof',
      'Collateral evaluation'
    ],
    features: [
      'Diaspora-friendly process',
      'Construction financing',
      'Flexible terms'
    ]
  },
  {
    name: 'Intesa Sanpaolo Bank Albania',
    logo: '🇮🇹',
    mortgage_rate: { min: 3.3, max: 4.9 },
    down_payment_min: 30,
    max_term_years: 30,
    processing_time_days: 12,
    rating: 4.4,
    contact: {
      phone: '+355 4 2259 259',
      website: 'www.intesasanpaolobank.al'
    },
    special_offers: [
      'Italian residents special program',
      'Luxury property financing',
      'Multi-generational loans'
    ],
    requirements: [
      'Higher income threshold',
      'International credit check',
      'Premium property only'
    ],
    features: [
      'International expertise',
      'Luxury property specialist',
      'Cross-border services'
    ]
  },
  {
    name: 'ProCredit Bank',
    logo: '💰',
    mortgage_rate: { min: 4.0, max: 5.8 },
    down_payment_min: 25,
    max_term_years: 20,
    processing_time_days: 15,
    rating: 3.8,
    contact: {
      phone: '+355 4 2280 555',
      website: 'www.procreditbank.com.al'
    },
    special_offers: [
      'SME owners preferential rates',
      'Green building incentives',
      'Quick decision process'
    ],
    requirements: [
      'Business income considered',
      'Environmental compliance',
      'Transparent income source'
    ],
    features: [
      'Business-oriented approach',
      'Sustainable financing',
      'Personal relationship banking'
    ]
  }
];

const AlbanianBanksEnhanced: React.FC = () => {
  const { t } = useLanguage();
  const { dark_mode } = useDarkMode();
  const [selected_bank, set_selected_bank] = useState<string | null>(null);
  const [sort_by, set_sort_by] = useState<'rate' | 'rating' | 'speed'>('rate');

  const sorted_banks = [...albanianBanks].sort((a, b) => {
    switch (sort_by) {
      case 'rate':
        return a.mortgage_rate.min - b.mortgage_rate.min;
      case 'rating':
        return b.rating - a.rating;
      case 'speed':
        return a.processing_time_days - b.processing_time_days;
      default:
        return 0;
    }
  });

  const render_stars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">{t('Albanian Banks Mortgage Comparison')}</h2>
        <p className="text-gray-600 dark:text-gray-400">
          {t('Compare mortgage rates, terms, and features from leading Albanian banks')}
        </p>
      </div>

      {/* Sort Controls */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        <Button
          variant={sort_by === 'rate' ? 'default' : 'outline'}
          size="sm"
          onClick={() => set_sort_by('rate')}
          className={sort_by === 'rate' ? 'bg-albania-red text-white' : ''}
        >
          <Percent className="h-4 w-4 mr-1" />
          {t('Best Rates')}
        </Button>
        <Button
          variant={sort_by === 'rating' ? 'default' : 'outline'}
          size="sm"
          onClick={() => set_sort_by('rating')}
          className={sort_by === 'rating' ? 'bg-albania-red text-white' : ''}
        >
          <Star className="h-4 w-4 mr-1" />
          {t('Top Rated')}
        </Button>
        <Button
          variant={sort_by === 'speed' ? 'default' : 'outline'}
          size="sm"
          onClick={() => set_sort_by('speed')}
          className={sort_by === 'speed' ? 'bg-albania-red text-white' : ''}
        >
          <Clock className="h-4 w-4 mr-1" />
          {t('Fastest Approval')}
        </Button>
      </div>

      {/* Banks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sorted_banks.map((bank, index) => (
          <Card 
            key={bank.name} 
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selected_bank === bank.name ? 'ring-2 ring-albania-red' : ''
            } ${dark_mode ? 'border-gray-700' : ''}`}
            onClick={() => set_selected_bank(selected_bank === bank.name ? null : bank.name)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{bank.logo}</span>
                  <div>
                    <CardTitle className="text-sm leading-tight">{bank.name}</CardTitle>
                    <div className="flex items-center gap-1 mt-1">
                      {render_stars(bank.rating)}
                      <span className="text-xs text-gray-500 ml-1">({bank.rating})</span>
                    </div>
                  </div>
                </div>
                {index === 0 && (
                  <Badge className="bg-albania-red text-white text-xs">
                    {sort_by === 'rate' && t('Best Rate')}
                    {sort_by === 'rating' && t('Top Rated')}
                    {sort_by === 'speed' && t('Fastest')}
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500 block">{t('Interest Rate')}</span>
                  <span className="font-semibold text-albania-red">
                    {bank.mortgage_rate.min}% - {bank.mortgage_rate.max}%
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">{t('Down Payment')}</span>
                  <span className="font-semibold">{bank.down_payment_min}% {t('min')}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">{t('Max Term')}</span>
                  <span className="font-semibold">{bank.max_term_years} {t('years')}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">{t('Processing Time')}</span>
                  <span className="font-semibold">{bank.processing_time_days} {t('days')}</span>
                </div>
              </div>

              {selected_bank === bank.name && (
                <Tabs defaultValue="offers" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="offers" className="text-xs">{t('Offers')}</TabsTrigger>
                    <TabsTrigger value="requirements" className="text-xs">{t('Requirements')}</TabsTrigger>
                    <TabsTrigger value="contact" className="text-xs">{t('Contact')}</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="offers" className="space-y-2">
                    {bank.special_offers.map((offer, idx) => (
                      <div key={idx} className="text-xs p-2 bg-green-50 dark:bg-green-900/20 rounded">
                        ✓ {offer}
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="requirements" className="space-y-2">
                    {bank.requirements.map((req, idx) => (
                      <div key={idx} className="text-xs p-2 bg-gray-50 dark:bg-gray-800 rounded">
                        • {req}
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="contact" className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <Phone className="h-3 w-3" />
                      <span>{bank.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Globe className="h-3 w-3" />
                      <span>{bank.contact.website}</span>
                    </div>
                  </TabsContent>
                </Tabs>
              )}

              <div className="flex flex-wrap gap-1 mt-2">
                {bank.features.slice(0, 2).map((feature, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
                {bank.features.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{bank.features.length - 2} {t('more')}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Comparison Table */}
      <Card className={`${dark_mode ? 'border-gray-700' : ''}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-albania-red" />
            {t('Quick Comparison')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">{t('Bank')}</th>
                  <th className="text-center p-2">{t('Min Rate')}</th>
                  <th className="text-center p-2">{t('Down Payment')}</th>
                  <th className="text-center p-2">{t('Processing')}</th>
                  <th className="text-center p-2">{t('Rating')}</th>
                </tr>
              </thead>
              <tbody>
                {sorted_banks.map((bank) => (
                  <tr key={bank.name} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="p-2 font-medium">{bank.name}</td>
                    <td className="text-center p-2 text-albania-red font-semibold">
                      {bank.mortgage_rate.min}%
                    </td>
                    <td className="text-center p-2">{bank.down_payment_min}%</td>
                    <td className="text-center p-2">{bank.processing_time_days} {t('days')}</td>
                    <td className="text-center p-2">
                      <div className="flex items-center justify-center gap-1">
                        {render_stars(bank.rating)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlbanianBanksEnhanced;
