
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import { ExternalLink, BarChartHorizontal, Database } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useDarkMode } from '../contexts/DarkModeContext';
import { Separator } from './ui/separator';

const INSTATDataSource: React.FC = () => {
  const { t, language } = useLanguage();
  const { dark_mode } = useDarkMode();
  
  // List of INSTAT data categories
  const dataCategories = [
    { 
      id: 'economy', 
      name: language === 'sq' ? 'Ekonomi dhe Financa' : 'Economy and Finance',
      datasets: language === 'sq' ? ['PBB', 'Çmimet e banesave', 'Investime'] : ['GDP', 'Housing prices', 'Investments'],
      updated: '2024-04-02'
    },
    { 
      id: 'population', 
      name: language === 'sq' ? 'Popullsia dhe Strehimi' : 'Population and Housing',
      datasets: language === 'sq' ? ['Regjistrimi i popullsisë', 'Strehimi'] : ['Census', 'Housing'],
      updated: '2024-03-15'
    },
    { 
      id: 'construction', 
      name: language === 'sq' ? 'Ndërtimi dhe Prona' : 'Construction and Property',
      datasets: language === 'sq' ? ['Lejet e ndërtimit', 'Të dhëna mbi pronat'] : ['Building permits', 'Property data'],
      updated: '2024-03-28'
    }
  ];

  return (
    <Card className={`w-full overflow-hidden transition-all duration-300 ${dark_mode ? 'border-gray-700 hover:border-gray-600' : 'hover:shadow-md'}`}>
      <CardHeader className={`flex flex-row items-center justify-between pb-2 ${dark_mode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="flex items-center">
          <Database className="h-5 w-5 text-albania-red mr-2" />
          <CardTitle className="text-base md:text-lg">
            {language === 'sq' ? 'Të dhëna nga INSTAT' : 'Data from INSTAT'}
          </CardTitle>
        </div>
        <Button variant="link" size="sm" className="text-albania-red" onClick={() => window.open('https://www.instat.gov.al/en/', '_blank')}>
          <ExternalLink className="h-4 w-4 mr-1" />
          {language === 'sq' ? 'Vizito' : 'Visit'}
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        <CardDescription className="mb-4 text-sm">
          {language === 'sq' 
            ? 'Të dhënat tona bazohen në statistikat zyrtare nga Instituti i Statistikave të Shqipërisë (INSTAT).'
            : 'Our data is based on official statistics from the Institute of Statistics of Albania (INSTAT).'}
        </CardDescription>
        
        <div className="space-y-4">
          {dataCategories.map((category) => (
            <div key={category.id} className={`p-3 rounded-md ${dark_mode ? 'bg-gray-700/40' : 'bg-gray-50'}`}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{category.name}</h3>
                <Badge variant={dark_mode ? "outline" : "secondary"} className={dark_mode ? "bg-gray-600 text-gray-200" : ""}>
                  {language === 'sq' ? 'Përditësuar' : 'Updated'}: {category.updated}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {category.datasets.map((dataset, i) => (
                  <Badge key={i} variant="outline" className={dark_mode ? "bg-gray-800 border-gray-600" : "bg-white"}>
                    {dataset}
                  </Badge>
                ))}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs flex items-center mt-1"
                onClick={() => window.open(`https://www.instat.gov.al/en/themes/${category.id}/`, '_blank')}
              >
                <BarChartHorizontal className="h-3 w-3 mr-1" />
                {language === 'sq' ? 'Shiko të dhënat' : 'View data'}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className={`text-xs py-2 px-4 ${dark_mode ? 'bg-gray-800 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
        <div className="flex items-center">
          <ExternalLink className="h-3 w-3 mr-1" />
          <span>
            {language === 'sq' 
              ? 'Të gjitha të dhënat janë sinkronizuar me databazat e INSTAT-it'
              : 'All data is synchronized with INSTAT databases'}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default INSTATDataSource;
