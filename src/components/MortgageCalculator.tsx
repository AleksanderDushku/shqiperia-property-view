
import React from 'react';
import { Calculator, InfoIcon, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { useMortgageCalculator } from '../hooks/useMortgageCalculator';
import CalculatorInputs from './calculator/CalculatorInputs';
import CalculatorResults from './calculator/CalculatorResults';

const MortgageCalculator: React.FC = () => {
  const { t } = useLanguage();
  const {
    propertyPrice,
    downPayment,
    downPaymentPercent,
    interestRate,
    loanTerm,
    monthlyPayment,
    totalInterest,
    totalPayment,
    handlePropertyPriceChange,
    handleDownPaymentChange,
    handleDownPaymentPercentChange,
    setInterestRate,
    setLoanTerm,
    calculateMortgage
  } = useMortgageCalculator();

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
        <CalculatorInputs 
          propertyPrice={propertyPrice}
          downPayment={downPayment}
          downPaymentPercent={downPaymentPercent}
          interestRate={interestRate}
          loanTerm={loanTerm}
          handlePropertyPriceChange={handlePropertyPriceChange}
          handleDownPaymentChange={handleDownPaymentChange}
          handleDownPaymentPercentChange={handleDownPaymentPercentChange}
          setInterestRate={setInterestRate}
          setLoanTerm={setLoanTerm}
        />

        <Separator className="my-6" />

        <CalculatorResults 
          monthlyPayment={monthlyPayment}
          totalInterest={totalInterest}
          totalPayment={totalPayment}
        />
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
