import React, { useEffect, useState } from "react";
import CustomCard from "./Card";
import { useLocation } from "react-router-dom";
import { getProductById } from "../services/api";
import { identifier } from "stylis";
import Loader from './Loader';
import { Grid } from '@mui/material';

export default function Product() {
  const search = useLocation().search;
  const [error, setError] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState("");

  useEffect(() => {
    const id = new URLSearchParams(search).get("name");
    console.log("product", id);
    async function fetchData() {
      setLoading(true);
      const res = await getProductById(id);
      console.log("res in product", res);

      switch (res.statusId) {
        case 1:
          // setCategoriesNames(res.value.categoriesNames);
          setProduct(res.value);
          console.log(res.value);
          setLoading(false);
          break;
        case 2:
          setError(res);
          setTimeout(() => {
            setError("");
          }, 5000);
          break;
        default:
      }
    }
    fetchData();
  }, [error]);

  return (
    <>
      {error && <h1>{error}</h1>}
      {loading && <Loader />}
      {!loading && (
        <Grid item container justifyContent="center" className="create" xs={12}>
          <h1>עמוד מוצר</h1>
          <Grid
            item
            container
            justifyContent="center"
            xs={12}
            direction="row"
            spacing={5}
          >
            {product && <CustomCard {...product} />}
          </Grid>
        </Grid>
      )}
    </>
  );
}
