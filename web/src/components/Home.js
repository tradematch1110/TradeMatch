import React from 'react'
import { Grid } from '@mui/material';
import CustomCard from "./Card";
import ProductForm from './ProductForm';
import CreateProduct from './CreateProduct';
import { useNavigate } from 'react-router';
export default function Home() {
   const navigate = useNavigate();
  return (
    <Grid container justifyContent="center" className="create">
      <CustomCard />
      <button className="create" onClick={() => navigate("/create_product")}>
        העלה מוצר
      </button>
    </Grid>
  );
}
