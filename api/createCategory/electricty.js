const { Category } = require("../models/category");

app.get("/add-category", (req, res) => {
  const categories =  [];
  categories.push(
    new Category({
      name: "מוצרי חשמל",
      id: "1",
      subCategories: ["תנור", "מחשב", "מסך", "טלוויזיה"],
    }))
    categories.push(
    new Category({
      name: "ריהוט",
      id: "2",
      subCategories: ["פינת אוכל", "סלון", "ספות", "ארונות"],
    }))
  
  categories.forEach((category) => {
    console.log(category);
    //   category
    //     .save()
    //     .then((result) => {
    //       res.send(result);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
  });
});


app.get("/add-category", (req, res) => {
  const category = new Category({
    name: "מוצרי חשמל",
    id: "1",
    subCategories: [
      "מקרר",
      "טלויזיה",
      "מכונת כביסה",
      "מזגן",
      "מכונת קפה",
      "DVD",
      "אופה לחם",
      "אחר",
      "בלנדר ומיקסר",
      "וידאו",
      "זרוע לטלוויזיה",
      "טוחן אשפה",
      "טוסטר",
      "טוסטר אובן",
      "טלויזיה",
      "טלפונים ואביזרים",
      "כיריים",
      "מאוורר",
      "מגהץ",
      "מדיח כלים",
      "מזגן",
      "מחברים וכבלים",
      "מטחנת בשר",
      "מטחנת קפה",
      "מטען לסוללות",
      "מיחם לשבת",
      "מייבש כביסה",
      "מיקרוגל",
      "מכונת גלידה",
      "מכונת כביסה",
      "מכונת קפה",
      "מכונת תפירה",
      "מכשירי פקס",
      "מנגל",
      "מסחטה",
      "מעבד מזון",
      "מפזר חום",
      "מקפיא",
      "מקרן",
      "מקרר",
      "מקרר יינות",
      "מקרר מיני בר",
      "מתקני / מטהרי מים",
      "ניקוי בקיטור",
      "סדין חשמלי",
      "סטרימר",
      "סיר בישול",
      "סיר טיגון",
      "פלטה חשמלית",
      "קולט אדים",
      "קומקום חשמלי",
      "רדיאטור",
      "שואבי אבק",
      "שלטים",
      "תנור אפייה",
      "תנור חימום",
    ],
  });
  category
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});