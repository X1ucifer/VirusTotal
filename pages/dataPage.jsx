import React, { useState } from 'react'
import axios from 'axios';

function dataPage() {

const options = {
  method: 'GET',
  url: 'https://www.virustotal.com/api/v3/ip_addresses/2.58.56.101',
  headers: {
    accept: 'application/json',
    'x-apikey': '784bd2a45a20039f3c97a3ffb11a1d9d393685ec969fa48e3980b63709b271e0'
  }
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });


  return (
    <div>dataPage</div>
  )
}

export default dataPage