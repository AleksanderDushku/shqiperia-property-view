
import { useState, useEffect } from 'react';

interface MortgageCalculatorResult {
  propertyPrice: number;
  downPayment: number;
  downPaymentPercent: number;
  interestRate: number;
  loanTerm: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  handlePropertyPriceChange: (value: string) => void;
  handleDownPaymentChange: (value: string) => void;
  handleDownPaymentPercentChange: (value: number[]) => void;
  setInterestRate: (value: number) => void;
  setLoanTerm: (value: number) => void;
  calculateMortgage: () => void;
}

export function useMortgageCalculator(): MortgageCalculatorResult {
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

  return {
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
  };
}
