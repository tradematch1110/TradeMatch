import React, { useEffect, useState, useContext } from "react";
import { Grid } from "@mui/material";
import CustomCard from "./Card";
import { getProductsPerUser } from "../services/api";
import { authContext } from "./../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function MyProducts() {
  const [error, setError] = useState("");
  const [products, setProducts] = useState("");
  const { currentUser } = useContext(authContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const res = await getProductsPerUser(currentUser.uid);
      switch (res.statusId) {
        case 1:
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
      <h1>המוצרים שלי</h1>
      <Grid item container justifyContent="center" xs={12} direction="row">
        {products &&
          products.map((product, index) => (
            <Grid
              item
              container
              justifyContent="center"
              xs={12}
             
            >
              <CustomCard
                {...product}
                key={index + product._id}
                id={product.date.toString()}
              />
              <br />
              <button
                
                onClick={() => navigate(`/updateProduct?name=${product._id}`)}
              >
                עריכת מוצר
              </button>
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
}
