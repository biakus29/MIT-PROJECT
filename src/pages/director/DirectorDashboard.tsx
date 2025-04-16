
import React from 'react';
import { 
  Users, 
  School, 
  BookOpen, 
  CreditCard, 
  UserCheck, 
  Percent
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';

const DirectorDashboard = () => {
  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Tableau de bord - Directeur</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatsCard
            title="Effectif total"
            value="312"
            description="Élèves inscrits"
            icon={Users}
            trend={{ value: 5, isPositive: true }}
          />
          <StatsCard
            title="Nombre de classes"
            value="12"
            icon={School}
          />
          <StatsCard
            title="Corps enseignant"
            value="24"
            description="Professeurs actifs"
            icon={BookOpen}
          />
          <StatsCard
            title="Recouvrement"
            value="78%"
            description="Taux de paiement"
            icon={CreditCard}
            trend={{ value: 3, isPositive: true }}
          />
          <StatsCard
            title="Taux de présence"
            value="92%"
            icon={UserCheck}
            trend={{ value: 1, isPositive: true }}
          />
          <StatsCard
            title="Taux de réussite"
            value="85%"
            icon={Percent}
            trend={{ value: 2, isPositive: true }}
          />
        </div>
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4">Élèves par classe</h2>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded border">
              <p className="text-muted-foreground">Graphique de répartition des élèves</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4">Récapitulatif des paiements</h2>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded border">
              <p className="text-muted-foreground">Graphique des paiements par mois</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default DirectorDashboard;
