import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../store';
import Header from '../components/Header'



function dataPage() {


  const data = useSelector(store => store.data);
  // console.log("redux from list", JSON.stringify(Object.values(data.ip)))
  console.log("redux from list", Object.values(data.ip).toString())

  const options = {
    method: 'GET',
    url: `https://www.virustotal.com/api/v3/ip_addresses/${Object.values(data.ip).toString()}`,
    headers: {
      accept: 'application/json',
      'x-apikey': '784bd2a45a20039f3c97a3ffb11a1d9d393685ec969fa48e3980b63709b271e0'
    }
  };

  axios
    .request(options)
    .then(function (response) {
      console.log("aspin", response.data);
    })
    .catch(function (error) {
      console.error(error);
    });


  return (

    <>
      <Header></Header>

      <div className="mt-[20px]">

        <div className="flex justify-between">

          <div style={{ width: "100px", height: "100px", backgroundColor: "#22B573", borderRadius: "50%", marginTop: "20px", position: "relative" }} className="ml-[100px]">
            <div style={{ backgroundColor: "white", height: "80px", position: "absolute", width: "80px", borderRadius: "50%", bottom: "10%", left: "10%", boxShadow: "0px 4px 47px -5px rgba(0,0,0,0.75)" }}>

              <h1 className="absolute right-[35%] left-[35%] top-[1%] font-normal text-[40px] text-[#22B573]">0</h1>
              <h1 className="absolute right-[35%] left-[35%] top-[65%] font-light text-[13px] text-[#0c0c0c]">/ 89</h1>

            </div>

          </div>

          <div className="w-[80%] h-[25vh] bg-[#FFFFFF] mr-[40px] mt-[10px] border-[1px] border-grey">

            <div className="w-[100%] h-[8vh] bg-[#F9FAFB]">

              <div>

                <div className="flex mt-[18px] ml-[20px]">

                  <div >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-[#22B573]">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>



                  <h1 className="text-[#22B573] ml-[10px] font-medium text-[15px]">No security vendors flagged this URL as malicious</h1>
                </div>


              </div>



            </div>

            {/* outside the box */}

            <div>

              <div className="ml-[25px] mt-[30px]">
                <p className="font-normal text-[12px]">https://www.netflix.com/</p>
                <p className="font-normal text-[12px] mt-[5px]">netflix.com</p>
              </div>



            </div>
          </div>
        </div>


      </div>
    </>
  )
}

export default dataPage