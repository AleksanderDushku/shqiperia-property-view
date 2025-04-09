
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import MortgageCalculator from '../components/MortgageCalculator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Calculator, TrendingUp, Building } from 'lucide-react';

const CalculatorPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('Llogaritës financiar')}</h1>
        <p className="text-gray-600">{t('Planifikoni investimin tuaj në pronë me llogaritësit tanë financiarë')}</p>
      </div>

      <Tabs defaultValue="mortgage" className="w-full">
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="mortgage" className="flex items-center gap-2 data-[state=active]:bg-albania-red data-[state=active]:text-white">
            <Calculator className="h-4 w-4" />
            {t('Llogaritës kredish')}
          </TabsTrigger>
          <TabsTrigger value="investment" className="flex items-center gap-2 data-[state=active]:bg-albania-red data-[state=active]:text-white">
            <TrendingUp className="h-4 w-4" />
            {t('Kthimi i investimit')}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="mortgage" className="space-y-8">
          <MortgageCalculator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
              <h3 className="text-lg font-semibold mb-2">{t('Si funksionon?')}</h3>
              <p className="text-gray-600 text-sm">
                {t('Llogaritësi i kredisë ju ndihmon të kuptoni se sa do të kushtojë një kredi hipotekore bazuar në çmimin e pronës, pagesën fillestare, normën e interesit dhe afatin e kredisë.')}
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
              <h3 className="text-lg font-semibold mb-2">{t('Këshilla për kredi')}</h3>
              <ul className="text-gray-600 text-sm space-y-2 list-disc pl-5">
                <li>{t('Zgjidhni një kredi me normë interesi fikse për stabilitet afatgjatë')}</li>
                <li>{t('Jepni një pagesë fillestare sa më të madhe që të mundeni për të zvogëluar kostot totale')}</li>
                <li>{t('Krahasoni ofertat e kredive nga disa banka të ndryshme')}</li>
              </ul>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
              <h3 className="text-lg font-semibold mb-2">{t('Normat aktuale')}</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-sm">{t('Norma bazë e interesit')}</span>
                  <span className="font-medium">2.75%</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-sm">{t('Kredi afatgjatë (20-30 vjet)')}</span>
                  <span className="font-medium">3.50% - 4.25%</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-sm">{t('Kredi afatmesme (10-15 vjet)')}</span>
                  <span className="font-medium">3.10% - 3.85%</span>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  {t('Të dhënat e përditësuara më')}: {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="investment" className="space-y-8">
          <div className="p-8 bg-gray-50 rounded-lg border border-gray-100 text-center">
            <Building className="h-10 w-10 text-albania-red mx-auto mb-4 opacity-70" />
            <h3 className="text-xl font-semibold mb-2">{t('Duke ardhur së shpejti!')}</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {t('Llogaritësi i kthimit të investimit është në zhvillim e sipër dhe do të jetë i disponueshëm së shpejti!')}
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CalculatorPage;
