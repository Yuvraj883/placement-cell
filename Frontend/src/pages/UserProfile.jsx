import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Grid, Avatar, Paper, Button } from '@mui/material';
import AdminNav from '../components/AdminNav';


const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [showMore, setShowMore] = useState(false); // State to toggle "Show More"
  const token = localStorage.getItem('token')?.trim();

  useEffect(() => {
    axios.get(`/api/users/profile/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [userId]);

  const handleToggleShowMore = () => {
    setShowMore(!showMore); // Toggle showMore state
  };

  return user ? (
    <>
      <AdminNav />
      <div className="container mx-auto p-5 w-[80%] shadow-md mt-5 rounded-md" style={{ backgroundColor: '#ffffff', color: '#333333', height: 'screen' }}>
        <Grid container spacing={3}>
          {/* Profile Information */}
          <Grid item xs={12} md={4} className="text-center">
            <Avatar
              sx={{ width: 150, height: 150, margin: '0 auto', border: '2px solid #333333' }}
              alt={user.fullname || 'Profile Picture'}
              src={user.photoURL || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
            />
            <Typography variant="h4" gutterBottom mt={2} style={{ color: '#333333', fontWeight: 'bold' }}>
              {user.fullname || 'Loading...'}
            </Typography>
          </Grid>

          {/* User Details */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, backgroundColor: '#ffffff' }}>
              <Typography variant="h5" gutterBottom style={{ color: '#333333', fontWeight: 'bold' }}>
                User Information
              </Typography>

              {/* Displaying basic details */}
              <Typography variant="body1" style={{ color: '#555555', marginBottom: '8px' }}>
                <strong>Email:</strong> {user.email || 'Loading...'}
              </Typography>
              <Typography variant="body1" style={{ color: '#555555', marginBottom: '8px' }}>
                <strong>Date of Birth:</strong> {user.dob ? new Date(user.dob).toLocaleDateString() : 'Loading...'}
              </Typography>
              <Typography variant="body1" style={{ color: '#555555', marginBottom: '8px' }}>
                <strong>Contact Number:</strong> {user.contactNumber || 'Loading...'}
              </Typography>
              <Typography variant="body1" style={{ color: '#555555', marginBottom: '8px' }}>
                <strong>Degree:</strong> {user.degree || 'Loading...'}
              </Typography>
              <Typography variant="body1" style={{ color: '#555555', marginBottom: '8px' }}>
                <strong>Course:</strong> {user.course || 'Loading...'}
              </Typography>
              <Typography variant="body1" style={{ color: '#555555', marginBottom: '8px' }}>
                <strong>Class:</strong> {user.classes || 'Loading...'}
              </Typography>
              <Typography variant="body1" style={{ color: '#555555', marginBottom: '8px' }}>
                <strong>CGPA:</strong> {user.cgpa || 'Loading...'}
              </Typography>

              {/* Conditionally rendering more details */}
              {showMore && (
                <>
                  <Typography variant="body1" style={{ color: '#555555', marginBottom: '8px' }}>
                    <strong>12th Percentage:</strong> {user.twelfthPercentage || 'Not provided'}
                  </Typography>
                  <Typography variant="body1" style={{ color: '#555555', marginBottom: '8px' }}>
                    <strong>10th Percentage:</strong> {user.tenthPercentage || 'Not provided'}
                  </Typography>
                  <Typography variant="body1" style={{ color: '#555555', marginBottom: '8px' }}>
                    <strong>Gap Year:</strong> {user.gapYear || 'No gap'}
                  </Typography>
                  <Typography variant="body1" style={{ color: '#555555', marginBottom: '8px' }}>
                    <strong>Year of Passing:</strong> {user.yearOfPassing || 'Loading...'}
                  </Typography>
                  <Typography variant="body1" style={{ color: '#555555', marginBottom: '8px' }}>
                    <strong>Nationality:</strong> {user.nationality || 'Loading...'}
                  </Typography>
                  <Typography variant="body1" style={{ color: '#555555', marginBottom: '8px' }}>
                    <strong>Address:</strong> {user.address || 'Loading...'}
                  </Typography>
                  <Typography variant="body1" style={{ color: '#555555', marginBottom: '8px' }}>
                    <strong>Active Backlogs:</strong> {user.activeBacklogs || 'None'}
                  </Typography>
                  
                  <Typography variant="body1" style={{ color: '#555555', marginBottom: '8px' }}>
                    <strong>Resume URL:</strong> <a href={user.resumeURL} target="_blank" rel="noopener noreferrer">{user.resumeURL || 'Not provided'}</a>
                  </Typography>

                  {/* Social Links */}
                  <Typography variant="h6" gutterBottom style={{ color: '#333333', fontWeight: 'bold', marginTop: '16px' }}>
                    Social Profiles
                  </Typography>
                  <Typography variant="body1" style={{ color: '#555555', marginBottom: '8px' }}>
                    <strong>LinkedIn:</strong> <a href={user.linkedin} target="_blank" rel="noopener noreferrer">{user.linkedin || 'Not provided'}</a>
                  </Typography>
                  <Typography variant="body1" style={{ color: '#555555', marginBottom: '8px' }}>
                    <strong>GitHub:</strong> <a href={user.github} target="_blank" rel="noopener noreferrer">{user.github || 'Not provided'}</a>
                  </Typography>
                  <Typography variant="body1" style={{ color: '#555555', marginBottom: '8px' }}>
                    <strong>LeetCode:</strong> <a href={user.leetCode} target="_blank" rel="noopener noreferrer">{user.leetCode || 'Not provided'}</a>
                  </Typography>
                </>
              )}

              {/* Show More / Show Less Button */}
              <Button variant="outlined" color="primary" onClick={handleToggleShowMore} style={{ marginTop: '16px' }}>
                {showMore ? 'Show Less' : 'Show More'}
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {/* Applied Jobs Section */}
        <div className="mt-8">
          <Typography variant="h5" gutterBottom style={{ color: '#333333', fontWeight: 'bold', padding: '6' }}>
            Applied Jobs
          </Typography>
          <Grid container spacing={2}>
            {user.appliedJobs && user.appliedJobs.length > 0 ? (
              user.appliedJobs.map((job) => (
                <Grid item xs={12} md={12} key={job._id}>
                  <Paper
                    elevation={2}
                    sx={{
                      padding: 2,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      background: '#e0e0e0',
                      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                      color: '#333333'
                    }}
                  >
                    {job.imageURL ? (
                      <img
                        src={job.imageURL}
                        alt={job.jobTitle}
                        style={{ width: 150, height: 100, objectFit: 'cover', borderRadius: 4 }}
                      />
                    ) : (
                      <div style={{ width: 150, height: 100, backgroundColor: '#d0d0d0', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="body2" color="textSecondary">No Image Available</Typography>
                      </div>
                    )}
                    <div style={{ flex: 1 }}>
                      <Typography variant="h6" component="div" gutterBottom style={{ color: '#333333', fontWeight: 'bold' }}>
                        {job.jobTitle}
                      </Typography>
                      <Typography variant="body1" style={{ color: '#555555' }}>
                        <strong>Company:</strong> {job.companyName}
                      </Typography>
                      <Typography variant="body1" style={{ color: '#555555' }}>
                      <strong>Location:</strong> {job.location}
                      </Typography>
                      <Typography variant="body1" style={{ color: '#555555' }}>
                        <strong>Type:</strong> {job.type}
                      </Typography>
                      <Typography variant="body2" style={{ color: '#555555', marginTop: '8px' }}>
                        {job.jobDescription}
                      </Typography>
                      <Typography variant="body2" style={{ color: '#555555' }}>
                        <strong>CTC:</strong> {job.ctc ? `${job.ctc} lacs` : 'Not Specified'}
                      </Typography>
                    </div>
                  </Paper>
                </Grid>
              ))
            ) : (
              <Typography variant="body1" style={{ color: '#555555', textAlign: 'center' }}>
                No jobs applied yet.
              </Typography>
            )}
          </Grid>
        </div>
      </div>
    </>
  ) : (
    <div className="p-8 text-center text-gray-600">Loading...</div>
  );
};

export default UserProfile;

