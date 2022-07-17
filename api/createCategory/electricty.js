const { Category } = require("../models/category");

app.get("/add-category", (req, res) => {
  const categories = new Category({
    name: "מוצרי חשמל",
    id: "1",
    subCategories: ["תנור", "מחשב", "מסך", "טלוויזיה"],
  });
  categories
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
