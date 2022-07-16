const db = require("../db");
const Ref = db.collection("testCollection");

const testGetAll = (async (req, res) => {
    console.log("test")
  const snapshot = await Ref.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  console.log(list);
  res.status(200);
  res.send(list);
});


module.exports = {
  testGetAll
};
