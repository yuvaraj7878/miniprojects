import React, { useState, useContext, useEffect } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  MenuItem,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Chip,
  Divider,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Person, Email, Phone, Home,
  Store, Assignment, Description,
  AttachFile, CreditCard, CheckCircle
} from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';

const steps = [
  'Basic Details',
  'Business Information',
  'Certificates Required',
  'Document Upload',
  'Payment',
  'Review & Submit',
  'Confirmation'
];

const businessTypes = [
  { value: 'street_vendor', label: 'Street Vendor' },
  { value: 'small_shop', label: 'Small Shop' },
  { value: 'food_truck', label: 'Food Truck' },
  { value: 'home_business', label: 'Home Business' }
];

const certificateOptions = {
  street_vendor: [
    { id: 'health', name: 'Health Certificate', fee: 100, docs: ['id_proof', 'health_cert'] },
    { id: 'trade', name: 'Trade License', fee: 200, docs: ['id_proof', 'address_proof'] }
  ],
  small_shop: [
    { id: 'fire', name: 'Fire Safety', fee: 150, docs: ['id_proof', 'fire_safety'] },
    { id: 'signage', name: 'Signage License', fee: 100, docs: ['id_proof', 'shop_photo'] }
  ]
};

const documentLabels = {
  id_proof: 'Government ID Proof',
  health_cert: 'Health Inspection Certificate',
  address_proof: 'Address Proof',
  fire_safety: 'Fire Safety Inspection Report',
  shop_photo: 'Shop Front Photo'
};

function ApplicationForm() {
  const { currentUser } = useContext(AuthContext);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    basic: { name: '', email: '', phone: '', address: '' },
    business: { type: '', location: '', licenseType: 'new' },
    certificates: [],
    documents: {},
    payment: { total: 0, paid: false }
  });
  const [loading, setLoading] = useState(false);
  const [applicationId, setApplicationId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        basic: {
          name: currentUser.name,
          email: currentUser.email,
          phone: currentUser.phone,
          address: ''
        },
        business: {
          ...prev.business,
          type: currentUser.businessType
        }
      }));
    }
  }, [currentUser]);

  const handleNext = () => setActiveStep(prev => prev + 1);
  const handleBack = () => setActiveStep(prev => prev - 1);

  const handleBasicChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      basic: { ...prev.basic, [name]: value }
    }));
  };

  const handleBusinessChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      business: { ...prev.business, [name]: value },
      certificates: [],
      documents: {}
    }));
  };

  const handleCertificateSelect = (certId) => {
    setFormData(prev => {
      const certs = prev.certificates.includes(certId)
        ? prev.certificates.filter(id => id !== certId)
        : [...prev.certificates, certId];
      
      const total = certs.reduce((sum, id) => {
        const cert = certificateOptions[prev.business.type]?.find(c => c.id === id);
        return sum + (cert?.fee || 0);
      }, 0);

      return {
        ...prev,
        certificates: certs,
        payment: { ...prev.payment, total }
      };
    });
  };

  const handleFileUpload = (certId, docType, files) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [certId]: {
          ...prev.documents[certId],
          [docType]: files
        }
      }
    }));
  };

  const handlePayment = async () => {
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        payment: { ...prev.payment, paid: true }
      }));
      setLoading(false);
      handleNext();
    }, 2000);
  };

  const submitApplication = async () => {
    setLoading(true);
    try {
      const appId = `APP-${Math.floor(100000 + Math.random() * 900000)}`;
      const application = {
        id: appId,
        ...formData,
        status: 'pending',
        date: new Date().toISOString()
      };

      // Save to localStorage
      const existing = JSON.parse(localStorage.getItem('applications') || []);
      localStorage.setItem('applications', JSON.stringify([...existing, application]));
      
      // Send confirmation
      setApplicationId(appId);
      handleNext();
      sendNotifications(appId);
    } catch (error) {
      setSnackbar({ open: true, message: 'Submission failed!', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const sendNotifications = (appId) => {
    // Simulate notifications
    console.log(`Email sent to ${formData.basic.email} with ID ${appId}`);
    console.log(`SMS sent to ${formData.basic.phone}`);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Full Name" name="name" value={formData.basic.name}
                onChange={handleBasicChange} InputProps={{ startAdornment: <Person /> }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Email" name="email" value={formData.basic.email}
                onChange={handleBasicChange} InputProps={{ startAdornment: <Email /> }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Phone" name="phone" value={formData.basic.phone}
                onChange={handleBasicChange} InputProps={{ startAdornment: <Phone /> }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Address" name="address" value={formData.basic.address}
                onChange={handleBasicChange} InputProps={{ startAdornment: <Home /> }} />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField select fullWidth label="Business Type" name="type"
                value={formData.business.type} onChange={handleBusinessChange}
                InputProps={{ startAdornment: <Store /> }}>
                {businessTypes.map(opt => (
                  <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Business Location" name="location"
                value={formData.business.location} onChange={handleBusinessChange}
                InputProps={{ startAdornment: <Home /> }} />
            </Grid>
            <Grid item xs={12}>
              <TextField select fullWidth label="License Type" name="licenseType"
                value={formData.business.licenseType} onChange={handleBusinessChange}>
                <MenuItem value="new">New Application</MenuItem>
                <MenuItem value="renewal">Renewal</MenuItem>
                <MenuItem value="modification">Modification</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Select Required Certificates
            </Typography>
            <FormGroup>
              {certificateOptions[formData.business.type]?.map(cert => (
                <Card key={cert.id} sx={{ mb: 2 }}>
                  <CardContent>
                    <FormControlLabel
                      control={<Checkbox checked={formData.certificates.includes(cert.id)}
                        onChange={() => handleCertificateSelect(cert.id)} />}
                      label={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                          <Typography>{cert.name}</Typography>
                          <Chip label={`$${cert.fee}`} color="primary" />
                        </Box>
                      }
                    />
                  </CardContent>
                </Card>
              ))}
            </FormGroup>
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Upload Required Documents
            </Typography>
            {formData.certificates.map(certId => {
              const cert = certificateOptions[formData.business.type]?.find(c => c.id === certId);
              return (
                <Card key={certId} sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>{cert.name}</Typography>
                    <Grid container spacing={2}>
                      {cert.docs.map(doc => (
                        <Grid item xs={12} md={6} key={doc}>
                          <TextField
                            fullWidth
                            type="file"
                            label={documentLabels[doc]}
                            InputProps={{
                              startAdornment: <AttachFile />,
                              inputProps: { multiple: true }
                            }}
                            onChange={(e) => handleFileUpload(certId, doc, e.target.files)}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        );

      case 4:
        return (
          <Box>
            <Typography variant="h4" gutterBottom>
              Total Fee: ${formData.payment.total}
            </Typography>
            <Card sx={{ maxWidth: 500, mx: 'auto' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Payment Details</Typography>
                <TextField fullWidth label="Card Number" sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField fullWidth label="Expiry Date" placeholder="MM/YY" />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label="CVV" />
                  </Grid>
                </Grid>
                <Button fullWidth variant="contained" sx={{ mt: 3 }}
                  onClick={handlePayment} disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : 'Pay Now'}
                </Button>
              </CardContent>
            </Card>
          </Box>
        );

      case 5:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Application Summary</Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">Basic Details</Typography>
                <Typography>{formData.basic.name}</Typography>
                <Typography>{formData.basic.email}</Typography>
                <Typography>{formData.basic.phone}</Typography>
                <Typography>{formData.basic.address}</Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">Business Details</Typography>
                <Typography>{formData.business.type}</Typography>
                <Typography>{formData.business.location}</Typography>
                <Typography>{formData.business.licenseType}</Typography>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle1">Selected Certificates</Typography>
                {formData.certificates.map(certId => (
                  <Chip key={certId} label={
                    certificateOptions[formData.business.type]?.find(c => c.id === certId)?.name
                  } sx={{ m: 0.5 }} />
                ))}
              </Grid>
            </Grid>
          </Box>
        );

      case 6:
        return (
          <Box textAlign="center" sx={{ py: 4 }}>
            <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              Application Submitted!
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Reference ID: {applicationId}
            </Typography>
            <Typography>
              We've sent confirmation details to {formData.basic.email} and {formData.basic.phone}
            </Typography>
            <Button variant="contained" sx={{ mt: 3 }} href="/status">
              Track Application Status
            </Button>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', my: 4 }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map(label => (
          <Step key={label}><StepLabel>{label}</StepLabel></Step>
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
}

export default ApplicationForm;