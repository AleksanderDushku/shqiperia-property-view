
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useDarkMode } from '../contexts/DarkModeContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { useToast } from '../hooks/use-toast';
import { Mail, Lock, User, Github, Twitter } from 'lucide-react';

const Auth: React.FC = () => {
  const { t } = useLanguage();
  const { dark_mode } = useDarkMode();
  const { user, signUp, signIn, signInWithProvider } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [is_signup, set_is_signup] = useState(false);
  const [email, set_email] = useState('');
  const [password, set_password] = useState('');
  const [full_name, set_full_name] = useState('');
  const [loading, set_loading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handle_submit = async (e: React.FormEvent) => {
    e.preventDefault();
    set_loading(true);

    try {
      let result;
      if (is_signup) {
        result = await signUp(email, password, full_name);
      } else {
        result = await signIn(email, password);
      }

      if (result.error) {
        toast({
          title: "Error",
          description: result.error.message,
          variant: "destructive",
        });
      } else if (is_signup) {
        toast({
          title: "Success",
          description: "Please check your email to confirm your account.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      set_loading(false);
    }
  };

  const handle_social_login = async (provider: 'google' | 'github' | 'twitter') => {
    set_loading(true);
    try {
      const { error } = await signInWithProvider(provider);
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      set_loading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${dark_mode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="w-full max-w-md">
        <Card className={`${dark_mode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center dark:text-white">
              {is_signup ? t('Create Account') : t('Welcome Back')}
            </CardTitle>
            <p className="text-center text-gray-600 dark:text-gray-400">
              {is_signup 
                ? t('Join thousands of property investors') 
                : t('Sign in to access your dashboard')
              }
            </p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Social Login Buttons */}
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant="outline"
                onClick={() => handle_social_login('google')}
                disabled={loading}
                className="w-full"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>
              
              <Button
                variant="outline"
                onClick={() => handle_social_login('github')}
                disabled={loading}
                className="w-full"
              >
                <Github className="w-5 h-5 mr-2" />
                Continue with GitHub
              </Button>
              
              <Button
                variant="outline"
                onClick={() => handle_social_login('twitter')}
                disabled={loading}
                className="w-full"
              >
                <Twitter className="w-5 h-5 mr-2" />
                Continue with Twitter
              </Button>
            </div>

            <Separator className="my-4" />

            <form onSubmit={handle_submit} className="space-y-4">
              {is_signup && (
                <div className="space-y-2">
                  <Label htmlFor="full_name" className="dark:text-gray-300">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="full_name"
                      type="text"
                      placeholder="John Doe"
                      value={full_name}
                      onChange={(e) => set_full_name(e.target.value)}
                      className="pl-10"
                      required={is_signup}
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="dark:text-gray-300">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => set_email(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="dark:text-gray-300">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => set_password(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-albania-red hover:bg-albania-red/90"
                disabled={loading}
              >
                {loading ? 'Loading...' : is_signup ? 'Create Account' : 'Sign In'}
              </Button>
            </form>

            <div className="text-center">
              <Button
                variant="link"
                onClick={() => set_is_signup(!is_signup)}
                className="text-albania-red hover:text-albania-red/80"
              >
                {is_signup 
                  ? 'Already have an account? Sign in' 
                  : "Don't have an account? Sign up"
                }
              </Button>
            </div>

            <div className="text-center">
              <Link 
                to="/" 
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-albania-red transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
