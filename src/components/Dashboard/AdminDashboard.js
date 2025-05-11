import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Typography,
  Modal,
  TextField
} from '@mui/material';
import { Approval as ApprovalIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { mockApplications } from '../../data/mockApplications';

const AdminDashboard = () => {
  const [applications, setApplications] = useState(mockApplications);
  const [selectedApp, setSelectedApp] = useState(null);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [decision, setDecision] = useState('');
  const [declineReason, setDeclineReason] = useState('');

  const handleReviewOpen = (app) => {
    setSelectedApp(app);
    setReviewOpen(true);
    setDecision('');
    setDeclineReason('');
  };

  const handleReviewClose = () => {
    setReviewOpen(false);
    setSelectedApp(null);
    setDecision('');
    setDeclineReason('');
  };

  const handleDecision = (status) => {
    setDecision(status);
  };

  const submitDecision = () => {
    if (selectedApp && decision) {
      const updatedApps = applications.map(app => 
        app.id === selectedApp.id ? { 
          ...app, 
          status: decision,
          ...(decision === 'Rejected' && { declineReason }) 
        } : app
      );
      setApplications(updatedApps);
      handleReviewClose();
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Application Approvals
      </Typography>
      <Typography variant="body1" paragraph>
        Review and approve pending vendor applications
      </Typography>
      
      <Box sx={{ mt: 3 }}>
        {applications.filter(app => app.status === 'Pending').length === 0 ? (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">No pending applications</Typography>
            <Typography variant="body2">All applications have been processed</Typography>
          </Paper>
        ) : (
          applications
            .filter(app => app.status === 'Pending')
            .map(app => (
              <Paper key={app.id} sx={{ p: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="h6">{app.id}</Typography>
                    <Typography variant="body2">
                      <strong>Vendor:</strong> {app.vendorName} • <strong>Type:</strong> {app.type} • <strong>Date:</strong> {app.date}
                    </Typography>
                    {app.documents && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        <strong>Documents:</strong> {app.documents.join(', ')}
                      </Typography>
                    )}
                  </Box>
                  <Button 
                    variant="contained" 
                    onClick={() => handleReviewOpen(app)}
                    startIcon={<ApprovalIcon />}
                  >
                    Review
                  </Button>
                </Box>
              </Paper>
            ))
        )}
      </Box>
      
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Recently Processed
        </Typography>
        {applications
          .filter(app => app.status !== 'Pending')
          .map(app => (
            <Paper key={app.id} sx={{ p: 2, mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6">{app.id}</Typography>
                  <Typography variant="body2">
                    <strong>Vendor:</strong> {app.vendorName} • <strong>Type:</strong> {app.type} • <strong>Date:</strong> {app.date}
                  </Typography>
                  {app.status === 'Rejected' && app.declineReason && (
                    <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                      <strong>Reason:</strong> {app.declineReason}
                    </Typography>
                  )}
                </Box>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: app.status === 'Approved' ? 'success.main' : 'error.main',
                    fontWeight: 'bold'
                  }}
                >
                  {app.status}
                </Typography>
              </Box>
            </Paper>
          ))}
      </Box>
      
      <Modal open={reviewOpen} onClose={handleReviewClose}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 1
        }}>
          {selectedApp && (
            <>
              <Typography variant="h5" gutterBottom>
                Review Application: {selectedApp.id}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Vendor:</strong> {selectedApp.vendorName}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Application Type:</strong> {selectedApp.type}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Submitted On:</strong> {selectedApp.date}
              </Typography>
              
              <Box sx={{ my: 3 }}>
                <Typography variant="h6">Documents:</Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                  {selectedApp.documents?.map((doc, index) => (
                    <Paper key={index} sx={{ p: 1, cursor: 'pointer' }}>
                      <Typography variant="body2">{doc}</Typography>
                    </Paper>
                  ))}
                </Box>
              </Box>
              
              <Typography variant="h6" gutterBottom>
                Decision:
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Button 
                  variant={decision === 'Approved' ? 'contained' : 'outlined'} 
                  color="success"
                  onClick={() => handleDecision('Approved')}
                >
                  Approve
                </Button>
                <Button 
                  variant={decision === 'Rejected' ? 'contained' : 'outlined'} 
                  color="error"
                  onClick={() => handleDecision('Rejected')}
                >
                  Reject
                </Button>
              </Box>
              
              {decision === 'Rejected' && (
                <TextField
                  label="Reason for rejection"
                  multiline
                  rows={3}
                  fullWidth
                  value={declineReason}
                  onChange={(e) => setDeclineReason(e.target.value)}
                  sx={{ mb: 3 }}
                />
              )}
              
              <Button 
                variant="contained" 
                fullWidth
                onClick={submitDecision}
                disabled={!decision || (decision === 'Rejected' && !declineReason)}
              >
                Submit Decision
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default AdminDashboard;