import React, { useContext, useState, useEffect } from "react";
import { authContext } from "../contexts/AuthContext";
import { getUserMassages } from "./../services/api";
import { Grid } from "@mui/material";

export default function UserMassages() {
  const { currentUser } = useContext(authContext);

  const [massages, setMassages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // fetch to server
    async function fetchData(uid, token) {
      const res = await getUserMassages(uid, token);
      console.log("respond from massages: ", res);
      switch (res.statusId) {
        case 1:
          setMassages(res.value);
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
    <div>
      {massages &&
        massages.map((massage, index) => {
          return (
            <Grid
              direction={"column"}
              key={index}
              container
              item
              xs={12}
              md={6}
              spacing={2}
            >
              <h3> תוכן ההודעה : {massage.massage}</h3>
              <h4>{massage.product.produectTitle}</h4>
              <h4>{massage.product.user.firstName}</h4>
              <p>{new Date(massage.date).toLocaleDateString("en-GB")}</p>
              <p>{`${new Date(massage.date).getHours()}:${new Date(
                massage.date
              ).getMinutes()}`}</p>
            </Grid>
          );
        })}
    </div>
  );
}
