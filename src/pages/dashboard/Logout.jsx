import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Ct } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const [count, setCount] = useState(5)
  const { deluser } = useContext(Ct)
  const navigate = useNavigate()

  const intervalRef = useRef(null)
  const timeoutRef = useRef(null)

  const logoutnow = useCallback(() => {
    deluser()
    localStorage.removeItem('token')
    navigate('/')
  }, [deluser, navigate])

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCount(prev => {
        if (prev <= 1) return 0
        return prev - 1
      })
    }, 1000)

    timeoutRef.current = setTimeout(() => {
      logoutnow()
    }, 5000)

    return () => {
      clearInterval(intervalRef.current)
      clearTimeout(timeoutRef.current)
    }
  }, [logoutnow])

  const cancelLogout = () => {
    clearInterval(intervalRef.current)
    clearTimeout(timeoutRef.current)
    navigate('/home')
  }

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '30rem', height: '20rem', borderRadius: '30px', backgroundColor: '#d73535ff', padding: '20px' }}>
        <h4>Account Logout in <span>{count}</span></h4>
        <p>Want to Logout?</p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={logoutnow}>Yes</button>
          <button onClick={cancelLogout}>No</button>
        </div>
      </div>
    </div>
  )
}

export default Logout
