import React from 'react'
import { Grid } from '@mui/material';
import CustomCard from "./Card";

export default function Home() {
  return (
    <Grid container justifyContent="center">
      <CustomCard />
    </Grid>
  );
}
