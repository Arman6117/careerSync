'use client'
import React from 'react'
import {useSearchParams} from 'next/navigation'

const EmailVerificationPage = () => {
    const search = useSearchParams()
    const token = search.get('token')?.replace('/', '')
  return (
    <div>{token}</div>
  )
}

export default EmailVerificationPage