
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useDarkMode } from '../contexts/DarkModeContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { supabase } from '../integrations/supabase/client';
import { useToast } from '../hooks/use-toast';
import { 
  Bell, 
  Plus, 
  Trash2, 
  MapPin, 
  DollarSign, 
  Home, 
  Eye,
  Settings,
  TrendingUp
} from 'lucide-react';

interface WatchlistItem {
  id: string;
  property_type: string;
  location: string;
  min_price: number;
  max_price: number;
  min_size: number;
  max_size: number;
  alert_frequency: string;
  is_active: boolean;
  created_at: string;
}

const PropertyWatchlist: React.FC = () => {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const { dark_mode } = useDarkMode();
  const { toast } = useToast();
  
  const [watchlistItems, setWatchlistItems] = useState<WatchlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const [newItem, setNewItem] = useState({
    property_type: '',
    location: '',
    min_price: '',
    max_price: '',
    min_size: '',
    max_size: '',
    alert_frequency: 'weekly'
  });

  useEffect(() => {
    if (user) {
      fetchWatchlistItems();
    }
  }, [user]);

  const fetchWatchlistItems = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('property_watchlist')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWatchlistItems(data || []);
    } catch (error) {
      console.error('Error fetching watchlist:', error);
      toast({
        title: language === 'sq' ? 'Gabim' : 'Error',
        description: language === 'sq' ? 'Nuk mund të ngarkohet lista.' : 'Failed to load watchlist.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const { error } = await supabase
        .from('property_watchlist')
        .insert([{
          user_id: user.id,
          property_type: newItem.property_type,
          location: newItem.location,
          min_price: parseInt(newItem.min_price) || null,
          max_price: parseInt(newItem.max_price) || null,
          min_size: parseInt(newItem.min_size) || null,
          max_size: parseInt(newItem.max_size) || null,
          alert_frequency: newItem.alert_frequency
        }]);

      if (error) throw error;

      toast({
        title: language === 'sq' ? 'Sukses!' : 'Success!',
        description: language === 'sq' ? 'Ndjekja u shtua me sukses.' : 'Watchlist item added successfully.',
      });

      setNewItem({
        property_type: '',
        location: '',
        min_price: '',
        max_price: '',
        min_size: '',
        max_size: '',
        alert_frequency: 'weekly'
      });
      setShowAddForm(false);
      fetchWatchlistItems();
    } catch (error) {
      console.error('Error adding watchlist item:', error);
      toast({
        title: language === 'sq' ? 'Gabim' : 'Error',
        description: language === 'sq' ? 'Nuk mund të shtohet elementi.' : 'Failed to add watchlist item.',
        variant: 'destructive'
      });
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('property_watchlist')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: language === 'sq' ? 'U fshi' : 'Deleted',
        description: language === 'sq' ? 'Elementi u fshi nga lista.' : 'Item removed from watchlist.',
      });

      fetchWatchlistItems();
    } catch (error) {
      console.error('Error deleting watchlist item:', error);
      toast({
        title: language === 'sq' ? 'Gabim' : 'Error',
        description: language === 'sq' ? 'Nuk mund të fshihet elementi.' : 'Failed to delete item.',
        variant: 'destructive'
      });
    }
  };

  if (!user) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="text-center py-12">
          <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            {language === 'sq' ? 'Kyçuni për të ndjekur pronat' : 'Sign in to track properties'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {language === 'sq' 
              ? 'Krijoni llogari për të marrë njoftime për pronat që ju interesojnë'
              : 'Create an account to get notifications about properties you\'re interested in'}
          </p>
          <Button className="bg-albania-red hover:bg-albania-red/90">
            {language === 'sq' ? 'Kyçu' : 'Sign In'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <div className="p-2 bg-albania-red/10 rounded-xl">
              <Bell className="h-8 w-8 text-albania-red" />
            </div>
            {language === 'sq' ? 'Lista e Ndjekjes' : 'Property Watchlist'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {language === 'sq' 
              ? 'Ndiqni pronat dhe merrni njoftime për ndryshime çmimesh'
              : 'Track properties and get alerts for price changes'}
          </p>
        </div>
        
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-albania-red hover:bg-albania-red/90 rounded-xl"
        >
          <Plus className="h-4 w-4 mr-2" />
          {language === 'sq' ? 'Shto Ndjekje' : 'Add Alert'}
        </Button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <Card className="border-2 border-albania-red/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-albania-red" />
              {language === 'sq' ? 'Krijoni Ndjekje të Re' : 'Create New Alert'}
            </CardTitle>
            <CardDescription>
              {language === 'sq' 
                ? 'Përcaktoni kriteret për të marrë njoftime'
                : 'Set your criteria to receive notifications'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddItem} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {language === 'sq' ? 'Lloji i Pronës' : 'Property Type'}
                  </label>
                  <Select value={newItem.property_type} onValueChange={(value) => setNewItem({...newItem, property_type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'sq' ? 'Zgjidhni llojin' : 'Select type'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">{language === 'sq' ? 'Apartament' : 'Apartment'}</SelectItem>
                      <SelectItem value="house">{language === 'sq' ? 'Shtëpi' : 'House'}</SelectItem>
                      <SelectItem value="land">{language === 'sq' ? 'Truall' : 'Land'}</SelectItem>
                      <SelectItem value="commercial">{language === 'sq' ? 'Komerciale' : 'Commercial'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {language === 'sq' ? 'Vendndodhja' : 'Location'}
                  </label>
                  <Select value={newItem.location} onValueChange={(value) => setNewItem({...newItem, location: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'sq' ? 'Zgjidhni zonën' : 'Select area'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tirana">{language === 'sq' ? 'Tiranë' : 'Tirana'}</SelectItem>
                      <SelectItem value="durres">{language === 'sq' ? 'Durrës' : 'Durres'}</SelectItem>
                      <SelectItem value="vlore">{language === 'sq' ? 'Vlorë' : 'Vlora'}</SelectItem>
                      <SelectItem value="sarande">{language === 'sq' ? 'Sarandë' : 'Saranda'}</SelectItem>
                      <SelectItem value="shkoder">{language === 'sq' ? 'Shkodër' : 'Shkodra'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {language === 'sq' ? 'Çmimi Min (€)' : 'Min Price (€)'}
                  </label>
                  <Input
                    type="number"
                    value={newItem.min_price}
                    onChange={(e) => setNewItem({...newItem, min_price: e.target.value})}
                    placeholder="50000"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {language === 'sq' ? 'Çmimi Max (€)' : 'Max Price (€)'}
                  </label>
                  <Input
                    type="number"
                    value={newItem.max_price}
                    onChange={(e) => setNewItem({...newItem, max_price: e.target.value})}
                    placeholder="150000"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {language === 'sq' ? 'Madhësia Min (m²)' : 'Min Size (m²)'}
                  </label>
                  <Input
                    type="number"
                    value={newItem.min_size}
                    onChange={(e) => setNewItem({...newItem, min_size: e.target.value})}
                    placeholder="60"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {language === 'sq' ? 'Madhësia Max (m²)' : 'Max Size (m²)'}
                  </label>
                  <Input
                    type="number"
                    value={newItem.max_size}
                    onChange={(e) => setNewItem({...newItem, max_size: e.target.value})}
                    placeholder="120"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {language === 'sq' ? 'Frekuenca' : 'Frequency'}
                  </label>
                  <Select value={newItem.alert_frequency} onValueChange={(value) => setNewItem({...newItem, alert_frequency: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">{language === 'sq' ? 'Ditore' : 'Daily'}</SelectItem>
                      <SelectItem value="weekly">{language === 'sq' ? 'Javore' : 'Weekly'}</SelectItem>
                      <SelectItem value="monthly">{language === 'sq' ? 'Mujore' : 'Monthly'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="bg-albania-red hover:bg-albania-red/90">
                  <Plus className="h-4 w-4 mr-2" />
                  {language === 'sq' ? 'Shto Ndjekje' : 'Add Alert'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  {language === 'sq' ? 'Anulo' : 'Cancel'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Watchlist Items */}
      <div className="grid gap-4">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-albania-red mx-auto"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {language === 'sq' ? 'Duke ngarkuar...' : 'Loading...'}
            </p>
          </div>
        ) : watchlistItems.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Eye className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {language === 'sq' ? 'Asnjë ndjekje ende' : 'No alerts yet'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {language === 'sq' 
                  ? 'Krijoni ndjekjen e parë për të marrë njoftime'
                  : 'Create your first alert to get notifications'}
              </p>
            </CardContent>
          </Card>
        ) : (
          watchlistItems.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-albania-red/10 rounded-lg">
                        <Home className="h-5 w-5 text-albania-red" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg capitalize">
                          {item.property_type} {language === 'sq' ? 'në' : 'in'} {item.location}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {item.location}
                          </span>
                          <Badge variant="outline" className="capitalize">
                            {item.alert_frequency}
                          </Badge>
                          {item.is_active && (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              {language === 'sq' ? 'Aktive' : 'Active'}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      {(item.min_price || item.max_price) && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-albania-red" />
                          <span>
                            {language === 'sq' ? 'Çmimi:' : 'Price:'} €
                            {item.min_price ? item.min_price.toLocaleString() : '0'} - €
                            {item.max_price ? item.max_price.toLocaleString() : '∞'}
                          </span>
                        </div>
                      )}
                      
                      {(item.min_size || item.max_size) && (
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-albania-red" />
                          <span>
                            {language === 'sq' ? 'Madhësia:' : 'Size:'} 
                            {item.min_size || '0'}m² - {item.max_size || '∞'}m²
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default PropertyWatchlist;
