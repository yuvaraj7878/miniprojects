import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
 
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  Paper,
  Grid,
  Button,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Alert,
  CircularProgress,
} from '@mui/material';

import {
  CheckCircle,
  Pending,
  Warning,
  Assignment,
  
  Receipt,
  ExpandMore,
  Payment,
 
  Business,
  
  Download,
  Refresh,
  Person
} from '@mui/icons-material';
// import { AuthContext } from '../../context/AuthContext';
import dayjs from 'dayjs';

const statusConfig = {
  submitted: { color: 'info', icon: <Pending />, label: 'Submitted' },
  'under review': { color: 'warning', icon: <Pending />, label: 'Under Review' },
  approved: { color: 'success', icon: <CheckCircle />, label: 'Approved' },
  rejected: { color: 'error', icon: <Warning />, label: 'Rejected' },
  completed: { color: 'success', icon: <CheckCircle />, label: 'Completed' },
  'pending payment': { color: 'warning', icon: <Payment />, label: 'Pending Payment' }
};

const ApplicationStatus = () => {
  // const { currentUser } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');

  const certificateOptions = [
  { label: 'Birth Certificate', value: 'birth_certificate' },
  { label: 'Caste Certificate', value: 'caste_certificate' },
  { label: 'Income Certificate', value: 'income_certificate' }
];

const documentLabels = [
  { label: 'Aadhar Card', value: 'aadhar_card' },
  { label: 'Passport', value: 'passport' },
  { label: 'Driving License', value: 'driving_license' }
];



  
  const fetchApplications = () => {
    setLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        const storedApps = JSON.parse(localStorage.getItem('applications') || []);
        setApplications(storedApps);
        if (storedApps.length > 0 && !selectedApp) {
          setSelectedApp(storedApps[storedApps.length - 1]);
        }
        setLastUpdated(dayjs().format('DD MMM YYYY, hh:mm A'));
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);


  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getStatusChip = (status) => {
    const config = statusConfig[status.toLowerCase()] || statusConfig.submitted;
    return (
      <Chip
        icon={config.icon}
        label={config.label}
        color={config.color}
        variant="outlined"
        sx={{ ml: 1 }}
      />
    );
  };

  const getTimelineStatus = (status) => {
    const steps = [
      { id: 1, label: 'Application Submitted', active: true, date: selectedApp?.date },
      { id: 2, label: 'Document Verification', active: status !== 'submitted' },
      { id: 3, label: 'Department Review', active: ['under review', 'approved', 'completed'].includes(status) },
      { id: 4, label: 'Payment Processed', active: ['approved', 'completed'].includes(status) },
      { id: 5, label: 'License Issued', active: status === 'completed' }
    ];

    return steps.map(step => (
      <ListItem key={step.id} sx={{ pl: 0 }}>
        <ListItemAvatar>
          <Avatar sx={{ 
            bgcolor: step.active ? 'primary.main' : 'action.disabledBackground',
            color: step.active ? 'primary.contrastText' : 'text.secondary'
          }}>
            {step.id}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={step.label}
          secondary={step.date ? dayjs(step.date).format('DD MMM YYYY') : ''}
          secondaryTypographyProps={{ color: 'text.secondary' }}
        />
      </ListItem>
    ));
  };

  const getRequiredActions = (status) => {
    if (status === 'pending payment') {
      return (
        <Alert severity="warning" sx={{ mb: 3 }}>
          Payment of ${selectedApp?.payment?.total} is pending. Please complete the payment to proceed.
          <Button variant="contained" size="small" sx={{ ml: 2 }}>
            Pay Now
          </Button>
        </Alert>
      );
    } else if (status === 'rejected') {
      return (
        <Alert severity="error" sx={{ mb: 3 }}>
          Your application requires corrections. Please review the comments and resubmit.
          <Button variant="outlined" size="small" sx={{ ml: 2 }}>
            View Comments
          </Button>
        </Alert>
      );
    }
    return null;
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', my: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Application Status
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
            Last updated: {lastUpdated}
          </Typography>
          <Tooltip title="Refresh">
            <IconButton onClick={fetchApplications} disabled={loading}>
              <Refresh />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Application List */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Your Applications
              </Typography>
              <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
                <Tab label="All" />
                <Tab label="Active" />
                <Tab label="Completed" />
              </Tabs>
              
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress />
                </Box>
              ) : applications.length > 0 ? (
                <List>
                  {applications.map((app) => (
                    <ListItem 
                      key={app.id}
                      button
                      selected={selectedApp?.id === app.id}
                      onClick={() => setSelectedApp(app)}
                      sx={{ borderRadius: 1 }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.light' }}>
                          <Assignment />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`Application #${app.id}`}
                        secondary={
                          <>
                            {dayjs(app.date).format('DD MMM YYYY')}
                            {getStatusChip(app.status)}
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                  No applications found
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        {/* Application Details */}
        <Grid item xs={12} md={8}>
          {selectedApp ? (
            <Box>
              {getRequiredActions(selectedApp.status)}
              
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" component="div">
                      Application #{selectedApp.id}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {getStatusChip(selectedApp.status)}
                      <Button 
                        variant="outlined" 
                        startIcon={<Download />}
                        sx={{ ml: 2 }}
                      >
                        Receipt
                      </Button>
                    </Box>
                  </Box>
                  
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    Submitted on {dayjs(selectedApp.date).format('DD MMMM YYYY [at] hh:mm A')}
                  </Typography>
                  
                  <LinearProgress 
                    variant="determinate" 
                    value={selectedApp.progress || 25} 
                    sx={{ height: 8, borderRadius: 4, my: 3 }}
                  />
                  
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={6} sm={3}>
                      <Paper elevation={0} sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="subtitle2">License Type</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {selectedApp.business?.licenseType || 'N/A'}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Paper elevation={0} sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="subtitle2">Status</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {selectedApp.status || 'N/A'}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Paper elevation={0} sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="subtitle2">Progress</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {selectedApp.progress || 25}%
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Paper elevation={0} sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="subtitle2">Est. Completion</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {selectedApp.estimatedCompletion ? 
                            dayjs(selectedApp.estimatedCompletion).format('DD MMM YYYY') : 
                            'N/A'}
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                  
                  <Accordion defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="subtitle1">Application Timeline</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense>
                        {getTimelineStatus(selectedApp.status)}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                  
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="subtitle1">Application Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                            <Person sx={{ mr: 1, fontSize: 20 }} /> Applicant Details
                          </Typography>
                          <Typography><strong>Name:</strong> {selectedApp.basic?.name}</Typography>
                          <Typography><strong>Email:</strong> {selectedApp.basic?.email}</Typography>
                          <Typography><strong>Phone:</strong> {selectedApp.basic?.phone}</Typography>
                          <Typography><strong>Address:</strong> {selectedApp.basic?.address}</Typography>
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                            <Business sx={{ mr: 1, fontSize: 20 }} /> Business Details
                          </Typography>
                          <Typography><strong>Type:</strong> {selectedApp.business?.type}</Typography>
                          <Typography><strong>Location:</strong> {selectedApp.business?.location}</Typography>
                          <Typography><strong>License Type:</strong> {selectedApp.business?.licenseType}</Typography>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                  
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="subtitle1">Certificates & Documents</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <TableContainer component={Paper} elevation={0}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Certificate</TableCell>
                              <TableCell>Fee</TableCell>
                              <TableCell>Status</TableCell>
                              <TableCell>Documents</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {selectedApp.certificates?.map(certId => {
                              const cert = certificateOptions[selectedApp.business?.type]?.find(c => c.id === certId);
                              return (
                                <TableRow key={certId}>
                                  <TableCell>{cert?.name || certId}</TableCell>
                                  <TableCell>${cert?.fee || 0}</TableCell>
                                  <TableCell>
                                    <Chip 
                                      label={selectedApp.status} 
                                      size="small" 
                                      color={selectedApp.status === 'approved' ? 'success' : 'default'}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    {cert?.docs?.map(doc => (
                                      <Chip
                                        key={doc}
                                        label={documentLabels[doc]}
                                        size="small"
                                        sx={{ m: 0.5 }}
                                        variant="outlined"
                                      />
                                    ))}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </AccordionDetails>
                  </Accordion>
                  
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="subtitle1">Payment Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography><strong>Total Amount:</strong> ${selectedApp.payment?.total}</Typography>
                          <Typography><strong>Payment Status:</strong> {selectedApp.payment?.paid ? 'Paid' : 'Pending'}</Typography>
                          <Typography><strong>Payment Date:</strong> {selectedApp.payment?.date || 'N/A'}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Button 
                            variant="contained" 
                            startIcon={<Receipt />}
                            disabled={!selectedApp.payment?.paid}
                          >
                            Download Payment Receipt
                          </Button>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </CardContent>
              </Card>
            </Box>
          ) : (
            <Paper elevation={0} sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                No application selected
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Please select an application from the list to view details
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ApplicationStatus;