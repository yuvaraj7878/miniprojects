import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function AdminRoute({ children }) {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;