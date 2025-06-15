
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Palette, Upload, Globe, Eye, Save } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { FeatureGate } from './FeatureGate';

const CustomBranding: React.FC = () => {
  const { t } = useLanguage();
  const [companyData, setCompanyData] = useState({
    name: 'Your Real Estate Company',
    logo: '',
    primaryColor: '#DC2626',
    secondaryColor: '#1F2937',
    website: 'https://yourcompany.com',
    customDomain: 'analytics.yourcompany.com'
  });

  const handleColorChange = (field: string, color: string) => {
    setCompanyData(prev => ({ ...prev, [field]: color }));
  };

  const handleSave = () => {
    console.log('Saving branding settings:', companyData);
    // In real app, save to backend
  };

  return (
    <FeatureGate feature="custom_branding">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg">
                <Palette className="h-6 w-6 text-white" />
              </div>
              {t('Custom Branding')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="branding" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="branding">{t('Branding')}</TabsTrigger>
                <TabsTrigger value="domain">{t('Domain')}</TabsTrigger>
                <TabsTrigger value="preview">{t('Preview')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="branding" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="companyName">{t('Company Name')}</Label>
                      <Input
                        id="companyName"
                        value={companyData.name}
                        onChange={(e) => setCompanyData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter your company name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="website">{t('Website URL')}</Label>
                      <Input
                        id="website"
                        value={companyData.website}
                        onChange={(e) => setCompanyData(prev => ({ ...prev, website: e.target.value }))}
                        placeholder="https://yourcompany.com"
                      />
                    </div>
                    
                    <div>
                      <Label>{t('Company Logo')}</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600 mb-2">{t('Upload your company logo')}</p>
                        <p className="text-xs text-gray-500">{t('Recommended: 200x60px, PNG or SVG')}</p>
                        <Button variant="outline" className="mt-3">
                          {t('Choose File')}
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label>{t('Primary Color')}</Label>
                      <div className="flex items-center gap-3 mt-2">
                        <div
                          className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
                          style={{ backgroundColor: companyData.primaryColor }}
                          onClick={() => document.getElementById('primaryColor')?.click()}
                        />
                        <Input
                          id="primaryColor"
                          type="color"
                          value={companyData.primaryColor}
                          onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                          className="w-20 h-12 p-1"
                        />
                        <Input
                          value={companyData.primaryColor}
                          onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                          placeholder="#DC2626"
                          className="flex-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>{t('Secondary Color')}</Label>
                      <div className="flex items-center gap-3 mt-2">
                        <div
                          className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
                          style={{ backgroundColor: companyData.secondaryColor }}
                          onClick={() => document.getElementById('secondaryColor')?.click()}
                        />
                        <Input
                          id="secondaryColor"
                          type="color"
                          value={companyData.secondaryColor}
                          onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                          className="w-20 h-12 p-1"
                        />
                        <Input
                          value={companyData.secondaryColor}
                          onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                          placeholder="#1F2937"
                          className="flex-1"
                        />
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">{t('Color Preview')}</h4>
                      <div className="flex gap-2">
                        <div className="flex-1 h-8 rounded" style={{ backgroundColor: companyData.primaryColor }}></div>
                        <div className="flex-1 h-8 rounded" style={{ backgroundColor: companyData.secondaryColor }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="domain" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="customDomain">{t('Custom Domain')}</Label>
                    <Input
                      id="customDomain"
                      value={companyData.customDomain}
                      onChange={(e) => setCompanyData(prev => ({ ...prev, customDomain: e.target.value }))}
                      placeholder="analytics.yourcompany.com"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      {t('Point your domain CNAME record to our servers')}
                    </p>
                  </div>
                  
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-blue-900 mb-2">{t('DNS Configuration')}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-blue-800">Type:</span>
                          <code className="bg-blue-100 px-2 py-1 rounded">CNAME</code>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-800">Name:</span>
                          <code className="bg-blue-100 px-2 py-1 rounded">analytics</code>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-800">Value:</span>
                          <code className="bg-blue-100 px-2 py-1 rounded">saas.pronastats.com</code>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      {t('SSL Verified')}
                    </Badge>
                    <Badge variant="outline">
                      {t('Domain Status')}: {t('Active')}
                    </Badge>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="preview" className="space-y-6">
                <div className="border rounded-lg overflow-hidden">
                  <div 
                    className="p-4 text-white"
                    style={{ backgroundColor: companyData.primaryColor }}
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold">{companyData.name}</h2>
                      <Badge className="bg-white/20 text-white">
                        {t('Live Preview')}
                      </Badge>
                    </div>
                    <p className="text-sm opacity-90 mt-1">{t('Real Estate Market Analytics')}</p>
                  </div>
                  
                  <div className="p-6 bg-white">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold" style={{ color: companyData.primaryColor }}>
                          1,247
                        </div>
                        <div className="text-sm text-gray-600">{t('Active Properties')}</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold" style={{ color: companyData.primaryColor }}>
                          €1,850
                        </div>
                        <div className="text-sm text-gray-600">{t('Avg Price/m²')}</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold" style={{ color: companyData.primaryColor }}>
                          +12.3%
                        </div>
                        <div className="text-sm text-gray-600">{t('YoY Growth')}</div>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full"
                      style={{ backgroundColor: companyData.primaryColor }}
                    >
                      {t('View Full Analytics Dashboard')}
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button>
                    <Eye className="h-4 w-4 mr-2" />
                    {t('Open Live Preview')}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-end pt-6 border-t">
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                {t('Save Branding Settings')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </FeatureGate>
  );
};

export default CustomBranding;
