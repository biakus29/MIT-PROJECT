
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Pages
import LoginPage from "@/pages/LoginPage";
import DirectorDashboard from "@/pages/director/DirectorDashboard";
import DirectorClasses from "@/pages/director/DirectorClasses";
import DirectorStudents from "@/pages/director/DirectorStudents";
import DirectorPayments from "@/pages/director/DirectorPayments";
import DirectorGrades from "@/pages/director/DirectorGrades";
import DirectorStatistics from "@/pages/director/DirectorStatistics";
import SecretaryDashboard from "@/pages/secretary/SecretaryDashboard";
import SecretaryClasses from "@/pages/secretary/SecretaryClasses";
import SecretaryStudents from "@/pages/secretary/StudentsPage";
import SecretaryPayments from "@/pages/secretary/SecretaryPayments";
import TeacherDashboard from "@/pages/teacher/TeacherDashboard";
import TeacherClasses from "@/pages/teacher/TeacherClasses";
import TeacherGrades from "@/pages/teacher/TeacherGrades";
import NotFoundPage from "@/pages/NotFoundPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public route */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Redirect from root to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Director Routes */}
            <Route
              path="/director/dashboard"
              element={
                <ProtectedRoute allowedRoles={['DIRECTOR']}>
                  <DirectorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/director/classes"
              element={
                <ProtectedRoute allowedRoles={['DIRECTOR']}>
                  <DirectorClasses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/director/students"
              element={
                <ProtectedRoute allowedRoles={['DIRECTOR']}>
                  <DirectorStudents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/director/payments"
              element={
                <ProtectedRoute allowedRoles={['DIRECTOR']}>
                  <DirectorPayments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/director/grades"
              element={
                <ProtectedRoute allowedRoles={['DIRECTOR']}>
                  <DirectorGrades />
                </ProtectedRoute>
              }
            />
            <Route
              path="/director/statistics"
              element={
                <ProtectedRoute allowedRoles={['DIRECTOR']}>
                  <DirectorStatistics />
                </ProtectedRoute>
              }
            />
            
            {/* Secretary Routes */}
            <Route
              path="/secretary/dashboard"
              element={
                <ProtectedRoute allowedRoles={['SECRETARY']}>
                  <SecretaryDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/secretary/classes"
              element={
                <ProtectedRoute allowedRoles={['SECRETARY']}>
                  <SecretaryClasses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/secretary/students"
              element={
                <ProtectedRoute allowedRoles={['SECRETARY']}>
                  <SecretaryStudents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/secretary/payments"
              element={
                <ProtectedRoute allowedRoles={['SECRETARY']}>
                  <SecretaryPayments />
                </ProtectedRoute>
              }
            />
            
            {/* Teacher Routes */}
            <Route
              path="/teacher/dashboard"
              element={
                <ProtectedRoute allowedRoles={['TEACHER']}>
                  <TeacherDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/classes"
              element={
                <ProtectedRoute allowedRoles={['TEACHER']}>
                  <TeacherClasses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/grades"
              element={
                <ProtectedRoute allowedRoles={['TEACHER']}>
                  <TeacherGrades />
                </ProtectedRoute>
              }
            />
            
            {/* Catch-all route - 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
