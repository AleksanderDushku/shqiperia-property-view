
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Code, Zap, Key, Database, Webhook, Copy, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { FeatureGate } from './FeatureGate';

interface APIEndpoint {
  method: string;
  endpoint: string;
  description: string;
  rateLimit: string;
}

const APIIntegration: React.FC = () => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState<string | null>(null);
  
  const apiEndpoints: APIEndpoint[] = [
    {
      method: 'GET',
      endpoint: '/api/v1/properties',
      description: 'Retrieve property listings with filters',
      rateLimit: '1000/hour'
    },
    {
      method: 'GET',
      endpoint: '/api/v1/market-data',
      description: 'Get market statistics and trends',
      rateLimit: '500/hour'
    },
    {
      method: 'POST',
      endpoint: '/api/v1/leads',
      description: 'Create new lead entries',
      rateLimit: '200/hour'
    },
    {
      method: 'GET',
      endpoint: '/api/v1/valuations',
      description: 'Property valuation estimates',
      rateLimit: '100/hour'
    }
  ];

  const integrations = [
    {
      name: 'Salesforce CRM',
      description: 'Sync leads and client data',
      status: 'connected',
      logo: '🏢'
    },
    {
      name: 'HubSpot',
      description: 'Marketing automation integration',
      status: 'available',
      logo: '🚀'
    },
    {
      name: 'Zapier',
      description: 'Connect with 3000+ apps',
      status: 'connected',
      logo: '⚡'
    },
    {
      name: 'Mailchimp',
      description: 'Email marketing campaigns',
      status: 'available',
      logo: '📧'
    }
  ];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <FeatureGate feature="api_integration">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg">
                <Code className="h-6 w-6 text-white" />
              </div>
              {t('API Integration & Automation')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="api" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="api">{t('API Access')}</TabsTrigger>
                <TabsTrigger value="integrations">{t('Integrations')}</TabsTrigger>
                <TabsTrigger value="webhooks">{t('Webhooks')}</TabsTrigger>
                <TabsTrigger value="documentation">{t('Documentation')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="api" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Key className="h-5 w-5" />
                        {t('API Keys')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>{t('Production API Key')}</Label>
                        <div className="flex gap-2 mt-1">
                          <Input
                            type="password"
                            value="pk_live_abcd1234efgh5678ijkl9012"
                            readOnly
                            className="font-mono text-sm"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard('pk_live_abcd1234efgh5678ijkl9012', 'prod-key')}
                          >
                            {copied === 'prod-key' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <Label>{t('Test API Key')}</Label>
                        <div className="flex gap-2 mt-1">
                          <Input
                            type="password"
                            value="pk_test_wxyz9876abcd5432efgh1098"
                            readOnly
                            className="font-mono text-sm"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard('pk_test_wxyz9876abcd5432efgh1098', 'test-key')}
                          >
                            {copied === 'test-key' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t space-y-2">
                        <Button variant="outline" className="w-full">
                          {t('Generate New Key')}
                        </Button>
                        <Button variant="outline" className="w-full">
                          {t('Revoke Keys')}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t('Usage Statistics')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">1,247</div>
                          <div className="text-sm text-gray-600">{t('Requests Today')}</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">28,456</div>
                          <div className="text-sm text-gray-600">{t('This Month')}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{t('Rate Limit Usage')}</span>
                          <span>73%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '73%' }}></div>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        <p>{t('Next reset')}: 2h 15m</p>
                        <p>{t('Current plan')}: Professional (10,000 req/month)</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('Available Endpoints')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {apiEndpoints.map((endpoint, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Badge variant={endpoint.method === 'GET' ? 'default' : endpoint.method === 'POST' ? 'secondary' : 'outline'}>
                              {endpoint.method}
                            </Badge>
                            <div>
                              <p className="font-mono text-sm">{endpoint.endpoint}</p>
                              <p className="text-xs text-gray-600">{endpoint.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">{endpoint.rateLimit}</p>
                            <Button variant="outline" size="sm" className="mt-1">
                              {t('Try It')}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="integrations" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{t('Third-Party Integrations')}</h3>
                  <Button>
                    <Zap className="h-4 w-4 mr-2" />
                    {t('Browse Integrations')}
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {integrations.map((integration, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{integration.logo}</div>
                            <div>
                              <h4 className="font-semibold">{integration.name}</h4>
                              <p className="text-sm text-gray-600">{integration.description}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge 
                              variant={integration.status === 'connected' ? 'default' : 'outline'}
                              className={integration.status === 'connected' ? 'bg-green-100 text-green-800' : ''}
                            >
                              {integration.status === 'connected' ? t('Connected') : t('Available')}
                            </Badge>
                            <Button 
                              variant="outline" 
                              size="sm"
                            >
                              {integration.status === 'connected' ? t('Configure') : t('Connect')}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="webhooks" className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">{t('Webhook Configuration')}</h3>
                    <p className="text-sm text-gray-600">{t('Receive real-time notifications when events occur')}</p>
                  </div>
                  <Button>
                    <Webhook className="h-4 w-4 mr-2" />
                    {t('Add Webhook')}
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t('Active Webhooks')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium">New Lead Created</p>
                            <p className="text-sm text-gray-600 font-mono">https://yourapp.com/webhooks/leads</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">{t('Test')}</Button>
                          <Button variant="outline" size="sm">{t('Edit')}</Button>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium">Property Price Updated</p>
                            <p className="text-sm text-gray-600 font-mono">https://yourapp.com/webhooks/prices</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">{t('Test')}</Button>
                          <Button variant="outline" size="sm">{t('Edit')}</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t('Available Events')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          'lead.created',
                          'lead.updated',
                          'property.price_changed',
                          'market.data_updated',
                          'client.inquiry_received',
                          'valuation.completed'
                        ].map((event) => (
                          <div key={event} className="flex justify-between items-center">
                            <code className="text-sm bg-gray-100 px-2 py-1 rounded">{event}</code>
                            <Switch />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="documentation" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      {t('Quick Start Guide')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">{t('Authentication')}</h4>
                      <p className="text-sm text-gray-600 mb-2">{t('Include your API key in the Authorization header:')}</p>
                      <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm overflow-x-auto">
                        curl -H "Authorization: Bearer YOUR_API_KEY" \<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;https://api.pronastats.com/v1/properties
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">{t('Example Response')}</h4>
                      <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm overflow-x-auto">
                        {`{
  "data": [
    {
      "id": "prop_123",
      "title": "Luxury Apartment in Tirana",
      "price": 180000,
      "size": 120,
      "location": "Blloku, Tirana",
      "type": "apartment"
    }
  ],
  "meta": {
    "total": 1247,
    "page": 1,
    "per_page": 20
  }
}`}
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <Button>
                        {t('Full Documentation')}
                      </Button>
                      <Button variant="outline">
                        {t('API Reference')}
                      </Button>
                      <Button variant="outline">
                        {t('SDKs & Libraries')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </FeatureGate>
  );
};

export default APIIntegration;
