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
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TextField,
  Avatar,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  Visibility,
  Assignment,
  People,
  Receipt,
  Settings,
  Refresh,
  Search,
  FilterList,
  Download
} from '@mui/icons-material';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [decision, setDecision] = useState('');
  const [remarks, setRemarks] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Load data from localStorage
  useEffect(() => {
    try {
      const storedApps = JSON.parse(localStorage.getItem('applications') || []);
      const storedUsers = JSON.parse(localStorage.getItem('users') || []);
      setApplications(storedApps);
      setUsers(storedUsers);
    } catch (error) {
      setSnackbar({ open: true, message: 'Error loading data', severity: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  const handleReview = (app) => {
    setSelectedApp(app);
    setDecision(app.status === 'Pending' ? '' : app.status);
    setRemarks(app.remarks || '');
  };

  const handleReviewClose = () => {
    setSelectedApp(null);
    setDecision('');
    setRemarks('');
  };

  const submitDecision = () => {
    if (!selectedApp || !decision) return;

    const updatedApps = applications.map(app => 
      app.id === selectedApp.id 
        ? { 
            ...app, 
            status: decision,
            reviewedBy: 'Admin', // In real app, use actual admin ID
            reviewedAt: new Date().toISOString(),
            remarks
          } 
        : app
    );

    // If approved, update user's licenses
    if (decision === 'Approved') {
      const userToUpdate = users.find(u => u.id === selectedApp.userId);
      if (userToUpdate) {
        const updatedUsers = users.map(user => 
          user.id === selectedApp.userId
            ? {
                ...user,
                licenses: [
                  ...(user.licenses || []),
                  {
                    id: selectedApp.id,
                    type: selectedApp.licenseType,
                    issuedDate: new Date().toISOString(),
                    expiryDate: calculateExpiryDate(1), // 1 year validity
                    status: 'Active'
                  }
                ]
              }
            : user
        );
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
      }
    }

    setApplications(updatedApps);
    localStorage.setItem('applications', JSON.stringify(updatedApps));

    setSnackbar({
      open: true,
      message: `Application ${decision.toLowerCase()}!`,
      severity: decision === 'Approved' ? 'success' : 'warning',
    });
    handleReviewClose();
  };

  const calculateExpiryDate = (years) => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + years);
    return date.toISOString();
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         app.licenseType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const pendingCount = applications.filter(app => app.status === 'Pending').length;
  const approvedCount = applications.filter(app => app.status === 'Approved').length;
  const rejectedCount = applications.filter(app => app.status === 'Rejected').length;

  const getStatusChip = (status) => {
    switch(status) {
      case 'Approved':
        return <Chip icon={<CheckCircle />} label="Approved" color="success" size="small" />;
      case 'Rejected':
        return <Chip icon={<Cancel />} label="Rejected" color="error" size="small" />;
      default:
        return <Chip label="Pending" color="warning" size="small" />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        <Assignment sx={{ verticalAlign: 'middle', mr: 1 }} />
        License Management Dashboard
      </Typography>

      <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
        <Tab label={<><People sx={{ mr: 1 }} /> Applications ({applications.length})</>} />
        <Tab label={<><Receipt sx={{ mr: 1 }} /> Transactions</>} />
        <Tab label={<><Settings sx={{ mr: 1 }} /> Settings</>} />
      </Tabs>

      {tabValue === 0 && (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                size="small"
                placeholder="Search applications..."
                InputProps={{ startAdornment: <Search sx={{ mr: 1 }} /> }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                onClick={() => setFilterStatus(filterStatus === 'All' ? 'Pending' : filterStatus === 'Pending' ? 'Approved' : filterStatus === 'Approved' ? 'Rejected' : 'All')}
              >
                {filterStatus}
              </Button>
            </Box>
            <Button variant="contained" startIcon={<Refresh />} onClick={() => window.location.reload()}>
              Refresh
            </Button>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <StatCard 
              title="Pending" 
              value={pendingCount} 
              icon={<CheckCircle color="warning" />} 
              color="warning.light" 
            />
            <StatCard 
              title="Approved" 
              value={approvedCount} 
              icon={<CheckCircle color="success" />} 
              color="success.light" 
            />
            <StatCard 
              title="Rejected" 
              value={rejectedCount} 
              icon={<Cancel color="error" />} 
              color="error.light" 
            />
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Applicant</TableCell>
                    <TableCell>License Type</TableCell>
                    <TableCell>Submitted On</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredApplications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ mr: 2 }}>{app.name.charAt(0)}</Avatar>
                          <Box>
                            <Typography>{app.name}</Typography>
                            <Typography variant="body2" color="text.secondary">{app.email}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {app.licenseType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </TableCell>
                      <TableCell>
                        {new Date(app.submittedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {getStatusChip(app.status)}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Review Application">
                          <IconButton color="primary" onClick={() => handleReview(app)}>
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Download Documents">
                          <IconButton color="secondary">
                            <Download />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}

      {tabValue === 1 && (
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h6">Payment Transactions</Typography>
          <Typography color="text.secondary">Feature coming soon</Typography>
        </Box>
      )}

      {tabValue === 2 && (
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h6">Admin Settings</Typography>
          <Typography color="text.secondary">Feature coming soon</Typography>
        </Box>
      )}

      {/* Review Dialog */}
      <Dialog open={!!selectedApp} onClose={handleReviewClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Review Application: {selectedApp?.name}
          <Typography variant="subtitle2" color="text.secondary">
            {selectedApp?.licenseType}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          {selectedApp && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', gap: 4 }}>
                <Box>
                  <Typography variant="subtitle2">Applicant Details</Typography>
                  <Typography>Email: {selectedApp.email}</Typography>
                  <Typography>Phone: {selectedApp.phone}</Typography>
                  <Typography>Submitted: {new Date(selectedApp.submittedAt).toLocaleString()}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2">Business Details</Typography>
                  <Typography>Type: {selectedApp.businessType}</Typography>
                  <Typography>Location: {selectedApp.businessLocation}</Typography>
                </Box>
              </Box>

              <Divider />

              <Box>
                <Typography variant="subtitle2">Documents</Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                  {selectedApp.documents?.map((doc, index) => (
                    <Card key={index} sx={{ p: 1 }}>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Assignment sx={{ fontSize: 40 }} />
                        <Typography>{doc.type}</Typography>
                        <Button size="small" sx={{ mt: 1 }}>View</Button>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Box>

              <Divider />

              <Box>
                <Typography variant="subtitle2">Decision</Typography>
                <RadioGroup 
                  row 
                  value={decision} 
                  onChange={(e) => setDecision(e.target.value)}
                  sx={{ my: 1 }}
                >
                  <FormControlLabel 
                    value="Approved" 
                    control={<Radio />} 
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CheckCircle color="success" sx={{ mr: 1 }} />
                        Approve
                      </Box>
                    } 
                  />
                  <FormControlLabel 
                    value="Rejected" 
                    control={<Radio />} 
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Cancel color="error" sx={{ mr: 1 }} />
                        Reject
                      </Box>
                    } 
                  />
                </RadioGroup>

                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Remarks"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Add comments for your decision..."
                  sx={{ mt: 2 }}
                />
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReviewClose}>Cancel</Button>
          <Button 
            onClick={submitDecision} 
            disabled={!decision}
            variant="contained"
            color={decision === 'Approved' ? 'success' : 'error'}
          >
            {decision === 'Approved' ? 'Approve Application' : 'Reject Application'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

// Helper component for stats cards
const StatCard = ({ title, value, icon, color }) => (
  <Card sx={{ flex: 1, bgcolor: color }}>
    <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="h4">{value}</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {icon}
      </Box>
    </CardContent>
  </Card>
);

export default AdminDashboard;