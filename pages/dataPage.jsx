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
import useClipboard from "react-use-clipboard";



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




  const [tableData, setTable] = useState([]);
  // const [copy, setCopy] = useState([]);


  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const data = useSelector(store => store.data);
  // console.log("redux from list", JSON.stringify(Object.values(data.ip)))
  console.log("redux from list", data.ip.ip)

  useEffect(() => {
    setTable(data.ip.ip)


  }, [])

  // console.log("table", tableData)


  



  const maliciousData = [];

  tableData && Object.entries(tableData)
    .sort(([, a], [, b]) => b.data.attributes.last_analysis_stats.malicious - a.data.attributes.last_analysis_stats.malicious)
    .forEach(([key, value]) => {
    

      maliciousData.push(value)


    });


    const copy = [];


    tableData && Object.entries(tableData).forEach(([key, value]) => {
  
      if(value.data.attributes.last_analysis_stats.malicious > 0){
        // console.log("without sort", value.data.id)
        copy.push(value.data.id)

  
      }
  
    })


    const [isCopied, setCopied] = useClipboard(copy);


      // console.log("table", copy)



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
                  {/* <Tab label="DETAILS" value="2" /> */}
                  {/* <Tab label="RELATIONS" value="3" /> */}
                </TabList>
              </Box>

              <button onClick={setCopied} className="absolute right-[14%] mt-[10px] mb-[20px] bg-[#1C5DAB] p-[10px] rounded-md text-cyan-50">
                {isCopied ? "Copied" : " Copy to Clipboard"}
              </button>

              <TabPanel value="1" className='mt-[50px]'>
                {/* <h1>Security Vendors' Analysis</h1> */}
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right">Detections</TableCell>
                        <TableCell align="right">Autonomous System</TableCell>
                        {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tableData && Object.entries(maliciousData).map(([key, value]) => (
                        // {
                        //   tableData && Object.values(tableData).map((rows) => {}
                        // }
                        <TableRow
                          // key={row.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            <a href={`https://www.virustotal.com/gui/ip-address/${value.data.id}`} target="_blank" className='text-[#1C5DAB]'> {value.data.id} </a>
                          </TableCell>

                          <TableCell align="right"></TableCell>

                          <TableCell align="right">{value.data.attributes.last_analysis_stats.malicious} / {value.data.attributes.last_analysis_stats.harmless + value.data.attributes.last_analysis_stats.malicious + value.data.attributes.last_analysis_stats.suspicious + value.data.attributes.last_analysis_stats.undetected}</TableCell>


                          <TableCell align="right">{value.data.attributes.as_owner}</TableCell>
                          {/* <TableCell align="right">{row.category}</TableCell> */}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>

            </TabContext>
          </Box>
        </Container>

      </div>
    </>
  )
}

export default dataPage