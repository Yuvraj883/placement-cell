import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import UserCard from '../components/UserCard'

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const SearchUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const query = useQuery().get('query')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('Fetching users...')
        const response = await axios.get(
          'https://placement-cell-msit-api.vercel.app/api/users/find'
        ) // Updated URL
        console.log('Response data:', response.data)

        const filteredUsers = response.data.filter((user) => {
          const username = user.username || ''
          const email = user.email || ''
          const fullname = user.fullname || ''

          return (
            username.toLowerCase().includes(query.toLowerCase()) ||
            email.toLowerCase().includes(query.toLowerCase()) ||
            fullname.toLowerCase().includes(query.toLowerCase())
          )
        })

        setUsers(filteredUsers)
      } catch (error) {
        console.error('Error fetching users:', error)
        setError('Failed to load users. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [query])

  return (
    <div className='max-w-[80%] mx-auto px-4 py-8'>
      <h2 className='text-2xl font-bold mb-4 text-center'>
        User Search Results
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className='flex flex-row flex-wrap justify-center'>
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchUsers
