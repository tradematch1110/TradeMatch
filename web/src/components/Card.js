import React, {useEffect, useState} from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";



export default function CustomCard(props) {
  const ulStyle = { border: "0.5px solid #66666",
  borderRadius: 20,
  margin: 20,
  boxShadow: "0 1px 8px 0 #d0d0d0",

};
  const [cardValues, setCardValues] = useState({
    userAbbreviations: "",
    produectTitle: "",
    date: "",
    images: "",
    descriptions: "",
    category: "",
    subCategory: "",
  });
  const temp = {
    userAbbreviations: "א.ד",
    produectTitle: "טלוויזיה",
    date: "12.4.2022",
    images: require('../images/tv.jpeg'),
    descriptions: `טלוויזיה אחלומניוקי חדשה.
    42 אינץ.
    לא יורד אגורה.
    ומי שלא טוב לו יום טוב לו.`,
    category: "מוצרי חשמל",
    subCategory: "טלוויזיות",
  };
  useEffect(() => {
    setCardValues(temp);
  }, [cardValues]);

  return (
    <Card sx={{ maxWidth: 345 }} style={ulStyle}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500], marginLeft: 2 }} aria-label="recipe">
            {cardValues && cardValues.userAbbreviations}
          </Avatar>
        }
        title={cardValues && cardValues.produectTitle}
        subheader={cardValues && cardValues.date}
      />
      <CardMedia
        component="img"
        height="194"
        width="194"
        // image=""
        image={cardValues && cardValues.images}
        alt="Tv"
      />
      <CardContent>
          <Typography variant="body1" color="text.secondary">
            {cardValues && cardValues.descriptions}
          </Typography>
      </CardContent>
      <CardActions disableSpacing></CardActions>
    </Card>
  );
}
