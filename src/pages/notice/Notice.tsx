import React from 'react';
import PageTitleWrapper from "src/components/layout/PageTitleWrapper";
import { Box, Button, Card, CardActions, CardContent, Container, FormControlLabel, Grid, MenuItem, TextField, Typography } from "@mui/material";
import PageTitle from 'src/components/layout/PageTitle';

const Notice = () => {
  return (
    <>
      <PageTitleWrapper>
        <Grid container spacing={1}>
          <Grid item xs={15}>
            <PageTitle
              heading="공지사항"
              subHeading=""
              docs="" />
          </Grid>
        </Grid>
      </PageTitleWrapper>
    </>
  );
};

export default Notice;