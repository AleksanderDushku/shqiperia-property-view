
import React, { useState, useEffect } from 'react';
import { Calculator, InfoIcon, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

const MortgageCalculator: React.FC = () => {
  const { t } = useLanguage();
  const [propertyPrice, setPropertyPrice] = useState<number>(100000);
  const [downPayment, setDownPayment] = useState<number>(20000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(3.5);
  const [loanTerm, setLoanTerm] = useState<number>(25);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);

  useEffect(() => {
    calculateMortgage();
  }, [propertyPrice, downPayment, interestRate, loanTerm]);

  const handlePropertyPriceChange = (value: string) => {
    const price = parseFloat(value) || 0;
    setPropertyPrice(price);
    // Adjust down payment to maintain the same percentage
    const newDownPayment = Math.round(price * (downPaymentPercent / 100));
    setDownPayment(newDownPayment);
  };

  const handleDownPaymentChange = (value: string) => {
    const payment = parseFloat(value) || 0;
    setDownPayment(payment);
    // Update the down payment percentage
    const percentage = (payment / propertyPrice) * 100;
    setDownPaymentPercent(Math.round(percentage * 100) / 100);
  };

  const handleDownPaymentPercentChange = (value: number[]) => {
    const percentage = value[0];
    setDownPaymentPercent(percentage);
    // Update the down payment amount based on percentage
    const newDownPayment = Math.round(propertyPrice * (percentage / 100));
    setDownPayment(newDownPayment);
  };

  const calculateMortgage = () => {
    const principal = propertyPrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (principal <= 0 || monthlyRate <= 0 || numberOfPayments <= 0) {
      setMonthlyPayment(0);
      setTotalInterest(0);
      setTotalPayment(0);
      return;
    }

    // Calculate monthly payment using the formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
    const monthly = principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const total = monthly * numberOfPayments;
    const interest = total - principal;

    setMonthlyPayment(Math.round(monthly * 100) / 100);
    setTotalInterest(Math.round(interest * 100) / 100);
    setTotalPayment(Math.round(total * 100) / 100);
  };

  return (
    <Card className="w-full shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="bg-gray-50">
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-albania-red" />
          <CardTitle className="text-lg">{t('Llogaritës i kredisë')}</CardTitle>
        </div>
        <CardDescription>
          {t('Llogarisni pagesat mujore dhe kostot e kredisë për blerjen e pronës suaj')}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
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

        <Separator className="my-6" />

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
      </CardContent>
      <CardFooter className="bg-gray-50 py-3 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-2 sm:mb-0">
          <TrendingUp className="h-3 w-3" />
          <span>{t('Bazuar në normat e tregut shqiptar')}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="text-alba-primary hover:text-alba-primary/80"
          onClick={calculateMortgage}
        >
          {t('Rillogarit')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MortgageCalculator;
