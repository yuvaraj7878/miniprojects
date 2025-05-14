import React from 'react';
import { Link } from 'react-router-dom';

function HelpGuidelines() {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-primary text-white">
              <h2 className="h4 mb-0">
                <i className="bi bi-question-circle me-2"></i>
                Help Center & Guidelines
              </h2>
            </div>
            
            <div className="card-body">
              {/* Quick Help Section */}
              <section className="mb-5">
                <h3 className="h5 text-primary mb-3">
                  <i className="bi bi-lightning-charge me-2"></i>
                  Quick Help
                </h3>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body">
                        <h4 className="h6">
                          <i className="bi bi-file-earmark-text me-2 text-primary"></i>
                          Application Process
                        </h4>
                        <p className="small">Step-by-step guide to apply for new licenses</p>
                        <Link to="#application-process" className="btn btn-sm btn-outline-primary">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body">
                        <h4 className="h6">
                          <i className="bi bi-arrow-repeat me-2 text-primary"></i>
                          Renewal Process
                        </h4>
                        <p className="small">How to renew your existing licenses</p>
                        <Link to="#renewal-process" className="btn btn-sm btn-outline-primary">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body">
                        <h4 className="h6">
                          <i className="bi bi-card-checklist me-2 text-primary"></i>
                          Required Documents
                        </h4>
                        <p className="small">List of documents needed for each license type</p>
                        <Link to="#required-documents" className="btn btn-sm btn-outline-primary">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body">
                        <h4 className="h6">
                          <i className="bi bi-telephone me-2 text-primary"></i>
                          Contact Support
                        </h4>
                        <p className="small">Get help from our support team</p>
                        <Link to="#contact-support" className="btn btn-sm btn-outline-primary">
                          Contact Us
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Detailed Guidelines */}
              <section className="mb-5" id="application-process">
                <h3 className="h5 text-primary mb-3">
                  <i className="bi bi-file-earmark-text me-2"></i>
                  License Application Process
                </h3>
                <div className="bg-light p-4 rounded">
                  <ol className="mb-0">
                    <li className="mb-2">Register for an account or log in if you already have one</li>
                    <li className="mb-2">Navigate to "Apply for License" section</li>
                    <li className="mb-2">Select the type of license you need</li>
                    <li className="mb-2">Fill out the application form completely</li>
                    <li className="mb-2">Upload all required documents (see <Link to="#required-documents">Required Documents</Link>)</li>
                    <li className="mb-2">Pay the application fee online</li>
                    <li>Submit your application</li>
                  </ol>
                </div>
                <div className="alert alert-info mt-3">
                  <i className="bi bi-info-circle me-2"></i>
                  Processing time: 7-10 business days for standard applications
                </div>
              </section>

              <section className="mb-5" id="renewal-process">
                <h3 className="h5 text-primary mb-3">
                  <i className="bi bi-arrow-repeat me-2"></i>
                  License Renewal Process
                </h3>
                <div className="bg-light p-4 rounded">
                  <ol className="mb-0">
                    <li className="mb-2">Log in to your account</li>
                    <li className="mb-2">Go to "Renew License" section</li>
                    <li className="mb-2">Select the license you want to renew</li>
                    <li className="mb-2">Verify your current information</li>
                    <li className="mb-2">Upload any updated documents if required</li>
                    <li className="mb-2">Pay the renewal fee</li>
                    <li>Submit your renewal request</li>
                  </ol>
                </div>
                <div className="alert alert-warning mt-3">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Renew applications should be submitted at least 30 days before expiration
                </div>
              </section>

              <section className="mb-5" id="required-documents">
                <h3 className="h5 text-primary mb-3">
                  <i className="bi bi-card-checklist me-2"></i>
                  Required Documents
                </h3>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th>License Type</th>
                        <th>Mandatory Documents</th>
                        <th>Optional Documents</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Street Vendor</td>
                        <td>
                          <ul className="mb-0">
                            <li>Identity Proof (Aadhaar/Voter ID)</li>
                            <li>Address Proof</li>
                            <li>Passport Size Photo</li>
                          </ul>
                        </td>
                        <td>
                          <ul className="mb-0">
                            <li>Previous License (if any)</li>
                            <li>Caste Certificate (if applicable)</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td>Small Shop</td>
                        <td>
                          <ul className="mb-0">
                            <li>Identity Proof</li>
                            <li>Address Proof</li>
                            <li>Shop Establishment Proof</li>
                            <li>GST Registration</li>
                          </ul>
                        </td>
                        <td>
                          <ul className="mb-0">
                            <li>Fire Safety Certificate</li>
                            <li>Previous License</li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="alert alert-info mt-3">
                  <i className="bi bi-info-circle me-2"></i>
                  All documents should be clear, legible scans less than 2MB in PDF or JPEG format
                </div>
              </section>

              <section className="mb-5" id="fees-payment">
                <h3 className="h5 text-primary mb-3">
                  <i className="bi bi-cash-stack me-2"></i>
                  Fees & Payment
                </h3>
                <div className="row">
                  <div className="col-md-6">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body">
                        <h4 className="h6 text-primary">Fee Structure</h4>
                        <ul className="mb-0">
                          <li className="mb-2">
                            <strong>Street Vendor License:</strong><br />
                            New: ₹500 | Renewal: ₹300
                          </li>
                          <li className="mb-2">
                            <strong>Small Shop License:</strong><br />
                            New: ₹2000 | Renewal: ₹1500
                          </li>
                          <li>
                            <strong>Late Renewal Penalty:</strong><br />
                            Additional 20% after expiration date
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body">
                        <h4 className="h6 text-primary">Payment Methods</h4>
                        <div className="d-flex align-items-center mb-2">
                          <i className="bi bi-credit-card fs-4 me-3 text-primary"></i>
                          Credit/Debit Cards
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <i className="bi bi-bank fs-4 me-3 text-primary"></i>
                          Net Banking
                        </div>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-wallet fs-4 me-3 text-primary"></i>
                          UPI Payments
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="contact-support">
                <h3 className="h5 text-primary mb-3">
                  <i className="bi bi-telephone me-2"></i>
                  Contact Support
                </h3>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body">
                        <h4 className="h6 text-primary">
                          <i className="bi bi-headset me-2"></i>
                          Help Desk
                        </h4>
                        <ul className="list-unstyled">
                          <li className="mb-2">
                            <strong>Phone:</strong> 1800-123-4567 (Toll Free)
                          </li>
                          <li className="mb-2">
                            <strong>Email:</strong> support@licensehub.gov.in
                          </li>
                          <li className="mb-2">
                            <strong>Hours:</strong> Mon-Sat, 9AM to 6PM
                          </li>
                          <li>
                            <strong>Walk-in Center:</strong> District Municipal Office
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body">
                        <h4 className="h6 text-primary">
                          <i className="bi bi-geo-alt me-2"></i>
                          Regional Offices
                        </h4>
                        <ul className="list-unstyled">
                          <li className="mb-2">
                            <strong>Chennai:</strong> 044-12345678
                          </li>
                          <li className="mb-2">
                            <strong>Madurai:</strong> 0452-1234567
                          </li>
                          <li className="mb-2">
                            <strong>Coimbatore:</strong> 0422-1234567
                          </li>
                          <li>
                            <strong>Trichy:</strong> 0431-1234567
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="alert alert-info">
                  <i className="bi bi-chat-left-text me-2"></i>
                  For faster response, please have your application reference number ready when contacting support.
                </div>
              </section>
            </div>

            <div className="card-footer bg-light">
              <div className="text-center">
                <p className="mb-0">
                  <i className="bi bi-info-circle me-2"></i>
                  This information is also available in <Link to="#">Tamil</Link> and <Link to="#">Hindi</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpGuidelines;