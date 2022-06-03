import { MenuItem, Select } from '@mui/material';
import { SelectChangeEvent, SelectInputProps } from '@mui/material/Select/SelectInput';
import { positions } from '@mui/system';
import { json } from 'body-parser';
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  // create state for companies, and array to hold companies
  const [ companiesState, setCompaniesState ] = useState([]);
  const [ currentCompanyState, setCurrentCompanyState ] = useState("");
  const [ currentCompanyPositionsState, setCurrentCompanyPositionsState ] = useState([]);

  let companies = []
  let positions: JSX.Element[] = []

  // get companies on page load
  useEffect(() => {
    fetch('https://internify-api-test.herokuapp.com/getCompanies',{
    method: "GET"})
    .then(response => response.json())
    .then(response => setCompaniesState(response))
  }, [])

  // get positions for company when new company selected
  useEffect(() => {
    // verify company has been selected
    if (currentCompanyState !== "") {
      fetch('https://internify-api-test.herokuapp.com/getPositions',{
      method: "POST",
      headers: {
        'accept': 'application/json',
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        "companyID": currentCompanyState
      })})
      .then(response => response.json())
      .then(response => {
        for (let i = 0; i < response.length; i++) {
          positions.push(
            <div>
              E
              {response[i]['positionType']}
            </div>
          )
        console.log(positions)
        }
      })
    }
  }, [currentCompanyState])


  for (let i = 0; i < companiesState.length; i++) {
    companies.push(
      <MenuItem value={companiesState[i]['_id']}>{companiesState[i]['companyName']}</MenuItem>
    )
  }



  return (
    <div className="App">

      <Select
      onChange={(event: SelectChangeEvent<string>) => setCurrentCompanyState(event.target.value)}
      value={currentCompanyState}>
        {companies}
      </Select>

      <div>
        {positions}
      </div>

    </div>
  );
}

export default App;
