import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addIp } from '../features/dataSlice';
import { useRouter } from 'next/router'
import { data } from 'autoprefixer';
import axios from "axios";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';


function Search() {

    const dispatch = useDispatch();
    const router = useRouter()

    const [isLoading, setIsLoading] = React.useState(false);

    const [ipData, setIp] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault()


        try {

            setIsLoading(true);

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
        setIsLoading(false);


    };


    return (
        <>



            <form onSubmit={onSubmit} className='absolute z-[9999] top-[25%] w-[40%] left-[29%] '>
                <div className='relative'>

                    {isLoading &&
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={open}
                        >
                            <CircularProgress style={{color:"#1C5DAB"}} size={70} />
                        </Backdrop>
                    }


                    <img src="./lo.png" className='w-[470px]  m-auto'></img>


                    <input type="text" required onChange={(e) => { setIp(e.target.value) }} value={ipData} placeholder='URL, IP address, domain' className='mt-[45px] block w-full px-3 py-2 bg-white border border-slate-500  text-sm text-black  placeholder-slate-500 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'></input>




                </div>
            </form>


        </>
    )

}

export default Search