import React from "react";
import numeral from "numeral";
import styled from "styled-components";
const TableContainer = styled.div`
  margin-top: 20px;
  overflow: scroll;
  color: #42b883;
  background-color: white;
  height: 400px;

  td {
    padding: 0.5rem;
    border: none;
  }

  tr:nth-of-type(odd) {
    background-color: #d5eeff;
  }
`;
function Table({ countries }) {
  return (
    <TableContainer>
      {countries.map((country) => (
        <tr>
          <td>{country.country}</td>
          <td>
            <strong>{numeral(country.cases).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </TableContainer>
  );
}

export default Table;
