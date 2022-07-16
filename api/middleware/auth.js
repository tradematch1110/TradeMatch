/**********************************************************************************************
                ******* this file is middleare that handle JWT token validation *******

    1. use jsonwebtoken
    
***********************************************************************************************/

const jwt = require("jsonwebtoken");
// const { logRef, admin } = require("../startup/db");

// function that check if token exist in the header request 
// check if the token is valid
// and move the request to the next middleware

function authToken(req, res, next) {
  // console.log(req.headers["authorization"]);
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  // const userId = req.body.currentUserId ? req.body.currentUserId : null;
  // const sessionId = req.body.sessionId ? req.body.sessionId : null;

  if (!token) {
    res.status(401).send("No token");
    throw Error("No token provaided");
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
    if (err) {
      res.status(403).send("Invalid token");
      throw Error("Invalid token");
    }
    next();
  });
}

// async function isSessionValid (req, res, next) {
//   const sessionId = req.body.sessionId;
//   const sessionRef = db.collection("sessions").doc(sessionId);
//   // try catch block
//   const doc = await sessionRef.get();

//   if (!doc.exists) {
//     console.log("No such document!");
//     return res.status(401).send("No such document!");
//   }
//   const requestCounter = doc.data().requestCounter;
//   if (requestCounter > 5) {
//     return res.status(401).send("Session not valid");
//   }

//   const update = await sessionRef.update({
//     requestCounter: admin.firestore.FieldValue.increment(1),
//   });
//   console.log("Document data:", doc.data());
//   next();
// };

module.exports = authToken;
