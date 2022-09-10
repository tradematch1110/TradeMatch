import React, { useContext, useState, useEffect, useLayoutEffect } from "react";
import { authContext } from "../contexts/AuthContext";
import { getProductsByList, getUserMessages } from "../services/api";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { CardActions, Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import CustomCard from "./Card";
import Loader from "./Loader";
import { getProductById } from "./../services/api";

export default function UserMessages() {
  const { currentUser, userMessages } = useContext(authContext);

  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [products, setProducts] = useState([]);

  async function getProducts(list) {
    console.log("getproduct id -------------------------- :", list);
    const res = await getProductsByList(list);
    console.log("resposnd from messages getProduct: ", res);
    switch (res.statusId) {
      case 1:
        setProducts(res.value);
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

  useLayoutEffect(() => {
    // fetch to server
    console.log("userMessages component:", userMessages);
    setLoading(true);
    let list = [];
    if (userMessages && currentUser) {
      userMessages.forEach((element) => {
        list.push(element.productId);
      });
      getProducts(list);
    }
  }, [currentUser, userMessages]);

  return (
    <>
      <div style={{ paddingTop: 50, marginBottom: 100 }}>
        {error && <h1>{error.message}</h1>}
        {loading && <Loader />}
        {!loading &&
          products.length > 0 &&
          currentUser &&
          userMessages &&
          userMessages.map((message, index) => {
            return (
              <Grid
                item
                container
                justifyContent="center"
                xs={12}
                direction="row"
                className="message"
                key={index + Math.random(5000000 * 5).toString()}
              >
                <Grid container item direction="column">
                  <h1>
                    {currentUser.firstName} {message.message}
                  </h1>
                </Grid>
                <Grid container item direction="column">
                  <h1>
                    התקבלה ב:{" "}
                    {new Date(message.date).toLocaleDateString("en-GB")}{" "}
                    {`${new Date(message.date).getHours()}:${new Date(
                      message.date
                    ).getMinutes()}`}
                  </h1>
                </Grid>
                <Grid
                  item
                  container
                  justifyContent="center"
                  className="create"
                  xs={12}
                  key={Math.random(5000000 * 5).toString()}
                >
                  <CustomCard {...products[index]} />
                </Grid>
              </Grid>
            );
          })}
        {loading && <Loader />}
      </div>
      {!loading && products.length === 0 && currentUser && userMessages && (
        <Grid
          item
          container
          justifyContent="center"
          className="create"
          xs={12}
          style={{ marginTop: 50 }}
        >
          <Grid
            item
            container
            justifyContent="center"
            xs={12}
            direction="row"
            spacing={5}
            style={{ marginTop: 50 }}
          >
            <h1>טרם התקבלו עבורך הודעות!</h1>
          </Grid>
        </Grid>
      )}
    </>
  );
}
