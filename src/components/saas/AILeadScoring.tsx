
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Brain, TrendingUp, User, Phone, Mail, Calendar, Star } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { FeatureGate } from './FeatureGate';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  score: number;
  tier: 'hot' | 'warm' | 'cold';
  interests: string[];
  lastActivity: string;
  predictedAction: string;
  timeframe: string;
}

const AILeadScoring: React.FC = () => {
  const { t } = useLanguage();
  
  const mockLeads: Lead[] = [
    {
      id: '1',
      name: 'Maria Koci',
      email: 'maria.koci@email.com',
      phone: '+355 69 123 4567',
      score: 92,
      tier: 'hot',
      interests: ['Apartment', 'Tirana Center', '€150k-200k'],
      lastActivity: '2 hours ago',
      predictedAction: 'Ready to buy',
      timeframe: 'Within 2 weeks'
    },
    {
      id: '2',
      name: 'Andi Hoxha',
      email: 'andi.hoxha@email.com',
      phone: '+355 69 234 5678',
      score: 78,
      tier: 'warm',
      interests: ['House', 'Durres', '€100k-150k'],
      lastActivity: '1 day ago',
      predictedAction: 'Researching options',
      timeframe: 'Within 1 month'
    },
    {
      id: '3',
      name: 'Elena Shehu',
      email: 'elena.shehu@email.com',
      phone: '+355 69 345 6789',
      score: 45,
      tier: 'cold',
      interests: ['Land', 'Vlore', '€50k-100k'],
      lastActivity: '1 week ago',
      predictedAction: 'Early exploration',
      timeframe: 'Within 6 months'
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'hot': return <Star className="h-4 w-4 text-red-500" />;
      case 'warm': return <TrendingUp className="h-4 w-4 text-yellow-500" />;
      default: return <User className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <FeatureGate feature="ai_lead_scoring">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              {t('AI Lead Scoring Dashboard')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">12</div>
                <div className="text-sm text-gray-600">{t('Hot Leads')}</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">28</div>
                <div className="text-sm text-gray-600">{t('Warm Leads')}</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">45</div>
                <div className="text-sm text-gray-600">{t('Cold Leads')}</div>
              </div>
            </div>

            <Tabs defaultValue="leads" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="leads">{t('Lead List')}</TabsTrigger>
                <TabsTrigger value="analytics">{t('Analytics')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="leads" className="space-y-4">
                {mockLeads.map((lead) => (
                  <Card key={lead.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {getTierIcon(lead.tier)}
                          <div>
                            <h3 className="font-semibold">{lead.name}</h3>
                            <p className="text-sm text-gray-600">{lead.email}</p>
                          </div>
                        </div>
                        <Badge className={`px-3 py-1 ${getScoreColor(lead.score)}`}>
                          {lead.score}/100
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">{t('Interests')}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {lead.interests.map((interest, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">{t('Predicted Action')}</p>
                          <p className="text-sm text-gray-600">{lead.predictedAction}</p>
                          <p className="text-xs text-gray-500">{lead.timeframe}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {t('Last Activity')}: {lead.lastActivity}
                        </span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Phone className="h-3 w-3 mr-1" />
                            {t('Call')}
                          </Button>
                          <Button size="sm" variant="outline">
                            <Mail className="h-3 w-3 mr-1" />
                            {t('Email')}
                          </Button>
                          <Button size="sm">
                            <Calendar className="h-3 w-3 mr-1" />
                            {t('Schedule')}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="analytics" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t('Conversion Rates')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{t('Hot Leads')}</span>
                          <span>78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{t('Warm Leads')}</span>
                          <span>45%</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{t('Cold Leads')}</span>
                          <span>12%</span>
                        </div>
                        <Progress value={12} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t('Lead Sources')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Website</span>
                        <Badge>45%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Social Media</span>
                        <Badge>28%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Referrals</span>
                        <Badge>18%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Direct</span>
                        <Badge>9%</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </FeatureGate>
  );
};

export default AILeadScoring;
