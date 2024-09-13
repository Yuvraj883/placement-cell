//import React, { useEffect, useState } from 'react';
//import { useParams } from 'react-router-dom';
//import axios from 'axios';
//import { Typography, Grid } from '@mui/material';
//import AppliedUserCard from '../components/AppliedUserCard.jsx';
//import AdminNav from '../components/AdminNav.jsx';
//
//const JobDetails = () => {
//  const { jobId } = useParams();
//  const [job, setJob] = useState(null);
//
//  useEffect(() => {
//    axios.get(`https://placement-cell-msit-api.vercel.app/api/jobs/${jobId}`)
//      .then(response => {
//        setJob(response.data.job);
//      })
//      .catch(error => {
//        console.error('Error fetching job details:', error);
//      });
//  }, [jobId]);
//
//  return job ? (
//    <>
//
//  <AdminNav/>
//    <div className="p-8 mx-auto ">
//
//      <div className='flex  w-[80%] shadow-md mx-auto p-4 rounded-md'>
//      <div className='mr-8'>
//      {job.imageURL && (
//          <img
//            src={job.imageURL}
//            alt={job.jobTitle}
//            className="rounded-lg h-64 w-full object-cover mb-4"
//          />
//        )}
//        </div>
//        <div >
//      <Typography variant="h4" gutterBottom>
//        {job.jobTitle}
//      </Typography>
//      <Typography variant="body1" color="textSecondary" paragraph>
//        <strong>Company:</strong> {job.companyName}
//      </Typography>
//      <Typography variant="body1" color="textSecondary" paragraph>
//        <strong>Location:</strong> {job.location}
//      </Typography>
//      <Typography variant="body1" color="textSecondary" paragraph>
//        <strong>Type:</strong> {job.type}
//      </Typography>
//      <Typography variant="body1" color="textSecondary" paragraph>
//        <strong>Description:</strong> {job.jobDescription}
//      </Typography>
//      <Typography variant="body1" color="textSecondary" paragraph>
//        <strong>CTC:</strong> {job.ctc ? `${job.ctc} lacs` : 'Not Specified'}
//      </Typography>
//      <Typography
//        variant="body2"
//        color="textSecondary"
//        style={{ fontWeight: 'bold', color: '#00796b', marginTop: '10px' }}
//      >
//        <strong>Total Applicants:</strong> {job.applicants ? job.applicants.length : 0}
//      </Typography>
//
//
//
//      </div>
//      </div>
//      <div className='mx-auto w-[80%]'>
//      <Typography variant="h5" gutterBottom style={{ marginTop: '20px', fontWeight:'bold' }}>
//        Students who applied:
//      </Typography>
//      <Grid container spacing={3}>
//        {job.applicants && job.applicants.length > 0 ? (
//          job.applicants.map(user => (
//            <Grid item xs={12} md={6} lg={4} key={user._id}>
//              <AppliedUserCard user={user} />
//            </Grid>
//          ))
//        ) : (
//          <Typography variant="body1" color="textSecondary" align="center">
//            No users have applied yet.
//          </Typography>
//        )}
//      </Grid>
//      </div>
//    </div>
//    </>
//
//  ) : (
//    <div>Loading...</div>
//  );
//};
//
//export default JobDetails;
//
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Typography, Grid, Button } from '@mui/material'
import AppliedUserCard from '../components/AppliedUserCard.jsx'
import AdminNav from '../components/AdminNav.jsx'

const JobDetails = () => {
  const { jobId } = useParams()
  const [job, setJob] = useState(null)
  const [view, setView] = useState('applied') // Switch between 'applied' and 'shortlisted'
  const [shortlistedStudents, setShortlistedStudents] = useState([])

  useEffect(() => {
    axios
      .get(`https://placement-cell-msit-api.vercel.app/api/jobs/${jobId}`)
      .then((response) => {
        setJob(response.data.job)
        if (
          response.data.job.shortlistedStudents &&
          typeof response.data.job.shortlistedStudents === 'string'
        ) {
          // If it's a URL, store the URL directly
          setShortlistedStudents(response.data.job.shortlistedStudents)
        } else if (Array.isArray(response.data.job.shortlistedStudents)) {
          // If it's a list, store the students directly
          setShortlistedStudents(response.data.job.shortlistedStudents)
        }
      })
      .catch((error) => {
        console.error('Error fetching job details:', error)
      })
  }, [jobId])

  const renderStudentCards = (students) => (
    <Grid container spacing={3}>
      {students.length > 0 ? (
        students.map((user) => (
          <Grid item xs={12} md={6} lg={4} key={user._id}>
            <AppliedUserCard user={user} />
          </Grid>
        ))
      ) : (
        <Typography variant='body1' color='textSecondary' align='center'>
          No users have applied yet.
        </Typography>
      )}
    </Grid>
  )

  // New function to render shortlisted students
  const renderShortlistedStudents = () => {
    // Check if shortlistedStudents is a URL (string)
    if (typeof shortlistedStudents === 'string') {
      return (
        <Typography variant='body1' color='primary'>
          <a
            href={shortlistedStudents}
            target='_blank'
            rel='noopener noreferrer'
          >
            View Shortlisted Students
          </a>
        </Typography>
      )
    }

    // If it's an array, render each student as Name (Email)
    if (Array.isArray(shortlistedStudents) && shortlistedStudents.length > 0) {
      return (
        <ul>
          {shortlistedStudents.map((student, index) => (
            <li key={index}>
              {student.name} ({student.email})
            </li>
          ))}
        </ul>
      )
    }

    // If no students or no URL, show a placeholder
    return (
      <Typography variant='body1' color='textSecondary'>
        Yet to announce
      </Typography>
    )
  }

  return job ? (
    <>
      <AdminNav />
      <div className='p-8 mx-auto'>
        <div className='flex w-[80%] shadow-md mx-auto p-4 rounded-md'>
          <div className='mr-8'>
            {job.imageURL && (
              <img
                src={job.imageURL}
                alt={job.jobTitle}
                className='rounded-lg h-64 w-full object-cover mb-4'
              />
            )}
          </div>
          <div>
            <Typography variant='h4' gutterBottom>
              {job.jobTitle}
            </Typography>
            <Typography variant='body1' color='textSecondary' paragraph>
              <strong>Company:</strong> {job.companyName}
            </Typography>
            <Typography variant='body1' color='textSecondary' paragraph>
              <strong>Location:</strong> {job.location}
            </Typography>
            <Typography variant='body1' color='textSecondary' paragraph>
              <strong>Type:</strong> {job.type}
            </Typography>
            <Typography variant='body1' color='textSecondary' paragraph>
              <strong>Description:</strong> {job.jobDescription}
            </Typography>
            <Typography variant='body1' color='textSecondary' paragraph>
              <strong>CTC:</strong>{' '}
              {job.ctc ? `${job.ctc} lacs` : 'Not Specified'}
            </Typography>
            <Typography
              variant='body2'
              color='textSecondary'
              style={{
                fontWeight: 'bold',
                color: '#00796b',
                marginTop: '10px',
              }}
            >
              <strong>Total Applicants:</strong>{' '}
              {job.applicants ? job.applicants.length : 0}
            </Typography>
          </div>
        </div>

        <div className='mx-auto w-[80%]'>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '20px',
            }}
          >
            <Typography
              variant='h5'
              gutterBottom
              style={{ fontWeight: 'bold' }}
            >
              {view === 'applied'
                ? 'Students who applied'
                : 'Shortlisted Students'}
              :
            </Typography>
            <div>
              <Button
                variant='outlined'
                color='primary'
                onClick={() => setView('applied')}
                style={{ marginRight: '10px' }}
              >
                View Applied Students
              </Button>
              <Button
                variant='outlined'
                color='primary'
                onClick={() => setView('shortlisted')}
              >
                View Shortlisted Students
              </Button>
            </div>
          </div>

          {/* Conditionally render based on 'view' state */}
          {view === 'applied'
            ? renderStudentCards(job.applicants || [])
            : renderShortlistedStudents()}
        </div>
      </div>
    </>
  ) : (
    <div>Loading...</div>
  )
}

export default JobDetails
