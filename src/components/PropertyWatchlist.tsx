
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { supabase } from '../integrations/supabase/client';
import { useToast } from '../hooks/use-toast';
import { Bell, Plus, Trash2, Eye } from 'lucide-react';

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
  const { user } = useAuth();
  const { toast } = useToast();
  const [watchlist, set_watchlist] = useState<WatchlistItem[]>([]);
  const [loading, set_loading] = useState(false);
  const [show_form, set_show_form] = useState(false);
  const [form_data, set_form_data] = useState({
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
      fetch_watchlist();
    }
  }, [user]);

  const fetch_watchlist = async () => {
    try {
      const { data, error } = await supabase
        .from('property_watchlist')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      set_watchlist(data || []);
    } catch (error) {
      console.error('Error fetching watchlist:', error);
    }
  };

  const handle_submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    set_loading(true);
    try {
      const { error } = await supabase
        .from('property_watchlist')
        .insert([{
          ...form_data,
          user_id: user.id,
          min_price: form_data.min_price ? parseInt(form_data.min_price) : null,
          max_price: form_data.max_price ? parseInt(form_data.max_price) : null,
          min_size: form_data.min_size ? parseInt(form_data.min_size) : null,
          max_size: form_data.max_size ? parseInt(form_data.max_size) : null,
        }]);

      if (error) throw error;

      toast({
        title: "Alert Created!",
        description: "You'll receive notifications when matching properties are found.",
      });

      set_form_data({
        property_type: '',
        location: '',
        min_price: '',
        max_price: '',
        min_size: '',
        max_size: '',
        alert_frequency: 'weekly'
      });
      set_show_form(false);
      fetch_watchlist();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create alert. Please try again.",
        variant: "destructive",
      });
    } finally {
      set_loading(false);
    }
  };

  const delete_watchlist_item = async (id: string) => {
    try {
      const { error } = await supabase
        .from('property_watchlist')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Alert Deleted",
        description: "Property alert has been removed.",
      });
      
      fetch_watchlist();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete alert.",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to create property alerts and never miss great deals!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-albania-red" />
              Property Alerts
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Get notified when properties matching your criteria become available
            </p>
          </div>
          <Button 
            onClick={() => set_show_form(!show_form)}
            className="bg-albania-red hover:bg-albania-red/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Alert
          </Button>
        </CardHeader>

        {show_form && (
          <CardContent className="border-t">
            <form onSubmit={handle_submit} className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Property Type</Label>
                  <Select value={form_data.property_type} onValueChange={(value) => set_form_data(prev => ({ ...prev, property_type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <Select value={form_data.location} onValueChange={(value) => set_form_data(prev => ({ ...prev, location: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tirana">Tirana</SelectItem>
                      <SelectItem value="durres">Durrës</SelectItem>
                      <SelectItem value="vlore">Vlorë</SelectItem>
                      <SelectItem value="shkoder">Shkodër</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Min Price (€)</Label>
                  <Input
                    type="number"
                    value={form_data.min_price}
                    onChange={(e) => set_form_data(prev => ({ ...prev, min_price: e.target.value }))}
                    placeholder="50000"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Max Price (€)</Label>
                  <Input
                    type="number"
                    value={form_data.max_price}
                    onChange={(e) => set_form_data(prev => ({ ...prev, max_price: e.target.value }))}
                    placeholder="150000"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Min Size (m²)</Label>
                  <Input
                    type="number"
                    value={form_data.min_size}
                    onChange={(e) => set_form_data(prev => ({ ...prev, min_size: e.target.value }))}
                    placeholder="80"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Max Size (m²)</Label>
                  <Input
                    type="number"
                    value={form_data.max_size}
                    onChange={(e) => set_form_data(prev => ({ ...prev, max_size: e.target.value }))}
                    placeholder="120"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Alert Frequency</Label>
                  <Select value={form_data.alert_frequency} onValueChange={(value) => set_form_data(prev => ({ ...prev, alert_frequency: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="bg-albania-red hover:bg-albania-red/90"
                >
                  {loading ? 'Creating...' : 'Create Alert'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => set_show_form(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        )}
      </Card>

      {/* Watchlist Items */}
      <div className="grid gap-4">
        {watchlist.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="h-4 w-4 text-albania-red" />
                    <span className="font-medium">
                      {item.property_type || 'Any type'} in {item.location || 'Any location'}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.is_active 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                    }`}>
                      {item.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    {(item.min_price || item.max_price) && (
                      <p>
                        Price: {item.min_price ? `€${item.min_price.toLocaleString()}` : '€0'} - {item.max_price ? `€${item.max_price.toLocaleString()}` : '∞'}
                      </p>
                    )}
                    {(item.min_size || item.max_size) && (
                      <p>
                        Size: {item.min_size || '0'}m² - {item.max_size || '∞'}m²
                      </p>
                    )}
                    <p>Alerts: {item.alert_frequency}</p>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => delete_watchlist_item(item.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {watchlist.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                No property alerts yet. Create your first alert to get notified about great deals!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PropertyWatchlist;
