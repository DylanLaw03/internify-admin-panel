import { MenuItem, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import { useEffect, useState } from 'react';
import './App.css';
import { PositionBox } from './components/position';

function App() {
  // create state for companies, and array to hold companies
  const [ companiesState, setCompaniesState ] = useState([]);
  const [ currentCompanyState, setCurrentCompanyState ] = useState("");
  const [ currentPositionsState, setcurrentPositionsState ] = useState<JSX.Element[]>([]);

  let companies = []

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
      let positions: JSX.Element[] = []
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
            <PositionBox position={response[i]} />
          )
        }
        setcurrentPositionsState(positions);
      })
    }
  }, [currentCompanyState])


  for (let i = 0; i < companiesState.length; i++) {
    companies.push(
      <MenuItem id={companiesState[i]['_id']} value={companiesState[i]['_id']}>{companiesState[i]['companyName']}</MenuItem>
    )
  }



  return (
    <div className="App">

      <Select
        onChange={(event: SelectChangeEvent<string>) => setCurrentCompanyState(event.target.value)}
        value={currentCompanyState}>
        {companies}
      </Select>

      <div className='current__positions'>
        {currentPositionsState}
      </div>

    </div>
  );
}

export default App;
