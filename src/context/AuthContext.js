import React, { createContext, useState, useEffect } from 'react';
import { mockUsers } from '../data/mockUsers';
import { mockApplications } from '../data/mockApplications';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allApplications, setAllApplications] = useState([]);

  // Load initial data
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const applications = JSON.parse(localStorage.getItem('applications') || mockApplications);
    
    if (user) {
      // Merge with mock data to get latest user info
      const fullUserData = mockUsers.find(u => u.id === user.id) || user;
      setCurrentUser(fullUserData);
    }
    setAllApplications(applications);
    setLoading(false);
  }, []);

  // Sync user and applications data to localStorage
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('user', JSON.stringify(currentUser));
      localStorage.setItem('applications', JSON.stringify(allApplications));
    }
  }, [currentUser, allApplications, loading]);

  const login = (email, password) => {
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const register = (userData) => {
    const newUser = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      role: 'user',
      documents: [],
      status: 'active'
    };
    mockUsers.push(newUser);
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Application Management Functions
  const applyForLicense = (applicationData) => {
    const newApplication = {
      id: `app-${Math.random().toString(36).substr(2, 9)}`,
      userId: currentUser.id,
      ...applicationData,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      currentAdmin: getRandomAdmin(),
      history: [{
        action: 'submitted',
        date: new Date().toISOString(),
        by: currentUser.id
      }]
    };

    setAllApplications([...allApplications, newApplication]);
    
    // Add to user's documents
    const updatedUser = {
      ...currentUser,
      documents: [
        ...currentUser.documents,
        {
          id: newApplication.id,
          type: 'license_application',
          applicationType: applicationData.type,
          status: 'pending',
          submittedAt: newApplication.submittedAt
        }
      ]
    };
    
    setCurrentUser(updatedUser);
    return newApplication;
  };

  const renewLicense = (applicationId) => {
    const appIndex = allApplications.findIndex(app => app.id === applicationId);
    if (appIndex === -1) return false;

    const application = allApplications[appIndex];
    const renewedApp = {
      ...application,
      status: 'renewal_pending',
      renewalRequestDate: new Date().toISOString(),
      currentAdmin: getRandomAdmin(),
      history: [
        ...application.history,
        {
          action: 'renewal_requested',
          date: new Date().toISOString(),
          by: currentUser.id
        }
      ]
    };

    const updatedApplications = [...allApplications];
    updatedApplications[appIndex] = renewedApp;
    setAllApplications(updatedApplications);

    // Update user's document status
    const updatedDocuments = currentUser.documents.map(doc => 
      doc.id === applicationId ? { ...doc, status: 'renewal_pending' } : doc
    );
    setCurrentUser({ ...currentUser, documents: updatedDocuments });

    return renewedApp;
  };

  const approveApplication = (applicationId, comments = '') => {
    const appIndex = allApplications.findIndex(app => app.id === applicationId);
    if (appIndex === -1) return false;

    const application = allApplications[appIndex];
    const isRenewal = application.status === 'renewal_pending';
    const newStatus = isRenewal ? 'active' : 'approved';

    const updatedApp = {
      ...application,
      status: newStatus,
      expiryDate: calculateExpiryDate(1), // 1 year validity
      approvedBy: currentUser.id,
      approvalDate: new Date().toISOString(),
      history: [
        ...application.history,
        {
          action: isRenewal ? 'renewal_approved' : 'approved',
          date: new Date().toISOString(),
          by: currentUser.id,
          comments
        }
      ]
    };

    const updatedApplications = [...allApplications];
    updatedApplications[appIndex] = updatedApp;
    setAllApplications(updatedApplications);

    // Update user's document status
    const user = mockUsers.find(u => u.id === application.userId);
    if (user) {
      const updatedDocuments = user.documents.map(doc => 
        doc.id === applicationId ? { ...doc, status: newStatus } : doc
      );
      const updatedUser = { ...user, documents: updatedDocuments };
      
      // Update mockUsers array
      const userIndex = mockUsers.findIndex(u => u.id === user.id);
      mockUsers[userIndex] = updatedUser;
      
      // If current user is being updated, set them in state
      if (currentUser && currentUser.id === user.id) {
        setCurrentUser(updatedUser);
      }
    }

    return updatedApp;
  };

  const rejectApplication = (applicationId, reason) => {
    const appIndex = allApplications.findIndex(app => app.id === applicationId);
    if (appIndex === -1) return false;

    const application = allApplications[appIndex];
    const isRenewal = application.status === 'renewal_pending';

    const updatedApp = {
      ...application,
      status: isRenewal ? 'active' : 'rejected',
      history: [
        ...application.history,
        {
          action: isRenewal ? 'renewal_rejected' : 'rejected',
          date: new Date().toISOString(),
          by: currentUser.id,
          reason
        }
      ]
    };

    const updatedApplications = [...allApplications];
    updatedApplications[appIndex] = updatedApp;
    setAllApplications(updatedApplications);

    // Update user's document status
    const user = mockUsers.find(u => u.id === application.userId);
    if (user) {
      const updatedDocuments = user.documents.map(doc => 
        doc.id === applicationId ? { 
          ...doc, 
          status: isRenewal ? 'active' : 'rejected',
          rejectionReason: reason
        } : doc
      );
      const updatedUser = { ...user, documents: updatedDocuments };
      
      // Update mockUsers array
      const userIndex = mockUsers.findIndex(u => u.id === user.id);
      mockUsers[userIndex] = updatedUser;
      
      if (currentUser && currentUser.id === user.id) {
        setCurrentUser(updatedUser);
      }
    }

    return updatedApp;
  };

  // Helper functions
  const getRandomAdmin = () => {
    const admins = mockUsers.filter(u => u.role === 'admin');
    return admins[Math.floor(Math.random() * admins.length)].id;
  };

  const calculateExpiryDate = (years) => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + years);
    return date.toISOString();
  };

  const getUserApplications = (userId) => {
    return allApplications.filter(app => app.userId === userId);
  };

  const getPendingApplications = () => {
    return allApplications.filter(app => 
      ['pending', 'renewal_pending'].includes(app.status) && 
      app.currentAdmin === currentUser?.id
    );
  };

  const getApplicationById = (appId) => {
    return allApplications.find(app => app.id === appId);
  };

  const getDocumentsForApplication = (appId) => {
    const application = allApplications.find(app => app.id === appId);
    if (!application) return [];
    
    const user = mockUsers.find(u => u.id === application.userId);
    if (!user) return [];
    
    return user.documents.filter(doc => 
      application.documents.includes(doc.id) || 
      doc.applicationType === application.type
    );
  };

  const value = {
    currentUser,
    allApplications,
    loading,
    login,
    register,
    logout,
    applyForLicense,
    renewLicense,
    approveApplication,
    rejectApplication,
    getUserApplications,
    getPendingApplications,
    getApplicationById,
    getDocumentsForApplication,
    mockUsers
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};