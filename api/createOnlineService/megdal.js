app.get("/add-onlineService", (req, res) => {
  const onlineService = new OnlineService({
    companyName: "megdal",
    id: 1,
    coverServices: {
      neurology: true, //נוירולוגיה
      pediatrics: true, // רפואת ילדים
      radiology: true, // רדיולוגיה
      endocrinology: true, // אנדוקרינולוגיה
      childPsychiatrist: true, // פסיכיאטרית ילדים
      rheumatology: true, // ראומטולוגיה
      lung: true, // ריאות
      allergology: true, // אלרגולוגיה
      geriatrics: true, // גריאטריה
      oncology: true, // אונקולוגיה
      hematology: true, // המוטולוגיה
      gastroenterology: true, // גסטרואנטרולוגיה
      nephrology: true, // נפרולוגיה
      generalSurgery: true, // כירורגיה כללית
      medicineSkin: true, // רפואת עור
      sex: true, // מין
      medicalGenetics: true, // גנטיקה רפואית
      graduatePsychiatrist: true, // פסיכיאטרית בוגרים
      cardiology: true, // קרדיולוגיה
      orthopedics: true, // אורתופדיה
      urology: true, // אורולוגיה
      eyes: true, // עיניים
      aag: true, // א.א.ג
      gynecology: true, // גניקולוגיה
      infectiousMedicine: true, // רפואה זיהומית
      heartSurgery: true, // כירורגית לב
      breastSurgery: true, // כירורגיית חזה
      neurosurgery: true, // נוירוכירורגיה
      PainMedicine: true, // רפואת כאב
    },

    IsPsychiatryGeriatricsLungsInfectiousIncluded: true,
    numOfCoverServices: 28,
    waitingForFamilyOrChildrenDoctorInMinutes: 90,
    waitingForSpecialistDoctorInDays: 3,
    QualifyingPeriodInRoutine: 90,
    SelfParticipationSpecialistDoctor: 120,
    SelfParticipationFamilyChildrenDoctor: 0,
    SelfParticipationCollectOfMedicalInformation: 90,
    serviceProvaider: "BWELL",
    dedicatedApp: true,
    maxJoiningAge: 85,
    isStandAloneService: true,
    isMedicationOnlineConsulting: true,
    isDietitianOnlineAdvice: true,
    isMentalOnlineCounseling: true,
    prices: {
      20: 10.5,
      21: 19.9,
      22: 19.9,
      70: 19.9,
      75: 19.9
    },
  });
  onlineService
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
