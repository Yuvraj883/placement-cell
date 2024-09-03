import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import AdminPage from './pages/AdminPage';
import AddJob from './pages/AddJob';
import SearchJobs from './pages/SearchJobs';
import UserProfile from './pages/UserProfile';
import JobDetails from './pages/JobDetails';
import SearchUsers from './components/SearchUsers';
import { Navigate } from 'react-router-dom';
import EditProfile from './pages/EditProfile';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (token && userId) {
          const response = await axios.get(`https://placement-cell-iczn.onrender.com/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });

          if (response.status === 200) {
            setIsAuthenticated(true);
            const userRole = response.data.isAdmin ? 'admin' : 'user';
            setRole(userRole);

            // Redirect based on role immediately
            if (userRole === 'admin') {
              if (['/', '/sign-in', '/sign-up'].includes(location.pathname)) {
                navigate('/admin');
              }
            } else {
              if (['/', '/sign-in', '/sign-up'].includes(location.pathname)) {
                navigate('/home');
              }
            }
          } else {
            setIsAuthenticated(false);
            setRole(null);
            if (!['/', '/sign-in', '/sign-up'].includes(location.pathname)) {
              navigate('/sign-in');
            }
          }
        } else {
          setIsAuthenticated(false);
          setRole(null);
          if (!['/', '/sign-in', '/sign-up'].includes(location.pathname)) {
            navigate('/sign-in');
          }
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        setIsAuthenticated(false);
        setRole(null);
        navigate('/sign-in');
      }
    };

    checkAuth();
  }, [navigate, location.pathname]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className=' min-h-screen'>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route path="/home" element={role === 'user' ? <Home /> : <Navigate to="/" />} />
        <Route path="/home/user-profile" element={role === 'user' ? <Profile /> : <Navigate to="/" />} />
        <Route path="/profile" element={role === 'user' ? <Profile /> : <Navigate to="/" />} />
        <Route path="/edit-profile" element={role === 'user' ? <EditProfile /> : <Navigate to="/" />} />

        <Route path="/user-profile/:userId" element={role === 'admin' ? <UserProfile /> : <Navigate to="/" />} />
        <Route path="/job/:jobId" element={role === 'admin' ? <JobDetails /> : <Navigate to="/" />} />
        <Route path="/admin" element={role === 'admin' ? <AdminPage /> : <Navigate to="/" />} />
        <Route path="/admin/post-job" element={role === 'admin' ? <AddJob /> : <Navigate to="/" />} />
        <Route path="/admin/user-search" element={role === 'admin' ? <SearchUsers /> : <Navigate to="/" />} />

        <Route path="/search" element={<SearchJobs />} />

        <Route path="*" element={role === 'admin' ? <AdminPage /> : <Home />} />
      </Routes>
    </div>
  );
}

export default App;
