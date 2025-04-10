
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { InfoIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface CalculatorInputsProps {
  propertyPrice: number;
  downPayment: number;
  downPaymentPercent: number;
  interestRate: number;
  loanTerm: number;
  handlePropertyPriceChange: (value: string) => void;
  handleDownPaymentChange: (value: string) => void;
  handleDownPaymentPercentChange: (value: number[]) => void;
  setInterestRate: (value: number) => void;
  setLoanTerm: (value: number) => void;
}

const CalculatorInputs: React.FC<CalculatorInputsProps> = ({
  propertyPrice,
  downPayment,
  downPaymentPercent,
  interestRate,
  loanTerm,
  handlePropertyPriceChange,
  handleDownPaymentChange,
  handleDownPaymentPercentChange,
  setInterestRate,
  setLoanTerm
}) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="property-price" className="flex items-center gap-1">
          {t('Çmimi i pronës')}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-3.5 w-3.5 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-sm">{t('Çmimi total i pronës që dëshironi të blini')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Label>
        <div className="relative">
          <span className="absolute left-2.5 top-2.5 text-gray-500">€</span>
          <Input
            id="property-price"
            type="number"
            value={propertyPrice}
            onChange={(e) => handlePropertyPriceChange(e.target.value)}
            className="pl-7"
            min="0"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="down-payment" className="flex items-center gap-1">
          {t('Pagesa fillestare')}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-3.5 w-3.5 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-sm">{t('Shuma që dëshironi të paguani direkt, pa e përfshirë në kredi')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Label>
        <div className="relative">
          <span className="absolute left-2.5 top-2.5 text-gray-500">€</span>
          <Input
            id="down-payment"
            type="number"
            value={downPayment}
            onChange={(e) => handleDownPaymentChange(e.target.value)}
            className="pl-7"
            min="0"
            max={propertyPrice.toString()}
          />
        </div>
        <div className="pt-2">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>0%</span>
            <span>{downPaymentPercent}%</span>
            <span>50%</span>
          </div>
          <Slider
            defaultValue={[20]}
            value={[downPaymentPercent]}
            max={50}
            step={1}
            onValueChange={handleDownPaymentPercentChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="interest-rate" className="flex items-center gap-1">
            {t('Norma e interesit')}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="h-3.5 w-3.5 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-sm">{t('Norma vjetore e interesit të kredisë')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <div className="relative">
            <Input
              id="interest-rate"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
              className="pr-7"
              min="0"
              step="0.1"
            />
            <span className="absolute right-2.5 top-2.5 text-gray-500">%</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="loan-term" className="flex items-center gap-1">
            {t('Afati i kredisë')}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="h-3.5 w-3.5 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-sm">{t('Kohëzgjatja e kredisë në vite')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <div className="relative">
            <Input
              id="loan-term"
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(parseInt(e.target.value) || 0)}
              className="pr-10"
              min="1"
              max="40"
            />
            <span className="absolute right-2.5 top-2.5 text-gray-500">{t('vite')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorInputs;
