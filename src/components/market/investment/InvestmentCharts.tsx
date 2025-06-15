
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../../ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Globe2 } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useDarkMode } from '../../../contexts/DarkModeContext';
import { investmentData } from '../../../data/investmentData';

const COLORS = ['#E41E20', '#000000', '#4CAF50', '#2196F3', '#FF9800', '#9C27B0'];

const chartConfig = {
  value: {
    label: "Value",
    color: "#E41E20",
  },
};

const InvestmentCharts: React.FC = () => {
  const { t } = useLanguage();
  const { dark_mode } = useDarkMode();

  return (
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
                  label={({ country, percentage }: any) => `${country}: ${percentage}%`}
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
  );
};

export default InvestmentCharts;
