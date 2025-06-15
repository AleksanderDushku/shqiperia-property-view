
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Users, UserPlus, Crown, Shield, User, TrendingUp, DollarSign, Target } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { FeatureGate } from './FeatureGate';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'agent';
  status: 'active' | 'inactive';
  avatar: string;
  performance: {
    sales_this_month: number;
    clients: number;
    commission: number;
    target_achievement: number;
  };
  join_date: string;
}

const TeamManagement: React.FC = () => {
  const { t } = useLanguage();
  
  const [team] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Maria Koci',
      email: 'maria@company.com',
      role: 'admin',
      status: 'active',
      avatar: '',
      performance: {
        sales_this_month: 5,
        clients: 28,
        commission: 12500,
        target_achievement: 125
      },
      join_date: '2023-01-15'
    },
    {
      id: '2',
      name: 'Andi Hoxha',
      email: 'andi@company.com',
      role: 'manager',
      status: 'active',
      avatar: '',
      performance: {
        sales_this_month: 3,
        clients: 18,
        commission: 8200,
        target_achievement: 95
      },
      join_date: '2023-03-20'
    },
    {
      id: '3',
      name: 'Elena Shehu',
      email: 'elena@company.com',
      role: 'agent',
      status: 'active',
      avatar: '',
      performance: {
        sales_this_month: 2,
        clients: 15,
        commission: 4500,
        target_achievement: 78
      },
      join_date: '2023-06-10'
    }
  ]);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Crown className="h-4 w-4 text-yellow-500" />;
      case 'manager': return <Shield className="h-4 w-4 text-blue-500" />;
      default: return <User className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      admin: 'bg-yellow-100 text-yellow-800',
      manager: 'bg-blue-100 text-blue-800',
      agent: 'bg-gray-100 text-gray-800'
    };
    return colors[role as keyof typeof colors] || colors.agent;
  };

  return (
    <FeatureGate feature="team_management">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              {t('Team Management')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="team" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="team">{t('Team Members')}</TabsTrigger>
                <TabsTrigger value="performance">{t('Performance')}</TabsTrigger>
                <TabsTrigger value="commissions">{t('Commissions')}</TabsTrigger>
                <TabsTrigger value="roles">{t('Roles & Permissions')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="team" className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <Input
                      placeholder={t('Search team members...')}
                      className="w-64"
                    />
                    <Select>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder={t('Role')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('All Roles')}</SelectItem>
                        <SelectItem value="admin">{t('Admin')}</SelectItem>
                        <SelectItem value="manager">{t('Manager')}</SelectItem>
                        <SelectItem value="agent">{t('Agent')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    {t('Add Team Member')}
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {team.map((member) => (
                    <Card key={member.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback>
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                {getRoleIcon(member.role)}
                                <h3 className="font-semibold">{member.name}</h3>
                                <Badge className={getRoleBadge(member.role)}>
                                  {member.role}
                                </Badge>
                                <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                                  {member.status === 'active' ? t('Active') : t('Inactive')}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600">{member.email}</p>
                              <p className="text-xs text-gray-500">
                                {t('Joined')}: {member.join_date}
                              </p>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="grid grid-cols-2 gap-4 mb-3">
                              <div className="text-center">
                                <div className="font-semibold">{member.performance.sales_this_month}</div>
                                <div className="text-xs text-gray-500">{t('Sales')}</div>
                              </div>
                              <div className="text-center">
                                <div className="font-semibold">{member.performance.clients}</div>
                                <div className="text-xs text-gray-500">{t('Clients')}</div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                {t('Edit')}
                              </Button>
                              <Button variant="outline" size="sm">
                                {t('View Details')}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="performance" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">10</div>
                      <div className="text-sm text-gray-600">{t('Total Sales This Month')}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">€25,200</div>
                      <div className="text-sm text-gray-600">{t('Total Commission')}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">99%</div>
                      <div className="text-sm text-gray-600">{t('Team Target Achievement')}</div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      {t('Individual Performance')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {team.map((member) => (
                        <div key={member.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-xs text-gray-500">{member.role}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div className="text-center">
                              <div className="font-semibold">{member.performance.sales_this_month}</div>
                              <div className="text-xs text-gray-500">{t('Sales')}</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold">{member.performance.clients}</div>
                              <div className="text-xs text-gray-500">{t('Clients')}</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold">€{member.performance.commission.toLocaleString()}</div>
                              <div className="text-xs text-gray-500">{t('Commission')}</div>
                            </div>
                            <div className="text-center">
                              <div className={`font-semibold ${member.performance.target_achievement >= 100 ? 'text-green-600' : 'text-orange-600'}`}>
                                {member.performance.target_achievement}%
                              </div>
                              <div className="text-xs text-gray-500">{t('Target')}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="commissions" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{t('Commission Management')}</h3>
                  <Button>
                    <DollarSign className="h-4 w-4 mr-2" />
                    {t('Process Payments')}
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t('Commission Structure')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="agentCommission">{t('Agent Commission (%)')}</Label>
                        <Input id="agentCommission" type="number" defaultValue="3" />
                      </div>
                      <div>
                        <Label htmlFor="managerCommission">{t('Manager Bonus (%)')}</Label>
                        <Input id="managerCommission" type="number" defaultValue="0.5" />
                      </div>
                      <div>
                        <Label htmlFor="companyCommission">{t('Company Share (%)')}</Label>
                        <Input id="companyCommission" type="number" defaultValue="2" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t('Pending Payments')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {team.map((member) => (
                          <div key={member.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-sm text-gray-600">
                                {member.performance.sales_this_month} {t('sales this month')}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">€{member.performance.commission.toLocaleString()}</p>
                              <Button variant="outline" size="sm" className="mt-1">
                                {t('Pay')}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="roles" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Crown className="h-5 w-5 text-yellow-500" />
                        {t('Admin')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>✅ {t('Full system access')}</li>
                        <li>✅ {t('Team management')}</li>
                        <li>✅ {t('Financial reports')}</li>
                        <li>✅ {t('Settings configuration')}</li>
                        <li>✅ {t('Data export')}</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Shield className="h-5 w-5 text-blue-500" />
                        {t('Manager')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>✅ {t('Agent oversight')}</li>
                        <li>✅ {t('Performance reports')}</li>
                        <li>✅ {t('Client management')}</li>
                        <li>✅ {t('Lead assignment')}</li>
                        <li>❌ {t('Financial settings')}</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <User className="h-5 w-5 text-gray-500" />
                        {t('Agent')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>✅ {t('Own client management')}</li>
                        <li>✅ {t('Property listings')}</li>
                        <li>✅ {t('Basic reporting')}</li>
                        <li>❌ {t('Team oversight')}</li>
                        <li>❌ {t('System settings')}</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('Permission Management')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        {t('Customize permissions for each role to match your business needs.')}
                      </p>
                      <Button>
                        <Target className="h-4 w-4 mr-2" />
                        {t('Customize Permissions')}
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

export default TeamManagement;
