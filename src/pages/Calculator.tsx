
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import MortgageCalculator from '../components/MortgageCalculator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Calculator, TrendingUp, Building, Zap, Brain, Target } from 'lucide-react';
import { Badge } from '../components/ui/badge';

const CalculatorPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg mb-6">
            <Brain className="h-5 w-5 animate-pulse" />
            <span className="font-semibold">{t('Llogaritës i Zgjuar')} - AI</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 bg-clip-text text-transparent mb-4">
            {t('Llogaritës Financiar')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('Planifikoni investimin tuaj në pronë me llogaritësit tanë financiarë të avancuar')}
          </p>
        </div>

        <Card className="bg-white shadow-2xl border-0 rounded-3xl overflow-hidden mb-8">
          <Tabs defaultValue="mortgage" className="w-full">
            <div className="bg-gradient-to-r from-gray-50 to-white p-2">
              <TabsList className="grid grid-cols-2 h-auto p-1 bg-transparent">
                <TabsTrigger 
                  value="mortgage" 
                  className="flex items-center gap-3 py-4 px-6 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-xl transition-all duration-300 data-[state=active]:shadow-lg"
                >
                  <Calculator className="h-5 w-5" />
                  {t('Llogaritës Kredish')}
                </TabsTrigger>
                <TabsTrigger 
                  value="investment" 
                  className="flex items-center gap-3 py-4 px-6 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white rounded-xl transition-all duration-300 data-[state=active]:shadow-lg"
                >
                  <TrendingUp className="h-5 w-5" />
                  {t('Kthimi i Investimit')}
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="mortgage" className="p-8 space-y-8">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-2xl p-8 border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-8 w-8 text-blue-600" />
                  <h2 className="text-3xl font-bold text-blue-700">{t('Llogaritës Kredish')}</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t('Llogaritni me saktësi pagesat mujore dhe koston totale të kredisë për pronën tuaj')}
                </p>
              </div>

              <MortgageCalculator />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-blue-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-600" />
                      {t('Si Funksionon?')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {t('Llogaritësi i kredisë ju ndihmon të kuptoni se sa do të kushtojë një kredi hipotekore bazuar në çmimin e pronës, pagesën fillestare, normën e interesit dhe afatin e kredisë.')}
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-green-50 to-emerald-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-green-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Building className="h-5 w-5 text-green-600" />
                      {t('Këshilla për Kredi')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-gray-700 text-sm space-y-2 list-disc pl-4">
                      <li>{t('Zgjidhni një kredi me normë interesi fikse për stabilitet afatgjatë')}</li>
                      <li>{t('Jepni një pagesë fillestare sa më të madhe që të mundeni')}</li>
                      <li>{t('Krahasoni ofertat e kredive nga disa banka të ndryshme')}</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-purple-50 to-violet-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-purple-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-purple-600" />
                      {t('Normat Aktuale')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-purple-200">
                        <span className="text-sm font-medium">{t('Norma Bazë')}</span>
                        <Badge className="bg-purple-100 text-purple-800 border-purple-200">2.75%</Badge>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-purple-200">
                        <span className="text-sm font-medium">{t('Kredi Afatgjatë')}</span>
                        <Badge className="bg-purple-100 text-purple-800 border-purple-200">3.50-4.25%</Badge>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-purple-200">
                        <span className="text-sm font-medium">{t('Kredi Afatmesme')}</span>
                        <Badge className="bg-purple-100 text-purple-800 border-purple-200">3.10-3.85%</Badge>
                      </div>
                      <div className="text-xs text-gray-500 mt-3 text-center">
                        {t('Përditësuar më')}: {new Date().toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="investment" className="p-8">
              <div className="bg-gradient-to-r from-green-50 to-emerald-100 rounded-2xl p-8 border border-green-200">
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-lg mb-6">
                    <Building className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-700 mb-4">{t('Duke Ardhur së Shpejti!')}</h3>
                  <p className="text-gray-700 max-w-md leading-relaxed">
                    {t('Llogaritësi i kthimit të investimit është në zhvillim e sipër dhe do të jetë i disponueshëm së shpejti!')}
                  </p>
                  <Badge className="mt-4 bg-green-100 text-green-800 border-green-200 px-4 py-2">
                    {t('Së Shpejti')}
                  </Badge>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default CalculatorPage;
