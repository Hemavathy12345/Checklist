"use client"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import '@/styles/Navbar.css'

const Navbar = () => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    router.push('/login')
  }

  if (loading) {
    return <div className="navbar">Loading...</div>
  }

  return (
    <div className="navbar">
      <div className="nav-left">
        <Link href="/">Home</Link>
        {user && (
          <>
            <Link href="/events">Add Event</Link>
            <Link href="/events/list">View Events</Link>
          </>
        )}
      </div>
      <div className="nav-right">
        {user ? (
          <div className="user-section">
            <span className="username">Welcome, {user.username}!</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        ) : (
          <div className="auth-links">
            <Link href="/login">Login</Link>
            <Link href="/signup.js">Sign Up</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar