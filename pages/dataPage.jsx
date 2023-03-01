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
  console.log("redux from list", typeof(data.ip))

  useEffect(() => {
   setTable(data.ip)


  }, [])



  return (

    <>
      <Header></Header>

      <div className="mt-[20px]">

      

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