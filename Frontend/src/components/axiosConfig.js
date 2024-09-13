import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://placement-cell-msit-api.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default axiosInstance
