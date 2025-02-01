'use client'

import { useParams, useSearchParams } from "next/navigation"

const ResetPasswordPage = () => {
const params = useSearchParams();
const token = params.get("token")?.replace('/','')

  return (
    <div>{token}</div>
  )
}

export default ResetPasswordPage