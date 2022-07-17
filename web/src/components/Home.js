import React from 'react'
import { Grid } from '@mui/material';
import CustomCard from "./Card";
import ProductForm from './ProductForm';

export default function Home() {
  return (
    <Grid container justifyContent="center">
      <CustomCard />
      <ProductForm/>
    </Grid>
  );
}
