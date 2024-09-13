import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';

const EditProfile = () => {
  const [userData, setUserData] = useState({});
  const userId = localStorage.getItem('userId')?.trim();
  const token = localStorage.getItem('token')?.trim();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId && token) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`/api/users/profile/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log(response)
          setUserData({
            fullname: response.data.fullname || '',
            email: response.data.email || '',
            dob: response.data.dob ? response.data.dob.split('T')[0] : '',
            degree: response.data.degree || '',
            course: response.data.course || '',
            classes:response.data.classes||'',
            twelfthPercentage: response.data.twelfthPercentage || '',
            diplomaPercentage: response.data.diplomaPercentage || '',
            nationality: response.data.nationality || '',
            cgpa: response.data.cgpa || '',
            address: response.data.address || '',
            school12th: response.data.school12th || '',
            tenthPercentage: response.data.tenthPercentage || '',
            gapYear: response.data.gapYear || '',
            yearOfPassing: response.data.yearOfPassing || '',
            activeBacklogs: response.data.activeBacklogs || '',
            contactNumber: response.data.contactNumber || '',
            linkedin: response.data.linkedin || '',
            github: response.data.github || '',
            leetCode: response.data.leetCode || ''
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [userId, token]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`https://placement-cell-iczn.onrender.com/api/users/update-profile/${userId}`, userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Profile updated successfully!');
      navigate('/profile'); // Redirect to profile page
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Paper elevation={3} style={{ padding: '20px', borderRadius: '8px', width: '100%', maxWidth: '800px' }}>
        <Typography variant="h4" gutterBottom align="center" style={{ fontWeight: 'bold', marginBottom: '20px' }}>
          Edit Profile
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Full Name"
              fullWidth
              name="fullname"
              value={userData.fullname || ''}
              onChange={handleInputChange}
              style={{ marginBottom: '16px' }}
            />
            <TextField
              label="Email"
              fullWidth
              name="email"
              value={userData.email || ''}
              onChange={handleInputChange}
              style={{ marginBottom: '16px' }}
            />
            <TextField
              label="Date of Birth"
              fullWidth
              name="dob"
              type="date"
              value={userData.dob ? userData.dob.split('T')[0] : ''}
              onChange={handleInputChange}
              style={{ marginBottom: '16px' }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Degree"
              fullWidth
              name="degree"
              value={userData.degree || ''}
              onChange={handleInputChange}
              style={{ marginBottom: '16px' }}
            />
            <TextField
              label="Course"
              fullWidth
              name="course"
              value={userData.course || ''}
              onChange={handleInputChange}
              style={{ marginBottom: '16px' }}
            />
            <TextField
              label="Classes"
              fullWidth
              name="classes"
              value={userData.classes || ''}
              onChange={handleInputChange}
              style={{ marginBottom: '16px' }}
            />
            <TextField
              label="12th Percentage"
              fullWidth
              name="twelfthPercentage"
              type="number"
              value={userData.twelfthPercentage || ''}
              onChange={handleInputChange}
              style={{ marginBottom: '16px' }}
            />
            <TextField
              label="Diploma Percentage"
              fullWidth
              name="diplomaPercentage"
              type="number"
              value={userData.diplomaPercentage || ''}
              onChange={handleInputChange}
              style={{ marginBottom: '16px' }}
            />
            <TextField
              label="Nationality"
              fullWidth
              name="nationality"
              value={userData.nationality || ''}
              onChange={handleInputChange}
              style={{ marginBottom: '16px' }}
            />
            <TextField
              label="CGPA"
              fullWidth
              name="cgpa"
              type="number"
              value={userData.cgpa || ''}
              onChange={handleInputChange}
              style={{ marginBottom: '16px' }}
            />
            <TextField
              label="Address"
              fullWidth
              name="address"
              value={userData.address || ''}
              onChange={handleInputChange}
              style={{ marginBottom: '16px' }}
            />
            <TextField
              label="School (12th)"
              fullWidth
              name="school12th"
              value={userData.school12th || ''}
              onChange={handleInputChange}
              style={{ marginBottom: '16px' }}
            />
            <TextField
              label="10th Percentage"
              fullWidth
              name="tenthPercentage"
              type="number"
              value={userData.tenthPercentage || ''}
              onChange={handleInputChange}
              style={{ marginBottom: '16px' }}
            />
            <TextField
              label="Gap Year"
              fullWidth
              name="gapYear"
              type="number"
              value={userData.gapYear || ''}
              onChange={handleInputChange}
              style={{ marginBottom: '16px' }}
            />
            <TextField
              label="Year of Passing"
              fullWidth
              name="yearOfPassing"
              type="number"
              value={userData.yearOfPassing || ''}
              onChange={handleInputChange}
              style={{ marginBottom: '16px' }}
            />
            <TextField
              label="Active Backlogs"
              fullWidth
              name="activeBacklogs"
              type="number"
              value={userData.activeBacklogs || ''}
              onChange={handleInputChange}
              style={{ marginBottom: '16px' }}
            />
            <TextField
              label="Contact Number"
              fullWidth
              name="contactNumber"
              value={userData.contactNumber || ''}
              onChange={handleInputChange}
              style={{ marginBottom: '16px' }}
            />
            <TextField
              label="LinkedIn"
              fullWidth
              name="linkedin"
              value={userData.linkedin || ''}
              onChange={handleInputChange}
              style={{ marginBottom: '16px' }}
            />
            <TextField
              label="GitHub"
              fullWidth
              name="github"
              value={userData.github || ''}
              onChange={handleInputChange}
              style={{ marginBottom: '16px' }}
            />
            <TextField
              label="LeetCode"
              fullWidth
              name="leetCode"
              value={userData.leetCode || ''}
              onChange={handleInputChange}
              style={{ marginBottom: '16px' }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              style={{ marginTop: '20px' }}
              fullWidth
            >
              Apply Changes
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default EditProfile;
