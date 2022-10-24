import React, { useState } from "react";
import { allCategories } from "../resourcees/categories";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Tooltip from "@mui/material/Tooltip";
import { Grid } from "@material-ui/core";
const english = /^[A-Za-z0-9]*$/;
export default function SearchDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [searchTextValue, setsearchTextValue] = useState("");

    const handleFreeSearch = async (value) => {
      console.log(value);
      let subCategories = allCategories.find((category) =>
        category.subCategories.find((name) => name.includes(value))
      );
      let result;
      if (subCategories) {
        result = subCategories.subCategories.find((name) => name.match(value));
      }
      if (subCategories) {
        setsearchTextValue(
          `קטגוריה ראשית: ${subCategories.name}, קטגוריה משנית:  ${result}`
        );
      }
      console.log(searchTextValue);
    };

  // const handleFreeSearch = async (value) => {
  //   console.log("value: ", value.toUpperCase());
  //   let subCategories = allCategories.find((category) =>
  //     category.subCategories.find((name) => name.includes(value))
  //   );

  //   let result;
  //   if (subCategories) {
  //     result = subCategories.subCategories.find((name) => {
  //       english.test(name)
  //         ? name.toUpperCase().startsWith(value.toUpperCase())
  //         : name.startsWith(value);
  //     });
  //   }

  //   if (subCategories && result) {
  //     setsearchTextValue(
  //       `\n קטגוריה ראשית: ${subCategories.name} 
  //       \n קטגוריה משנית: ${result}`
  //     );
  //   }
  //   console.log("subCategories:", subCategories);
  //   console.log("result:", result);

  //   console.log("searchTextValue:", searchTextValue);
  //   if (!value) setsearchTextValue("");
  // };
  return (
    <div>
      <Tooltip title="צריך עזרה לאפיין את המוצר שלך? לחץ כאן!" arrow>
        <HelpOutlineIcon
          style={{ color: "#370bd4", marginRight: 10, marginBottom: 5 }}
          variant="outlined"
          onClick={handleClickOpen}
        />
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          אנחנו נעזור לך לאפיין את המוצר שלך
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            הקלד את שם המוצר שלך!
          </DialogContentText>
          <Grid direction={"column"} item container xs={12}>
            <input
              type="text"
              name="search"
              placeholder={"חיפוש חופשי"}
              onChange={(e) => handleFreeSearch(e.target.value)}
            ></input>
          </Grid>
          <Grid
            direction={"column"}
            item
            container
            alignItems="flex-start"
            xs={12}
          >
            {searchTextValue && (
              <h6
                style={{
                  marginTop: 10,
                  color: "blue",
                  whiteSpace: "pre-wrap",
                }}
              >
                {searchTextValue}
              </h6>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>סגור</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
