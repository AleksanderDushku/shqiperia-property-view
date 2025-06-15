
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Users, MessageCircle, Bell, Search, Heart, Calendar, FileText, Settings } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { FeatureGate } from './FeatureGate';

interface Client {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'active' | 'inactive';
  savedProperties: number;
  lastActivity: string;
  preferences: string[];
}

const ClientPortal: React.FC = () => {
  const { t } = useLanguage();
  
  const [clients] = useState<Client[]>([
    {
      id: '1',
      name: 'Maria Koci',
      email: 'maria.koci@email.com',
      avatar: '',
      status: 'active',
      savedProperties: 8,
      lastActivity: '2 hours ago',
      preferences: ['Apartment', 'Tirana', '€150k-200k']
    },
    {
      id: '2',
      name: 'Andi Hoxha',
      email: 'andi.hoxha@email.com',
      avatar: '',
      status: 'active',
      savedProperties: 12,
      lastActivity: '1 day ago',
      preferences: ['House', 'Durres', '€100k-150k']
    },
    {
      id: '3',
      name: 'Elena Shehu',
      email: 'elena.shehu@email.com',
      avatar: '',
      status: 'inactive',
      savedProperties: 3,
      lastActivity: '1 week ago',
      preferences: ['Villa', 'Vlore', '€200k+']
    }
  ]);

  return (
    <FeatureGate feature="client_portal">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              {t('Client Portal Management')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="clients" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="clients">{t('Clients')}</TabsTrigger>
                <TabsTrigger value="messages">{t('Messages')}</TabsTrigger>
                <TabsTrigger value="notifications">{t('Notifications')}</TabsTrigger>
                <TabsTrigger value="settings">{t('Portal Settings')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="clients" className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <Input
                      placeholder={t('Search clients...')}
                      className="w-64"
                    />
                    <Button variant="outline">
                      <Search className="h-4 w-4 mr-2" />
                      {t('Search')}
                    </Button>
                  </div>
                  <Button>
                    <Users className="h-4 w-4 mr-2" />
                    {t('Invite Client')}
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {clients.map((client) => (
                    <Card key={client.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={client.avatar} />
                              <AvatarFallback>
                                {client.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{client.name}</h3>
                                <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                                  {client.status === 'active' ? t('Active') : t('Inactive')}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600">{client.email}</p>
                              <p className="text-xs text-gray-500">
                                {t('Last activity')}: {client.lastActivity}
                              </p>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="flex items-center gap-4 mb-2">
                              <div className="text-center">
                                <div className="text-lg font-semibold">{client.savedProperties}</div>
                                <div className="text-xs text-gray-500">{t('Saved Properties')}</div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <MessageCircle className="h-3 w-3 mr-1" />
                                {t('Message')}
                              </Button>
                              <Button variant="outline" size="sm">
                                <Calendar className="h-3 w-3 mr-1" />
                                {t('Schedule')}
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-sm font-medium text-gray-700 mb-2">{t('Preferences')}</p>
                          <div className="flex flex-wrap gap-1">
                            {client.preferences.map((pref, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {pref}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="messages" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{t('Recent Messages')}</h3>
                  <Button>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {t('New Message')}
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="hover:shadow-sm transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>MK</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-medium">Maria Koci</h4>
                              <span className="text-xs text-gray-500">2 hours ago</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              Hi, I'm interested in the apartment you showed me yesterday. Can we schedule a viewing?
                            </p>
                            <div className="flex gap-2">
                              <Badge variant="outline" className="text-xs">{t('Unread')}</Badge>
                              <Badge variant="outline" className="text-xs">{t('Property Inquiry')}</Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{t('Client Notifications')}</h3>
                  <Button>
                    <Bell className="h-4 w-4 mr-2" />
                    {t('Send Notification')}
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t('Automated Alerts')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{t('New Property Matches')}</span>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{t('Price Drop Alerts')}</span>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{t('Market Updates')}</span>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{t('Appointment Reminders')}</span>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t('Recent Activity')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-sm">
                        <p className="font-medium">12 {t('notifications sent today')}</p>
                        <p className="text-gray-600">8 {t('opened')}, 4 {t('clicked')}</p>
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">95% {t('delivery rate')}</p>
                        <p className="text-gray-600">{t('Last 30 days')}</p>
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">3.2% {t('unsubscribe rate')}</p>
                        <p className="text-gray-600">{t('Industry average: 2.8%')}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        {t('Portal Configuration')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">{t('Portal URL')}</label>
                        <Input value="https://clients.yourcompany.com" readOnly />
                      </div>
                      <div>
                        <label className="text-sm font-medium">{t('Welcome Message')}</label>
                        <Input placeholder={t('Enter welcome message for clients')} />
                      </div>
                      <div>
                        <label className="text-sm font-medium">{t('Support Email')}</label>
                        <Input placeholder="support@yourcompany.com" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t('Features & Permissions')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{t('Property Search')}</span>
                        <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{t('Save Favorites')}</span>
                        <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{t('Schedule Viewings')}</span>
                        <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{t('Market Reports')}</span>
                        <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{t('Document Upload')}</span>
                        <Badge variant="secondary">Disabled</Badge>
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

export default ClientPortal;
