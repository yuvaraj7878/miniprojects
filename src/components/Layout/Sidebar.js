import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Sidebar() {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="d-none d-md-block col-md-3 col-lg-2 bg-white border-end vh-100 position-fixed pt-5">
      <div className="sidebar-sticky pt-3">
        <ul className="nav flex-column">
          {currentUser && currentUser.role === 'user' && (
            <>
              <li className="nav-item">
                <Link
                  to="/"
                  className={`nav-link ${isActive('/') ? 'active' : ''}`}
                >
                  <i className="bi bi-file-earmark-plus me-2"></i>
                  Apply for License
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/status"
                  className={`nav-link ${isActive('/status') ? 'active' : ''}`}
                >
                  <i className="bi bi-list-check me-2"></i>
                  Application Status
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/renew"
                  className={`nav-link ${isActive('/renew') ? 'active' : ''}`}
                >
                  <i className="bi bi-arrow-repeat me-2"></i>
                  Renew License
                </Link>
              </li>
              <li className="nav-item my-2 border-top"></li>
            </>
          )}
          <li className="nav-item">
            <Link
              to="/help"
              className={`nav-link ${isActive('/help') ? 'active' : ''}`}
            >
              <i className="bi bi-question-circle me-2"></i>
              Help Guides
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;