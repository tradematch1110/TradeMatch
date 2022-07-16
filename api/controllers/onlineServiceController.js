/**********************************************************************************************
                ******* this file contains functions for doctors online service routes  *******

  1. use logger2 to logs input output file 
  2. use logger // not in use
  3. use OnlineService object 
  4. export [getAllOnlineService, getOnlineServiceByName, getPriceOffer] functions 
  5. contains to helper function getAvgByAge and getCompaniesRate for 
     => getPriceOffer middleware function
***********************************************************************************************/

const { OnlineService } = require('./../models/onlineService')
const Logger2 = require('../startup/logger2')
const {
  getCompaniesByMaxJoiningAge,
  isStandAloneService,
  getCompanyByName,
  getAllCompanies,
} = require('../repositories/onlineServicesRepository')
// get price offer function
const getPriceOffer = async (req, res) => {
  console.log(req.body)
  Logger2.debug('-------------- request body --------------')
  Logger2.debug(req.body)
  userData = req.body
  ////////////////////////////////////////////////////////////////////////////////
  console.log('*** step 1 find companies and filter by age  ***')
  // convert user age => to key for get price by key
  let age = 0
  if (userData.age <= 20) age = 20
  else if (userData.age == 21) age = 21
  else if (userData.age >= 22 && userData.age <= 69) age = 22
  else if (userData.age >= 70 && userData.age <= 75) age = 70
  else if (userData.age > 75 && userData.age <= 85) age = 75

  // get companies Filter By Max Join Age
  const companiesFilterByMaxJoinAge = await getCompaniesByMaxJoiningAge(
    userData.age,
  )
  var companies = []
  // STEP 1 add companies from DB to local companies Array Filtered By Max Join Age and is Stand Alone Service
  companiesFilterByMaxJoinAge.forEach((company) => {
    console.log(company.companyName, company.isStandAloneService)
    companies.push(company)
  })

  // get avg by age
  const avg = await getAvgByAge(age)
  // calculate companies rate and craete COMPANIES object with {companyName: rate}
  console.log('*** calculate companies rate  ***')
  const companiesRate = getCompaniesRate(companies, age, avg)
  console.log(companiesRate)
  Logger2.debug('-------------- companiesRate --------------')
  Logger2.debug(companiesRate)

  // STEP 2 filter companies by is standalone service and user has life insurance
  console.log(
    '*** step 2 filter companies by is standalone service and user has life insurance ***',
  )
  companies = companies.filter((company) => {
    if (
      company.isStandAloneService == true ||
      company.companyName == userData.company.toLowerCase()
    )
      return company
  })
  companies.forEach((company) => {
    console.log(company.companyName, company.isStandAloneService)
  })
  // STEP 3 filter companies Is Psychiatry Geriatrics Lungs Infectious Included
  console.log(
    '*** step 3 filter companies IsPsychiatryGeriatricsLungsInfectiousIncluded ***',
  )
  if (userData.isPsychiatryGeriatricsLungAndInfectiousDisease == true) {
    companies = companies.filter((company) => {
      if (company.IsPsychiatryGeriatricsLungsInfectiousIncluded == true)
        return company
    })
  }
  companies.forEach((company) => {
    console.log(company.companyName, company.isStandAloneService)
  })
  // STEP 4 filter companies dy is Online Psychological Counseling Or Medication Counseling Or Dietitian
  console.log(
    '*** step 4 filter companies dy isOnlinePsychologicalCounseling  ***',
  )
  if (userData.isOnlinePsychologicalCounseling == true)
    companies = companies.filter((company) => {
      if (
        // company.isMedicationOnlineConsulting == true &&
        // company.isDietitianOnlineAdvice == true &&
        company.isMentalOnlineCounseling == true
      )
        return company
    })

  companies.forEach((company) => {
    console.log(company.companyName, company.isStandAloneService)
  })
  console.log(
    '*** step 5 filter companies dy isOnlineMedicationCounselingOrDietitian  ***',
  )

  if (userData.isOnlineMedicationCounselingOrDietitian == true)
    companies = companies.filter((company) => {
      if (
        company.isMedicationOnlineConsulting == true &&
        company.isDietitianOnlineAdvice == true
        // company.isMentalOnlineCounseling == true
      )
        return company
    })

  companies.forEach((company) => {
    console.log(company.companyName, company.isStandAloneService)
  })
  // STEP 5 filter companies dy is Children Under Eighteen
  console.log('*** step 6 filter companies dy isChildrenUnderEighteen ***')
  if (userData.isChildrenUnderEighteen == true)
    companies = companies.filter((company) => {
      if (company.coverServices.pediatrics == true) return company
    })
  companies.forEach((company) => {
    console.log(company.companyName, company.isStandAloneService)
  })
  // STEP 6 set the price by compere the rate of the companies
  console.log('*** step 7  price ***')

  let price = 0
  let name = ''
  let id = ''
  let rateCompany = 0
  companies.forEach((company) => {
    if (companiesRate[`${company.companyName}`]) {
      if (companiesRate[`${company.companyName}`] > rateCompany) {
        price = company.prices[`${age}`]
        name = company.companyName
        id = company.id
        rateCompany = companiesRate[`${company.companyName}`]
      }
    }
  })
  Logger2.debug(
    '-------------- Companies that have reached the final stage --------------',
  )

  companies.forEach((company) => {
    console.log(company.companyName, ' ', company.prices[`${age}`])
    Logger2.debug(
      `company: ${company.companyName}, price: ${company.prices[age]}`,
    )
  })
  // send respond

  Logger2.debug('-------------- result --------------')
  Logger2.debug(`company: ${name}, price: ${price}`)
  var Result;
  companies.forEach((company) => {
    if (company.companyName == name) {
       Result = ({ ... company}._doc)
    }
  })
  console.log('-------------- finalResult --------------')
  console.log(Result)
  // const finalResult = { ...Result }
  delete Result.companyName
  delete Result.coverServices
  delete Result._id
  delete Result.prices
  delete Result.createdAt
  delete Result.updatedAt
  delete Result.__v
  Result.price = price

  console.log('-------------- finalResult final typeof--------------')
  console.log(Result)

  res.status(200)
  res.send(Result)

  // res.send({
  //   price: price,
  //   company: name, // remove latter
  //   id: id
  // });
}

////////////////////////////////////////////////////////////////////////////////////////
// get all doctors online service companies
const getAllOnlineService = async (req, res) => {
  const companies = await getAllCompanies()
  res.status(200)
  res.send(companies)
}

////////////////////////////////////////////////////////////////////////////////////////
// get doctors online service by company name

const getOnlineServiceByName = async (req, res) => {
  const onlineService = await OnlineService.findOne({
    companyName: `${req.params.name}`,
  })
  res.send(onlineService)
}

module.exports = {
  getAllOnlineService,
  getOnlineServiceByName,
  getPriceOffer,
}

// const company = (req.body.company).toLowerCase();
// const companyName = await OnlineService.findOne({
//   companyName: `${company}`,
// });

////////////////////////////////////////// helper functions //////////////////
// A function which gets the age of the user and then turns to the data structure
// to get all the companies which have a price for that age.
// The function calculates the average price according to the price per age
// in all companies that support the received age and returns the average price

async function getAvgByAge(age) {
  let sum = 0
  let count = 0
  const companies = await getAllCompanies()
  companies.forEach((company) => {
    if (company.prices[`${age}`]) {
      sum += company.prices[`${age}`]
      count++
    }
  })
  let avg = sum / count
  console.log(`age: ${age}, avg: ${avg}`)
  return avg
}

/*
    A function that receives an array of companies, age and average price per age.
    Goes over the parameters and of all the companies and on each parameter gives
    a score according to the logic.
    The function is an object that contains as a key the company name and the score as a value.
*/
function getCompaniesRate(companies, age, avg) {
  const companiesRate = {}
  let rate = 0
  companies.forEach((company) => {
    rate = 0
    /// waitingForFamilyOrChildrenDoctorInMinutes
    if (company.waitingForFamilyOrChildrenDoctorInMinutes < 90) {
      rate += 5
      console.log(
        `waiting For Family Or Children Doctor In Minutes: ${
          company.waitingForFamilyOrChildrenDoctorInMinutes
        } company name: ${company.companyName} rate: ${5}`,
      )
    } else if (company.waitingForFamilyOrChildrenDoctorInMinutes >= 90) {
      rate += 4
      console.log(
        `waiting For Family Or Children Doctor In Minutes: ${
          company.waitingForFamilyOrChildrenDoctorInMinutes
        } company name: ${company.companyName} rate: ${4}`,
      )
    }
    /// waitingForSpecialistDoctorInDays
    if (company.waitingForSpecialistDoctorInDays < 3) {
      rate += 5
      console.log(
        `waiting For Specialist Doctor In Days: ${
          company.waitingForSpecialistDoctorInDays
        } company name: ${company.companyName} rate: ${5}`,
      )
    } else if (company.waitingForSpecialistDoctorInDays == 3) {
      rate += 3
      console.log(
        `waiting For Specialist Doctor In Days: ${
          company.waitingForSpecialistDoctorInDays
        } company name: ${company.companyName} rate: ${3}`,
      )
    } else if (company.waitingForSpecialistDoctorInDays > 3) {
      rate += 1
      console.log(
        `waiting For Specialist Doctor In Days: ${
          company.waitingForSpecialistDoctorInDays
        } company name: ${company.companyName} rate: ${1}`,
      )
    }
    ///  QualifyingPeriodInRoutine
    if (company.QualifyingPeriodInRoutine < 30) {
      rate += 5
      console.log(
        `Qualifying Period In Routine: ${
          company.QualifyingPeriodInRoutine
        } company name: ${company.companyName} rate: ${5}`,
      )
    } else if (company.QualifyingPeriodInRoutine == 30) {
      rate += 3
      console.log(
        `Qualifying Period In Routine: ${
          company.QualifyingPeriodInRoutine
        } company name: ${company.companyName} rate: ${3}`,
      )
    } else if (company.QualifyingPeriodInRoutine > 30) {
      rate += 1
      console.log(
        `Qualifying Period In Routine: ${
          company.QualifyingPeriodInRoutine
        } company name: ${company.companyName} rate: ${1}`,
      )
    }
    ///  SelfParticipationSpecialistDoctor
    if (company.SelfParticipationSpecialistDoctor < 120) {
      rate += 5
      console.log(
        `Self Participation Specialist Doctor: ${
          company.SelfParticipationSpecialistDoctor
        } company name: ${company.companyName} rate: ${5}`,
      )
    } else if (company.SelfParticipationSpecialistDoctor == 120) {
      rate += 4
      console.log(
        `Self Participation Specialist Doctor: ${
          company.SelfParticipationSpecialistDoctor
        } company name: ${company.companyName} rate: ${4}`,
      )
    } else if (company.SelfParticipationSpecialistDoctor > 120) {
      rate += 3
      console.log(
        `Self Participation Specialist Doctor: ${
          company.SelfParticipationSpecialistDoctor
        } company name: ${company.companyName} rate: ${3}`,
      )
    }
    ///  SelfParticipationFamilyChildrenDoctor
    if (company.SelfParticipationFamilyChildrenDoctor == 0) {
      rate += 5
      console.log(
        `Self Participation Family Children Doctor: ${
          company.SelfParticipationFamilyChildrenDoctor
        } company name: ${company.companyName} rate: ${5}`,
      )
    } else if (company.SelfParticipationFamilyChildrenDoctor > 0) {
      rate += 3
      console.log(
        `Self Participation Family Children Doctor: ${
          company.SelfParticipationFamilyChildrenDoctor
        } company name: ${company.companyName} rate: ${3}`,
      )
    }
    ///  SelfParticipationCollectOfMedicalInformation
    if (company.SelfParticipationCollectOfMedicalInformation == 90) {
      rate += 5
      console.log(
        `Self Participation Collect Of Medical Information: ${
          company.SelfParticipationCollectOfMedicalInformation
        } company name: ${company.companyName} rate: ${5}`,
      )
    } else if (company.SelfParticipationCollectOfMedicalInformation > 90) {
      rate += 4
      console.log(
        `Self Participation Collect Of Medical Information: ${
          company.SelfParticipationCollectOfMedicalInformation
        } company name: ${company.companyName} rate: ${4}`,
      )
    }
    // age 0-20 - avg 10.82
    if (company.prices[`${age}`]) {
      // let avg = 10.82;
      if (company.prices[`${age}`] <= avg * 0.7) {
        rate += 5
        console.log(
          `ageKey: ${age} company name: ${company.companyName} rate: ${5}`,
        )
      } else if (
        company.prices[`${age}`] <= avg * 0.8 &&
        company.prices[`${age}`] > avg * 0.7
      ) {
        rate += 4.75
        console.log(
          `ageKey: ${age} company name: ${company.companyName} rate: ${4.75}`,
        )
      } else if (
        company.prices[`${age}`] <= avg * 0.9 &&
        company.prices[`${age}`] > avg * 0.8
      ) {
        rate += 4.5
        console.log(
          `ageKey: ${age} company name: ${company.companyName} rate: ${4.5}`,
        )
      } else if (
        company.prices[`${age}`] <= avg &&
        company.prices[`${age}`] > avg * 0.9
      ) {
        rate += 4
        console.log(
          `ageKey: ${age} company name: ${company.companyName} rate: ${4}`,
        )
      } else if (
        company.prices[`${age}`] > avg &&
        company.prices[`${age}`] < avg * 1.05
      ) {
        rate += 3.5
        console.log(
          `ageKey: ${age} company name: ${company.companyName} rate: ${3.5}`,
        )
      } else if (
        company.prices[`${age}`] >= avg * 1.05 &&
        company.prices[`${age}`] < avg * 1.1
      ) {
        rate += 3
        console.log(
          `ageKey: ${age} company name: ${company.companyName} rate: ${3}`,
        )
      } else if (
        company.prices[`${age}`] >= avg * 1.1 &&
        company.prices[`${age}`] < avg * 1.15
      ) {
        rate += 2
        console.log(
          `ageKey: ${age} company name: ${company.companyName} rate: ${2.5}`,
        )
      } else if (company.prices[`${age}`] >= avg * 1.15) {
        rate += 1
        console.log(
          `ageKey: ${age} company name: ${company.companyName} rate: ${2}`,
        )
      }
    }

    companiesRate[`${company.companyName}`] = rate
  })
  return companiesRate
}

// function getCompaniesRate(companies, age, avg) {
//   const companiesRate = {};
//   let rate = 0;
//   companies.forEach((company) => {
//     rate = 0;
//     /// waitingForFamilyOrChildrenDoctorInMinutes
//     if (company.waitingForFamilyOrChildrenDoctorInMinutes < 90) {
//       rate += 5;
//     } else if (company.waitingForFamilyOrChildrenDoctorInMinutes >= 90) {
//       rate += 4;
//     }
//     /// waitingForSpecialistDoctorInDays
//     if (company.waitingForSpecialistDoctorInDays < 3) {
//       rate += 5;
//     } else if (company.waitingForSpecialistDoctorInDays == 3) {
//       rate += 3;
//     } else if (company.waitingForSpecialistDoctorInDays > 3) {
//       rate += 1;
//     }
//     ///  QualifyingPeriodInRoutine
//     if (company.QualifyingPeriodInRoutine < 30) {
//       rate += 5;
//     } else if (company.QualifyingPeriodInRoutine == 30) {
//       rate += 3;
//     } else if (company.QualifyingPeriodInRoutine > 30) {
//       rate += 1;
//     }
//     ///  SelfParticipationSpecialistDoctor
//     if (company.SelfParticipationSpecialistDoctor < 120) {
//       rate += 5;
//     } else if (company.SelfParticipationSpecialistDoctor == 120) {
//       rate += 3;
//     } else if (company.SelfParticipationSpecialistDoctor > 120) {
//       rate += 1;
//     }
//     ///  SelfParticipationFamilyChildrenDoctor
//     if (company.SelfParticipationFamilyChildrenDoctor == 0) {
//       rate += 5;
//     } else if (company.SelfParticipationFamilyChildrenDoctor > 0) {
//       rate += 3;
//     }
//     ///  SelfParticipationCollectOfMedicalInformation
//     if (company.SelfParticipationCollectOfMedicalInformation == 90) {
//       rate += 5;
//     } else if (company.SelfParticipationCollectOfMedicalInformation > 90) {
//       rate += 3;
//     }
//     // age 0-20 - avg 10.82
//     if (age == 20) {
//       // let avg = 10.82;
//       if (company.prices[`${age}`] < avg - 2) {
//         rate += 5;
//         console.log(
//           `ageKey: ${age} company name: ${company.companyName} rate: ${rate}`
//         );
//       } else if (
//         company.prices[`${age}`] <= avg &&
//         company.prices[`${age}`] >= avg - 2
//       ) {
//         rate += 4;
//         console.log(
//           `ageKey: ${age} company name: ${company.companyName} rate: ${rate}`
//         );
//       } else if (
//         company.prices[`${age}`] > avg &&
//         company.prices[`${age}`] < avg + 3
//       ) {
//         rate += 2;
//         console.log(
//           `ageKey: ${age} company name: ${company.companyName} rate: ${rate}`
//         );
//       } else if (company.prices[`${age}`] > avg + 3) {
//         rate += 1;
//         console.log(
//           `ageKey: ${age} company name: ${company.companyName} rate: ${rate}`
//         );
//       }
//     }
//     // age 21 - avg 15.04
//     else if (age == 21) {
//       // let avg = 15.04;
//       if (company.prices[`${age}`] < avg - 6) {
//         rate += 5;
//         console.log(
//           `ageKey: ${age} company name: ${company.companyName} rate: ${rate}`
//         );
//       } else if (
//         company.prices[`${age}`] <= avg &&
//         company.prices[`${age}`] >= avg - 6
//       ) {
//         rate += 4;
//         console.log(
//           `ageKey: ${age} company name: ${company.companyName} rate: ${rate}`
//         );
//       } else if (
//         company.prices[`${age}`] > avg &&
//         company.prices[`${age}`] < avg + 3
//       ) {
//         rate += 2;
//         console.log(
//           `ageKey: ${age} company name: ${company.companyName} rate: ${rate}`
//         );
//       } else if (company.prices[`${age}`] > avg + 3) {
//         rate += 1;
//         console.log(
//           `ageKey: ${age} company name: ${company.companyName} rate: ${rate}`
//         );
//       }
//     }
//     // age 22-69 - avg 16.37
//     else if (age == 22) {
//       // let avg = 16.37;
//       if (company.prices[`${age}`] < avg - 2) {
//         rate += 5;
//         console.log(
//           `ageKey: ${age} company name: ${company.companyName} rate: ${rate}`
//         );
//       } else if (
//         company.prices[`${age}`] <= avg &&
//         company.prices[`${age}`] >= avg - 2
//       ) {
//         rate += 4;
//         console.log(
//           `ageKey: ${age} company name: ${company.companyName} rate: ${rate}`
//         );
//       } else if (
//         company.prices[`${age}`] > avg &&
//         company.prices[`${age}`] < avg + 1
//       ) {
//         rate += 3;
//         console.log(
//           `ageKey: ${age} company name: ${company.companyName} rate: ${rate}`
//         );
//       } else if (
//         company.prices[`${age}`] > avg &&
//         company.prices[`${age}`] < avg + 2
//       ) {
//         rate += 2;
//         console.log(
//           `ageKey: ${age} company name: ${company.companyName} rate: ${rate}`
//         );
//       } else if (company.prices[`${age}`] > avg + 3) {
//         rate += 1;
//         console.log(
//           `ageKey: ${age} company name: ${company.companyName} rate: ${rate}`
//         );
//       }
//     }
//     // age 70+ - avg 18.12
//     else if (age == 70 && company.prices[`${age}`]) {
//       // let avg = 18.12;
//       if (company.prices[`${age}`] < avg - 1) {
//         rate += 5;
//         console.log(
//           `ageKey: ${age} company name: ${company.companyName} rate: ${rate}`
//         );
//       } else if (
//         company.prices[`${age}`] <= avg &&
//         company.prices[`${age}`] >= avg - 1
//       ) {
//         rate += 4;
//         console.log(
//           `ageKey: ${age} company name: ${company.companyName} rate: ${rate}`
//         );
//       } else if (company.prices[`${age}`] > avg) {
//         rate += 3;
//         console.log(
//           `ageKey: ${age} company name: ${company.companyName} rate: ${rate}`
//         );
//       }
//     }

//     companiesRate[`${company.companyName}`] = rate;
//   });
//   return companiesRate;
// }
