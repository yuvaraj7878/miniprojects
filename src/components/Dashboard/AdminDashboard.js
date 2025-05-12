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
} from '@mui/material';

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
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Admin Dashboard
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        applications.map((app) => (
          <Card key={app.id} sx={{ my: 2 }}>
            <CardContent>
              <Typography variant="subtitle1">{app.name} ({app.licenseType})</Typography>
              <Typography variant="body2">Email: {app.email}</Typography>
              <Typography variant="body2">Phone: {app.phone}</Typography>
              <Typography variant="body2">Status: {app.status}</Typography>
              <Button variant="outlined" sx={{ mt: 1 }} onClick={() => handleReview(app)}>
                Review
              </Button>
            </CardContent>
          </Card>
        ))
      )}

      <Dialog open={!!selectedApp} onClose={handleReviewClose}>
        <DialogTitle>Review Application</DialogTitle>
        <DialogContent>
          {selectedApp && (
            <>
              <Typography>Name: {selectedApp.name}</Typography>
              <Typography>Email: {selectedApp.email}</Typography>
              <Typography>Phone: {selectedApp.phone}</Typography>
              <Typography>License Type: {selectedApp.licenseType}</Typography>
              <Typography>Documents: {selectedApp.documents?.join(', ')}</Typography>
              <RadioGroup value={decision} onChange={(e) => setDecision(e.target.value)}>
                <FormControlLabel value="Approved" control={<Radio />} label="Approve" />
                <FormControlLabel value="Rejected" control={<Radio />} label="Reject" />
              </RadioGroup>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReviewClose}>Cancel</Button>
          <Button onClick={submitDecision} disabled={!decision}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminDashboard;
