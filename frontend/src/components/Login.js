import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log( email, password);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid
        direction="column"
        container
        item
        xs={12}
        className="formWrapper"
        spacing={5}
      >
        <Grid dir="row" item xs={12}>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            variant="standard"
            placeholder=" כתובת מייל"
          ></TextField>
        </Grid>
        <Grid dir="row" item xs={12}>
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            variant="standard"
            placeholder=" מספר טלפון"
          ></TextField>
        </Grid>

        <Grid dir="row" item xs={12}>
          <Button type="submit" variant="contained">
            הרשם{" "}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
