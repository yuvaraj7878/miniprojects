import React, { useContext, useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardHeader, 
  Button, 
  CircularProgress, 
  Alert, 
  AlertTitle,
  Grid,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
  Paper
} from '@mui/material';
import {
  Help as HelpIcon,
  Description as DocumentIcon,
  Event as CalendarIcon,
  Autorenew as RenewIcon,
  CheckCircle as SuccessIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Lock as SecureIcon
} from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';

const RenewLicense = () => {
  const { currentUser } = useContext(AuthContext);
  const [selectedLicense, setSelectedLicense] = useState('');
  const [renewalStatus, setRenewalStatus] = useState({ message: '', isSuccess: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dummy data fallback
  const dummyLicenses = [
    { applicationType: 'business_license', status: 'approved' },
    { applicationType: 'health_permit', status: 'approved' },
    { applicationType: 'alcohol_license', status: 'approved' }
  ];

  // Get user's licenses or use dummy data if none exist
  const userLicenses = currentUser?.documents?.filter(
    doc => (doc.status === 'approved' || doc.status === 'completed') && 
           doc.type === 'license'
  ) || [];

  // Use user's licenses if available, otherwise use dummy data
  const approvedLicenses = userLicenses.length > 0 ? userLicenses : dummyLicenses;

  const handleRenew = () => {
    if (!selectedLicense) {
      setRenewalStatus({ message: 'Please select a license to renew', isSuccess: false });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setRenewalStatus({ 
        message: `Renewal request for ${formatLicenseName(selectedLicense)} submitted successfully!`, 
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

  const formatLicenseName = (name) => {
    if (!name) return '';
    return name.replace(/_/g, ' ')
              .replace(/\b\w/g, l => l.toUpperCase())
              .replace(/([a-z])([A-Z])/g, '$1 $2');
  };

  return (
    <Box sx={{ p: 4 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Card elevation={3} sx={{ borderRadius: 2 }}>
            <CardHeader
              title={
                <Typography variant="h5" component="div" color="primary">
                  License Renewal
                </Typography>
              }
              subheader="Renew your business licenses in one simple step"
              sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
            />
            
            <CardContent>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel id="license-select-label">Select License to Renew</InputLabel>
                <Select
                  labelId="license-select-label"
                  id="licenseSelect"
                  value={selectedLicense}
                  label="Select License to Renew"
                  onChange={(e) => setSelectedLicense(e.target.value)}
                >
                  <MenuItem value="">
                    <em>Choose a license...</em>
                  </MenuItem>
                  {approvedLicenses.map((license, index) => (
                    <MenuItem key={index} value={license.applicationType}>
                      {formatLicenseName(license.applicationType)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {selectedLicense && (
                <Alert 
                  severity="info" 
                  icon={<InfoIcon fontSize="inherit" />}
                  sx={{ mb: 4 }}
                >
                  <AlertTitle>Renewal Details</AlertTitle>
                  <Typography variant="body2">
                    You are renewing: <strong>{formatLicenseName(selectedLicense)}</strong>
                  </Typography>
                  <Typography variant="body2">
                    Processing time: 3-5 business days
                  </Typography>
                </Alert>
              )}

              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mt: 4 
              }}>
                <Typography variant="body2" color="text.secondary">
                  <SecureIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Secure government portal
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleRenew}
                  disabled={!selectedLicense || isSubmitting}
                  startIcon={<RenewIcon />}
                >
                  {isSubmitting ? (
                    <>
                      <CircularProgress size={20} sx={{ mr: 1 }} />
                      Processing...
                    </>
                  ) : (
                    'Submit Renewal Request'
                  )}
                </Button>
              </Box>

              {renewalStatus.message && (
                <Alert 
                  severity={renewalStatus.isSuccess ? "success" : "error"} 
                  sx={{ mt: 4 }}
                  icon={renewalStatus.isSuccess ? <SuccessIcon /> : <ErrorIcon />}
                >
                  {renewalStatus.message}
                </Alert>
              )}
            </CardContent>

            <Divider />

            <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Box display="flex" alignItems="center">
                    <Tooltip title="Contact support">
                      <IconButton color="primary" sx={{ mr: 1 }}>
                        <HelpIcon />
                      </IconButton>
                    </Tooltip>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Need help?
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        Contact Support
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box display="flex" alignItems="center">
                    <Tooltip title="View guidelines">
                      <IconButton color="primary" sx={{ mr: 1 }}>
                        <DocumentIcon />
                      </IconButton>
                    </Tooltip>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Documents
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        Renewal Guidelines
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box display="flex" alignItems="center">
                    <Tooltip title="Renewal period">
                      <IconButton color="primary" sx={{ mr: 1 }}>
                        <CalendarIcon />
                      </IconButton>
                    </Tooltip>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Renewal Period
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        Valid for 1 year
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RenewLicense;