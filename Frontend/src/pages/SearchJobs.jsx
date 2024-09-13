import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import JobCard from '../components/JobCard'

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const SearchJobs = () => {
  const [jobPostings, setJobPostings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const query = useQuery().get('query')

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          'https://placement-cell-msit-api.vercel.app/api/jobs'
        )
        const filteredJobs = response.data.filter(
          (job) =>
            job.jobTitle.toLowerCase().includes(query.toLowerCase()) ||
            job.companyName.toLowerCase().includes(query.toLowerCase())
        )
        setJobPostings(filteredJobs)
      } catch (error) {
        setError('Failed to load job postings. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [query])

  return (
    <div className='max-w-[80%] mx-auto px-4 py-8'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Search Results</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : jobPostings.length === 0 ? (
        <p>No job postings found.</p>
      ) : (
        <div className='flex flex-row flex-wrap justify-center'>
          {jobPostings.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchJobs
