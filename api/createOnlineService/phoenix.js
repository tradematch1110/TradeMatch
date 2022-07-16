app.get("/add-onlineService", (req, res) => {
  const onlineService = new OnlineService({
    companyName: "phoenix",
    id: 4,
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
    numOfCoverServices: 27,
    waitingForFamilyOrChildrenDoctorInMinutes: 90,
    waitingForSpecialistDoctorInDays: 5,
    QualifyingPeriodInRoutine: 30,
    SelfParticipationSpecialistDoctor: 120,
    SelfParticipationFamilyChildrenDoctor: 0,
    SelfParticipationCollectOfMedicalInformation: 90,
    serviceProvaider: "FEMI PREMIUM",
    dedicatedApp: false,
    maxJoiningAge: 85,
    isStandAloneService: false,
    isMedicationOnlineConsulting: false,
    isDietitianOnlineAdvice: false,
    isMentalOnlineCounseling: false,
    prices: {
      20: 8.02,
      21: 8.02,
      22: 16.5,
      70: 16.5,
      75: 16.5
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
