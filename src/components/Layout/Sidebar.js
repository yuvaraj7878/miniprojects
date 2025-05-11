import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Sidebar() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="w-64 bg-white shadow-sm h-screen sticky top-0 pt-16">
      <div className="p-4">
        <nav className="space-y-2">
          {currentUser && currentUser.role === 'user' && (
            <>
              <Link
                to="/"
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Apply for License
              </Link>
              <Link
                to="/status"
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Application Status
              </Link>
              <Link
                to="/renew"
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Renew License
              </Link>
            </>
          )}
          <Link
            to="/help"
            className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Help Guides
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;