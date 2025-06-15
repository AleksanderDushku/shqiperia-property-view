
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Badge } from '../ui/badge';
import { Settings, Palette, Layout, BarChart, Save, RotateCcw } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useDarkMode } from '../../contexts/DarkModeContext';

interface MarketSettings {
  chartType: string;
  dataUpdateFrequency: number;
  showAnimations: boolean;
  displayDensity: string;
  colorScheme: string;
  autoRefresh: boolean;
  showNotifications: boolean;
  defaultRegion: string;
}

const MarketCustomization: React.FC = () => {
  const { t } = useLanguage();
  const { dark_mode } = useDarkMode();
  
  const [settings, setSettings] = useState<MarketSettings>({
    chartType: 'line',
    dataUpdateFrequency: 30,
    showAnimations: true,
    displayDensity: 'comfortable',
    colorScheme: 'albania',
    autoRefresh: true,
    showNotifications: true,
    defaultRegion: 'tirana'
  });

  const handleSave = () => {
    localStorage.setItem('marketSettings', JSON.stringify(settings));
    console.log('Settings saved:', settings);
  };

  const handleReset = () => {
    setSettings({
      chartType: 'line',
      dataUpdateFrequency: 30,
      showAnimations: true,
      displayDensity: 'comfortable',
      colorScheme: 'albania',
      autoRefresh: true,
      showNotifications: true,
      defaultRegion: 'tirana'
    });
  };

  return (
    <Card className={`w-full transition-all duration-300 ${dark_mode ? 'border-gray-700' : ''}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
            <Settings className="h-6 w-6 text-white" />
          </div>
          {t('Market Customization')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Display Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Layout className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold">{t('Display Settings')}</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="chartType">{t('Default Chart Type')}</Label>
                <Select value={settings.chartType} onValueChange={(value) => setSettings({...settings, chartType: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="line">{t('Line Chart')}</SelectItem>
                    <SelectItem value="bar">{t('Bar Chart')}</SelectItem>
                    <SelectItem value="area">{t('Area Chart')}</SelectItem>
                    <SelectItem value="scatter">{t('Scatter Plot')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="displayDensity">{t('Display Density')}</Label>
                <Select value={settings.displayDensity} onValueChange={(value) => setSettings({...settings, displayDensity: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">{t('Compact')}</SelectItem>
                    <SelectItem value="comfortable">{t('Comfortable')}</SelectItem>
                    <SelectItem value="spacious">{t('Spacious')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="showAnimations">{t('Show Animations')}</Label>
                <Switch
                  id="showAnimations"
                  checked={settings.showAnimations}
                  onCheckedChange={(checked) => setSettings({...settings, showAnimations: checked})}
                />
              </div>
            </div>
          </div>

          {/* Color & Theme Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Palette className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold">{t('Color & Theme')}</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="colorScheme">{t('Color Scheme')}</Label>
                <Select value={settings.colorScheme} onValueChange={(value) => setSettings({...settings, colorScheme: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="albania">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-albania-red rounded"></div>
                        {t('Albania Red')}
                      </div>
                    </SelectItem>
                    <SelectItem value="blue">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-600 rounded"></div>
                        {t('Professional Blue')}
                      </div>
                    </SelectItem>
                    <SelectItem value="green">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-600 rounded"></div>
                        {t('Success Green')}
                      </div>
                    </SelectItem>
                    <SelectItem value="purple">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-purple-600 rounded"></div>
                        {t('Premium Purple')}
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="defaultRegion">{t('Default Region Focus')}</Label>
                <Select value={settings.defaultRegion} onValueChange={(value) => setSettings({...settings, defaultRegion: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tirana">{t('Tirana')}</SelectItem>
                    <SelectItem value="durres">{t('Durres')}</SelectItem>
                    <SelectItem value="vlore">{t('Vlore')}</SelectItem>
                    <SelectItem value="sarande">{t('Sarande')}</SelectItem>
                    <SelectItem value="all">{t('All Regions')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Data & Updates Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <BarChart className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold">{t('Data & Updates')}</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="updateFrequency">{t('Update Frequency (minutes)')}</Label>
                <div className="mt-2">
                  <Slider
                    value={[settings.dataUpdateFrequency]}
                    onValueChange={([value]) => setSettings({...settings, dataUpdateFrequency: value})}
                    max={120}
                    min={5}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>5 min</span>
                    <Badge variant="outline">{settings.dataUpdateFrequency} min</Badge>
                    <span>120 min</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="autoRefresh">{t('Auto Refresh')}</Label>
                <Switch
                  id="autoRefresh"
                  checked={settings.autoRefresh}
                  onCheckedChange={(checked) => setSettings({...settings, autoRefresh: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="showNotifications">{t('Push Notifications')}</Label>
                <Switch
                  id="showNotifications"
                  checked={settings.showNotifications}
                  onCheckedChange={(checked) => setSettings({...settings, showNotifications: checked})}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button onClick={handleSave} className="flex items-center gap-2 bg-gradient-to-r from-albania-red to-red-600">
            <Save className="h-4 w-4" />
            {t('Save Settings')}
          </Button>
          <Button onClick={handleReset} variant="outline" className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            {t('Reset to Defaults')}
          </Button>
        </div>

        {/* Current Settings Preview */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h4 className="font-medium mb-3">{t('Current Settings Preview')}</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-500">{t('Chart Type')}:</span>
              <Badge variant="outline" className="ml-2">{settings.chartType}</Badge>
            </div>
            <div>
              <span className="text-gray-500">{t('Updates')}:</span>
              <Badge variant="outline" className="ml-2">{settings.dataUpdateFrequency}min</Badge>
            </div>
            <div>
              <span className="text-gray-500">{t('Theme')}:</span>
              <Badge variant="outline" className="ml-2">{settings.colorScheme}</Badge>
            </div>
            <div>
              <span className="text-gray-500">{t('Region')}:</span>
              <Badge variant="outline" className="ml-2">{settings.defaultRegion}</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketCustomization;
