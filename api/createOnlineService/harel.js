app.get("/add-onlineService", (req, res) => {
  const onlineService = new OnlineService({
    companyName: "harel",
    id: 5,
    coverServices: {
      neurology: false, //נוירולוגיה
      pediatrics: false, // רפואת ילדים
      radiology: false, // רדיולוגיה
      endocrinology: true, // אנדוקרינולוגיה
      childPsychiatrist: false, // פסיכיאטרית ילדים
      rheumatology: false, // ראומטולוגיה
      lung: false, // ריאות
      allergology: true, // אלרגולוגיה
      geriatrics: false, // גריאטריה
      oncology: true, // אונקולוגיה
      hematology: true, // המוטולוגיה
      gastroenterology: false, // גסטרואנטרולוגיה
      nephrology: true, // נפרולוגיה
      generalSurgery: true, // כירורגיה כללית
      medicineSkin: true, // רפואת עור
      sex: false, // מין
      medicalGenetics: false, // גנטיקה רפואית
      graduatePsychiatrist: false, // פסיכיאטרית בוגרים
      cardiology: true, // קרדיולוגיה
      orthopedics: true, // אורתופדיה
      urology: true, // אורולוגיה
      eyes: false, // עיניים
      aag: true, // א.א.ג
      gynecology: true, // גניקולוגיה
      infectiousMedicine: false, // רפואה זיהומית
      heartSurgery: false, // כירורגית לב
      breastSurgery: false, // כירורגיית חזה
      neurosurgery: false, // נוירוכירורגיה
      PainMedicine: true, // רפואת כאב
    },

    IsPsychiatryGeriatricsLungsInfectiousIncluded: false,
    numOfCoverServices: 17,
    waitingForFamilyOrChildrenDoctorInMinutes: 30,
    waitingForSpecialistDoctorInDays: 1,
    QualifyingPeriodInRoutine: 0,
    SelfParticipationSpecialistDoctor: 100,
    SelfParticipationFamilyChildrenDoctor: 0,
    SelfParticipationCollectOfMedicalInformation: 90,
    serviceProvaider: "BEKUR ROFEA",
    dedicatedApp: true,
    maxJoiningAge: 75,
    isStandAloneService: false,
    isMedicationOnlineConsulting: false,
    isDietitianOnlineAdvice: false,
    isMentalOnlineCounseling: false,
    prices: {
      20: 10.17,
      21: 15.04,
      22: 15.04,
      70: 15.04,
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
