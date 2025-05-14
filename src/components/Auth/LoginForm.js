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
  Container
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AuthIllustration from '../../assets/pic2.jpg';
import Logo from '../../assets/pic3.png';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (await login(email, password)) {
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
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
                Vendor Approval Hub
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
                  Welcome Back
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sign in to access your dashboard
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
                  label="Email Address"
                  variant="outlined"
                  margin="normal"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  sx={{ mb: 2 }}
                />
                
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  margin="normal"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  sx={{ mb: 1 }}
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                  <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                    <Typography variant="body2" color="primary">
                      Forgot Password?
                    </Typography>
                  </Link>
                </Box>
                
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  type="submit"
                  sx={{ py: 1.5, mt: 1, mb: 2 }}
                >
                  Sign In
                </Button>
                
                <Divider sx={{ my: 3 }}>OR</Divider>
                
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Don't have an account?{' '}
                    <Link to="/register" style={{ textDecoration: 'none', fontWeight: 600 }}>
                      Create account
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

export default LoginForm;