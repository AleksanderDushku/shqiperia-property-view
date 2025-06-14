
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { LogIn, LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const AuthButton: React.FC = () => {
  const { user, signOut, loading } = useAuth();

  if (loading) {
    return (
      <Button variant="ghost" size="sm" disabled>
        Loading...
      </Button>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 dark:text-gray-400 hidden md:inline">
          Welcome, {user.user_metadata?.full_name || user.email}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={signOut}
          className="text-albania-red hover:text-albania-red/80"
        >
          <LogOut className="h-4 w-4 mr-1" />
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Link to="/auth">
      <Button 
        variant="ghost" 
        size="sm"
        className="text-albania-red hover:text-albania-red/80"
      >
        <LogIn className="h-4 w-4 mr-1" />
        Sign In
      </Button>
    </Link>
  );
};

export default AuthButton;
