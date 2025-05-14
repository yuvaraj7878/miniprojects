import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function MainLayout() {
  return (
    <div className="bg-light" style={{minHeight: '100vh'}}>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 pt-4">
            <div className="bg-white rounded shadow-sm p-4 mb-4">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;