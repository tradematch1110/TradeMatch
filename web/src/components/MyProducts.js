import React, { useEffect, useState, useContext } from "react";
import { Grid } from "@mui/material";
import CustomCard from "./Card";
import { getProductsPerUser } from "../services/api";
import { authContext } from "./../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Loader from './Loader';

export default function MyProducts() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [products, setProducts] = useState("");
  const { currentUser } = useContext(authContext);
  const navigate = useNavigate();

  useEffect(() => {
  },[])
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const res = await getProductsPerUser(currentUser.uid);
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
    fetchData();
  }, [error]);

  return (
    <>
      {error && <h1>{error}</h1>}
      {loading && <Loader />}
      {!loading && (
        <Grid item container justifyContent="center" className="create" xs={12}>
          <h1>המוצרים שלי</h1>
          <Grid item container justifyContent="center" xs={12} direction="row">
            {products &&
              products.map((product, index) => (
                <>
                  <CustomCard
                    {...product}
                    key={index + Math.random((5000000)*5).toString() + product._id}
                    id={product.date.toString()}
                  />
                  <div
                    key={Math.random(5000000).toString()}
                    className="myProductButton"
                  >
                    <button
                      key={
                        index + Math.random(5000000).toString() + product._id
                      }
                      onClick={() =>
                        navigate(`/updateProduct?name=${product._id}`)
                      }
                    >
                      עריכת מוצר
                    </button>
                  </div>
                </>
              ))}
          </Grid>
        </Grid>
      )}
    </>
  );
}
