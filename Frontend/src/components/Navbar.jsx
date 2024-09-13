//import React, { useState, useEffect } from 'react';
//import { Link, useNavigate } from 'react-router-dom';
//import { styled, alpha } from '@mui/material/styles';
//import AppBar from '@mui/material/AppBar';
//import Box from '@mui/material/Box';
//import Toolbar from '@mui/material/Toolbar';
//import IconButton from '@mui/material/IconButton';
//import Typography from '@mui/material/Typography';
//import InputBase from '@mui/material/InputBase';
//import Badge from '@mui/material/Badge';
//import MenuItem from '@mui/material/MenuItem';
//import Menu from '@mui/material/Menu';
//import AccountCircle from '@mui/icons-material/AccountCircle';
//import MailIcon from '@mui/icons-material/Mail';
//import NotificationsIcon from '@mui/icons-material/Notifications';
//import MoreIcon from '@mui/icons-material/MoreVert';
//import SearchIcon from '@mui/icons-material/Search';
//import axios from 'axios';
//import io from 'socket.io-client';
//import logo from '../images/logo-pc.png';
//
//const Search = styled('div')(({ theme }) => ({
//  position: 'relative',
//  borderRadius: theme.shape.borderRadius,
//  backgroundColor: alpha(theme.palette.common.white, 0.15),
//  '&:hover': {
//    backgroundColor: alpha(theme.palette.common.white, 0.25),
//  },
//  width: '100%',
//  margin: '0 auto',
//  [theme.breakpoints.up('sm')]: {
//    width: '60%',
//    marginLeft: '10%',
//  },
//}));
//
//const SearchIconWrapper = styled('div')(({ theme }) => ({
//  padding: theme.spacing(0, 2),
//  height: '100%',
//  position: 'absolute',
//  pointerEvents: 'none',
//  display: 'flex',
//  alignItems: 'center',
//  justifyContent: 'center',
//}));
//
//const StyledInputBase = styled(InputBase)(({ theme }) => ({
//  color: 'inherit',
//  '& .MuiInputBase-input': {
//    padding: theme.spacing(1, 1, 1, 0),
//    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//    transition: theme.transitions.create('width'),
//    width: '100%',
//    color: '#D1D5DB', // Ensure text color is visible
//    [theme.breakpoints.up('sm')]: {
//      width: '100%',
//    },
//  },
//}));
//
//const Navbar = () => {
//  const [anchorEl, setAnchorEl] = useState(null);
//  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
//  const [searchQuery, setSearchQuery] = useState('');
//  const [newJobsCount, setNewJobsCount] = useState(0);
//  const [notifications, setNotifications] = useState([]);
//  const [notificationOpen, setNotificationOpen] = useState(false);
//  const [clickCount, setClickCount] = useState(0);
//  const [lastNotificationClickTime, setLastNotificationClickTime] = useState(() => {
//    const storedTime = localStorage.getItem('lastNotificationClickTime');
//    return storedTime ? parseInt(storedTime, 10) : null;
//  });
//  const navigate = useNavigate();
//  const userId = localStorage.getItem('userId')?.trim();
//
//  useEffect(() => {
//    const fetchStoredNotifications = async () => {
//      try {
//        const response = await axios.get(`/api/notifications/${userId}`);
//        const unreadNotifications = response.data.filter(notification => !notification.isRead);
//        setNotifications(response.data);
//        setNewJobsCount(unreadNotifications.length);
//      } catch (error) {
//        console.error('Error fetching notifications:', error);
//      }
//    };
//
//    fetchStoredNotifications();
//
//    const socket = io('https://placement-cell-msit-api.vercel.app/');
//
//    socket.on('connect', () => {
//      console.log('Socket connected:', socket.id);
//    });
//
//    socket.on('disconnect', () => {
//      console.log('Socket disconnected');
//    });
//
//    socket.on('newJob', (job) => {
//      console.log('New job received:', job);
//      const newNotification = {
//        userId,
//        jobId: job._id,
//        company: job.companyName,
//        title: job.jobTitle,
//        message: `A new job "${job.jobTitle}" has been posted by ${job.companyName}.`,
//        createdAt: new Date(),
//      };
//      setNotifications((prevNotifications) => [...prevNotifications, { company: job.companyName, title: job.jobTitle }]);
//      setNewJobsCount((prevCount) => prevCount + 1);
//    });
//    socket.on('notification', (notification) => {
//      setNotifications(prevNotifications => [...prevNotifications, notification]);
//      setNewJobsCount(prevCount => prevCount + 1);
//    });
//
//    return () => {
//      socket.disconnect();
//    };
//  }, []);
//
//  const handleNotificationClick = () => {
//    setNotificationOpen(!notificationOpen);
//    setClickCount(prevCount => prevCount + 1);
//  };
//
//  const handleMarkAllAsRead = async () => {
//    try {
//      await axios.delete(`/api/notifications/${userId}`);
//      setNotifications([]);
//      setNewJobsCount(0);
//    } catch (error) {
//      console.error('Error marking notifications as read and deleting:', error);
//    }
//  };
//
//  const handleSearchChange = (event) => {
//    setSearchQuery(event.target.value);
//  };
//
//  const handleSearchSubmit = (event) => {
//    if (event.key === 'Enter') {
//      navigate(`/search?query=${searchQuery}`);
//    }
//  };
//
//  const handleProfileMenuOpen = (event) => {
//    setAnchorEl(event.currentTarget);
//  };
//
//  const handleMenuClose = () => {
//    setAnchorEl(null);
//    setMobileMoreAnchorEl(null);
//  };
//
//  const logOut = () => {
//    localStorage.clear();
//    navigate('/sign-in');
//  };
//
//  const isMenuOpen = Boolean(anchorEl);
//  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
//
//  const menuId = 'primary-search-account-menu';
//  const renderMenu = (
//    <Menu
//      anchorEl={anchorEl}
//      anchorOrigin={{
//        vertical: 'top',
//        horizontal: 'right',
//      }}
//      id={menuId}
//      keepMounted
//      transformOrigin={{
//        vertical: 'top',
//        horizontal: 'right',
//      }}
//      open={isMenuOpen}
//      onClose={handleMenuClose}
//    >
//      <MenuItem onClick={() => { navigate('/home/user-profile'); handleMenuClose(); }}>Profile</MenuItem>
//      <MenuItem onClick={logOut}>Log Out</MenuItem>
//    </Menu>
//  );
//
//  const mobileMenuId = 'primary-search-account-menu-mobile';
//  const renderMobileMenu = (
//    <Menu
//      anchorEl={mobileMoreAnchorEl}
//      anchorOrigin={{
//        vertical: 'top',
//        horizontal: 'right',
//      }}
//      id={mobileMenuId}
//      keepMounted
//      transformOrigin={{
//        vertical: 'top',
//        horizontal: 'right',
//      }}
//      open={isMobileMenuOpen}
//      onClose={handleMenuClose}
//    >
//      <MenuItem>
//        <IconButton size='large' aria-label='show 4 new mails' color='inherit'>
//          <Badge badgeContent={0} color='error'>
//            <MailIcon />
//          </Badge>
//        </IconButton>
//        <p>Messages</p>
//      </MenuItem>
//      <MenuItem>
//        <IconButton
//          size='large'
//          aria-label={`show ${newJobsCount} new notifications`}
//          color='inherit'
//          onClick={handleNotificationClick}
//        >
//          <Badge badgeContent={newJobsCount} color='error'>
//            <NotificationsIcon />
//          </Badge>
//        </IconButton>
//        <p>Notifications</p>
//      </MenuItem>
//      <MenuItem onClick={() => { navigate('/home/user-profile'); handleMenuClose(); }}>
//        <IconButton
//          size='large'
//          aria-label='account of current user'
//          aria-controls={menuId}
//          aria-haspopup='true'
//          color='inherit'
//        >
//          <AccountCircle />
//        </IconButton>
//        <p>Profile</p>
//      </MenuItem>
//      {/* Add logout option for small screens */}
//      <MenuItem onClick={logOut}>
//        <IconButton
//          size='large'
//          aria-label='logout'
//          aria-controls={mobileMenuId}
//          aria-haspopup='true'
//          color='inherit'
//        >
//          <AccountCircle />
//        </IconButton>
//        <p>Logout</p>
//      </MenuItem>
//    </Menu>
//  );
//
//  return (
//    <Box sx={{ flexGrow: 1 }}>
//      <AppBar position='static' sx={{ backgroundColor: '#1E2A38' }}>
//        <Toolbar>
//          <Link to="/home">
//            <img
//              className='h-20 -mx-1'
//              src={logo}
//              alt="msit-logo"
//            />
//          </Link>
//          <Search>
//            <SearchIconWrapper>
//              <SearchIcon sx={{ color: '#D1D5DB' }} />
//            </SearchIconWrapper>
//            <StyledInputBase
//              placeholder='Search jobs...'
//              value={searchQuery}
//              onChange={handleSearchChange}
//              onKeyDown={handleSearchSubmit}
//              inputProps={{ 'aria-label': 'search' }}
//              sx={{ color: '#D1D5DB' }}
//            />
//          </Search>
//          <Box sx={{ flexGrow: 1 }} />
//          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
//            <IconButton size='large' aria-label='show 4 new mails' color='inherit'>
//              <Badge badgeContent={0} color='error'>
//                {/* <MailIcon sx={{ color: '#D1D5DB' }} /> */}
//              </Badge>
//            </IconButton>
//            <IconButton
//              size='large'
//              aria-label={`show ${newJobsCount} new notifications`}
//              color='inherit'
//              onClick={handleNotificationClick}
//            >
//              <Badge badgeContent={newJobsCount} color='error'>
//                <NotificationsIcon sx={{ color: '#D1D5DB' }} />
//              </Badge>
//            </IconButton>
//            <IconButton
//              size='large'
//              edge='end'
//              aria-label='account of current user'
//              aria-controls={menuId}
//              aria-haspopup='true'
//              onClick={handleProfileMenuOpen}
//              color='inherit'
//            >
//              <AccountCircle sx={{ color: '#D1D5DB' }} />
//            </IconButton>
//          </Box>
//          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
//            <IconButton
//              size='large'
//              aria-label='show more'
//              aria-controls={mobileMenuId}
//              aria-haspopup='true'
//              onClick={(event) => setMobileMoreAnchorEl(event.currentTarget)}
//              color='inherit'
//            >
//              <MoreIcon sx={{ color: '#D1D5DB' }} />
//            </IconButton>
//          </Box>
//        </Toolbar>
//      </AppBar>
//      {renderMobileMenu}
//      {renderMenu}
//      {notificationOpen && (
//        <Box
//          sx={{
//            position: 'absolute',
//            top: '60px',
//            right: '20px',
//            width: '300px',
//            backgroundColor: '#1E2A38',
//            color: '#D1D5DB',
//            borderRadius: '8px',
//            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//            zIndex: 1000,
//            p: 2,
//          }}
//        >
//          {notifications.length > 0 ? (
//            <>
//              {notifications.map((notification, index) => (
//                <Box key={index} sx={{ mb: 2 }}>
//                  <Typography variant='body2' color='#D1D5DB'>
//                    {notification.message}
//                  </Typography>
//                  <Typography variant='caption' color='#9CA3AF'>
//                    {new Date(notification.createdAt).toLocaleString()}
//                  </Typography>
//                </Box>
//              ))}
//              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
//                <button
//                  onClick={handleMarkAllAsRead}
//                  style={{
//                    backgroundColor: '#D1D5DB',
//                    color: '#1E2A38',
//                    padding: '6px 12px',
//                    borderRadius: '4px',
//                    border: 'none',
//                    cursor: 'pointer',
//                  }}
//                >
//                  Mark All as Read
//                </button>
//              </Box>
//            </>
//          ) : (
//            <Typography variant='body2' color='#9CA3AF'>
//              No notifications.
//            </Typography>
//          )}
//        </Box>
//      )}
//    </Box>
//  );
//};
//
//export default Navbar;
//
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import Badge from '@mui/material/Badge'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MoreIcon from '@mui/icons-material/MoreVert'
import SearchIcon from '@mui/icons-material/Search'
import axios from 'axios'
import io from 'socket.io-client'
import logo from '../images/logo-pc.png'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: '100%',
  margin: '0 auto',
  [theme.breakpoints.up('sm')]: {
    width: '60%',
    marginLeft: '10%',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    color: '#D1D5DB', // Ensure text color is visible
    [theme.breakpoints.up('sm')]: {
      width: '100%',
    },
  },
}))

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [newJobsCount, setNewJobsCount] = useState(0)
  const [notifications, setNotifications] = useState([])
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [lastNotificationClickTime, setLastNotificationClickTime] = useState(
    () => {
      const storedTime = localStorage.getItem('lastNotificationClickTime')
      return storedTime ? parseInt(storedTime, 10) : null
    }
  )
  const navigate = useNavigate()
  const userId = localStorage.getItem('userId')?.trim()

  useEffect(() => {
    const fetchStoredNotifications = async () => {
      try {
        const response = await axios.get(`/api/notifications/${userId}`)
        const unreadNotifications = response.data.filter(
          (notification) => !notification.isRead
        )
        setNotifications(response.data)
        setNewJobsCount(unreadNotifications.length)
      } catch (error) {
        console.error('Error fetching notifications:', error)
      }
    }

    fetchStoredNotifications()

    const socket = io('https://placement-cell-msit-api.vercel.app/')

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id)
    })

    socket.on('disconnect', () => {
      console.log('Socket disconnected')
    })

    socket.on('newJob', (job) => {
      console.log('New job received:', job)
      const newNotification = {
        userId,
        jobId: job._id,
        company: job.companyName,
        title: job.jobTitle,
        message: `A new job "${job.jobTitle}" has been posted by ${job.companyName}.`,
        createdAt: new Date(),
      }
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { company: job.companyName, title: job.jobTitle },
      ])
      setNewJobsCount((prevCount) => prevCount + 1)
    })
    socket.on('notification', (notification) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        notification,
      ])
      setNewJobsCount((prevCount) => prevCount + 1)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const handleNotificationClick = () => {
    setNotificationOpen(!notificationOpen)
    setClickCount((prevCount) => prevCount + 1)
  }

  const handleMarkAllAsRead = async () => {
    try {
      await axios.delete(`/api/notifications/${userId}`)
      setNotifications([])
      setNewJobsCount(0)
    } catch (error) {
      console.error('Error marking notifications as read and deleting:', error)
    }
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const handleSearchSubmit = (event) => {
    if (event.key === 'Enter') {
      navigate(`/search?query=${searchQuery}`)
    }
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setMobileMoreAnchorEl(null)
  }

  const logOut = () => {
    localStorage.clear()
    navigate('/sign-in')
  }

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          navigate('/home/user-profile')
          handleMenuClose()
        }}
      >
        Profile
      </MenuItem>
      <MenuItem onClick={logOut}>Log Out</MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <IconButton size='large' aria-label='show 4 new mails' color='inherit'>
          <Badge badgeContent={0} color='error'>
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size='large'
          aria-label={`show ${newJobsCount} new notifications`}
          color='inherit'
          onClick={handleNotificationClick}
        >
          <Badge badgeContent={newJobsCount} color='error'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          navigate('/home/user-profile')
          handleMenuClose()
        }}
      >
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls={menuId}
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      {/* Add logout option for small screens */}
      <MenuItem onClick={logOut}>
        <IconButton
          size='large'
          aria-label='logout'
          aria-controls={mobileMenuId}
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' sx={{ backgroundColor: '#1E2A38' }}>
        <Toolbar>
          <Link to='/home'>
            <img className='h-20 -mx-1' src={logo} alt='msit-logo' />
          </Link>
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: '#D1D5DB' }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder='Search jobs...'
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchSubmit}
              inputProps={{ 'aria-label': 'search' }}
              sx={{ color: '#D1D5DB' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size='large'
              aria-label='show 4 new mails'
              color='inherit'
            >
              <Badge badgeContent={0} color='error'>
                {/* <MailIcon sx={{ color: '#D1D5DB' }} /> */}
              </Badge>
            </IconButton>
            <IconButton
              size='large'
              aria-label={`show ${newJobsCount} new notifications`}
              color='inherit'
              onClick={handleNotificationClick}
            >
              <Badge badgeContent={newJobsCount} color='error'>
                <NotificationsIcon sx={{ color: '#D1D5DB' }} />
              </Badge>
            </IconButton>
            <IconButton
              size='large'
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'
            >
              <AccountCircle sx={{ color: '#D1D5DB' }} />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={(event) => setMobileMoreAnchorEl(event.currentTarget)}
              color='inherit'
            >
              <MoreIcon sx={{ color: '#D1D5DB' }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {notificationOpen && (
        <Box
          sx={{
            position: 'absolute',
            top: '60px',
            right: '20px',
            width: '300px',
            backgroundColor: '#1E2A38',
            color: '#D1D5DB',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            p: 2,
            maxHeight: '250px',
            overflowY: 'scroll',
          }}
        >
          {notifications.length > 0 ? (
            <>
              {notifications.map((notification, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant='body2' color='#D1D5DB'>
                    {notification.message}
                  </Typography>
                  <Typography variant='caption' color='#9CA3AF'>
                    {new Date(notification.createdAt).toLocaleString()}
                  </Typography>
                </Box>
              ))}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <button
                  onClick={handleMarkAllAsRead}
                  style={{
                    backgroundColor: '#D1D5DB',
                    color: '#1E2A38',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Mark All as Read
                </button>
              </Box>
            </>
          ) : (
            <Typography variant='body2' color='#9CA3AF'>
              No notifications.
            </Typography>
          )}
        </Box>
      )}
    </Box>
  )
}

export default Navbar
