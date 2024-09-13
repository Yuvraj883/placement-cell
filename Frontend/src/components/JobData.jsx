import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Card, CardContent, Button } from '@mui/material'
import axios from 'axios'

const JobData = ({ job }) => {
  const navigate = useNavigate()

  const handleClick = async () => {
    try {
      const token = localStorage.getItem('token')

      if (token) {
        const response = await axios.get(
          `https://placement-cell-msit-api.vercel.app/api/jobs/${job._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (response.status === 200) {
          navigate(`/job/${job._id}`)
        }
      } else {
        alert('You need to log in to view this job.')
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          alert('Access denied. You must be an admin to view this job.')
        } else if (error.response.status === 401) {
          alert('You are not authorized to view this job. Please log in.')
        } else {
          console.error('Error fetching job details:', error)
        }
      }
    }
  }

  return (
    <Card
      className='cursor-pointer p-4 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl'
      onClick={handleClick}
      style={{ width: '350px', margin: '10px', marginLeft: '0' }}
    >
      <CardContent>
        {job.imageURL && (
          <img
            src={job.imageURL}
            alt={job.jobTitle}
            className='rounded-lg h-36 w-full object-cover mb-4'
          />
        )}
        <Typography
          variant='h6'
          className='font-semibold text-gray-800 mb-2'
          style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333' }}
        >
          {job.jobTitle}
        </Typography>
        <Typography
          variant='body2'
          color='textSecondary'
          className='text-gray-600 mb-1'
          style={{ fontWeight: '500' }}
        >
          <strong>Company:</strong> {job.companyName}
        </Typography>
        <Typography
          variant='body2'
          color='textSecondary'
          className='text-gray-600 mb-1'
          style={{ fontWeight: '500' }}
        >
          <strong>Location:</strong> {job.location}
        </Typography>
        <Typography
          variant='body2'
          color='textSecondary'
          className='text-gray-600 mb-1'
          style={{ fontWeight: '500' }}
        >
          <strong>Type:</strong> {job.type}
        </Typography>
        <Typography
          variant='body2'
          color='textSecondary'
          className='mb-2'
          style={{ fontSize: '0.875rem', lineHeight: '1.3' }}
        >
          {job.jobDescription.length > 100
            ? `${job.jobDescription.substring(0, 97)}...`
            : job.jobDescription}
        </Typography>
        <Typography
          variant='body2'
          color='textSecondary'
          style={{ fontWeight: 'bold', color: '#00796b' }}
        >
          <strong>CTC:</strong> {job.ctc} lacs
        </Typography>
        <Typography
          variant='body2'
          color='textSecondary'
          style={{
            fontWeight: 'bold',
            color: '#00796b',
            marginTop: '5px',
            marginBottom: '-12px',
          }}
        >
          <strong>Total Applicants:</strong>{' '}
          {job.applicants ? job.applicants.length : 0}
        </Typography>

        <Typography
          variant='body2'
          color='textSecondary'
          style={{ fontWeight: '500', marginTop: '10px' }}
        >
          <strong>Posted By: </strong> {job.postedBy ? job.postedBy : 'Unknown'}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default JobData
