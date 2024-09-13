import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from './JobCard';

const JobPostings = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobPostings = async () => {
      try {
        const response = await axios.get('/api/jobs');
        setJobPostings(response.data || []);
      } catch (error) {
        console.error('Error fetching job postings:', error);
        setError('Failed to load job postings. Please try again later.');
      } finally {
        setLoading(false); // Stop loading once data is fetched or an error occurs
      }
    };

    fetchJobPostings();
  }, []);

  return (
    <div className="max-w mx-auto px-4 py-8 overflow-hidden">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-900 relative">
        <span className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-20 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 opacity-100" />

        </span>
        <span className="relative text-white font-serif">Latest Jobs</span>
      </h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading job postings...</p> // Display a loading message while fetching data
      ) : error ? (
        <p className="text-center text-red-500">{error}</p> // Display an error message if fetching fails
      ) : jobPostings.length === 0 ? (
        <p className="text-center text-gray-500">No job postings available.</p> // Handle case when no jobs are available
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {jobPostings?.map((job) => (
            <JobCard key={job?._id} job={job} /> // Use job._id as key
          ))}
        </div>
      )}
    </div>
  );
};

export default JobPostings;
