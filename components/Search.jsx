import React, { useState } from 'react'

function Search() {

    const [ ip, setIp ] = useState("");

   const onSubmit = (e)=>{
    e.preventDefault()
    console.log(ip)
   }

    return (
        <>
            <form onSubmit={onSubmit} className='absolute z-[9999] top-[45%] w-[40%] left-[29%] '>
                <div className='relative'>


                    {/* <span class="block text-sm font-extrabold  text-transparent bg-clip-text bg-gradient-to-r  from-purple-600 to-pink-700 ">Anime Title</span> */}
                    <input type="text" required onChange={(e)=>{setIp(e.target.value)}} placeholder='URL, IP address, domain' className='mt-2 block w-full px-3 py-2 bg-white border border-slate-500  text-sm text-black  placeholder-slate-500 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'></input>

                    {/* <div className="mt-2 ">
                        <button
                            type="submit"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white  rounded-md border border-slate-300 hover:text-zinc-300 "

                        >
                            Search
                        </button>


                    </div> */}

                   
                </div>
            </form>

           
        </>
    )
    
}

export default Search