import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

function RenewLicense() {
  const { currentUser } = useContext(AuthContext);
  const [selectedLicense, setSelectedLicense] = useState('');
  const [renewalStatus, setRenewalStatus] = useState('');

  const handleRenew = () => {
    if (!selectedLicense) {
      setRenewalStatus('Please select a license to renew');
      return;
    }

    // In a real app, this would call an API to renew the license
    setRenewalStatus(`Renewal request for ${selectedLicense} submitted successfully!`);
    setTimeout(() => {
      setRenewalStatus('');
      setSelectedLicense('');
    }, 3000);
  };

  const approvedLicenses = currentUser.documents?.filter(
    doc => (doc.status === 'approved' || doc.status === 'completed') && 
           doc.type === 'license'
  ) || [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Renew License</h1>
      
      <div className="bg-white shadow rounded-lg p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="license" className="block text-sm font-medium text-gray-700">
              Select License to Renew
            </label>
            <select
              id="license"
              name="license"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={selectedLicense}
              onChange={(e) => setSelectedLicense(e.target.value)}
            >
              <option value="">Select License</option>
              {approvedLicenses.map((license, index) => (
                <option key={index} value={license.applicationType}>
                  {license.applicationType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>

          {selectedLicense && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800">License Details</h3>
              <p className="mt-1 text-blue-600">
                You are about to renew your {selectedLicense.replace(/_/g, ' ')} license.
              </p>
              <p className="mt-1 text-sm text-blue-600">
                Renewal will be processed within 3-5 business days.
              </p>
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleRenew}
              disabled={!selectedLicense}
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${selectedLicense ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              Request Renewal
            </button>
          </div>

          {renewalStatus && (
            <div className={`mt-4 p-3 rounded ${renewalStatus.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {renewalStatus}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RenewLicense;