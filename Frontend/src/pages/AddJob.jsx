import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AddJob = () => {
  const [jobTitle, setJobTitle] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [location, setLocation] = useState('')
  const [type, setType] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [ctc, setCtc] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [applyURL, setApplyURL] = useState('')
  const [userGmail, setUserGmail] = useState('')
  const userId = localStorage.getItem('userId')?.trim()
  const token = localStorage.getItem('token')?.trim()

  useEffect(() => {
    if (userId && token) {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(`/api/users/profile/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          setUserGmail(response.data.email)
        } catch (error) {
          console.error('Error fetching user details', error)
        }
      }

      fetchUserDetails()
    }
  }, [userId, token])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const jobData = {
      jobTitle,
      companyName,
      location,
      type,
      jobDescription,
      ctc,
      imageURL,
      applyURL,
      postedBy: userGmail,
    }

    try {
      const response = await axios.post(
        'https://placement-cell-msit-api.vercel.app/api/jobs',
        jobData
      )
      if (response.status === 201) {
        alert('Job added successfully!')
        // Clear the form fields
        setJobTitle('')
        setCompanyName('')
        setLocation('')
        setType('')
        setJobDescription('')
        setCtc('')
        setImageURL('')
        setApplyURL('')
      }
    } catch (error) {
      console.error('There was an error adding the job!', error)
      alert('Failed to add job.')
    }
  }

  return (
    <div className='w-full max-w-3xl mx-auto p-8 bg-gray-100 rounded-lg shadow-lg '>
      <h2 className='text-2xl font-semibold text-gray-800 text-center mb-6'>
        Add a New Job
      </h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block text-gray-600 font-medium mb-2'>
            Job Title:
          </label>
          <input
            type='text'
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
            className='w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <div>
          <label className='block text-gray-600 font-medium mb-2'>
            Company Name:
          </label>
          <input
            type='text'
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            className='w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <div>
          <label className='block text-gray-600 font-medium mb-2'>
            Location:
          </label>
          <input
            type='text'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className='w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <div>
          <label className='block text-gray-600 font-medium mb-2'>Type:</label>
          <input
            type='text'
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className='w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <div>
          <label className='block text-gray-600 font-medium mb-2'>
            Job Description:
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
            className='w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical min-h-[100px]'
          />
        </div>
        <div>
          <label className='block text-gray-600 font-medium mb-2'>CTC:</label>
          <input
            type='number'
            value={ctc}
            onChange={(e) => setCtc(e.target.value)}
            required
            className='w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <div>
          <label className='block text-gray-600 font-medium mb-2'>
            Image URL:
          </label>
          <input
            type='text'
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            required
            className='w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <div>
          <label className='block text-gray-600 font-medium mb-2'>
            Apply URL:
          </label>
          <input
            type='text'
            value={applyURL}
            onChange={(e) => setApplyURL(e.target.value)}
            required
            className='w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <button
          type='submit'
          className='w-full py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          Add Job
        </button>
      </form>
    </div>
  )
}

export default AddJob
