import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { ArrowForward } from '@mui/icons-material';
import moment from 'moment';
import { Link } from 'react-router-dom';

// Styled components with a job portal theme
const CardContainer = styled('div')(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  padding: '20px',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
  },
  maxWidth: '320px',
  display: 'flex',
  flexDirection: 'column',
  margin: '12px',
  overflow: 'hidden', // Ensure no horizontal scrollbar
}));

const JobImage = styled('div')({
  backgroundColor: '#e0f7fa',
  borderRadius: '8px',
  height: '180px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '20px',
  color: '#00796b',
  fontSize: '2rem',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  overflow: 'hidden', // Ensure image doesn't cause horizontal overflow
  position: 'relative',
  '& img': {
    height: '100%',
    width: '100%',
    borderRadius: '8px',
    objectFit: 'cover',
    position: 'absolute',
  },
});

const JobTitle = styled('h3')(({ theme }) => ({
  fontSize: '1.8rem',
  fontWeight: '700',
  marginBottom: '5px',
  color: '#006064',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: '0',
    bottom: '-5px',
    width: '100%',
    height: '3px',
    background: '#0097a7',
  },
}));

const CompanyName = styled('p')({
  fontSize: '1rem',
  color: '#004d40',
  marginBottom: '5px',
  fontWeight: '500',
});

const JobDescription = styled('p')({
  color: '#616161',
  marginBottom: '10px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: '3',
  lineHeight: '1.6',
  fontSize: '0.95rem',
});

const InfoContainer = styled('div')({
  marginTop: 'auto',
  paddingTop: '10px',
  borderTop: '1px solid #e0e0e0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const JobDetails = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
});

const CTC = styled('p')({
  color: '#00796b',
  fontSize: '1rem',
  fontWeight: '500',
});

const Applicants = styled('p')({
  color: '#00796b',
  fontSize: '1rem',
  fontWeight: '500',
});

const ApplyButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#00796b',
  color: '#ffffff',
  fontWeight: 'bold',
  borderRadius: '20px',
  padding: '10px 20px',
  textTransform: 'uppercase',
  '&:hover': {
    backgroundColor: '#004d40',
  },
}));

const JobCard = ({ job }) => {
  const [open, setOpen] = useState(false);
  const [redirected, setRedirected] = useState(false);
  const userId = localStorage.getItem('userId')?.trim();

  const timeAgo = (date) => moment(date).fromNow();

  const handleApplyClick = () => {
    window.open(job.applyURL, '_blank');
    setRedirected(true);
  };

  const handleConfirm = async (confirmed) => {
    if (confirmed) {
      try {
        const response = await axios.post('/api/users/apply', { userId, jobId: job._id });

        if (response.status === 200) {
          console.log(response.data.message);
        } else {
          console.error('Failed to apply for the job.');
        }
      } catch (error) {
        console.error('Error applying for job:', error);
      }
    }
    handleClose();
  };

  const handleClose = () => {
    setRedirected(false);
  };

  return (
    <CardContainer>
      <JobImage>
        {job.imageURL ? <img src={job?.imageURL} alt={job?.jobTitle} /> : job?.jobTitle.charAt(0)}
      </JobImage>
      <div>
        <JobTitle>{job?.jobTitle}</JobTitle>
        <CompanyName>{job?.companyName}</CompanyName>
        <JobDescription>{job?.jobDescription}</JobDescription>
        <p style={{ color: '#9e9e9e', fontSize: '0.85rem' }}>{timeAgo(job?.createdAt)}</p>
      </div>
      <InfoContainer>
        <JobDetails>
          <CTC>CTC: {job.ctc} LPA</CTC>
          <Applicants>Applicants: {job?.applicants?.length}</Applicants>
        </JobDetails>
       <Link to={`/job/${job._id}`}>

       <ApplyButton startIcon={<ArrowForward />} >
          View Job
        </ApplyButton>
       </Link>
      </InfoContainer>

      {/* <Dialog open={redirected} onClose={handleClose}>
        <DialogTitle>Confirm Application</DialogTitle>
        <DialogContent>
          <p>Have you applied for this job?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleConfirm(false)} color="primary">
            No
          </Button>
          <Button onClick={() => handleConfirm(true)} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog> */}
    </CardContainer>
  );
};

export default JobCard;
