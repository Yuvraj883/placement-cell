import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Grid, Card, CardContent, CardMedia, CardActions, Button } from '@mui/material';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token')?.trim();

  useEffect(() => {
    axios.get(`https://placement-cell-iczn.onrender.com/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [userId]);

  return user ? (
    <div className="p-8 bg-gray-100 min-h-screen">
      <Grid container spacing={4}>
        {/* User Information Section */}
        <Grid item xs={12} md={8} lg={9}>
          <Typography variant="h4" gutterBottom className="font-bold text-gray-800">
            {user.fullname}
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            <strong>Date of Birth:</strong> {new Date(user.dob).toLocaleDateString()}
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            <strong>Course:</strong> {user.course}
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            <strong>Degree:</strong> {user.degree}
          </Typography>
        </Grid>

        {/* Applied Jobs Section */}
        <Grid item xs={12} md={8} lg={9}>
          <Typography variant="h5" gutterBottom className="font-bold text-gray-800">
            Applied Jobs
          </Typography>
          <Grid container spacing={2}>
            {user.appliedJobs.length > 0 ? (
              user.appliedJobs.map(job => (
                <Grid item xs={12} md={6} lg={4} key={job._id}>
                  <Card className="shadow-md">
                    {job.imageURL && (
                      <CardMedia
                        component="img"
                        height="140"
                        image={job.imageURL}
                        alt={job.jobTitle}
                      />
                    )}
                    <CardContent>
                      <Typography variant="h6" gutterBottom className="font-semibold text-gray-800">
                        {job.jobTitle}
                      </Typography>
                      <Typography variant="body1" color="textSecondary" className="mb-1">
                        <strong>Company:</strong> {job.companyName}
                      </Typography>
                      <Typography variant="body1" color="textSecondary" className="mb-1">
                        <strong>Location:</strong> {job.location}
                      </Typography>
                      <Typography variant="body1" color="textSecondary" className="mb-1">
                        <strong>Type:</strong> {job.type}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" className="mb-2">
                        {job.jobDescription}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <strong>CTC:</strong> {job.ctc ? `${job.ctc} lacs` : 'Not Specified'}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Link to = "job.ApplyURL">
                      <Button size="small" color="primary">View Details</Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="body1" color="textSecondary" align="center">
                No jobs applied yet.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  ) : (
    <div className="p-8 text-center text-gray-600">Loading...</div>
  );
};

export default UserProfile;
