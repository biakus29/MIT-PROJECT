
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const NotFoundPage = () => {
  const { user } = useAuth();
  
  const getDashboardPath = () => {
    if (!user) return '/login';
    
    switch (user.role) {
      case 'DIRECTOR': return '/director/dashboard';
      case 'SECRETARY': return '/secretary/dashboard';
      case 'TEACHER': return '/teacher/dashboard';
      default: return '/login';
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-skyblue/10 to-white p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-skyblue">404</h1>
        <h2 className="text-2xl font-semibold mt-2">Page non trouvée</h2>
        <p className="mt-4 text-muted-foreground">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Button 
          asChild 
          className="mt-8 bg-skyblue hover:bg-skyblue/90"
        >
          <Link to={getDashboardPath()}>
            Retour au tableau de bord
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
