
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { Brain, Zap, TrendingUp, Database, Activity } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const AIAnalysisIndicator: React.FC = () => {
  const { t } = useLanguage();
  const [current_stage, set_current_stage] = useState(0);
  const [is_analyzing, set_is_analyzing] = useState(true);

  const analysis_stages = [
    {
      icon: <Database className="h-4 w-4" />,
      text: t('Collecting market data from 5+ sources...'),
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Brain className="h-4 w-4" />,
      text: t('AI analyzing price patterns and trends...'),
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <TrendingUp className="h-4 w-4" />,
      text: t('Calculating opportunity scores...'),
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <Activity className="h-4 w-4" />,
      text: t('Generating market insights...'),
      color: 'from-albania-red to-red-600'
    }
  ];

  useEffect(() => {
    if (!is_analyzing) return;

    const interval = setInterval(() => {
      set_current_stage((prev) => {
        if (prev >= analysis_stages.length - 1) {
          set_is_analyzing(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [is_analyzing, analysis_stages.length]);

  if (!is_analyzing && current_stage >= analysis_stages.length - 1) {
    return (
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 dark:from-green-900/20 dark:to-emerald-900/20 dark:border-green-800">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-800/30">
              <Zap className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <div className="font-semibold text-green-800 dark:text-green-200">
                {t('AI Analysis Complete')}
              </div>
              <div className="text-sm text-green-600 dark:text-green-300">
                {t('Market data processed and insights generated')}
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800 border-green-300 dark:bg-green-800/30 dark:text-green-200">
              {t('Live')}
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  const current_analysis = analysis_stages[current_stage];

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 dark:from-blue-900/20 dark:to-indigo-900/20 dark:border-blue-800">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-gradient-to-br ${current_analysis.color} text-white animate-pulse`}>
            {current_analysis.icon}
          </div>
          <div className="flex-1">
            <div className="font-semibold text-blue-800 dark:text-blue-200 flex items-center gap-2">
              <Brain className="h-4 w-4" />
              {t('AI Market Analysis')}
            </div>
            <div className="text-sm text-blue-600 dark:text-blue-300">
              {current_analysis.text}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
        <div className="mt-3">
          <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
            <div 
              className={`bg-gradient-to-r ${current_analysis.color} h-2 rounded-full transition-all duration-500`}
              style={{ width: `${((current_stage + 1) / analysis_stages.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
