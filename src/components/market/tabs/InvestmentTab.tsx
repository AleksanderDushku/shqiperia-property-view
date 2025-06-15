
import React from 'react';
import RoiCards from '../investment/RoiCards';
import InvestmentCharts from '../investment/InvestmentCharts';
import InvestmentMetrics from '../investment/InvestmentMetrics';
import ForeignInvestorsDetails from '../investment/ForeignInvestorsDetails';

const InvestmentTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <RoiCards />
      <InvestmentCharts />
      <InvestmentMetrics />
      <ForeignInvestorsDetails />
    </div>
  );
};

export default InvestmentTab;
