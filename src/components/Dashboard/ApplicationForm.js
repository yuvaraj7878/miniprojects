import React, { useState, useEffect } from 'react';
import {
  Box, Button, TextField, Typography,
  Stepper, Step, StepLabel, Paper, Alert,
  CircularProgress
} from '@mui/material';
import { Upload as UploadIcon, CheckCircle, Cancel } from '@mui/icons-material';

const steps = ['Basic Information', 'Upload Documents', 'Review & Submit'];

const ApplicationForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    licenseType: 'New',
    documents: []
  });
  const [submitted, setSubmitted] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...files.map(file => file.name)]
    }));
  };

  const handleSubmit = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      // In a real app, you would send this to your backend
      const status = Math.random() > 0.3 ? 'Pending' : 'Rejected';
      const declineReason = status === 'Rejected' ? 
        'Incomplete documentation. Please upload all required files.' : '';
      
      setApplicationStatus({
        status,
        declineReason,
        applicationId: `APP-${Math.floor(Math.random() * 10000)}`
      });
      setSubmitted(true);
      setLoading(false);
    }, 2000);
  };

  if (submitted) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        {applicationStatus.status === 'Pending' ? (
          <>
            <CheckCircle color="success" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              Application Submitted!
            </Typography>
            <Typography variant="body1" paragraph>
              Your application ID: <strong>{applicationStatus.applicationId}</strong>
            </Typography>
            <Typography variant="body1">
              Your application is under review. You'll receive an email once a decision is made.
            </Typography>
          </>
        ) : (
          <>
            <Cancel color="error" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h4" gutterBottom color="error">
              Application Declined
            </Typography>
            <Typography variant="body1" paragraph>
              Your application ID: <strong>{applicationStatus.applicationId}</strong>
            </Typography>
            <Alert severity="error" sx={{ mb: 3 }}>
              <Typography variant="body1">
                <strong>Reason:</strong> {applicationStatus.declineReason}
              </Typography>
            </Alert>
            <Button 
              variant="contained" 
              onClick={() => {
                setSubmitted(false);
                setActiveStep(0);
                setApplicationStatus(null);
              }}
            >
              Edit and Resubmit
            </Button>
          </>
        )}
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      {activeStep === 0 && (
        <Box component="form">
          <Typography variant="h6" gutterBottom>
            Basic Information
          </Typography>
          <TextField
            label="Full Name"
            name="name"
            fullWidth
            required
            value={formData.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            fullWidth
            required
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Phone Number"
            name="phone"
            fullWidth
            required
            value={formData.phone}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Address"
            name="address"
            fullWidth
            required
            multiline
            rows={3}
            value={formData.address}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
        </Box>
      )}
      
      {activeStep === 1 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Upload Required Documents
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Please upload all required documents (PDF, JPG, PNG)
          </Typography>
          <input
            accept=".pdf,.jpg,.png"
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
            onChange={handleFileUpload}
          />
          <label htmlFor="raised-button-file">
            <Button 
              variant="contained" 
              component="span"
              startIcon={<UploadIcon />}
              sx={{ mb: 2 }}
            >
              Upload Documents
            </Button>
          </label>
          {formData.documents.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2">Uploaded Documents:</Typography>
              <ul>
                {formData.documents.map((doc, index) => (
                  <li key={index}>{doc}</li>
                ))}
              </ul>
            </Box>
          )}
        </Box>
      )}
      
      {activeStep === 2 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Review Your Application
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Name:</strong> {formData.name}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Email:</strong> {formData.email}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Phone:</strong> {formData.phone}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Address:</strong> {formData.address}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Documents:</strong> {formData.documents.join(', ')}
          </Typography>
        </Box>
      )}
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        {activeStep !== 0 && (
          <Button onClick={handleBack} sx={{ mr: 1 }}>
            Back
          </Button>
        )}
        {activeStep === steps.length - 1 ? (
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Submit Application'}
          </Button>
        ) : (
          <Button 
            variant="contained" 
            onClick={handleNext}
            disabled={
              (activeStep === 0 && (!formData.name || !formData.email || !formData.phone || !formData.address)) ||
              (activeStep === 1 && formData.documents.length === 0)
            }
          >
            Next
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default ApplicationForm;