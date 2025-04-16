
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  ArrowUpDown, 
  FileSpreadsheet,
  MoreHorizontal,
  Eye
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const mockGrades = [
  { 
    id: 1, 
    class: '6ème A', 
    subject: 'Mathématiques',
    teacher: 'M. Kamga',
    average: 14.5,
    highest: 18,
    lowest: 8,
    completed: true
  },
  { 
    id: 2, 
    class: '6ème A', 
    subject: 'Français',
    teacher: 'Mme. Nkodo',
    average: 13.2,
    highest: 17,
    lowest: 6,
    completed: true
  },
  { 
    id: 3, 
    class: '6ème A', 
    subject: 'Histoire',
    teacher: 'M. Fotso',
    average: 12.8,
    highest: 16,
    lowest: 7,
    completed: false
  },
  { 
    id: 4, 
    class: '6ème A', 
    subject: 'Anglais',
    teacher: 'Mme. Tchana',
    average: 15.1,
    highest: 19,
    lowest: 9,
    completed: true
  },
];

const DirectorGrades = () => {
  return (
    <AppLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gestion des Notes</h1>
          <Button variant="outline" className="flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            Exporter
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Card className="bg-skyblue/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Moyenne générale</CardTitle>
              <div className="text-2xl font-bold">
                {(mockGrades.reduce((acc, curr) => acc + curr.average, 0) / mockGrades.length).toFixed(1)}/20
              </div>
            </CardHeader>
          </Card>
          <Card className="bg-skyblue/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Notes saisies</CardTitle>
              <div className="text-2xl font-bold">
                {mockGrades.filter(g => g.completed).length}/{mockGrades.length}
              </div>
            </CardHeader>
          </Card>
          <Card className="bg-skyblue/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Meilleure moyenne</CardTitle>
              <div className="text-2xl font-bold">
                {Math.max(...mockGrades.map(g => g.average))}/20
              </div>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Relevé des notes</CardTitle>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Select defaultValue="6A">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sélectionner une classe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6A">6ème A</SelectItem>
                  <SelectItem value="5B">5ème B</SelectItem>
                  <SelectItem value="4A">4ème A</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher une matière..."
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      Matière
                      <ArrowUpDown className="h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>Professeur</TableHead>
                  <TableHead>Moyenne</TableHead>
                  <TableHead>Note max</TableHead>
                  <TableHead>Note min</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockGrades.map((grade) => (
                  <TableRow key={grade.id}>
                    <TableCell className="font-medium">{grade.subject}</TableCell>
                    <TableCell>{grade.teacher}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-skyblue/10">
                        {grade.average}/20
                      </Badge>
                    </TableCell>
                    <TableCell>{grade.highest}/20</TableCell>
                    <TableCell>{grade.lowest}/20</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={grade.completed ? 
                          "bg-green-50 text-green-600 border-green-200" : 
                          "bg-amber-50 text-amber-600 border-amber-200"
                        }
                      >
                        {grade.completed ? 'Complété' : 'En attente'}
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

export default DirectorGrades;
