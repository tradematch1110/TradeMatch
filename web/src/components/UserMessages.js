import React, { useContext, useState, useEffect, useLayoutEffect } from "react";
import { authContext } from "../contexts/AuthContext";
import { getProductsByList, getUserMessages } from "../services/api";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { CardActions, Typography } from "@material-ui/core";
import CustomCard from "./Card";
import Loader from "./Loader";
import { getProductById, deleteUserMessages } from "./../services/api";
import { Button } from "react-bootstrap";

export default function UserMessages() {
  const { currentUser, userMessages, setUserMessages } = useContext(
    authContext
  );

  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [products, setProducts] = useState([]);

  const updateUserMessages = async () => {
    const res = await getUserMessages(currentUser.uid);
    switch (res.statusId) {
      case 1:
        setUserMessages(res.value);
        setMessages(res.value);
        setLoading(false);
        break;
      case 2:
        setTimeout(() => {
          setError("");
        }, 5000);
        break;
      default:
    }
  };

  const handleDeleteMessage = async (productId) => {
    setLoading(true);
    const res = await deleteUserMessages(currentUser.uid, productId);
    console.log("resposnd from messages deleteUserMessages: ", res);
    switch (res.statusId) {
      case 1:
        updateUserMessages();
        break;
      case 2:
        setError(res);
        setTimeout(() => {
          setError("");
        }, 5000);
        break;
      default:
    }
  };
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
                <Grid container item justifyContent="center">
                  <Button
                    style={{
                      fontWeight: "600",
                      width: 180,
                      marginTop: 20,
                      marginBottom: 20,
                      alignContent: "center",
                    }}
                    variant="danger"
                    onClick={() => handleDeleteMessage(message.productId)}
                  >
                    מחק הודעה
                  </Button>
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
