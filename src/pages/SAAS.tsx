
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useDarkMode } from '../contexts/DarkModeContext';
import { SubscriptionProvider } from '../contexts/SubscriptionContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import AILeadScoring from '../components/saas/AILeadScoring';
import CustomBranding from '../components/saas/CustomBranding';
import AutomatedReports from '../components/saas/AutomatedReports';
import PropertyValuation from '../components/saas/PropertyValuation';
import ClientPortal from '../components/saas/ClientPortal';
import SocialMediaAutomation from '../components/saas/SocialMediaAutomation';
import TeamManagement from '../components/saas/TeamManagement';
import APIIntegration from '../components/saas/APIIntegration';
import { Crown, Zap, Users, BarChart3 } from 'lucide-react';

const SAAS: React.FC = () => {
  const { t } = useLanguage();
  const { dark_mode } = useDarkMode();

  return (
    <SubscriptionProvider>
      <div className={`min-h-screen ${dark_mode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex p-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full mb-4">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              {t('PronaStats SAAS Platform')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('Professional real estate tools and analytics for modern agencies and agents')}
            </p>
          </div>

          {/* Feature Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full w-fit mx-auto mb-4">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{t('AI Analytics')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('Advanced market insights')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full w-fit mx-auto mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{t('Automation')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('Streamlined workflows')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full w-fit mx-auto mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{t('Team Management')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('Collaborate effectively')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full w-fit mx-auto mb-4">
                  <Crown className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{t('White Label')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('Custom branding')}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Features Tabs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                {t('Premium SAAS Features')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="lead-scoring" className="w-full">
                <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
                  <TabsTrigger value="lead-scoring">{t('AI Leads')}</TabsTrigger>
                  <TabsTrigger value="branding">{t('Branding')}</TabsTrigger>
                  <TabsTrigger value="reports">{t('Reports')}</TabsTrigger>
                  <TabsTrigger value="valuation">{t('Valuation')}</TabsTrigger>
                  <TabsTrigger value="portal">{t('Client Portal')}</TabsTrigger>
                  <TabsTrigger value="social">{t('Social Media')}</TabsTrigger>
                  <TabsTrigger value="team">{t('Team Mgmt')}</TabsTrigger>
                  <TabsTrigger value="api">{t('API')}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="lead-scoring">
                  <AILeadScoring />
                </TabsContent>
                
                <TabsContent value="branding">
                  <CustomBranding />
                </TabsContent>
                
                <TabsContent value="reports">
                  <AutomatedReports />
                </TabsContent>
                
                <TabsContent value="valuation">
                  <PropertyValuation />
                </TabsContent>
                
                <TabsContent value="portal">
                  <ClientPortal />
                </TabsContent>
                
                <TabsContent value="social">
                  <SocialMediaAutomation />
                </TabsContent>
                
                <TabsContent value="team">
                  <TeamManagement />
                </TabsContent>
                
                <TabsContent value="api">
                  <APIIntegration />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </SubscriptionProvider>
  );
};

export default SAAS;
