import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import CustomCard from "./Card";
import { getAllProducts } from "./../services/api";

export default function Home() {
  const [error, setError] = useState("");
  const [products, setProducts] = useState(null);
  

  useEffect(() => {
    async function fetchData() {
      const res = await getAllProducts();
      switch (res.statusId) {
        case 1:
          // setCategoriesNames(res.value.categoriesNames);
          setProducts(res.value);
          console.log(res.value);

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
    <Grid item container justifyContent="center" className="create" xs={12}>
      {/* {error && <p>{error}<p/>}  */}
      {products &&
        products.map((product, index) => (
          <CustomCard
            {...product}
            key={index}
            id={product.date.toString()}
          />
        ))}
    </Grid>
  );
}
