import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <div className="flex gap-3 items-center justify-center">
        <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
        <div className="md:flex flex-col hidden">
          <span className="text-neutral-800 leading-5 font-bold text-lg ">
            Career-Sync
          </span>
          <span className="text-slate-500 font-thin text-xs ">
            Find your dream job
          </span>
        </div>
      </div>
  )
}

export default Logo