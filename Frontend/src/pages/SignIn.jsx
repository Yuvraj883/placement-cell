import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Box,
  Typography,
  Container,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import logo from '../images/logo-pc.png';
import image1 from '../images/image1.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('https://placement-cell-msit-api.vercel.app/api/users/sign-in', { email, password });
      const { _id, token, isAdmin } = data;

      if (_id) {
        localStorage.setItem('userId', _id);
        localStorage.setItem('token', token);
        localStorage.setItem('role', isAdmin ? 'admin' : 'user');
        toast.success('Sign In Successful');
        if (isAdmin) {
          navigate('/admin');
        } else {
          navigate('/home');
        }
      } else {
        console.error('User ID is missing in the response');
        toast.error('Sign In failed. Please try again.');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
      toast.error(error.response?.data?.message || 'An error occurred'); // Show error toast
    }
  };

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${image1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        opacity: 0.3,
        zIndex: -2,
      }} />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        zIndex: -1,
      }} />
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'rgba(34, 34, 34)', // Dark background
            padding: '40px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
            color: '#f5f5f5',
            backdropFilter: 'blur(10px)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Avatar style={{ margin: '8px', backgroundColor: '#BB86FC' }}> {/* Purple color */}
            <LockOutlinedIcon />
          </Avatar>
          <img src={logo} className='h-20' alt="Pc logo" style={{ marginBottom: '20px' }} />
          <Typography component='h1' variant='h5' style={{ color: '#BB86FC', fontWeight: 'bold', transition: 'color 0.3s' }}> {/* Purple color */}
            Sign In
          </Typography>
          <form style={{ width: '100%', marginTop: '20px' }} onSubmit={handleSignIn}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginBottom: '16px', backgroundColor: '#444', color: '#f5f5f5' }}
              InputLabelProps={{ style: { color: '#f5f5f5' } }}
              InputProps={{ style: { color: '#f5f5f5' } }}
              onFocus={(e) => e.target.style.backgroundColor = '#555'}
              onBlur={(e) => e.target.style.backgroundColor = '#444'}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: '16px', backgroundColor: '#444', color: '#f5f5f5' }}
              InputLabelProps={{ style: { color: '#f5f5f5' } }}
              InputProps={{ style: { color: '#f5f5f5' } }}
              onFocus={(e) => e.target.style.backgroundColor = '#555'}
              onBlur={(e) => e.target.style.backgroundColor = '#444'}
            />
            <Button
              sx={{ background: '#BB86FC', '&:hover': { background: '#9F62D8' }, '&:disabled': { opacity: 0.8, color: '#f5f5f5' } }} // Purple color
              type='submit'
              fullWidth
              variant='contained'
              style={{ margin: '16px 0', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)' }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              disabled={!email || !password}
            >
              Sign In
            </Button>
            {error && (
              <Typography variant='body2' color='error' style={{ marginTop: '16px' }}>
                {error}
              </Typography>
            )}
          </form>
          <Box mt={2}>
            <Typography variant='body2' component='div' color='textSecondary' align='center'>
              <div color='inherit' href='/sign-up' style={{ color: '#BB86FC', textDecoration: 'none' }}> {/* Purple color */}
                Don't have an account?
              </div>
            </Typography>
            <Typography variant='body2' align='center' style={{ marginTop: '16px' }}>
              <Link
                href='/sign-up'
                style={{
                  color: '#BB86FC', // Purple color
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  display: 'inline-block',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.4)';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.background = '#9F62D8';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.background = 'grey';
                }}
              >
                Sign Up
              </Link>
            </Typography>
          </Box>
        </div>
      </Container>
      <ToastContainer position='bottom-center' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default SignIn;
