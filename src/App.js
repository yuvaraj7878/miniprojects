import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './components/Layout/MainLayout';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import ApplicationForm from './components/Dashboard/ApplicationForm';
import ApplicationStatus from './components/Dashboard/ApplicationStatus';
import RenewLicense from './components/Dashboard/RenewLicense';
import HelpGuides from './components/Dashboard/HelpGuides';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import AdminRoute from './components/Auth/AdminRoute';
import ChatBot from './components/Chat/ChatBot';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          
          <Route path="/" element={<MainLayout />}>
            <Route index element={
              <ProtectedRoute>
                <ApplicationForm />
              </ProtectedRoute>
            } />
            <Route path="status" element={
              <ProtectedRoute>
                <ApplicationStatus />
              </ProtectedRoute>
            } />
            <Route path="renew" element={
              <ProtectedRoute>
                <RenewLicense />
              </ProtectedRoute>
            } />
            <Route path="help" element={
              <ProtectedRoute>
                <HelpGuides />
              </ProtectedRoute>
            } />
            <Route path="admin" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
          </Route>
        </Routes>
        <ChatBot />
      </AuthProvider>
    </Router>
  );
}

export default App;