
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar, TrendingUp, ArrowUpDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const SeasonalMarketAnalysis: React.FC = () => {
  const { t } = useLanguage();
  const [selectedYear, setSelectedYear] = useState<string>("2023");
  
  // Sample seasonal data by quarter
  const quarterlyData = [
    { name: 'Q1', '2022': 1100, '2023': 1150, '2024': 1190 },
    { name: 'Q2', '2022': 1200, '2023': 1300, '2024': 1380 },
    { name: 'Q3', '2022': 1180, '2023': 1250, '2024': null },
    { name: 'Q4', '2022': 1130, '2023': 1200, '2024': null },
  ];
  
  // Sample monthly data
  const monthlyData = [
    { name: t('Janar'), value: 1150, change: -2.5, volume: 580 },
    { name: t('Shkurt'), value: 1160, change: 0.9, volume: 620 },
    { name: t('Mars'), value: 1180, change: 1.7, volume: 690 },
    { name: t('Prill'), value: 1210, change: 2.5, volume: 750 },
    { name: t('Maj'), value: 1270, change: 5.0, volume: 890 },
    { name: t('Qershor'), value: 1320, change: 3.9, volume: 920 },
    { name: t('Korrik'), value: 1340, change: 1.5, volume: 850 },
    { name: t('Gusht'), value: 1310, change: -2.2, volume: 780 },
    { name: t('Shtator'), value: 1290, change: -1.5, volume: 730 },
    { name: t('Tetor'), value: 1250, change: -3.1, volume: 670 },
    { name: t('Nëntor'), value: 1220, change: -2.4, volume: 610 },
    { name: t('Dhjetor'), value: 1200, change: -1.6, volume: 590 },
  ];
  
  // Sample peak/off-peak seasons
  const seasonData = [
    { season: 'peak', months: [t('Maj'), t('Qershor'), t('Korrik')], avgPrice: 1310, change: '+3.5%' },
    { season: 'low', months: [t('Nëntor'), t('Dhjetor'), t('Janar')], avgPrice: 1190, change: '-2.2%' },
  ];
  
  const getYearData = (year: string) => {
    return quarterlyData.map(quarter => ({
      name: quarter.name,
      value: quarter[year as keyof typeof quarter] || 0
    })).filter(item => item.value > 0); // Filter out null values
  };
  
  return (
    <Card className="w-full shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-albania-red" />
            <CardTitle className="text-lg">{t('Analiza sezonale e tregut')}</CardTitle>
          </div>
          
          <Tabs value={selectedYear} className="w-auto" onValueChange={setSelectedYear}>
            <TabsList className="h-8">
              <TabsTrigger value="2022" className="text-xs px-2.5 py-1">2022</TabsTrigger>
              <TabsTrigger value="2023" className="text-xs px-2.5 py-1">2023</TabsTrigger>
              <TabsTrigger value="2024" className="text-xs px-2.5 py-1">2024</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <CardDescription>
          {t('Si ndryshon tregu i pronave gjatë stinëve të ndryshme të vitit')}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <Tabs defaultValue="quarterly" className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="quarterly" className="flex-1">
              {t('Tremujore')}
            </TabsTrigger>
            <TabsTrigger value="monthly" className="flex-1">
              {t('Mujore')}
            </TabsTrigger>
            <TabsTrigger value="seasonal" className="flex-1">
              {t('Sezonale')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="quarterly">
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-md">
                <h4 className="text-sm font-medium mb-1 flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-albania-red" />
                  {t('Ndryshimet tremujore të çmimeve')} - {selectedYear}
                </h4>
                <p className="text-xs text-gray-500 mb-4">
                  {t('Çmimet mesatare të pronave për metër katror në Euro sipas tremujorëve')}
                </p>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getYearData(selectedYear)} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[1000, 1400]} />
                      <Tooltip formatter={(value) => [`€${value}`, t('Çmimi/m²')]} />
                      <Bar dataKey="value" fill="#e41e20" barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {quarterlyData.map((quarter, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-md p-3">
                    <div className="text-sm font-medium">{quarter.name} {selectedYear}</div>
                    <div className="text-lg font-semibold mt-1">
                      €{quarter[selectedYear as keyof typeof quarter] || '-'}/m²
                    </div>
                    {selectedYear !== '2022' && quarter[selectedYear as keyof typeof quarter] && (
                      <div className="flex items-center gap-1 mt-1 text-xs">
                        <ArrowUpDown className="h-3 w-3" />
                        <span>
                          {(((quarter[selectedYear as keyof typeof quarter] as number) / 
                            (quarter[(parseInt(selectedYear) - 1).toString() as keyof typeof quarter] as number) - 1) * 100).toFixed(1)}%
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="monthly">
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-md">
                <h4 className="text-sm font-medium mb-1">{t('Ndryshimet mujore të çmimeve')} - 2023</h4>
                <p className="text-xs text-gray-500 mb-4">
                  {t('Çmimet mesatare të pronave për metër katror në Euro sipas muajve')}
                </p>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[1100, 1400]} />
                      <Tooltip formatter={(value) => [`€${value}`, t('Çmimi/m²')]} />
                      <Line type="monotone" dataKey="value" stroke="#e41e20" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white border border-gray-100 rounded-md p-3">
                  <h4 className="text-sm font-medium mb-2">{t('Muajt me çmimet më të larta')}</h4>
                  <div className="space-y-2">
                    {monthlyData
                      .sort((a, b) => b.value - a.value)
                      .slice(0, 3)
                      .map((month, idx) => (
                        <div key={idx} className="flex justify-between items-center py-1 border-b border-gray-50">
                          <span className="text-sm">{month.name}</span>
                          <div>
                            <span className="font-medium">€{month.value}/m²</span>
                            <span className={`text-xs ml-2 ${month.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {month.change > 0 ? '+' : ''}{month.change}%
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                
                <div className="bg-white border border-gray-100 rounded-md p-3">
                  <h4 className="text-sm font-medium mb-2">{t('Muajt me më shumë transaksione')}</h4>
                  <div className="space-y-2">
                    {monthlyData
                      .sort((a, b) => b.volume - a.volume)
                      .slice(0, 3)
                      .map((month, idx) => (
                        <div key={idx} className="flex justify-between items-center py-1 border-b border-gray-50">
                          <span className="text-sm">{month.name}</span>
                          <div>
                            <span className="font-medium">{month.volume}</span>
                            <span className="text-xs text-gray-500 ml-1">{t('prona')}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="seasonal">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {seasonData.map((season, idx) => (
                  <div key={idx} className={`p-4 rounded-lg ${season.season === 'peak' ? 'bg-red-50' : 'bg-blue-50'}`}>
                    <h3 className="text-base font-medium mb-2">
                      {season.season === 'peak' ? t('Sezoni i pikut') : t('Sezoni i ulët')}
                    </h3>
                    <div className="mb-3">
                      <div className="text-sm text-gray-600 mb-1">{t('Muajt')}:</div>
                      <div className="flex gap-2">
                        {season.months.map((month, i) => (
                          <span key={i} className="px-2 py-1 bg-white rounded text-sm">
                            {month}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="text-sm text-gray-600 mb-1">{t('Çmimi mesatar')}:</div>
                      <div className="text-xl font-semibold">€{season.avgPrice}/m²</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">{t('Ndryshimi nga mesatarja vjetore')}:</div>
                      <div className={`text-lg font-medium ${season.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {season.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-white border border-gray-100 rounded-md p-4">
                <h4 className="text-sm font-medium mb-3">{t('Këshilla për blerje sezonale')}</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-albania-red font-bold">•</span>
                    <span>{t('Blerja gjatë sezonit të ulët (Nëntor-Janar) mund të ofrojë çmime më të favorshme')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-albania-red font-bold">•</span>
                    <span>{t('Në sezonin e pikut (Maj-Korrik) ka më shumë oferta, por çmimet janë më të larta')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-albania-red font-bold">•</span>
                    <span>{t('Pronat turistike bregdetare kanë luhatje më të mëdha sezonale krahasuar me pronat në qytet')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SeasonalMarketAnalysis;
