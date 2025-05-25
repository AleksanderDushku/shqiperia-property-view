
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { TrendingUp, DollarSign, Globe2, Building } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../../ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useDarkMode } from '../../../contexts/DarkModeContext';
import { investmentData } from '../../../data/investmentData';

const COLORS = ['#E41E20', '#000000', '#4CAF50', '#2196F3', '#FF9800', '#9C27B0'];

const chartConfig = {
  value: {
    label: "Value",
    color: "#E41E20",
  },
  percentage: {
    label: "Percentage",
    color: "#000000",
  },
};

const InvestmentTab: React.FC = () => {
  const { t } = useLanguage();
  const { dark_mode } = useDarkMode();

  return (
    <div className="space-y-6">
      {/* ROI Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={`transition-all duration-300 ${dark_mode ? 'border-gray-700' : ''}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{t('analysis.short.term')} ROI</p>
                <p className="text-2xl font-bold text-albania-red">{investmentData.returnOnInvestment.shortTerm}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-albania-red" />
            </div>
          </CardContent>
        </Card>

        <Card className={`transition-all duration-300 ${dark_mode ? 'border-gray-700' : ''}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{t('analysis.medium.term')} ROI</p>
                <p className="text-2xl font-bold text-albania-red">{investmentData.returnOnInvestment.mediumTerm}%</p>
              </div>
              <DollarSign className="h-8 w-8 text-albania-red" />
            </div>
          </CardContent>
        </Card>

        <Card className={`transition-all duration-300 ${dark_mode ? 'border-gray-700' : ''}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{t('analysis.long.term')} ROI</p>
                <p className="text-2xl font-bold text-albania-red">{investmentData.returnOnInvestment.longTerm}%</p>
              </div>
              <Building className="h-8 w-8 text-albania-red" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Price to Income Ratio */}
        <Card className={`transition-all duration-300 ${dark_mode ? 'border-gray-700' : ''}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-albania-red" />
              {t('market.price.income.ratio')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={investmentData.priceToIncomeRatio}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="city" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value: any) => [`${value}x`, 'Ratio']}
                  />
                  <Bar dataKey="value" fill="var(--color-value)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Foreign Investment Distribution */}
        <Card className={`transition-all duration-300 ${dark_mode ? 'border-gray-700' : ''}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe2 className="h-5 w-5 text-albania-red" />
              {t('market.foreign.investors')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={investmentData.foreignInvestors}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="percentage"
                    nameKey="country"
                    label={({ country, percentage }) => `${country}: ${percentage}%`}
                  >
                    {investmentData.foreignInvestors.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip 
                    formatter={(value: any, name: any) => [`${value}%`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Investment Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Rental Yield */}
        <Card className={`transition-all duration-300 ${dark_mode ? 'border-gray-700' : ''}`}>
          <CardHeader>
            <CardTitle>{t('market.rental.yield')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>{t('property.residential')} - {t('region.center.tirana')}</span>
                <Badge variant="outline">{investmentData.rentalYield.residential.center}%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>{t('property.residential')} - {t('region.suburbs')}</span>
                <Badge variant="outline">{investmentData.rentalYield.residential.suburban}%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>{t('market.retail')}</span>
                <Badge variant="outline">{investmentData.rentalYield.commercial.retail}%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>{t('market.office')}</span>
                <Badge variant="outline">{investmentData.rentalYield.commercial.office}%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Market Appreciation */}
        <Card className={`transition-all duration-300 ${dark_mode ? 'border-gray-700' : ''}`}>
          <CardHeader>
            <CardTitle>{t('analysis.price.projections')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>5-{t('market.year')} {t('dashboard.avg.price')}</span>
                <Badge className="bg-green-500 text-white">+{investmentData.appreciationRate.fiveYearAvg}%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>1-{t('market.year')} {t('Projeksion')}</span>
                <Badge className="bg-blue-500 text-white">+{investmentData.appreciationRate.oneYearForecast}%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>{t('market.domestic.investors')}</span>
                <Badge variant="outline">{investmentData.investorOrigin.domestic}%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>{t('market.foreign.investors')}</span>
                <Badge variant="outline">{investmentData.investorOrigin.foreign}%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Foreign Investors Details */}
      <Card className={`transition-all duration-300 ${dark_mode ? 'border-gray-700' : ''}`}>
        <CardHeader>
          <CardTitle>{t('market.investment.origin')} - {t('Detajet')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {investmentData.foreignInvestors.map((investor, index) => (
              <div key={investor.country} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{investor.country}</span>
                  <Badge className="bg-albania-red text-white">{investor.percentage}%</Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('Total Investment')}: {investor.amount}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentTab;
