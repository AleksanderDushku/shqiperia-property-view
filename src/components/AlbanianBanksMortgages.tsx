
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import { Briefcase, Building, ExternalLink, Info, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { useDarkMode } from '../contexts/DarkModeContext';

interface BankMortgage {
  bank: string;
  logo: string;
  interestRate: {
    min: number;
    max: number;
  };
  term: {
    min: number;
    max: number;
  };
  downPayment: number;
  processingFee: string;
  specialOffers?: string;
  website: string;
}

const AlbanianBanksMortgages: React.FC = () => {
  const { t, language } = useLanguage();
  const { dark_mode } = useDarkMode();
  
  // Data for Albanian banks offering mortgages
  const banks: BankMortgage[] = [
    {
      bank: 'Raiffeisen Bank Albania',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Raiffeisen_Bank_logo.svg/320px-Raiffeisen_Bank_logo.svg.png',
      interestRate: { min: 2.9, max: 4.5 },
      term: { min: 5, max: 30 },
      downPayment: 20,
      processingFee: '1%',
      specialOffers: language === 'sq' ? 'Ulje interesi për 2 vitet e para' : 'Reduced interest for first 2 years',
      website: 'https://www.raiffeisen.al/en/individuals/loans/home-loans/'
    },
    {
      bank: 'BKT - Banka Kombëtare Tregtare',
      logo: 'https://bkt.com.al/Assets/images/bktNewLogo.png',
      interestRate: { min: 3.2, max: 4.7 },
      term: { min: 5, max: 25 },
      downPayment: 25,
      processingFee: '1-1.5%',
      website: 'https://bkt.com.al/en/individuals/loans/home-loans'
    },
    {
      bank: 'Credins Bank',
      logo: 'https://www.bankacredins.com/wp-content/themes/bankacredins/img/logo.png',
      interestRate: { min: 3.0, max: 4.8 },
      term: { min: 5, max: 30 },
      downPayment: 20,
      processingFee: '1.2%',
      specialOffers: language === 'sq' ? 'Mbrojtje ndaj luhatjeve të interesit' : 'Interest rate fluctuation protection',
      website: 'https://bankacredins.com/en/individuals/loans/home-loans/'
    },
    {
      bank: 'Intesa Sanpaolo Bank Albania',
      logo: 'https://www.intesasanpaolobank.al/content/dam/vetrina/intesa-sanpaolo-bank-albania/logo_ISP.png',
      interestRate: { min: 2.8, max: 4.2 },
      term: { min: 5, max: 30 },
      downPayment: 15,
      processingFee: '0.5-1%',
      website: 'https://www.intesasanpaolobank.al/en/individuals/products/loans/mortgages'
    },
    {
      bank: 'Tirana Bank',
      logo: 'https://www.tiranabank.al/uploads/editor/logo.svg',
      interestRate: { min: 3.4, max: 4.9 },
      term: { min: 5, max: 25 },
      downPayment: 25,
      processingFee: '1%',
      website: 'https://www.tiranabank.al/en/individuals/loans/home-loan'
    }
  ];

  return (
    <Card className={`w-full overflow-hidden transition-all duration-300 ${dark_mode ? 'border-gray-700 hover:border-gray-600' : 'hover:shadow-md'}`}>
      <CardHeader className={`flex flex-row items-center justify-between pb-2 ${dark_mode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="flex items-center">
          <Building className="h-5 w-5 text-albania-red mr-2" />
          <CardTitle className="text-base md:text-lg">
            {language === 'sq' ? 'Kreditë hipotekore në bankat shqiptare' : 'Mortgage Loans in Albanian Banks'}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className={dark_mode ? "bg-gray-800" : ""}>
              <TableRow>
                <TableHead className="w-[180px]">{language === 'sq' ? 'Banka' : 'Bank'}</TableHead>
                <TableHead>{language === 'sq' ? 'Norma e interesit' : 'Interest Rate'}</TableHead>
                <TableHead>{language === 'sq' ? 'Afati' : 'Term'}</TableHead>
                <TableHead>{language === 'sq' ? 'Kësti fillestar' : 'Down Payment'}</TableHead>
                <TableHead>{language === 'sq' ? 'Komisioni' : 'Fee'}</TableHead>
                <TableHead className="text-right">{language === 'sq' ? 'Veprime' : 'Actions'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {banks.map((bank) => (
                <TableRow key={bank.bank} className={dark_mode ? "hover:bg-gray-700/50" : "hover:bg-gray-100/80"}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <img src={bank.logo} alt={bank.bank} className="h-6 object-contain" />
                      <span className="text-xs font-medium">{bank.bank}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="font-medium">{bank.interestRate.min}% - {bank.interestRate.max}%</span>
                      {bank.specialOffers && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-3.5 w-3.5 ml-1 text-albania-red cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs max-w-xs">{bank.specialOffers}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{bank.term.min} - {bank.term.max} {language === 'sq' ? 'vite' : 'years'}</TableCell>
                  <TableCell>{bank.downPayment}%</TableCell>
                  <TableCell>{bank.processingFee}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs flex items-center"
                      onClick={() => window.open(bank.website, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      {language === 'sq' ? 'Vizito' : 'Visit'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className={`text-xs py-2 px-4 ${dark_mode ? 'bg-gray-800 text-gray-400' : 'bg-gray-50 text-gray-500'} flex justify-between items-center`}>
        <div className="flex items-center">
          <TrendingUp className="h-3 w-3 mr-1" />
          <span>
            {language === 'sq' 
              ? 'Të dhënat janë përditësuar më 10 Prill, 2024'
              : 'Data updated on April 10, 2024'}
          </span>
        </div>
        <Button 
          variant="link" 
          size="sm" 
          className="text-xs p-0 h-auto text-albania-red"
          onClick={() => window.location.href = '/calculator'}
        >
          {language === 'sq' ? 'Llogarit kredinë tënde' : 'Calculate your mortgage'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AlbanianBanksMortgages;
