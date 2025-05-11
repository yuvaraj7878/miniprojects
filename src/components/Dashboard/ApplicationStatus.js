import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Divider
} from '@mui/material';
import { CheckCircle, Cancel, HourglassEmpty } from '@mui/icons-material';

const ApplicationStatus = ({ applicationId }) => {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call to fetch application status
    const fetchApplicationStatus = () => {
      setLoading(true);
      setTimeout(() => {
        try {
          // In a real app, this would come from your backend API
          const mockApplications = [
            {
              id: 'APP-1234',
              status: 'Pending',
              vendorName: 'John Doe',
              type: 'Food Vendor',
              date: '2023-05-15',
              documents: ['license.pdf', 'id_proof.jpg']
            },
            {
              id: 'APP-5678',
              status: 'Approved',
              vendorName: 'Jane Smith',
              type: 'Retail Vendor',
              date: '2023-05-10',
              documents: ['license.pdf', 'insurance.pdf']
            },
            {
              id: 'APP-9012',
              status: 'Rejected',
              vendorName: 'Bob Johnson',
              type: 'Service Provider',
              date: '2023-05-05',
              documents: ['license.pdf'],
              declineReason: 'Missing required insurance documentation'
            }
          ];
          
          const foundApp = mockApplications.find(app => app.id === applicationId);
          if (foundApp) {
            setApplication(foundApp);
          } else {
            setError('Application not found');
          }
        } catch (err) {
          setError('Failed to fetch application status');
        } finally {
          setLoading(false);
        }
      }, 1000);
    };

    if (applicationId) {
      fetchApplicationStatus();
    }
  }, [applicationId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!application) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">No application selected</Typography>
        <Typography variant="body1">
          Please enter an application ID to check status
        </Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {application.status === 'Approved' ? (
          <CheckCircle color="success" sx={{ fontSize: 40, mr: 2 }} />
        ) : application.status === 'Rejected' ? (
          <Cancel color="error" sx={{ fontSize: 40, mr: 2 }} />
        ) : (
          <HourglassEmpty color="info" sx={{ fontSize: 40, mr: 2 }} />
        )}
        <Typography variant="h4">
          Application Status: 
          <span style={{ 
            color: application.status === 'Approved' ? 'green' : 
                  application.status === 'Rejected' ? 'red' : 'orange',
            marginLeft: '10px'
          }}>
            {application.status}
          </span>
        </Typography>
      </Box>
      
      <Typography variant="body1" paragraph>
        <strong>Application ID:</strong> {application.id}
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>Vendor Name:</strong> {application.vendorName}
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>Type:</strong> {application.type}
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>Submitted On:</strong> {application.date}
      </Typography>
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="h6" gutterBottom>
        Documents Submitted:
      </Typography>
      <ul>
        {application.documents.map((doc, index) => (
          <li key={index}>{doc}</li>
        ))}
      </ul>
      
      {application.status === 'Rejected' && application.declineReason && (
        <>
          <Divider sx={{ my: 2 }} />
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Reason for Rejection:
            </Typography>
            <Typography>{application.declineReason}</Typography>
          </Alert>
          <Button variant="contained" color="primary">
            Resubmit Application
          </Button>
        </>
      )}
      
      {application.status === 'Approved' && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Your application has been approved! You can now proceed to the next steps.
        </Alert>
      )}
    </Paper>
  );
};

export default ApplicationStatus;