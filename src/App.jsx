import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Map from "./Map";
import { MenuItem, FormControl, Select, Card, CardContent, Typography } from "@mui/material";
import CasesStats from "./CasesStats";
import Table from "./Table";

const AppContainer = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Oswald&display=swap");
  * {
    margin: 0;
    box-sizing: border-box;
    font-family: "Oswald", sans-serif;
  }

  display: flex;
  justify-content: space-evenly;
  padding: 20px;

  @media (max-width: 990px) {
    flex-direction: column;
  }

  background-color: #f5f6fa;
`;

const HeaderContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  justify-content: space-between;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AppLeft = styled.div`
  flex: 0.9;
`;

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getAllCountries = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };
    getAllCountries();
  }, []);

  const sortData = (data) => {
    const sortedData = [...data];
    return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
  };

  const changeCountry = async (e) => {
    const countryinfo = e.target.value;
    setCountry(countryinfo);
    const url =
      countryinfo == "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryinfo}`;
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
      });
  };
  return (
    <AppContainer>
      <AppLeft>
        <HeaderContainer>
          <h1>Covid Tracker</h1>
          <FormControl className="dropdown">
            <Select variant="outlined" value={country} onChange={changeCountry}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </HeaderContainer>
        <CardContainer>
          <CasesStats title="New Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <CasesStats
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <CasesStats title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </CardContainer>
        <Map />
      </AppLeft>
      <Card>
        <CardContent>
          <h3>Country total cases</h3>
          <Table countries={tableData} />
          <h3>Worldwide new cases</h3>
        </CardContent>
      </Card>
    </AppContainer>
  );
};

export default App;
