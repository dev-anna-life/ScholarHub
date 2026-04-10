/* eslint-disable no-unused-vars */
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiLock, FiUser, FiPhone, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../api/auth"
import { GoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../api/auth";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: 30, transition: { duration: 0.3 } },
}

const levels = ['JSS', 'SSS', 'University', 'Postgrad']
const interests = ['Science', 'Mathematics', 'Law', 'Medicine', 'Technology', 'Arts & Lit', 'Commerce', 'History', 'Entertainment']

function Signup() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    level: '',
    school: '',
    state: '',
    interests: [],
  })

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const toggleInterest = (item) => {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.includes(item)
        ? prev.interests.filter(i => i !== item)
        : [...prev.interests, item]
    }))
  }

  const validateStep1 = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Full Name is required'
    if (!form.email.trim()) newErrors.email = 'Email is required'
    if (!form.phone.trim()) newErrors.phone = 'Phone Number is required'
    if (!form.password.trim()) newErrors.password = 'Password is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors = {}
    if (!form.level) newErrors.level = 'Please select your education level'
    if (!form.school.trim()) newErrors.school = 'School name is required'
    if (!form.state.trim()) newErrors.state = 'State is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSignup = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await signupUser(form)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/feed')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Try again')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-light flex items-center justify-center px-4 py-10">
      <motion.div
        className="form-card w-full max-w-md p-8"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-dark">
            Scholar<span className="text-accent">Hub</span>
          </h1>
          <p className="text-sm text-gray-400 mt-2">Africa's student platform</p>
        </div>


        <div className="flex gap-2 mb-7">
          {[1, 2, 3].map(s => (
            <div key={s} className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-primary' : 'bg-gray-200'}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">

          {step === 1 && (
            <motion.div key="step1" variants={fadeUp} initial="hidden" animate="visible" exit="exit">
              <h2 className="text-xl font-bold text-dark mb-1">Create Your Account</h2>
              <p className="text-sm text-gray-400 mb-5">Join thousands of African students on ScholarHub</p>

              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  try {
                    const res = await googleAuth(credentialResponse.credential)
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('user', JSON.stringify(res.data.user))
                    navigate('/feed')
                  } catch (err) {
                    setError('Google login failed. Try again.')
                  }
                }}
                onError={() => setError('Google login failed. Try again.')}
                width="380"
                text="continue_with"
                shape="rectangular"
                theme="outline"
              />

              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400">or</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <FiUser className="absolute left-3 top-3.5 text-gray-400" size={16} />
                  <input name="name" type="text" placeholder="Full Name" value={form.name} onChange={handleChange} className={`input-field ${errors.name ? 'border-red-400' : ''}`} />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div className="relative">
                  <FiMail className="absolute left-3 top-3.5 text-gray-400" size={16} />
                  <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} className={`input-field ${errors.email ? 'border-red-400' : ''}`} />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div className="relative">
                  <FiPhone className="absolute left-3 top-3.5 text-gray-400" size={16} />
                  <input name="phone" type="tel" placeholder="Phone Number" value={form.phone} onChange={handleChange} className={`input-field ${errors.phone ? 'border-red-400' : ''}`} />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div className="relative">
                  <FiLock className="absolute left-3 top-3.5 text-gray-400" size={16} />
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password (min 8 characters)"
                    value={form.password}
                    onChange={handleChange}
                    className={`input-field ${errors.password ? 'border-red-400' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-primary transition"
                  >
                    {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
              </div>

              <button
                onClick={() => { if (validateStep1()) setStep(2) }}
                className="btn-primary mt-6 flex items-center justify-center gap-2"
              >
                Continue <FiArrowRight size={16} />
              </button>

              <p className="text-center text-sm text-gray-400 mt-4">
                Already have an account?{' '}
                <Link to="/login" className="text-primary font-semibold">Sign in</Link>
              </p>
            </motion.div>
          )}


          {step === 2 && (
            <motion.div key="step2" variants={fadeUp} initial="hidden" animate="visible" exit="exit">
              <h2 className="text-xl font-bold text-dark mb-1">Your education level</h2>
              <p className="text-sm text-gray-400 mb-5">We'll personalise your feed for you</p>

              <div className="grid grid-cols-2 gap-3 mb-2">
                {levels.map(level => (
                  <motion.button
                    key={level}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setForm({ ...form, level })}
                    className={`py-4 rounded-xl border-2 text-sm font-semibold transition-all duration-300 ${form.level === level ? 'border-primary bg-primary text-white' : 'border-gray-200 text-dark hover:border-primary'}`}
                  >
                    {level}
                  </motion.button>
                ))}
              </div>
              {errors.level && <p className="text-red-500 text-xs mb-3">{errors.level}</p>}

              <div className="space-y-3 mb-6 mt-3">
                <div>
                  <input
                    name="school"
                    type="text"
                    placeholder={form.level === 'JSS' || form.level === 'SSS' ? 'Your school name' : 'Your university name'}
                    onChange={handleChange}
                    className={`input-field !pl-4 ${errors.school ? 'border-red-400' : ''}`}
                  />
                  {errors.school && <p className="text-red-500 text-xs mt-1">{errors.school}</p>}
                </div>
                <div>
                  <input
                    name="state"
                    type="text"
                    placeholder="Your state"
                    onChange={handleChange}
                    className={`input-field !pl-4 ${errors.state ? 'border-red-400' : ''}`}
                  />
                  {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                </div>
              </div>

              <button
                onClick={() => { if (validateStep2()) setStep(3) }}
                className="btn-primary flex items-center justify-center gap-2"
              >
                Continue <FiArrowRight size={16} />
              </button>
              <button onClick={() => setStep(1)} className="btn-ghost mt-3">Back</button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" variants={fadeUp} initial="hidden" animate="visible" exit="exit">
              <h2 className="text-xl font-bold text-dark mb-1">Pick your interests</h2>
              <p className="text-sm text-gray-400 mb-5">Choose subjects you love — pick as many as you want</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {interests.map(item => (
                  <motion.button
                    key={item}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleInterest(item)}
                    className={`px-4 py-2 rounded-full border text-sm transition-all duration-300 ${form.interests.includes(item) ? 'bg-primary text-white border-primary' : 'bg-white text-dark border-gray-200 hover:border-primary'}`}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>

              {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}

              <button
                onClick={handleSignup}
                disabled={loading}
                className="btn-primary flex items-center justify-center gap-2"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
              <button onClick={() => setStep(2)} className="btn-ghost mt-3">Back</button>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default Signup