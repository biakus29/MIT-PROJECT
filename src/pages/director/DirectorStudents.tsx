import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MoreHorizontal, Eye, FileSpreadsheet, Users, BookOpen, CreditCard } from 'lucide-react';

// Mock data for students
const mockStudents = [
  {
    id: 1,
    firstName: 'Emmanuel',
    lastName: 'Kamga',
    class: '6ème A',
    gender: 'M',
    birthDate: '12/05/2012',
    parentName: 'Robert Kamga',
    parentPhone: '677123456',
    paymentStatus: 'Payé',
  },
  {
    id: 2,
    firstName: 'Sophie',
    lastName: 'Mbock',
    class: '5ème B',
    gender: 'F',
    birthDate: '23/07/2011',
    parentName: 'Marie Mbock',
    parentPhone: '699887766',
    paymentStatus: 'Partiel',
  },
  {
    id: 3,
    firstName: 'Paul',
    lastName: 'Tamba',
    class: '4ème A',
    gender: 'M',
    birthDate: '05/03/2010',
    parentName: 'Jean Tamba',
    parentPhone: '655443322',
    paymentStatus: 'Non payé',
  },
  {
    id: 4,
    firstName: 'Carine',
    lastName: 'Fouda',
    class: '3ème C',
    gender: 'F',
    birthDate: '18/11/2009',
    parentName: 'Esther Fouda',
    parentPhone: '677889900',
    paymentStatus: 'Payé',
  },
  {
    id: 5,
    firstName: 'Michel',
    lastName: 'Nkodo',
    class: '6ème B',
    gender: 'M',
    birthDate: '30/08/2012',
    parentName: 'Pierre Nkodo',
    parentPhone: '655112233',
    paymentStatus: 'Partiel',
  },
  {
    id: 6,
    firstName: 'Vanessa',
    lastName: 'Atangana',
    class: '5ème A',
    gender: 'F',
    birthDate: '14/02/2011',
    parentName: 'Claire Atangana',
    parentPhone: '699778899',
    paymentStatus: 'Payé',
  },
  {
    id: 7,
    firstName: 'Serge',
    lastName: 'Fotso',
    class: '4ème B',
    gender: 'M',
    birthDate: '22/05/2010',
    parentName: 'Martin Fotso',
    parentPhone: '677665544',
    paymentStatus: 'Non payé',
  },
];

const getPaymentStatusColor = (status) => {
  switch (status) {
    case 'Payé': return 'bg-green-100 text-green-800';
    case 'Partiel': return 'bg-yellow-100 text-yellow-800';
    case 'Non payé': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const DirectorStudents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentDetails, setShowStudentDetails] = useState(false);

  // Filter students based on search term and class
  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch = 
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesClass = classFilter === 'all' || student.class === classFilter;
    
    return matchesSearch && matchesClass;
  });

  // Statistics
  const totalStudents = mockStudents.length;
  const maleStudents = mockStudents.filter(s => s.gender === 'M').length;
  const femaleStudents = mockStudents.filter(s => s.gender === 'F').length;
  const paidStudents = mockStudents.filter(s => s.paymentStatus === 'Payé').length;

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setShowStudentDetails(true);
  };

  return (
    <AppLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gestion des Élèves</h1>
          <Button variant="outline" className="flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            Exporter
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-skyblue/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total des élèves</CardTitle>
              <div className="text-2xl font-bold">{totalStudents}</div>
            </CardHeader>
          </Card>
          <Card className="bg-skyblue/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Garçons</CardTitle>
              <div className="text-2xl font-bold">{maleStudents}</div>
            </CardHeader>
          </Card>
          <Card className="bg-skyblue/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Filles</CardTitle>
              <div className="text-2xl font-bold">{femaleStudents}</div>
            </CardHeader>
          </Card>
          <Card className="bg-skyblue/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Paiements à jour</CardTitle>
              <div className="text-2xl font-bold">{paidStudents}/{totalStudents}</div>
            </CardHeader>
          </Card>
        </div>

        {/* Students List */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des élèves</CardTitle>
            <div className="flex flex-col md:flex-row gap-4 mt-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un élève..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrer par classe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les classes</SelectItem>
                  <SelectItem value="6ème A">6ème A</SelectItem>
                  <SelectItem value="6ème B">6ème B</SelectItem>
                  <SelectItem value="5ème A">5ème A</SelectItem>
                  <SelectItem value="5ème B">5ème B</SelectItem>
                  <SelectItem value="4ème A">4ème A</SelectItem>
                  <SelectItem value="4ème B">4ème B</SelectItem>
                  <SelectItem value="3ème C">3ème C</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Classe</TableHead>
                  <TableHead>Genre</TableHead>
                  <TableHead>Parent</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.lastName} {student.firstName}</TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>{student.gender}</TableCell>
                    <TableCell>{student.parentName}</TableCell>
                    <TableCell>{student.parentPhone}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${getPaymentStatusColor(student.paymentStatus)}`}>
                        {student.paymentStatus}
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
                          <DropdownMenuItem onClick={() => handleViewDetails(student)} className="flex items-center gap-2">
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

        {/* Student Details Dialog */}
        <Dialog open={showStudentDetails} onOpenChange={setShowStudentDetails}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Détails de l'élève</DialogTitle>
              <DialogDescription>
                Informations complètes de l'élève.
              </DialogDescription>
            </DialogHeader>
            {selectedStudent && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">Informations personnelles</h4>
                  <div>
                    <div className="text-sm font-medium">Nom complet</div>
                    <div>{selectedStudent.lastName} {selectedStudent.firstName}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Genre</div>
                    <div>{selectedStudent.gender === 'M' ? 'Masculin' : 'Féminin'}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Date de naissance</div>
                    <div>{selectedStudent.birthDate}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Classe</div>
                    <div>{selectedStudent.class}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">Contact</h4>
                  <div>
                    <div className="text-sm font-medium">Parent/Tuteur</div>
                    <div>{selectedStudent.parentName}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Téléphone</div>
                    <div>{selectedStudent.parentPhone}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Statut de paiement</div>
                    <div>
                      <Badge variant="outline" className={`${getPaymentStatusColor(selectedStudent.paymentStatus)}`}>
                        {selectedStudent.paymentStatus}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default DirectorStudents;
