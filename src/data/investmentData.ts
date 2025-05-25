
export const investmentData = {
  rentalYield: {
    residential: {
      center: 5.2,
      suburban: 4.8,
    },
    commercial: {
      retail: 6.8,
      office: 7.2,
    },
  },
  appreciationRate: {
    fiveYearAvg: 8.5,
    oneYearForecast: 6.2,
  },
  returnOnInvestment: {
    shortTerm: 4.5,
    mediumTerm: 7.8,
    longTerm: 12.3,
  },
  priceToIncomeRatio: [
    { city: 'Tiranë', value: 15.3, trend: 'stable' },
    { city: 'Durrës', value: 12.1, trend: 'increasing' },
    { city: 'Vlorë', value: 13.7, trend: 'increasing' },
    { city: 'Sarandë', value: 14.5, trend: 'stable' },
    { city: 'Shkodër', value: 9.6, trend: 'stable' },
    { city: 'Elbasan', value: 8.9, trend: 'decreasing' },
  ],
  investorOrigin: {
    domestic: 42,
    foreign: 58,
  },
  foreignInvestors: [
    { country: 'Italy', percentage: 28, amount: '€124M' },
    { country: 'Germany', percentage: 15, amount: '€67M' },
    { country: 'Switzerland', percentage: 8, amount: '€35M' },
    { country: 'Greece', percentage: 7, amount: '€31M' },
  ],
};
