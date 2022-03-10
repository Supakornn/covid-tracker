import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import styled from "styled-components";

const CardContainer = styled.div`
  width: 35%;

  .infoBox {
    flex: 1;
  }
  .title {
    color: #edb1f1;
    font-size: 20px;
  }

  .infoBox:not(:last-child) {
    margin-right: 10px;
  }

  .infoBox--selected {
    border-top: 10px solid greenyellow;
  }

  .infoBox--red {
    border-color: red;
  }

  .infoBox__cases--green {
    color: lightgreen !important;
  }

  .infoBox__cases {
    color: #cc1034;
    font-weight: 600;
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
  }

  .infoBox__total {
    color: #edb1f1;
    font-weight: 700 !important;
    font-size: 14px !important;
    margin-top: 15px !important;
  }
`;

function InfoBox({ title, cases, total, active, isRed, ...props }) {
  return (
    <CardContainer>
      <Card
        onClick={props.onClick}
        className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"}`}
      >
        <CardContent>
          <Typography className="title" gutterBottom>
            {title}
          </Typography>
          <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>{cases}</h2>
          <Typography className="infoBox__total" color="textSecondary">
            {total} Total
          </Typography>
        </CardContent>
      </Card>
    </CardContainer>
  );
}

export default InfoBox;
