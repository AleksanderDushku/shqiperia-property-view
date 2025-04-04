
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { useLanguage } from '../contexts/LanguageContext';
import { regionPriceData } from '../data/propertyData';

interface RegionPriceTableProps {
  title: string;
}

const RegionPriceTable: React.FC<RegionPriceTableProps> = ({ title }) => {
  const { t } = useLanguage();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('properties.location')}</TableHead>
              <TableHead className="text-right">{t('dashboard.avg.price')} (€/m²)</TableHead>
              <TableHead className="text-right">{t('market.quarterly.change')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {regionPriceData.map((region) => (
              <TableRow key={region.region}>
                <TableCell className="font-medium">{t(`region.${region.region.toLowerCase()}`)}</TableCell>
                <TableCell className="text-right">{region.avgPrice}</TableCell>
                <TableCell className={`text-right ${region.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {region.change >= 0 ? '+' : ''}{region.change}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RegionPriceTable;
