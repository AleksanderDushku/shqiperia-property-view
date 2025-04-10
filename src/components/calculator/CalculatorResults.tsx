
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface CalculatorResultsProps {
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
}

const CalculatorResults: React.FC<CalculatorResultsProps> = ({
  monthlyPayment,
  totalInterest,
  totalPayment
}) => {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="p-3 bg-gray-50 rounded-md">
        <div className="text-sm text-gray-500 mb-1">{t('Pagesa mujore')}</div>
        <div className="text-xl font-semibold">€{monthlyPayment.toLocaleString()}</div>
      </div>
      <div className="p-3 bg-gray-50 rounded-md">
        <div className="text-sm text-gray-500 mb-1">{t('Interesi total')}</div>
        <div className="text-xl font-semibold">€{totalInterest.toLocaleString()}</div>
      </div>
      <div className="p-3 bg-gray-50 rounded-md">
        <div className="text-sm text-gray-500 mb-1">{t('Pagesa totale')}</div>
        <div className="text-xl font-semibold">€{totalPayment.toLocaleString()}</div>
      </div>
    </div>
  );
};

export default CalculatorResults;
