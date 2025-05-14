import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Divider, 
  Alert,
  InputAdornment,
  IconButton,
  Grid,
  Paper,
  Container,
  MenuItem
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AuthIllustration from '../../assets/pic2.jpg';
import Logo from '../../assets/pic3.png';

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    businessType: '',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const businessTypes = [
    { value: 'street_vendor', label: 'Street Vendor' },
    { value: 'small_shop', label: 'Small Shop' },
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'bakery', label: 'Bakery' },
    { value: 'service_provider', label: 'Service Provider' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (await register(formData)) {
        navigate('/');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during registration');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', py: 4 }}>
      <Paper elevation={6} sx={{ width: '100%', overflow: 'hidden' }}>
        <Grid container>
          {/* Illustration Side */}
          <Grid item xs={12} md={6} sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)',
            p: 4,
            minHeight: 500
          }}>
            <Box sx={{ textAlign: 'center', color: 'white' }}>
              <img 
                src={AuthIllustration} 
                alt="Authentication illustration" 
                style={{ maxWidth: '100%', height: 'auto', maxHeight: 300 }}
              />
              <Typography variant="h5" sx={{ mt: 3, fontWeight: 600 }}>
                Join Vendor Approval Hub
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Streamline your vendor licensing process
              </Typography>
            </Box>
          </Grid>
          
          {/* Form Side */}
          <Grid item xs={12} md={6} sx={{ p: { xs: 3, sm: 5 } }}>
            <Box sx={{ maxWidth: 400, mx: 'auto' }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <img src={Logo} alt="Logo" style={{ height: 50, marginBottom: 16 }} />
                <Typography variant="h5" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
                  Create Account
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Get started with your vendor profile
                </Typography>
              </Box>
              
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}
              
              <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Full Name"
                  variant="outlined"
                  margin="normal"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  sx={{ mb: 2 }}
                />
                
                <TextField
                  fullWidth
                  label="Email Address"
                  variant="outlined"
                  margin="normal"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  sx={{ mb: 2 }}
                />
                
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  margin="normal"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  sx={{ mb: 2 }}
                />
                
                <TextField
                  fullWidth
                  label="Phone Number"
                  variant="outlined"
                  margin="normal"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  sx={{ mb: 2 }}
                />
                
                <TextField
                  select
                  fullWidth
                  label="Business Type"
                  variant="outlined"
                  margin="normal"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  required
                  sx={{ mb: 3 }}
                >
                  {businessTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  type="submit"
                  sx={{ py: 1.5, mb: 2 }}
                >
                  Create Account
                </Button>
                
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 2 }}>
                  By registering, you agree to our Terms of Service and Privacy Policy
                </Typography>
                
                <Divider sx={{ my: 3 }} />
                
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{ textDecoration: 'none', fontWeight: 600 }}>
                      Sign in
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default RegisterForm;