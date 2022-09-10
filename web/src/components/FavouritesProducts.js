import React, { useLayoutEffect, useState, useContext } from "react";
import { Grid } from "@mui/material";
import CustomCard from "./Card";
import { getFavouritesProductsPerUser } from "../services/api";
import { authContext } from "./../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

export default function FavouritesProducts() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [products, setProducts] = useState("");
  const { currentUser, setCurrentUser, favouritesProducts } = useContext(
    authContext
  );
  const navigate = useNavigate();

  
  useLayoutEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await getFavouritesProductsPerUser(
        favouritesProducts
      );
      switch (res.statusId) {
        case 1:
          setProducts(res.value);
          console.log(res.value);
          setLoading(false);
          break;
        case 2:
          setError(res);
          setLoading(false);
          setTimeout(() => {
            setError("");
          }, 5000);
          break;
        default:
      }
    }
    if (favouritesProducts) fetchData();
  }, [favouritesProducts]);

  return (
    <>
      {error && <h1>{error}</h1>}
      {loading && <Loader />}
      {!loading && (
        <Grid item container justifyContent="center" className="create" xs={12} style={{marginTop: 50, marginBottom: 100} }>
          <h1>המועדפים שלי</h1>
          <Grid item container justifyContent="center" xs={12} direction="row">
            {products &&
              products.map((product, index) => (
                <>
                  <CustomCard
                    {...product}
                    key={
                      index + Math.random(5000000 * 5).toString() + product._id
                    }
                    id={product.date.toString()}
                  />
                  
                </>
              ))}
               {!products && <h2>רשימת המועדפים שלך ריקה תתחיל לתת בלייקים</h2>}
          </Grid>
        </Grid>
      )}
    </>
  );
}
