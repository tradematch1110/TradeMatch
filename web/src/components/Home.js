import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import CustomCard from "./Card";
import ProductForm from "./ProductForm";
import CreateProduct from "./CreateProduct";
import { useNavigate } from "react-router";
import { getAllProducts } from "./../services/api";

export default function Home() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [products, setProducts] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await getAllProducts();
      switch (res.statusId) {
        case 1:
          // setCategoriesNames(res.value.categoriesNames);
          setProducts(res.value);
          console.log(res.value)

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
    // console.log("products: ", products);
  },[]);
  return (
    <Grid item container justifyContent="center" className="create" xs={12}>
      {products && products.map((product)=>{
          return (
            <CustomCard
              {...product}
              key={product.date.toString()}
              id={product.date.toString()}
            />
          );  
      })}
      
      {/* <button className="create" onClick={() => navigate("/create_product")}>
        העלה מוצר
      </button> */}
    </Grid>
  );
}
