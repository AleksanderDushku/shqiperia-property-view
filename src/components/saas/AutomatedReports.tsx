
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { FileText, Download, Send, Calendar, Users, Settings, Clock } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { FeatureGate } from './FeatureGate';

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  frequency: string;
  lastGenerated: string;
  recipients: number;
  active: boolean;
}

const AutomatedReports: React.FC = () => {
  const { t } = useLanguage();
  
  const [templates, setTemplates] = useState<ReportTemplate[]>([
    {
      id: '1',
      name: 'Weekly Market Summary',
      description: 'Comprehensive weekly overview of market trends and activity',
      frequency: 'Weekly',
      lastGenerated: '2024-01-15',
      recipients: 25,
      active: true
    },
    {
      id: '2',
      name: 'Monthly Investment Report',
      description: 'Detailed monthly analysis for investors and stakeholders',
      frequency: 'Monthly',
      lastGenerated: '2024-01-01',
      recipients: 12,
      active: true
    },
    {
      id: '3',
      name: 'Property Valuation Updates',
      description: 'Automated property valuation reports for client portfolios',
      frequency: 'Bi-weekly',
      lastGenerated: '2024-01-10',
      recipients: 8,
      active: false
    }
  ]);

  const toggleTemplate = (id: string) => {
    setTemplates(prev => prev.map(template => 
      template.id === id ? { ...template, active: !template.active } : template
    ));
  };

  return (
    <FeatureGate feature="automated_reports">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              {t('Automated Reports')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="templates" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="templates">{t('Templates')}</TabsTrigger>
                <TabsTrigger value="schedule">{t('Schedule')}</TabsTrigger>
                <TabsTrigger value="recipients">{t('Recipients')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="templates" className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{t('Report Templates')}</h3>
                    <p className="text-sm text-gray-600">{t('Manage your automated report templates')}</p>
                  </div>
                  <Button>
                    <FileText className="h-4 w-4 mr-2" />
                    {t('Create New Template')}
                  </Button>
                </div>
                
                {templates.map((template) => (
                  <Card key={template.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Switch
                            checked={template.active}
                            onCheckedChange={() => toggleTemplate(template.id)}
                          />
                          <div>
                            <h4 className="font-semibold">{template.name}</h4>
                            <p className="text-sm text-gray-600">{template.description}</p>
                          </div>
                        </div>
                        <Badge variant={template.active ? 'default' : 'secondary'}>
                          {template.active ? t('Active') : t('Inactive')}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>{t('Frequency')}: {template.frequency}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span>{template.recipients} {t('recipients')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>{t('Last')}: {template.lastGenerated}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3 mr-1" />
                          {t('Download Sample')}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Send className="h-3 w-3 mr-1" />
                          {t('Send Now')}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-3 w-3 mr-1" />
                          {t('Configure')}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="schedule" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t('Global Schedule Settings')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>{t('Default Send Time')}</Label>
                        <Select defaultValue="09:00">
                          <SelectTrigger>
                            <SelectValue placeholder={t('Select time')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="06:00">06:00 AM</SelectItem>
                            <SelectItem value="09:00">09:00 AM</SelectItem>
                            <SelectItem value="12:00">12:00 PM</SelectItem>
                            <SelectItem value="15:00">03:00 PM</SelectItem>
                            <SelectItem value="18:00">06:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label>{t('Time Zone')}</Label>
                        <Select defaultValue="europe/tirane">
                          <SelectTrigger>
                            <SelectValue placeholder={t('Select timezone')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="europe/tirane">Europe/Tirane (GMT+1)</SelectItem>
                            <SelectItem value="europe/london">Europe/London (GMT)</SelectItem>
                            <SelectItem value="america/new_york">America/New_York (GMT-5)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label>{t('Skip Weekends')}</Label>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label>{t('Skip Holidays')}</Label>
                        <Switch defaultChecked />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t('Upcoming Reports')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                          <div>
                            <p className="font-medium">Weekly Market Summary</p>
                            <p className="text-sm text-gray-600">Next: Tomorrow, 9:00 AM</p>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <div>
                            <p className="font-medium">Monthly Investment Report</p>
                            <p className="text-sm text-gray-600">Next: Feb 1, 9:00 AM</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Scheduled</Badge>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">Property Valuation Updates</p>
                            <p className="text-sm text-gray-600">Inactive</p>
                          </div>
                          <Badge variant="secondary">Paused</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="recipients" className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">{t('Recipient Management')}</h3>
                      <p className="text-sm text-gray-600">{t('Manage who receives your automated reports')}</p>
                    </div>
                    <Button>
                      <Users className="h-4 w-4 mr-2" />
                      {t('Add Recipients')}
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">45</div>
                        <div className="text-sm text-gray-600">{t('Total Recipients')}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">12</div>
                        <div className="text-sm text-gray-600">{t('Active Lists')}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600">98%</div>
                        <div className="text-sm text-gray-600">{t('Delivery Rate')}</div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t('Recipient Lists')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">Investors & Stakeholders</p>
                            <p className="text-sm text-gray-600">12 recipients</p>
                          </div>
                          <div className="flex gap-2">
                            <Badge>Active</Badge>
                            <Button variant="outline" size="sm">{t('Edit')}</Button>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">Property Clients</p>
                            <p className="text-sm text-gray-600">25 recipients</p>
                          </div>
                          <div className="flex gap-2">
                            <Badge>Active</Badge>
                            <Button variant="outline" size="sm">{t('Edit')}</Button>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">Team Members</p>
                            <p className="text-sm text-gray-600">8 recipients</p>
                          </div>
                          <div className="flex gap-2">
                            <Badge>Active</Badge>
                            <Button variant="outline" size="sm">{t('Edit')}</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </FeatureGate>
  );
};

export default AutomatedReports;
