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
  <div
    style={{
      width: "100%",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "rgba(0,0,0,0.4)",
    }}
  >
    <div
      style={{
        width: "360px",
        padding: "25px",
        borderRadius: "16px",
        backgroundColor: "#ffffff",
        boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
        textAlign: "center",
      }}
    >
      <h3 style={{ marginBottom: "10px", color: "#333" }}>
        Logging out in <span style={{ color: "#d73535" }}>{count}</span>s
      </h3>

      <p style={{ color: "#666", marginBottom: "25px" }}>
        Are you sure you want to logout?
      </p>

      <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
        <button
          onClick={logoutnow}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#d73535",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Yes, Logout
        </button>

        <button
          onClick={cancelLogout}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            backgroundColor: "#f5f5f5",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);
}

export default Logout
