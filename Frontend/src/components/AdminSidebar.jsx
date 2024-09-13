import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { PiStudentBold } from 'react-icons/pi'
import { CgOrganisation } from 'react-icons/cg'
import UserCard from './UserCard'
import axios from 'axios'
import JobData from './JobData'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'

const Sidebar = styled('nav')(({ theme }) => ({
  width: '20%',
  backgroundColor: '#FFFFFF', // White background
  color: '#000000', // Black text
  fontWeight: 'bold',
  fontSize: '1rem',
  paddingTop: theme.spacing(4),
  textAlign: 'left',
  boxShadow: `0px 4px 8px ${alpha('#000000', 0.2)}`, // Shadow effect
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}))

const SidebarItem = styled('li')(({ theme, isActive }) => ({
  cursor: 'pointer',
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1, 2),
  fontWeight: isActive ? 'bold' : 'normal',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: isActive ? alpha('#000000', 0.1) : 'transparent', // Highlight active item
  '&:hover': {
    backgroundColor: alpha('#000000', 0.05), // Hover effect
  },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: isActive ? `0px 4px 8px ${alpha('#000000', 0.2)}` : 'none', // Shadow on active
}))

const AdminSidebar = ({ onData }) => {
  const [currentVal, setCurrentVal] = useState(() => {
    const savedVal = localStorage.getItem('currentVal')
    return savedVal ? savedVal : 'student'
  })
  const [users, setUsers] = useState([])
  const [jobs, setJobs] = useState([])

  const setToCompany = () => {
    setCurrentVal('company')
  }

  const setToStudent = () => {
    setCurrentVal('student')
  }

  useEffect(() => {
    // Save the currentVal to local storage whenever it changes
    localStorage.setItem('currentVal', currentVal)
    if (typeof onData === 'function') {
      onData(currentVal)
    }

    if (currentVal === 'student') {
      axios
        .get('https://placement-cell-msit-api.vercel.app/api/users/find')
        .then((response) => {
          setUsers(response.data)
        })
        .catch((error) => {
          console.error('Error fetching users:', error)
        })
    }
    if (currentVal === 'company') {
      axios
        .get('https://placement-cell-msit-api.vercel.app/api/jobs') // Fetch job data
        .then((response) => {
          setJobs(response.data)
        })
        .catch((error) => {
          console.error('Error fetching jobs:', error)
        })
    }
  }, [currentVal, onData])

  return (
    <>
      <Sidebar>
        <ul className='flex flex-col p-4'>
          <SidebarItem
            isActive={currentVal === 'student'}
            onClick={setToStudent}
          >
            <span className='flex justify-between items-center'>
              Students{' '}
              <PiStudentBold className='text-3xl' style={{ color: '#000' }} />
            </span>
            <hr />
          </SidebarItem>
          <SidebarItem
            isActive={currentVal === 'company'}
            onClick={setToCompany}
          >
            <span className='flex justify-between items-center'>
              Companies{' '}
              <CgOrganisation className='text-3xl' style={{ color: '#000' }} />
            </span>
            <hr />
          </SidebarItem>
          <Link to='/admin/post-job'>
            <SidebarItem>
              <span className='flex justify-between items-center'>
                Post Jobs{' '}
                <FaPlus className='text-3xl' style={{ color: '#000' }} />
              </span>
              <hr />
            </SidebarItem>
          </Link>
        </ul>
      </Sidebar>
      <div className='flex  items-center justify-center w-[90%] ml-52 bg-black'>
        {currentVal === 'student' &&
          users.map((user) => <UserCard key={user._id} user={user} />)}
        {currentVal === 'company' &&
          jobs.map((job) => <JobData key={job._id} job={job} />)}
      </div>
    </>
  )
}

AdminSidebar.propTypes = {
  onData: PropTypes.func,
}

export default AdminSidebar
