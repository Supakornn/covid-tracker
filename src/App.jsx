import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import Table from "./Table";
import { sortData, prettyPrintStat } from "./util";
import numeral from "numeral";
import Map from "./Map";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import { MdOutlineCoronavirus, MdOutlineSick } from "react-icons/md";

const AppContainer = styled.div`
  * {
    margin: 0;
  }

  display: flex;
  justify-content: space-evenly;
  padding: 20px;

  .app__dropdown {
    background-color: white;
    width: 300px;
  }

  @media (max-width: 990px) {
    flex-direction: column;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;

  h1 {
    color: #00bbf0;
    font-size: 3rem;
  }
`;

const LeftContainer = styled.div`
  flex: 0.9;
`;

const StatsComtainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoContainer = styled.div`
  h3 {
    color: #edb1f1;
    font-weight: 400;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    margin-left: 5.8rem;
  }
  h3:last-of-type {
    margin-top: 1rem;
`;

const App = () => {
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2
          }));
          let sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  console.log(casesType);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  return (
    <AppContainer>
      <LeftContainer>
        <HeaderContainer>
          <h1>
            <MdOutlineCoronavirus />
            Covid Tracker
          </h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </HeaderContainer>
        <StatsComtainer>
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="😷 Coronavirus Cases"
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="💪 Recovered"
            active={casesType === "recovered"}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="💀 Deaths"
            isRed
            active={casesType === "deaths"}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0.0a")}
          />
        </StatsComtainer>
        <Map
          className="map"
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </LeftContainer>
      <Card className="app__right">
        <CardContent>
          <InfoContainer>
            <h3>Country cases</h3>
            <Table countries={tableData} />
            <h3>Worldwide {casesType}</h3>
            <LineGraph casesType={casesType} />
          </InfoContainer>
        </CardContent>
      </Card>
    </AppContainer>
  );
};

export default App;
