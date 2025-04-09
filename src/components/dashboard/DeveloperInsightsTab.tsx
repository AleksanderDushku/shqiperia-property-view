
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { AlertTriangle, Calendar } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { developmentMetrics } from '../../data/propertyData';

const DeveloperInsightsTab: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
        <Card className="lg:col-span-2 overflow-hidden hover:shadow transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-base md:text-lg">{t('Kostot e ndërtimit')}</CardTitle>
            <CardDescription className="text-xs md:text-sm">
              {t('Kostot e zhvillimit të tregut')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">{t('Rezidenciale')}</h4>
                <div className="grid grid-cols-3 gap-2">
                  <Card className="p-3">
                    <p className="text-xs text-gray-500">{t('Ekonomike')}</p>
                    <p className="font-semibold">{developmentMetrics.constructionCosts.residential.economic} €/m²</p>
                  </Card>
                  <Card className="p-3">
                    <p className="text-xs text-gray-500">{t('Mesatare')}</p>
                    <p className="font-semibold">{developmentMetrics.constructionCosts.residential.midRange} €/m²</p>
                  </Card>
                  <Card className="p-3">
                    <p className="text-xs text-gray-500">{t('Luksoze')}</p>
                    <p className="font-semibold">{developmentMetrics.constructionCosts.residential.luxury} €/m²</p>
                  </Card>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">{t('Komerciale')}</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Card className="p-3">
                    <p className="text-xs text-gray-500">{t('Standarde')}</p>
                    <p className="font-semibold">{developmentMetrics.constructionCosts.commercial.standard} €/m²</p>
                  </Card>
                  <Card className="p-3">
                    <p className="text-xs text-gray-500">{t('Premium')}</p>
                    <p className="font-semibold">{developmentMetrics.constructionCosts.commercial.premium} €/m²</p>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 text-xs text-gray-500 py-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span>{t('Kostot e zhvillimit')}: +{developmentMetrics.constructionPermits.change}% {t('vit mbi vit')}</span>
            </div>
          </CardFooter>
        </Card>
        
        <Card className="overflow-hidden hover:shadow transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-base md:text-lg">{t('Lejet e ndërtimit')}</CardTitle>
            <CardDescription className="text-xs md:text-sm">
              {t('Mundësitë e zhvillimit')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col justify-center items-center h-full py-4">
              <div className="text-4xl font-bold text-albania-red">
                {developmentMetrics.constructionPermits.current}
              </div>
              <div className="text-sm text-gray-500 mt-2">
                {t('Përditësuar më')}: {new Date().toLocaleDateString()}
              </div>
              <div className="mt-4 text-sm font-medium text-green-600">
                +{developmentMetrics.constructionPermits.change}% {t('vit mbi vit')}
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 text-xs text-gray-500 py-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{t('Vitin e kaluar')}: {developmentMetrics.constructionPermits.previous} ({new Date().getFullYear() - 1})</span>
            </div>
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
        <Card className="overflow-hidden hover:shadow transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-base md:text-lg">{t('Mundësitë e zhvillimit')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="font-medium">{t('Tiranë')}</p>
                  <p className="text-sm text-gray-500">{t('Qendra e Tiranës')}</p>
                </div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  {t('Mundësi e lartë')}
                </Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="font-medium">{t('Durrës')}</p>
                  <p className="text-sm text-gray-500">{t('Durrës')} {t('Qendra')}</p>
                </div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  {t('Mundësi e lartë')}
                </Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="font-medium">{t('Vlorë')}</p>
                  <p className="text-sm text-gray-500">{t('Bregdet')}</p>
                </div>
                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                  {t('Mundësi mesatare')}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden hover:shadow transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-base md:text-lg">{t('Rregulloret e zonimit')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-md">
                <div className="flex justify-between">
                  <p className="font-medium">{t('Planifikimi urban')}</p>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                    {t('Përditësim')}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {t('Plane të reja urbane për Tiranën, Durrësin dhe Vlorën gjatë 2023')}
                </p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-md">
                <div className="flex justify-between">
                  <p className="font-medium">{t('Kuadri rregullator')}</p>
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                    {t('E rëndësishme')}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {t('Ndryshime të rëndësishme në ligjet e ndërtimit dhe të pronës së paluajtshme')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default DeveloperInsightsTab;
