// EditProfile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Grid } from '@mui/material';
import axios from 'axios';

const EditProfile = () => {
  const [userData, setUserData] = useState({});
  const userId = localStorage.getItem('userId')?.trim();
  const token = localStorage.getItem('token')?.trim();
  const navigate = useNavigate();

 // useEffect(() => {
 //   if (userId && token) {
 //     const fetchUserData = async () => {
 //       try {
 //         const response = await axios.get(`/api/users/profile/${userId}`, {
 //           headers: { Authorization: `Bearer ${token}` }
 //         });
 //         setUserData(response.data);
 //       } catch (error) {
 //         console.error('Error fetching user data:', error);
 //       }
 //     };
//
 //     fetchUserData();
 //   }
 // }, [userId, token]);
 useEffect(() => {
    if (userId && token) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`/api/users/profile/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
  
          // Ensure all fields are captured in the state
          setUserData({
            fullname: response.data.fullname || '',
            email: response.data.email || '',
            dob: response.data.dob ? response.data.dob.split('T')[0] : '',
            degree: response.data.degree || '',
            course: response.data.course || '',
            twelfthPercentage: response.data.twelfthPercentage ,
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
      await axios.put(`/api/users/update-profile/${userId}`, userData, {
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
    <div className="container mx-auto p-5">
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <TextField
            label="Full Name"
            fullWidth
            name="fullname"
            value={userData.fullname || ''}
            onChange={handleInputChange}
            className="mb-3"
          />
          <TextField
            label="Email"
            fullWidth
            name="email"
            value={userData.email || ''}
            onChange={handleInputChange}
            className="mb-3"
          />
          <TextField
            label="Date of Birth"
            fullWidth
            name="dob"
            type="date"
            value={userData.dob ? userData.dob.split('T')[0] : ''}
            onChange={handleInputChange}
            className="mb-3"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Degree"
            fullWidth
            name="degree"
            value={userData.degree || ''}
            onChange={handleInputChange}
            className="mb-3"
          />
          <TextField
            label="Course"
            fullWidth
            name="course"
            value={userData.course || ''}
            onChange={handleInputChange}
            className="mb-3"
          />
          <TextField
            label="12th Percentage"
            fullWidth
            name="twelfthPercentage"
            type="number"
            value={userData.twelfthPercentage }
            onChange={handleInputChange}
            className="mb-3"
          />
          <TextField
            label="Diploma Percentage"
            fullWidth
            name="diplomaPercentage"
            type="number"
            value={userData.diplomaPercentage || ''}
            onChange={handleInputChange}
            className="mb-3"
          />
          <TextField
            label="Nationality"
            fullWidth
            name="nationality"
            value={userData.nationality || ''}
            onChange={handleInputChange}
            className="mb-3"
          />
          <TextField
            label="CGPA"
            fullWidth
            name="cgpa"
            type="number"
            value={userData.cgpa || ''}
            onChange={handleInputChange}
            className="mb-3"
          />
          <TextField
            label="Address"
            fullWidth
            name="address"
            value={userData.address || ''}
            onChange={handleInputChange}
            className="mb-3"
          />
          <TextField
            label="School (12th)"
            fullWidth
            name="school12th"
            value={userData.school12th || ''}
            onChange={handleInputChange}
            className="mb-3"
          />
          <TextField
            label="10th Percentage"
            fullWidth
            name="tenthPercentage"
            type="number"
            value={userData.tenthPercentage || ''}
            onChange={handleInputChange}
            className="mb-3"
          />
          <TextField
            label="Gap Year"
            fullWidth
            name="gapYear"
            type="number"
            value={userData.gapYear || ''}
            onChange={handleInputChange}
            className="mb-3"
          />
          <TextField
            label="Year of Passing"
            fullWidth
            name="yearOfPassing"
            type="number"
            value={userData.yearOfPassing || ''}
            onChange={handleInputChange}
            className="mb-3"
          />
          <TextField
            label="Active Backlogs"
            fullWidth
            name="activeBacklogs"
            type="number"
            value={userData.activeBacklogs || ''}
            onChange={handleInputChange}
            className="mb-3"
          />
          <TextField
            label="Contact Number"
            fullWidth
            name="contactNumber"
            value={userData.contactNumber || ''}
            onChange={handleInputChange}
            className="mb-3"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className="mt-5"
          >
            Apply Changes
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditProfile;