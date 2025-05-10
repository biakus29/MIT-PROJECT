import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, MoreHorizontal, Eye, FileSpreadsheet, Calendar, CreditCard, Check, FileText } from 'lucide-react';

// Mock payment data
const mockPayments = [
  {
    id: 1,
    studentName: 'Emmanuel Kamga',
    class: '6ème A',
    paymentType: 'Frais de scolarité',
    amount: 125000,
    paymentDate: '15/09/2023',
    paymentMethod: 'Mobile Money',
    status: 'Complété',
    receipt: 'RECU-2023-001',
  },
  {
    id: 2,
    studentName: 'Sophie Mbock',
    class: '5ème B',
    paymentType: 'Frais de scolarité',
    amount: 75000,
    paymentDate: '20/09/2023',
    paymentMethod: 'Espèces',
    status: 'Partiel',
    receipt: 'RECU-2023-002',
  },
  {
    id: 3,
    studentName: 'Paul Tamba',
    class: '4ème A',
    paymentType: 'APEE',
    amount: 10000,
    paymentDate: '05/10/2023',
    paymentMethod: 'Espèces',
    status: 'Complété',
    receipt: 'RECU-2023-003',
  },
  {
    id: 4,
    studentName: 'Carine Fouda',
    class: '3ème C',
    paymentType: 'Frais de scolarité',
    amount: 150000,
    paymentDate: '10/09/2023',
    paymentMethod: 'Virement bancaire',
    status: 'Complété',
    receipt: 'RECU-2023-004',
  },
  {
    id: 5,
    studentName: 'Michel Nkodo',
    class: '6ème B',
    paymentType: 'Frais de scolarité',
    amount: 80000,
    paymentDate: '25/09/2023',
    paymentMethod: 'Mobile Money',
    status: 'Partiel',
    receipt: 'RECU-2023-005',
  },
  {
    id: 6,
    studentName: 'Vanessa Atangana',
    class: '5ème A',
    paymentType: 'Frais d\'examen',
    amount: 15000,
    paymentDate: '30/09/2023',
    paymentMethod: 'Espèces',
    status: 'Complété',
    receipt: 'RECU-2023-006',
  },
  {
    id: 7,
    studentName: 'Serge Fotso',
    class: '4ème B',
    paymentType: 'APEE',
    amount: 10000,
    paymentDate: '02/10/2023',
    paymentMethod: 'Mobile Money',
    status: 'Complété',
    receipt: 'RECU-2023-007',
  },
  {
    id: 8,
    studentName: 'Serge Fotso',
    class: '4ème B',
    paymentType: 'Frais de scolarité',
    amount: 0,
    paymentDate: '-',
    paymentMethod: '-',
    status: 'Non payé',
    receipt: '-',
  },
];

// Status color mapping
const getStatusColor = (status) => {
  switch (status) {
    case 'Complété': return 'bg-green-100 text-green-800';
    case 'Partiel': return 'bg-yellow-100 text-yellow-800';
    case 'Non payé': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// Currency formatter
const formatCurrency = (amount) => {
  return amount === 0 ? '-' : amount.toLocaleString('fr-FR') + ' FCFA';
};

const DirectorPayments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);

  // Filter payments based on search term and status
  const filteredPayments = mockPayments.filter((payment) => {
    const matchesSearch = 
      payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      payment.receipt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate payment statistics
  const totalPayments = mockPayments.filter(p => p.status !== 'Non payé').length;
  const totalAmount = mockPayments.reduce((sum, current) => sum + current.amount, 0);
  const completePayments = mockPayments.filter(p => p.status === 'Complété').length;
  const partialPayments = mockPayments.filter(p => p.status === 'Partiel').length;

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
    setShowPaymentDetails(true);
  };

  return (
    <AppLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gestion des Paiements</h1>
          <Button variant="outline" className="flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            Exporter
          </Button>
        </div>

        {/* Payment Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-skyblue/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total des paiements</CardTitle>
              <div className="text-2xl font-bold">{totalPayments}</div>
            </CardHeader>
          </Card>
          <Card className="bg-skyblue/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Montant total</CardTitle>
              <div className="text-2xl font-bold">{formatCurrency(totalAmount)}</div>
            </CardHeader>
          </Card>
          <Card className="bg-skyblue/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Paiements complets</CardTitle>
              <div className="text-2xl font-bold">{completePayments}</div>
            </CardHeader>
          </Card>
          <Card className="bg-skyblue/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Paiements partiels</CardTitle>
              <div className="text-2xl font-bold">{partialPayments}</div>
            </CardHeader>
          </Card>
        </div>

        {/* Payments List */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des paiements</CardTitle>
            <div className="flex flex-col md:flex-row gap-4 mt-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un paiement..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les paiements</SelectItem>
                  <SelectItem value="Complété">Complété</SelectItem>
                  <SelectItem value="Partiel">Partiel</SelectItem>
                  <SelectItem value="Non payé">Non payé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reçu</TableHead>
                  <TableHead>Élève</TableHead>
                  <TableHead>Classe</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.receipt}</TableCell>
                    <TableCell>{payment.studentName}</TableCell>
                    <TableCell>{payment.class}</TableCell>
                    <TableCell>{payment.paymentType}</TableCell>
                    <TableCell>{formatCurrency(payment.amount)}</TableCell>
                    <TableCell>{payment.paymentDate}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(payment)} className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            Détails
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Payment Details Dialog */}
        <Dialog open={showPaymentDetails} onOpenChange={setShowPaymentDetails}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Détails du paiement</DialogTitle>
              <DialogDescription>
                Informations complètes du paiement.
              </DialogDescription>
            </DialogHeader>
            {selectedPayment && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">Informations de paiement</h4>
                  <div>
                    <div className="text-sm font-medium">Numéro de reçu</div>
                    <div>{selectedPayment.receipt}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Type</div>
                    <div>{selectedPayment.paymentType}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Montant</div>
                    <div>{formatCurrency(selectedPayment.amount)}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Statut</div>
                    <div>
                      <Badge variant="outline" className={`${getStatusColor(selectedPayment.status)}`}>
                        {selectedPayment.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">Détails</h4>
                  <div>
                    <div className="text-sm font-medium">Élève</div>
                    <div>{selectedPayment.studentName}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Classe</div>
                    <div>{selectedPayment.class}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Méthode</div>
                    <div>{selectedPayment.paymentMethod}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Date</div>
                    <div>{selectedPayment.paymentDate}</div>
                  </div>
                </div>
                {selectedPayment.status !== 'Non payé' && (
                  <div className="col-span-2 flex justify-center mt-4">
                    <Button variant="outline" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Télécharger reçu
                    </Button>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default DirectorPayments;