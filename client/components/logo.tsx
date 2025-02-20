import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { cn } from '@/lib/utils'


const Logo = ({className}:{className?:string}) => {
  return (
    <Link href={'/'} className="flex gap-3 items-center justify-center">
        <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
        <div className={cn("md:flex flex-col hidden", className)}>
          <span className="text-neutral-800 leading-5 font-bold text-lg ">
            Career-Sync
          </span>
          <span className="text-slate-500 font-thin text-xs ">
            Find your dream job
          </span>
        </div>
      </Link>
  )
}

export default Logo