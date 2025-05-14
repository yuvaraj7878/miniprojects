import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);
  const { clearLocalStorage } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm fixed-top">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          LicenseHub
        </Link>
        
        <div className="d-flex align-items-center">
          {currentUser ? (
            <div className="d-flex align-items-center">
              {currentUser.role === 'admin' && (
                <Link to="/admin" className="btn btn-sm btn-outline-primary me-2">
                  Admin Dashboard
                </Link>
              )}
              <span className="me-3 d-none d-md-inline text-muted">
                Welcome, <span className="text-dark">{currentUser.name}</span>
              </span>
              <div className="dropdown">
  
  
  <button 
        onClick={handleLogout}
        className="btn btn-outline-danger btn-sm"
      >
        <i className="bi bi-box-arrow-right me-1"></i>
        Sign Out
      </button>
      <button onClick={clearLocalStorage} style={{ margin: '10px', padding: '8px 16px', cursor: 'pointer' }}>
      Clear Local Storage
    </button>
</div>

            </div>
          ) : (
            <div>
              <Link to="/login" className="btn btn-sm btn-outline-secondary me-2">
                Login
              </Link>
              <Link to="/register" className="btn btn-sm btn-primary">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;