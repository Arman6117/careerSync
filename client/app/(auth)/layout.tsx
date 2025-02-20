import React from 'react'

const AuthPageLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <main className="relative flex items-center justify-center h-screen w-full">
      <div className="h-full absolute -z-10 w-full  pattern-zigzag-3d pattern-gray-600 pattern-opacity-5  pattern-bg-white pattern-size-32 "></div>
      {children}
    </main>
  )
}

export default AuthPageLayout