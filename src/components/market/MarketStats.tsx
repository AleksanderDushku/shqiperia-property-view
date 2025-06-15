
import React from 'react';
import { ModernStatsCard } from '../ui/modern-stats-card';
import { useLanguage } from '../../contexts/LanguageContext';
import { BarChart3, TrendingUp, MapPin, Activity } from 'lucide-react';
import { useIsMobile } from '../../hooks/use-mobile';

const MarketStats: React.FC = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  const stats = [
    {
      title: t('Prona Aktive'),
      value: '1,247',
      change: 12,
      icon: <BarChart3 className={isMobile ? 'h-5 w-5' : 'h-8 w-8'} />,
      gradient: 'from-albania-red to-red-600'
    },
    {
      title: t('Çmimi Mesatar/m²'),
      value: '€1,850',
      change: 8.5,
      icon: <TrendingUp className={isMobile ? 'h-5 w-5' : 'h-8 w-8'} />,
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      title: t('Rajoni më Aktiv'),
      value: t('Tiranë'),
      badge: t('Nr. 1'),
      icon: <MapPin className={isMobile ? 'h-5 w-5' : 'h-8 w-8'} />,
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      title: t('Indeksi i Mundësisë'),
      value: '8.7/10',
      badge: t('I Lartë'),
      icon: <Activity className={isMobile ? 'h-5 w-5' : 'h-8 w-8'} />,
      gradient: 'from-purple-500 to-violet-600'
    }
  ];

  return (
    <div className={`grid ${isMobile ? 'grid-cols-2 gap-3' : 'grid-cols-1 md:grid-cols-4 gap-6'} mt-6`}>
      {stats.map((stat, index) => (
        <ModernStatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          period={stat.change ? t('last month') : undefined}
          icon={stat.icon}
          gradient={stat.gradient}
          badge={stat.badge}
        />
      ))}
    </div>
  );
};

export default MarketStats;
