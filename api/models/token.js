/**********************************************************************************************
                ******* this file generate Valid token  *******

  1. use jwt
  2. use admin & db consts that imported from stratup/db file
  3. export generateToken function
***********************************************************************************************/

const jwt = require("jsonwebtoken");
// const { db, admin } = require("../startup/db");

function generateToken(sessionDoc) {
  // try catch block
  console.log("sessionDoc: ", sessionDoc);
  console.log(
    "process.env.ACCESS_TOKEN_SECRET: ",
    process.env.ACCESS_TOKEN_SECRET
  );

  return jwt.sign(sessionDoc, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "90s",
  });
}

// const isSessionValid = async (sessionId) => {
//   const sessionRef = db.collection("sessions").doc(sessionId);
//   // try catch block
//   const doc = await sessionRef.get();

//   if (!doc.exists) {
//     console.log("No such document!");
//     return null;
//   } else {
//     const res = await sessionRef.update({
//       requestCounter: admin.firestore.FieldValue.increment(1),
//     });
//     const requestCounter = doc.data().requestCounter;
//     if (requestCounter <= 5) {
//       console.log("Document data:", doc.data());
//       return doc.data();
//     } else {
//       return null;
//       console.log("Not authorized session id");
//     }
//   }
// };

module.exports = { generateToken };
