
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Users, 
  GraduationCap,
  MoreHorizontal,
  Eye,
  FileSpreadsheet
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const mockClasses = [
  { 
    id: 1, 
    name: '6ème A', 
    students: 35, 
    teacherName: 'M. Kamga', 
    subjects: 12,
    averageGrade: 14.5
  },
  { 
    id: 2, 
    name: '5ème B', 
    students: 32, 
    teacherName: 'Mme. Nkodo', 
    subjects: 12,
    averageGrade: 13.8
  },
  { 
    id: 3, 
    name: '4ème A', 
    students: 38, 
    teacherName: 'M. Fotso', 
    subjects: 13,
    averageGrade: 12.5
  },
  { 
    id: 4, 
    name: '3ème C', 
    students: 36, 
    teacherName: 'Mme. Tchana', 
    subjects: 14,
    averageGrade: 15.2
  },
];

const DirectorClasses = () => {
  return (
    <AppLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gestion des Classes</h1>
          <Button variant="outline" className="flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            Exporter
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Card className="bg-skyblue/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total des classes</CardTitle>
              <div className="text-2xl font-bold">{mockClasses.length}</div>
            </CardHeader>
          </Card>
          <Card className="bg-skyblue/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Effectif total</CardTitle>
              <div className="text-2xl font-bold">
                {mockClasses.reduce((acc, curr) => acc + curr.students, 0)}
              </div>
            </CardHeader>
          </Card>
          <Card className="bg-skyblue/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Moyenne générale</CardTitle>
              <div className="text-2xl font-bold">
                {(mockClasses.reduce((acc, curr) => acc + curr.averageGrade, 0) / mockClasses.length).toFixed(1)}
              </div>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des classes</CardTitle>
            <div className="mt-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une classe..."
                className="pl-10 max-w-sm"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Classe</TableHead>
                  <TableHead>Professeur principal</TableHead>
                  <TableHead>Effectif</TableHead>
                  <TableHead>Matières</TableHead>
                  <TableHead>Moyenne</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockClasses.map((classe) => (
                  <TableRow key={classe.id}>
                    <TableCell className="font-medium">{classe.name}</TableCell>
                    <TableCell>{classe.teacherName}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {classe.students}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        {classe.subjects}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-skyblue/10">
                        {classe.averageGrade}/20
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
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            Voir détails
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
      </div>
    </AppLayout>
  );
};

export default DirectorClasses;
