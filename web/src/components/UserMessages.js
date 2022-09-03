import React, { useContext, useState, useEffect } from "react";
import { authContext } from "../contexts/AuthContext";
import { getUserMessages } from "../services/api";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { CardActions, Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import CustomCard from "./Card";

export default function UserMessages() {
  const { currentUser } = useContext(authContext);

  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // fetch to server
    async function fetchData(uid, token) {
      const res = await getUserMessages(uid, token);
      console.log("respond from messages: ", res);
      switch (res.statusId) {
        case 1:
          setMessages(res.value);
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
    if (currentUser) fetchData(currentUser.uid, currentUser.accessToken);
  }, [currentUser]);

  return (
    <div style={{ paddingTop: 50 }}>
      {messages &&
        messages.map((message, index) => {
          return (
            <Grid
              item
              container
              justifyContent="center"
              xs={12}
              direction="row"
              className="message"
            >
              <h1>
                {currentUser.firstName} {message.message}
              </h1>
              <h1>
                התקבלה ב: {new Date(message.date).toLocaleDateString("en-GB")}{" "}
                {`${new Date(message.date).getHours()}:${new Date(
                  message.date
                ).getMinutes()}`}
              </h1>
              <Grid
                item
                container
                justifyContent="center"
                className="create"
                xs={12}
              >
                <CustomCard {...message.product} />
              </Grid>
            </Grid>
          );
        })}
    </div>
  );
}
