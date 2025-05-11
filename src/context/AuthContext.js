import React, { createContext, useState, useEffect } from 'react';
import { mockUsers } from '../data/mockUsers';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
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
      status: 'pending'
    };
    mockUsers.push(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const updateDocumentStatus = (userId, docId, status, adminId) => {
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      const doc = user.documents.find(d => d.id === docId);
      if (doc) {
        doc.status = status;
        doc.verifiedBy = adminId;
        doc.updatedAt = new Date().toISOString();
        
        if (status === 'approved') {
          // Move to next admin or mark as complete
          if (!doc.nextAdmin) {
            doc.status = 'completed';
          } else {
            doc.currentAdmin = doc.nextAdmin;
            doc.nextAdmin = null;
          }
        }
        
        localStorage.setItem('user', JSON.stringify(currentUser));
        return true;
      }
    }
    return false;
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    updateDocumentStatus,
    mockUsers
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};