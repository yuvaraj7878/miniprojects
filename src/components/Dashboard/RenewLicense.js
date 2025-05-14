import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

function RenewLicense() {
  const { currentUser } = useContext(AuthContext);
  const [selectedLicense, setSelectedLicense] = useState('');
  const [renewalStatus, setRenewalStatus] = useState({ message: '', isSuccess: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRenew = () => {
    if (!selectedLicense) {
      setRenewalStatus({ message: 'Please select a license to renew', isSuccess: false });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setRenewalStatus({ 
        message: `Renewal request for ${selectedLicense} submitted successfully!`, 
        isSuccess: true 
      });
      setIsSubmitting(false);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setRenewalStatus({ message: '', isSuccess: false });
        setSelectedLicense('');
      }, 5000);
    }, 1500);
  };

  const approvedLicenses = currentUser.documents?.filter(
    doc => (doc.status === 'approved' || doc.status === 'completed') && 
           doc.type === 'license'
  ) || [];

  const formatLicenseName = (name) => {
    return name.replace(/_/g, ' ')
              .replace(/\b\w/g, l => l.toUpperCase())
              .replace(/([a-z])([A-Z])/g, '$1 $2');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-bottom">
              <h2 className="h4 mb-0 text-primary">License Renewal</h2>
              <p className="text-muted mb-0">Renew your business licenses in one simple step</p>
            </div>
            
            <div className="card-body">
              <div className="mb-4">
                <label htmlFor="licenseSelect" className="form-label fw-bold">
                  Select License to Renew
                </label>
                <select
                  id="licenseSelect"
                  className="form-select"
                  value={selectedLicense}
                  onChange={(e) => setSelectedLicense(e.target.value)}
                >
                  <option value="">Choose a license...</option>
                  {approvedLicenses.map((license, index) => (
                    <option key={index} value={license.applicationType}>
                      {formatLicenseName(license.applicationType)}
                    </option>
                  ))}
                </select>
              </div>

              {selectedLicense && (
                <div className="alert alert-info">
                  <h5 className="alert-heading">Renewal Details</h5>
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-info-circle-fill me-2"></i>
                    <span>You are renewing: <strong>{formatLicenseName(selectedLicense)}</strong></span>
                  </div>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-clock-history me-2"></i>
                    <span>Processing time: 3-5 business days</span>
                  </div>
                </div>
              )}

              <div className="d-flex justify-content-between align-items-center mt-4">
                <div className="text-muted small">
                  <i className="bi bi-shield-lock me-1"></i> Secure government portal
                </div>
                <button
                  onClick={handleRenew}
                  disabled={!selectedLicense || isSubmitting}
                  className="btn btn-primary px-4"
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-arrow-repeat me-2"></i>
                      Submit Renewal Request
                    </>
                  )}
                </button>
              </div>

              {renewalStatus.message && (
                <div className={`alert mt-4 ${renewalStatus.isSuccess ? 'alert-success' : 'alert-danger'}`}>
                  <i className={`bi ${renewalStatus.isSuccess ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} me-2`}></i>
                  {renewalStatus.message}
                </div>
              )}
            </div>

            <div className="card-footer bg-light">
              <div className="row">
                <div className="col-md-4 mb-2 mb-md-0">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-headset me-2 text-primary"></i>
                    <div>
                      <small className="text-muted">Need help?</small>
                      <div className="fw-bold">Contact Support</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-2 mb-md-0">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-file-text me-2 text-primary"></i>
                    <div>
                      <small className="text-muted">Documents</small>
                      <div className="fw-bold">Renewal Guidelines</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-calendar-check me-2 text-primary"></i>
                    <div>
                      <small className="text-muted">Renewal Period</small>
                      <div className="fw-bold">Valid for 1 year</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RenewLicense;