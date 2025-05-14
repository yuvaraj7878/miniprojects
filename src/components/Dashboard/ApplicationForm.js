import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
  CircularProgress,
  Box,
  Typography,
} from '@mui/material';

const steps = ['Vendor Info', 'License Info', 'Upload Documents', 'Review & Submit'];

const ApplicationForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    licenseType: 'New',
    documents: [],
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(false);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, documents: Array.from(e.target.files) }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const applicationId = `APP-${Date.now()}`;
      const createdAt = new Date().toISOString();

      const newApplication = {
        id: applicationId,
        ...formData,
        status: 'Pending',
        createdAt,
        documents: formData.documents.map((file) => file.name),
      };

      const existing = JSON.parse(localStorage.getItem('applications') || '[]');
      existing.push(newApplication);
      localStorage.setItem('applications', JSON.stringify(existing));

      setSnackbar({
        open: true,
        message: 'Application submitted successfully!',
        severity: 'success',
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        licenseType: 'New',
        documents: [],
      });
      setActiveStep(0);
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: 'Submission failed. Please try again.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField name="name" label="Name" fullWidth margin="normal" value={formData.name} onChange={handleChange} />
            <TextField name="email" label="Email" fullWidth margin="normal" value={formData.email} onChange={handleChange} />
            <TextField name="phone" label="Phone" fullWidth margin="normal" value={formData.phone} onChange={handleChange} />
            <TextField name="address" label="Address" fullWidth margin="normal" value={formData.address} onChange={handleChange} />
          </>
        );
      case 1:
        return (
          <TextField
            select
            name="licenseType"
            label="License Type"
            fullWidth
            margin="normal"
            value={formData.licenseType}
            onChange={handleChange}
          >
            <MenuItem value="New">New</MenuItem>
            <MenuItem value="Renewal">Renewal</MenuItem>
          </TextField>
        );
      case 2:
        return (
          <TextField type="file" fullWidth margin="normal" inputProps={{ multiple: true }} onChange={handleFileChange} />
        );
      case 3:
        return (
          <>
            <Typography variant="subtitle1">Review your application:</Typography>
            <pre style={{ background: '#f5f5f5', padding: 10 }}>
              {JSON.stringify(formData, (key, value) => (key === 'documents' ? value.map((f) => f.name) : value), 2)}
            </pre>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Vendor Application Form
      </Typography>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 2 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <form>{renderStepContent(activeStep)}</form>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button disabled={activeStep === 0 || loading} onClick={handleBack}>
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? <CircularProgress size={20} /> : 'Submit'}
          </Button>
        ) : (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        )}
      </Box>
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default ApplicationForm;
