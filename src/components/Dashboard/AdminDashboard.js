import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
  Snackbar,
  Alert,
  Grid,
  Paper,
  Divider,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Badge
} from '@mui/material';
import {
  Business as BusinessIcon,
  Person as PersonIcon,
  AttachMoney as PaymentIcon,
  Description as DescriptionIcon,
  DocumentScanner as DocumentIcon,
  CheckCircle as ApprovedIcon,
  Cancel as RejectedIcon,
  Pending as PendingIcon,
  Folder as ApplicationIcon
} from '@mui/icons-material';

const statusChip = (status) => {
  switch (status) {
    case 'Approved':
      return <Chip icon={<ApprovedIcon />} label="Approved" color="success" variant="outlined" />;
    case 'Rejected':
      return <Chip icon={<RejectedIcon />} label="Rejected" color="error" variant="outlined" />;
    default:
      return <Chip icon={<PendingIcon />} label="Pending" color="warning" variant="outlined" />;
  }
};

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [decision, setDecision] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    try {
      const storedApps = JSON.parse(localStorage.getItem('applications') || '[]');
      setApplications(storedApps);
    } catch {
      setSnackbar({ open: true, message: 'Error loading applications', severity: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  const handleReview = (app) => {
    setSelectedApp(app);
    setDecision(app.status === 'Pending' ? '' : app.status);
  };

  const handleReviewClose = () => {
    setSelectedApp(null);
    setDecision('');
  };

  const submitDecision = () => {
    if (!selectedApp || !decision) return;

    const updated = applications.map((app) =>
      app.id === selectedApp.id ? { ...app, status: decision } : app
    );
    setApplications(updated);
    localStorage.setItem('applications', JSON.stringify(updated));

    setSnackbar({
      open: true,
      message: `Application ${decision.toLowerCase()}!`,
      severity: decision === 'Approved' ? 'success' : 'warning',
    });
    handleReviewClose();
  };

  return (
    <Box sx={{ p: 4 }}>
      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            License Applications Dashboard
          </Typography>
          <Badge badgeContent={applications.length} color="primary" showZero>
            <ApplicationIcon color="action" fontSize="large" />
          </Badge>
        </Box>
        
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'success.light', borderRadius: 2 }}>
              <Typography variant="subtitle1" color="success.contrastText">
                Approved
              </Typography>
              <Typography variant="h4" color="success.contrastText">
                {applications.filter(app => app.status === 'Approved').length}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'error.light', borderRadius: 2 }}>
              <Typography variant="subtitle1" color="error.contrastText">
                Rejected
              </Typography>
              <Typography variant="h4" color="error.contrastText">
                {applications.filter(app => app.status === 'Rejected').length}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'warning.light', borderRadius: 2 }}>
              <Typography variant="subtitle1" color="warning.contrastText">
                Pending
              </Typography>
              <Typography variant="h4" color="warning.contrastText">
                {applications.filter(app => app.status === 'Pending').length}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress size={60} />
        </Box>
      ) : applications.length === 0 ? (
        <Paper elevation={0} sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
          <Typography variant="h6" color="textSecondary">
            No applications found
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {applications.map((app) => (
            <Grid item xs={12} key={app.id}>
              <Card elevation={2} sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        #{app.id}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                        {app.business?.type || "Business Type Not Specified"}
                      </Typography>
                    </Box>
                    {statusChip(app.status)}
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <Box display="flex" alignItems="center" mb={1}>
                        <PersonIcon color="action" sx={{ mr: 1 }} />
                        <Typography variant="subtitle2">Applicant</Typography>
                      </Box>
                      <Typography variant="body2">{app.basic?.name || "N/A"}</Typography>
                      <Typography variant="body2" color="textSecondary">{app.basic?.email || "N/A"}</Typography>
                      <Typography variant="body2" color="textSecondary">{app.basic?.phone || "N/A"}</Typography>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Box display="flex" alignItems="center" mb={1}>
                        <BusinessIcon color="action" sx={{ mr: 1 }} />
                        <Typography variant="subtitle2">Business</Typography>
                      </Box>
                      <Typography variant="body2">{app.business?.location || "N/A"}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {app.business?.licenseType || "N/A"}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Box display="flex" alignItems="center" mb={1}>
                        <PaymentIcon color="action" sx={{ mr: 1 }} />
                        <Typography variant="subtitle2">Payment</Typography>
                      </Box>
                      <Typography variant="body2">₹{app.payment?.total || "0"}</Typography>
                      <Chip
                        label={app.payment?.paid ? "Paid" : "Unpaid"}
                        size="small"
                        color={app.payment?.paid ? "success" : "error"}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>

                  <Box mt={2} display="flex" justifyContent="flex-end">
                    <Button
                      variant="contained"
                      onClick={() => handleReview(app)}
                      sx={{ textTransform: 'none' }}
                    >
                      Review Application
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={!!selectedApp} onClose={handleReviewClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
          <Box display="flex" alignItems="center">
            <ApplicationIcon sx={{ mr: 1 }} />
            Review Application #{selectedApp?.id}
          </Box>
        </DialogTitle>
        <DialogContent dividers sx={{ py: 3 }}>
          {selectedApp && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 2, border: '1px solid #eee', borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <PersonIcon color="primary" sx={{ mr: 1 }} />
                    Applicant Information
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText primary="Name" secondary={selectedApp.basic?.name || "N/A"} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Email" secondary={selectedApp.basic?.email || "N/A"} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Phone" secondary={selectedApp.basic?.phone || "N/A"} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Address" secondary={selectedApp.basic?.address || "N/A"} />
                    </ListItem>
                  </List>
                </Paper>

                <Paper elevation={0} sx={{ p: 2, border: '1px solid #eee', borderRadius: 2, mt: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <BusinessIcon color="primary" sx={{ mr: 1 }} />
                    Business Details
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText primary="Business Type" secondary={selectedApp.business?.type || "N/A"} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Location" secondary={selectedApp.business?.location || "N/A"} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="License Type" secondary={selectedApp.business?.licenseType || "N/A"} />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 2, border: '1px solid #eee', borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <PaymentIcon color="primary" sx={{ mr: 1 }} />
                    Payment Information
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText primary="Total Amount" secondary={`₹${selectedApp.payment?.total || "0"}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Payment Status" 
                        secondary={
                          <Chip
                            label={selectedApp.payment?.paid ? "Paid" : "Unpaid"}
                            color={selectedApp.payment?.paid ? "success" : "error"}
                            size="small"
                          />
                        } 
                      />
                    </ListItem>
                  </List>
                </Paper>

                <Paper elevation={0} sx={{ p: 2, border: '1px solid #eee', borderRadius: 2, mt: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <DocumentIcon color="primary" sx={{ mr: 1 }} />
                    Submitted Documents
                  </Typography>
                  {selectedApp.certificates && selectedApp.certificates.length > 0 ? (
                    <List dense>
                      {selectedApp.certificates.map((doc, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <DescriptionIcon color="action" />
                          </ListItemIcon>
                          <ListItemText primary={doc} />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                      No documents uploaded
                    </Typography>
                  )}
                </Paper>

                <Paper elevation={0} sx={{ p: 2, border: '1px solid #eee', borderRadius: 2, mt: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Review Decision
                  </Typography>
                  <RadioGroup value={decision} onChange={(e) => setDecision(e.target.value)}>
                    <FormControlLabel 
                      value="Approved" 
                      control={<Radio color="success" />} 
                      label={
                        <Box display="flex" alignItems="center">
                          <ApprovedIcon color="success" sx={{ mr: 1 }} />
                          Approve Application
                        </Box>
                      } 
                    />
                    <FormControlLabel 
                      value="Rejected" 
                      control={<Radio color="error" />} 
                      label={
                        <Box display="flex" alignItems="center">
                          <RejectedIcon color="error" sx={{ mr: 1 }} />
                          Reject Application
                        </Box>
                      } 
                    />
                  </RadioGroup>
                </Paper>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: '1px solid #eee' }}>
          <Button onClick={handleReviewClose} variant="outlined" sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button 
            onClick={submitDecision} 
            disabled={!decision}
            variant="contained"
            color={decision === 'Approved' ? 'success' : 'error'}
          >
            Submit Decision
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
          elevation={6}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminDashboard;