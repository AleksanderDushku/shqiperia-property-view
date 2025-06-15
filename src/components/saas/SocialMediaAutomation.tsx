
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Share2, Facebook, Instagram, Twitter, Calendar, TrendingUp, Image, Send } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { FeatureGate } from './FeatureGate';

interface SocialPost {
  id: string;
  content: string;
  platform: string[];
  scheduled_time: string;
  status: 'draft' | 'scheduled' | 'published';
  engagement: {
    likes: number;
    shares: number;
    comments: number;
  };
}

const SocialMediaAutomation: React.FC = () => {
  const { t } = useLanguage();
  
  const [posts] = useState<SocialPost[]>([
    {
      id: '1',
      content: 'New luxury apartment in Tirana Center! 3 bedrooms, 2 bathrooms, stunning city views. €180,000. Contact us for viewing! #TiranaRealEstate #Property #Investment',
      platform: ['facebook', 'instagram'],
      scheduled_time: '2024-01-16 10:00',
      status: 'scheduled',
      engagement: { likes: 0, shares: 0, comments: 0 }
    },
    {
      id: '2',
      content: 'Market Update: Property prices in Durres increased by 8.5% this quarter. Great investment opportunities available! 📈 #RealEstateMarket #Investment',
      platform: ['facebook', 'twitter'],
      scheduled_time: '2024-01-15 14:30',
      status: 'published',
      engagement: { likes: 24, shares: 6, comments: 3 }
    }
  ]);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'facebook': return <Facebook className="h-4 w-4 text-blue-600" />;
      case 'instagram': return <Instagram className="h-4 w-4 text-pink-600" />;
      case 'twitter': return <Twitter className="h-4 w-4 text-blue-400" />;
      default: return <Share2 className="h-4 w-4" />;
    }
  };

  return (
    <FeatureGate feature="social_automation">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg">
                <Share2 className="h-6 w-6 text-white" />
              </div>
              {t('Social Media Automation')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="posts" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="posts">{t('Posts')}</TabsTrigger>
                <TabsTrigger value="create">{t('Create Post')}</TabsTrigger>
                <TabsTrigger value="analytics">{t('Analytics')}</TabsTrigger>
                <TabsTrigger value="settings">{t('Settings')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="posts" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{t('Scheduled & Published Posts')}</h3>
                  <Button>
                    <Calendar className="h-4 w-4 mr-2" />
                    {t('Content Calendar')}
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {posts.map((post) => (
                    <Card key={post.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge 
                                variant={post.status === 'published' ? 'default' : 'secondary'}
                                className={post.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : ''}
                              >
                                {post.status === 'published' ? t('Published') : 
                                 post.status === 'scheduled' ? t('Scheduled') : t('Draft')}
                              </Badge>
                              <div className="flex gap-1">
                                {post.platform.map((platform) => (
                                  <div key={platform} className="p-1 bg-gray-100 rounded">
                                    {getPlatformIcon(platform)}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-gray-700 mb-2 line-clamp-3">
                              {post.content}
                            </p>
                            <p className="text-xs text-gray-500">
                              {post.status === 'scheduled' ? 
                                `${t('Scheduled for')}: ${post.scheduled_time}` :
                                `${t('Published')}: ${post.scheduled_time}`
                              }
                            </p>
                          </div>
                        </div>
                        
                        {post.status === 'published' && (
                          <div className="flex gap-4 text-sm pt-3 border-t">
                            <span className="flex items-center gap-1">
                              ❤️ {post.engagement.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              🔄 {post.engagement.shares}
                            </span>
                            <span className="flex items-center gap-1">
                              💬 {post.engagement.comments}
                            </span>
                          </div>
                        )}
                        
                        <div className="flex gap-2 mt-3">
                          <Button variant="outline" size="sm">
                            {t('Edit')}
                          </Button>
                          {post.status === 'scheduled' && (
                            <Button variant="outline" size="sm">
                              {t('Publish Now')}
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            {t('Duplicate')}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="create" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">{t('Create New Post')}</h3>
                    
                    <div>
                      <Label htmlFor="postContent">{t('Post Content')}</Label>
                      <Textarea
                        id="postContent"
                        placeholder={t('Write your social media post...')}
                        rows={4}
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{t('Character count')}: 0/280</span>
                        <Button variant="link" size="sm" className="p-0 h-auto">
                          {t('AI Generate')}
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <Label>{t('Platforms')}</Label>
                      <div className="flex gap-3 mt-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="facebook" defaultChecked />
                          <label htmlFor="facebook" className="flex items-center gap-1 text-sm">
                            <Facebook className="h-4 w-4 text-blue-600" />
                            Facebook
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="instagram" />
                          <label htmlFor="instagram" className="flex items-center gap-1 text-sm">
                            <Instagram className="h-4 w-4 text-pink-600" />
                            Instagram
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="twitter" />
                          <label htmlFor="twitter" className="flex items-center gap-1 text-sm">
                            <Twitter className="h-4 w-4 text-blue-400" />
                            Twitter
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="scheduleDate">{t('Schedule Date')}</Label>
                        <Input
                          id="scheduleDate"
                          type="date"
                          defaultValue="2024-01-16"
                        />
                      </div>
                      <div>
                        <Label htmlFor="scheduleTime">{t('Schedule Time')}</Label>
                        <Input
                          id="scheduleTime"
                          type="time"
                          defaultValue="10:00"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>{t('Add Images')}</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mt-2">
                        <Image className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">{t('Drag & drop images or click to browse')}</p>
                        <Button variant="outline" className="mt-2">
                          {t('Choose Files')}
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">{t('Post Templates')}</h3>
                    <p className="text-sm text-gray-600">{t('Use AI-powered templates for common real estate posts')}</p>
                    
                    <div className="space-y-3">
                      {[
                        { title: t('New Property Listing'), desc: t('Showcase a new property with details and CTA') },
                        { title: t('Market Update'), desc: t('Share market trends and insights') },
                        { title: t('Client Testimonial'), desc: t('Feature happy client reviews') },
                        { title: t('Investment Tips'), desc: t('Share investment advice and tips') },
                        { title: t('Open House Event'), desc: t('Promote upcoming open house events') }
                      ].map((template, index) => (
                        <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                          <CardContent className="p-3">
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-medium text-sm">{template.title}</h4>
                                <p className="text-xs text-gray-600">{template.desc}</p>
                              </div>
                              <Button variant="outline" size="sm">
                                {t('Use Template')}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4 border-t">
                  <Button variant="outline">
                    {t('Save as Draft')}
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Send className="h-4 w-4 mr-2" />
                      {t('Publish Now')}
                    </Button>
                    <Button>
                      <Calendar className="h-4 w-4 mr-2" />
                      {t('Schedule Post')}
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="analytics" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">1,247</div>
                      <div className="text-sm text-gray-600">{t('Total Followers')}</div>
                      <div className="text-xs text-green-600">+12% {t('this month')}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">3.2%</div>
                      <div className="text-sm text-gray-600">{t('Engagement Rate')}</div>
                      <div className="text-xs text-green-600">+0.8% {t('vs last month')}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">24</div>
                      <div className="text-sm text-gray-600">{t('Posts This Month')}</div>
                      <div className="text-xs text-gray-500">{t('6 per week average')}</div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        {t('Platform Performance')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Facebook className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">Facebook</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">2.8% {t('engagement')}</div>
                          <div className="text-xs text-gray-500">892 {t('followers')}</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Instagram className="h-4 w-4 text-pink-600" />
                          <span className="text-sm">Instagram</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">4.1% {t('engagement')}</div>
                          <div className="text-xs text-gray-500">245 {t('followers')}</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Twitter className="h-4 w-4 text-blue-400" />
                          <span className="text-sm">Twitter</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">1.9% {t('engagement')}</div>
                          <div className="text-xs text-gray-500">110 {t('followers')}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t('Best Performing Posts')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium mb-1">{t('Luxury Villa in Sarande')}</p>
                        <p className="text-xs text-gray-600 mb-2">Posted 3 days ago</p>
                        <div className="flex gap-3 text-xs">
                          <span>❤️ 45</span>
                          <span>🔄 12</span>
                          <span>💬 8</span>
                        </div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium mb-1">{t('Market Update Q4')}</p>
                        <p className="text-xs text-gray-600 mb-2">Posted 1 week ago</p>
                        <div className="flex gap-3 text-xs">
                          <span>❤️ 32</span>
                          <span>🔄 18</span>
                          <span>💬 5</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t('Account Connections')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Facebook className="h-5 w-5 text-blue-600" />
                          <span>Facebook</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800">Connected</Badge>
                          <Button variant="outline" size="sm">{t('Disconnect')}</Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Instagram className="h-5 w-5 text-pink-600" />
                          <span>Instagram</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">Not Connected</Badge>
                          <Button variant="outline" size="sm">{t('Connect')}</Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Twitter className="h-5 w-5 text-blue-400" />
                          <span>Twitter</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">Not Connected</Badge>
                          <Button variant="outline" size="sm">{t('Connect')}</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t('Automation Settings')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{t('Auto-post new listings')}</p>
                          <p className="text-sm text-gray-600">{t('Automatically share new property listings')}</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{t('Weekly market updates')}</p>
                          <p className="text-sm text-gray-600">{t('Share market insights every Monday')}</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{t('Client testimonials')}</p>
                          <p className="text-sm text-gray-600">{t('Share approved client reviews')}</p>
                        </div>
                        <Switch />
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

export default SocialMediaAutomation;
