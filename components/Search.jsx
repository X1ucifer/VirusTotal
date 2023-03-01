import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addIp } from '../features/dataSlice';
import { useRouter } from 'next/router'
import { data } from 'autoprefixer';
import axios from "axios";


function Search() {

    const dispatch = useDispatch();
    const router = useRouter()


    const [ipData, setIp] = useState("23.129.64.222 209.141.54.195 104.192.3.74 185.246.188.74 37.120.155.18");

    const onSubmit = async(e) => {
        e.preventDefault()


        try {
            const { data } = await axios.post(
                `/api/ip`, {

                ips: ipData

            },
            );

            dispatch(addIp({
                ip: data,
            }))

            console.log(data)

            router.push('/dataPage')


        } catch (err) {
            console.log(err);

        }
    };


return (
    <>

        <form onSubmit={onSubmit} className='absolute z-[9999] top-[25%] w-[40%] left-[29%] '>
            <div className='relative'>

                <img src="./lo.png" ></img>


                <input type="text" required onChange={(e) => { setIp(e.target.value) }} value={ipData} placeholder='URL, IP address, domain' className='mt-[45px] block w-full px-3 py-2 bg-white border border-slate-500  text-sm text-black  placeholder-slate-500 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'></input>




            </div>
        </form>


    </>
)

}

export default Search