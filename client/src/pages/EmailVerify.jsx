import React, { useEffect, useContext } from 'react'
import { ASSETS } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const EmailVerify = () => {
  // ✅ Use correct context variable name
  const { BACKENDURL, isLoggedIn, USERDATA, getUserData } = useContext(AppContext)

  const navigate = useNavigate()
  const inputRefs = React.useRef([])

  // 👉 Handle typing input
  const handleInput = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, '') // only numbers allowed
    e.target.value = value

    if (value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus()
    }
  }

  // 👉 Handle backspace navigation
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  // 👉 Handle paste for OTP
  const handlePaste = (e) => {
    e.preventDefault()
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.replace(/[^0-9]/g, '').split('').slice(0, 6) // only digits, max 6

    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char
        if (index < pasteArray.length - 1) {
          inputRefs.current[index + 1].focus()
        }
      }
    })
  }

  // 👉 Handle submit
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()

      const otpArray = inputRefs.current.map(input => input.value)
      const otp = otpArray.join('')

      // Validate OTP
      if (otp.length !== 6) {
        toast.error('Please enter a valid 6-digit OTP')
        return
      }

      const { data } = await axios.post(
        BACKENDURL + '/api/auth/verify-account',
        { otp }
      )

      if (data.success) {
        toast.success(data.message)
        getUserData()
        navigate('/')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Verification failed')
    }
  }

  // 👉 Auto redirect if already verified
  useEffect(() => {
    if (isLoggedIn && USERDATA && USERDATA.isAccountVerified) {
      navigate('/')
    }
  }, [isLoggedIn, USERDATA?.isAccountVerified, navigate])

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400 ">
  

      {/* OTP Form */}
      <form onSubmit={onSubmitHandler} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm ">
        <h1 className="text-white text-2xl font-semibold text-center mb-4">Email Verify OTP</h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter the 6-digit code sent to your email id.
        </p>

        {/* OTP Boxes */}
        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input
              type="text"
              maxLength="1"
              key={index}
              required
              className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
              ref={(el) => inputRefs.current[index] = el}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>

        <button className="w-full py-3 bg-gradient-to-r from-indigo-500 
                           to-indigo-900 text-white rounded-full hover:bg-indigo hover:-translate-y-1 transition">
          Verify email
        </button>
      </form>
    </div>
  )
}

export default EmailVerify