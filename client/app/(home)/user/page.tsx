'use client'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import React from 'react'


const Dashboard = () => {
   const handleClick = async () => {
    await axios.post('http://localhost:5000/api/auth/logout').then(()=> console.log("Logged out"))
   }
  return (
    <div>Testing middleware
      <Button onClick={handleClick}>Logout</Button>
    </div>

  )
}

export default Dashboard