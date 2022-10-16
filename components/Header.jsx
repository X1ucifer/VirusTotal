import Link from 'next/link'
import React, { useState } from 'react'



const Header = () => {



    return (

        <>

            <div className='sticky top-[0%]'>
                <nav class="bg-white   w-full shadow  ">
                    <div class="mx-auto px-8">
                        <div className='flex items-center justify-between h-16'>

                            <div>
                                <Link href="/">
                                    <h1 className='font-medium text-lg antialiased text-black'>
                                        Total Scan
                                    </h1>
                                </Link>

                            </div>

                            <div className='cursor-pointer border-2 py-1 px-3'>
                                <h5 className=" font-semibold text-black text-sm " >Login</h5>

                            </div>
                        </div>
                    </div>
                </nav>
            </div>

        </>
    )
}

export default Header