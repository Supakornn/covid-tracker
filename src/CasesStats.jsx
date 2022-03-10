import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
const CasesStats = ({ title, cases, total }) => {
  return (
    <Card className="info">
      <CardContent>
        <Typography className="info__title" color="textSecondary">
          {title}
        </Typography>
        <h2 className="info__cases">{cases}</h2>
        <Typography className="info__title" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CasesStats;
