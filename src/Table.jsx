import React from "react";
import styled from "styled-components";

const TableContainer = styled.div`
  margin-top: 20px;
  overflow: scroll;
  height: 400px;
  color: #6a5d5d;

  tr {
    display: flex;
    justify-content: space-between;
  }

  td {
    padding: 0.5rem;
  }

  tr:nth-of-type(odd) {
    background-color: #f3f2f8;
  }
`;

const Table = ({ countries }) => {
  return (
    <TableContainer>
      {countries.map(({ country, cases }) => (
        <tr>
          <td>{country}</td>
          <td>
            <strong>{cases}</strong>
          </td>
        </tr>
      ))}
    </TableContainer>
  );
};

export default Table;
