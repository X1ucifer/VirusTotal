import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../store';
import Header from '../components/Header'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Container from '@mui/material/Container';
import TabPanel from '@mui/lab/TabPanel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


function dataPage() {

  const [apiData, setData] = useState()


  const [shodan, setShodan] = useState([]);

  const [tableData, setTable] = useState([]);

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const data = useSelector(store => store.data);
  // console.log("redux from list", JSON.stringify(Object.values(data.ip)))
  console.log("redux from list", Object.values(data.ip).toString())

  const options = {
    method: 'GET',
    url: `https://www.virustotal.com/api/v3/ip_addresses/${Object.values(data.ip).toString()}`,
    headers: {
      accept: 'application/json',
      'x-apikey': 'dda14ef6e66cc6d5ccee35d29c55922d4f41c6172811addf3293dc700f9e672a'
    }
  };




  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        console.log("royal", response.data);
        setData(response.data)
      })
      .catch(function (error) {
        console.error(error);
      });



  }, [])

  useEffect(() => {
    setTable(apiData && apiData.data.attributes.last_analysis_results)
    shodanData()
  }, [apiData])

  const result = tableData && Object.entries(tableData);

  console.log("-->", apiData && apiData.data.id);


  // const s = shodan && Object.entries(shodan);

  // s && s.forEach(([key, value]) => {
  //   console.log(key); // 'one'
  //   console.log(value); // 1
  // });





  const shodanData = async () => {
    if (apiData && apiData.data.id) {
      const { data } = await axios.get(`https://api.shodan.io/shodan/host/${apiData && apiData.data.id}?key=MuWfcU97yw8u9XP08ZsROsYTiny7Ibcx`)

      setShodan(data)

    }

  }

  console.log("make-->", shodan)


  return (

    <>
      <Header></Header>

      <div className="mt-[20px]">

        <div className="flex justify-evenly">

          <div style={{ width: "100px", height: "100px", borderRadius: "50%", marginTop: "20px", position: "relative" }} className={apiData && apiData.data.attributes.last_analysis_stats.malicious == 0 ? "ml-[100px] bg-[#22B573]" : "ml-[100px] bg-[#EF274D] "} >
            <div style={{ backgroundColor: "white", height: "80px", position: "absolute", width: "80px", borderRadius: "50%", bottom: "10%", left: "10%", boxShadow: "0px 4px 47px -5px rgba(0,0,0,0.75)" }}>

              <h1 className={apiData && apiData.data.attributes.last_analysis_stats.malicious == 0 ? "absolute right-[35%] left-[35%] top-[1%] font-normal text-[40px] text-[#22B573]" : "absolute right-[35%] left-[35%] top-[1%] font-normal text-[40px] text-[#EF274D] "}>{apiData && apiData.data.attributes.last_analysis_stats.malicious}</h1>
              <h1 className="absolute right-[35%] left-[35%] top-[65%] font-light text-[13px] text-[#0c0c0c]">/  {apiData && apiData.data.attributes.last_analysis_stats.harmless}</h1>
            </div>

          </div>

          <div className="w-[80%] h-[25vh] bg-[#FFFFFF] mr-[40px] mt-[10px] border-[1px] border-grey relative">

            <div className="w-[100%] h-[8vh] bg-[#F9FAFB] absolute top-0">

              <div>

                <div className="flex mt-[18px] ml-[20px]">
                  {
                    apiData && apiData.data.attributes.last_analysis_stats.malicious == 0 ?
                      (
                        <>
                          <div >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-[#22B573]">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>



                          <h1 className="text-[#22B573] ml-[10px] font-medium text-[15px]">No security vendors flagged this URL as malicious</h1>
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-[#EF274D]">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                          </svg>




                          <h1 className="text-[#EF274D] ml-[10px] font-medium text-[15px]">{apiData && apiData.data.attributes.last_analysis_stats.malicious} security vendors flagged this IP address as malicious</h1>
                        </>


                      )
                  }

                </div>


              </div>



            </div>

            {/* outside the box */}

            <div className="absolute bottom-[15%]">

              <div className="ml-[25px] mt-[30px]">
                <p className="font-normal text-[12px]">{apiData && apiData.data.id}</p>
                <p className="font-normal text-[12px] mt-[5px]">{apiData && apiData.data.id}</p>
              </div>



            </div>
          </div>
        </div>

        <Container maxWidth="lg">



          <Box sx={{ width: '100%', typography: 'body1' }} className="mt-[30px]">
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="DETECTION" value="1" />
                  <Tab label="DETAILS" value="2" />
                  {/* <Tab label="RELATIONS" value="3" /> */}
                </TabList>
              </Box>

              <TabPanel value="1">
                <h1>Security Vendors' Analysis</h1>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right">Engine Name</TableCell>
                        <TableCell align="right">Method</TableCell>
                        {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tableData && Object.entries(tableData).map(([key, value]) => (
                        // {
                        //   tableData && Object.values(tableData).map((rows) => {}
                        // }
                        <TableRow
                          // key={row.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {key}
                          </TableCell>
                          <TableCell align="right">{
                            value.result && value.result == "clean" ? (
                              <>
                                <div className="flex">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-[#22B573]">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>

                                  <h1 className="ml-[10px]">{value.result}</h1>
                                </div>

                              </>
                            ) : (
                              <>
                                <div className="flex">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-[#EF274D]">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                  </svg>

                                  <h1 className="ml-[10px]">{value.result}</h1>
                                </div>

                              </>
                            )
                          }</TableCell>
                          <TableCell align="right">{value.engine_name}</TableCell>
                          <TableCell align="right">{value.method}</TableCell>
                          {/* <TableCell align="right">{row.category}</TableCell> */}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
              <TabPanel value="2">
                From Shodan

                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                      <TableCell>Country_Code</TableCell>
                        <TableCell align="right">region_code</TableCell>
                        <TableCell align="right">City</TableCell>
                        <TableCell align="right">Country Name</TableCell>
                        <TableCell align="right">ISP</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                     
                        <TableRow
                          // key={row.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {shodan && shodan.country_code}
                          </TableCell>
                          <TableCell align="right">{shodan && shodan.region_code}</TableCell>
                          <TableCell align="right">{shodan && shodan.city}</TableCell>
                          <TableCell align="right">{shodan && shodan.country_name}</TableCell>
                          <TableCell align="right">{shodan && shodan.isp}</TableCell>
                        </TableRow>
                     
                    </TableBody>
                  </Table>
                </TableContainer>


                
              </TabPanel>
              {/* <TabPanel value="3">Item Three</TabPanel> */}
            </TabContext>
          </Box>
        </Container>

      </div>
    </>
  )
}

export default dataPage