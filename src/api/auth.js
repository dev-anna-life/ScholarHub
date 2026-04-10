import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
})

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token')
    if (token) req.headers.Authorization = `Bearer ${token}`
    return req
})

export const signupUser = (formData) => API.post('/auth/signup', formData)
export const loginUser = (formData) => API.post('/auth/login', formData)
export const getMe = () => API.get('/auth/me')
export const createPost = (postData) => API.post('/posts', postData)
export const forgotPassword = (email) => API.post('/password/forgot', { email })
export const resetPassword = (token, password) => API.post(`/password/reset/${token}`, { password })
export const googleAuth = (credential) => API.post('/auth/google', { credential })