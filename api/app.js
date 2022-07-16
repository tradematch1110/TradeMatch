/**********************************************************************************************
                ******* this file run the whole app srever service *******

    the flow:
    1. incoming request get to app.js file
    2. move to the startup route file
    3. move to the route direcory in to the specific route file
    4. the route handle all the middleware and return the result to the cleint
    
    app.js => stratup => routes => controllers => repositories
    
***********************************************************************************************/

// declere all the required consts
const winston = require("winston");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const logger = require("./startup/logger");

// temp ////////////////////////////////////////////////////
const { OnlineService } = require("./models/onlineService");

///////////////////////////////////////////////////
// init the app const to use the required services 

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); 

// use morgan to console log any incoming http request
app.use(morgan("tiny"));
logger.info("morgan enabled");
logger.info(app.get("env"));


// init (isdocker, routes, db moudles)
require("./startup/routes")(app);
require("./startup/db")(app);
require("./startup/isdocker")();
// require("./startup/logging")();












////////////////////////////////////// temp ////////////////////////////////////////////////////
// app.get("/add-onlineService", (req, res) => {
//   const onlineService = new OnlineService({
//     companyName: "megdal",
//     id: 1,
//     coverServices: {
//       neurology: true, //נוירולוגיה
//       pediatrics: true, // רפואת ילדים
//       radiology: true, // רדיולוגיה
//       endocrinology: true, // אנדוקרינולוגיה
//       childPsychiatrist: true, // פסיכיאטרית ילדים
//       rheumatology: true, // ראומטולוגיה
//       lung: true, // ריאות
//       allergology: true, // אלרגולוגיה
//       geriatrics: true, // גריאטריה
//       oncology: true, // אונקולוגיה
//       hematology: true, // המוטולוגיה
//       gastroenterology: true, // גסטרואנטרולוגיה
//       nephrology: true, // נפרולוגיה
//       generalSurgery: true, // כירורגיה כללית
//       medicineSkin: true, // רפואת עור
//       sex: true, // מין
//       medicalGenetics: true, // גנטיקה רפואית
//       graduatePsychiatrist: true, // פסיכיאטרית בוגרים
//       cardiology: true, // קרדיולוגיה
//       orthopedics: true, // אורתופדיה
//       urology: true, // אורולוגיה
//       eyes: true, // עיניים
//       aag: true, // א.א.ג
//       gynecology: true, // גניקולוגיה
//       infectiousMedicine: true, // רפואה זיהומית
//       heartSurgery: true, // כירורגית לב
//       breastSurgery: true, // כירורגיית חזה
//       neurosurgery: true, // נוירוכירורגיה
//       PainMedicine: true, // רפואת כאב
//     },

//     IsPsychiatryGeriatricsLungsInfectiousIncluded: true,
//     numOfCoverServices: 28,
//     waitingForFamilyOrChildrenDoctorInMinutes: 90,
//     waitingForSpecialistDoctorInDays: 3,
//     QualifyingPeriodInRoutine: 90,
//     SelfParticipationSpecialistDoctor: 120,
//     SelfParticipationFamilyChildrenDoctor: 0,
//     SelfParticipationCollectOfMedicalInformation: 90,
//     serviceProvaider: "BWELL",
//     dedicatedApp: true,
//     maxJoiningAge: 85,
//     isStandAloneService: true,
//     isMedicationOnlineConsulting: true,
//     isDietitianOnlineAdvice: true,
//     isMentalOnlineCounseling: true,
//     prices: {
//       20: 10.5,
//       21: 19.9,
//       22: 19.9,
//       70: 19.9,
//     },
//   });
//   onlineService
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// GET FROM THE SERVER
// app.get("/all", (request, response) => {
//   let rand = Math.floor(Math.random() * 100) + 1;
//   setTimeout(() => {
//     response.status(200); // 200 is OK
//     response.send(`ש"ח ${rand} עלות ביטוח החיים עברוך `);
//   }, 2000);
//   console.log("get request all: ", request.body);
//   //   const name = req.query.name || "World";
//   //   res.setHeader("Content-Type", "application/json");
//   //   res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
// });

// // Receive an request with credit information and send it to the server for a quote
// app.post("/add", (request, response) => {
//   console.log("request add:", request.body);
//   setTimeout(() => {
//     response.status(201); // 201 is CREATED
//     response.send({ message: "added successfully to the list" });
//   }, 4000);
// });

//
// app.get("/add-company", (req, res) => {
//   const company = new Company({
//     name: "harel",
//     id: 3,
//     products: [
//       {
//         name: "li",
//         cost: 60,
//         expire_time: 1,
//         service_rating: 5,
//         cover: {
//           cover_type: "full",
//           amount_of_meeting: 10,
//           deductible: 900,
//           first_meeting_frontal: true,
//           ways_to_contact: "www.megdal.co.il",
//         },
//       },
//     ],
//   });
//   company
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// });

// handle the noodmon restart
// mongoose.Promise = global.Promise;
// app.get("/add-company", (req, res) => {
//   const company = new Company({
//     name: "megdal",
//     id: 2,
//     products: [
//       {
//         name: "li",
//         coast: 60,
//         expire_time: 1,
//         service_rating: 5,
//         cover:
//           {
//             cover_type: "full",
//             amount_of_meeting: 10,
//             deductible: 900,
//             first_meeting_frontal: true,
//             ways_to_contact: "www.megdal.co.il",
//           }
//       },
//     ],
//   });
//   company.save()
//   .then((result) => {
//     res.send(result);
//   }).catch((err)=>{
//     console.log(err);
//   });
// })

// // UPDATE A PERSON IN THE LIST - BY THE NAME THAT IS GIVEN IN THE URL
// // THE DETAILS OF THE UPDATE ARE IN THE BODY
// app.put("/edit/:p", (request, response) => {
//   //Returns the value of the first element in the array
//   //where predicate is true, and undefined otherwise.
//   let person = peopleArray.find((e) => e.name == request.params.p);

//   if (person != undefined) {
//     person.age = request.body.age;
//   }
//   response.status(200); // 200 is OK
//   response.send();
// });

// // DELETE A PERSON FROM THE LIST - BY THE NAME THAT IS GIVEN IN THE URL
// app.delete("/delete/:p", (request, response) => {
//   //Returns the elements of an array that meet the condition
//   //specified in a callback function.
//   peopleArray = peopleArray.filter((e) => e.name != request.params.p);
//   response.status(204); // 204 is EMPTY RESPONSE
//   response.send();
// });
