import { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported
import logo from '../images/logo-pc.png';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: `2px solid ${theme.palette.grey[400]}`,
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.35),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(3),
  width: '50%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: 'transparent',
  borderRadius: theme.shape.borderRadius,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const LogoutButton = styled('button')(({ theme }) => ({
  backgroundColor: '#D32F2F', // Red background
  color: '#FFF', // White text
  border: 'none',
  padding: theme.spacing(1, 3),
  borderRadius: theme.shape.borderRadius,
  fontSize: '16px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#B71C1C', // Darker red on hover
  },
}));

const AdminNav = ({ currentVal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('jobs');
  const navigate = useNavigate();

  useEffect(() => {
    const savedSearchType = localStorage.getItem('searchType') || 'jobs';
    setSearchType(savedSearchType);
  }, []);

  useEffect(() => {
    if (currentVal === 'student') {
      axios.get('https://placement-cell-iczn.onrender.com/api/users/find')
        .then(response => {
          // Handle user data
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    } else if (currentVal === 'company') {
      axios.get('https://placement-cell-iczn.onrender.com/api/jobs')
        .then(response => {
          // Handle job data
        })
        .catch(error => {
          console.error('Error fetching jobs:', error);
        });
    }
  }, [currentVal]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const route = searchType === 'jobs' ? `/search?query=${encodeURIComponent(searchQuery)}` : `/admin/user-search?query=${encodeURIComponent(searchQuery)}`;
      navigate(route);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearchTypeChange = (event, newSearchType) => {
    if (newSearchType) {
      setSearchType(newSearchType);
      localStorage.setItem('searchType', newSearchType);
    }
  };

  const logOut = () => {
    localStorage.clear();
    navigate('/sign-in');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' sx={{ backgroundColor: '#FFF' }}>
        <Toolbar>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <img className='h-24 mx-2' src={logo} alt="logo" />
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: '#000' }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder={searchType === 'jobs' ? 'Search Jobs...' : 'Search Users...'}
                inputProps={{ 'aria-label': 'search' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </Search>
            <ToggleButtonGroup
              value={searchType}
              exclusive
              onChange={handleSearchTypeChange}
              sx={{ marginLeft: 2 }}
            >
              <ToggleButton
                value='jobs'
                sx={{
                  backgroundColor: searchType === 'jobs' ? '#FFA500' : '#FFF',
                  color: searchType === 'jobs' ? '#FFF' : '#000',
                  border: '1px solid #FFA500',
                }}
              >
                Jobs
              </ToggleButton>
              <ToggleButton
                value='users'
                sx={{
                  backgroundColor: searchType === 'users' ? '#FFA500' : '#FFF',
                  color: searchType === 'users' ? '#FFF' : '#000',
                  border: '1px solid #FFA500',
                }}
              >
                Users
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LogoutButton onClick={logOut}>Log Out</LogoutButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AdminNav;
