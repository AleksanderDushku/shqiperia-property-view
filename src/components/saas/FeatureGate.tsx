
import React from 'react';
import { useSubscription } from '../../contexts/SubscriptionContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Lock, Crown, Zap } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface FeatureGateProps {
  feature: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showUpgrade?: boolean;
}

export const FeatureGate: React.FC<FeatureGateProps> = ({
  feature,
  children,
  fallback,
  showUpgrade = true
}) => {
  const { hasFeature, tier } = useSubscription();
  const { t } = useLanguage();

  if (hasFeature(feature)) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  if (!showUpgrade) {
    return null;
  }

  return (
    <Card className="border-dashed border-2 border-gray-300 bg-gray-50/50">
      <CardHeader className="text-center pb-3">
        <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full w-fit">
          <Crown className="h-6 w-6 text-white" />
        </div>
        <CardTitle className="text-lg font-semibold flex items-center justify-center gap-2">
          <Lock className="h-4 w-4" />
          {t('Premium Feature')}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-gray-600 text-sm">
          {t('This feature requires a higher subscription tier')}
        </p>
        <div className="flex items-center justify-center gap-2">
          <Badge variant="outline" className="text-xs">
            {t('Current')}: {tier?.name || 'Free'}
          </Badge>
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs">
            {t('Upgrade Required')}
          </Badge>
        </div>
        <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">
          <Zap className="h-4 w-4 mr-2" />
          {t('Upgrade Now')}
        </Button>
      </CardContent>
    </Card>
  );
};
