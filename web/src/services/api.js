// this api service contains functions with explicit name of the api service they provides.
// The functions turn to a helper file with the request params
import { helper } from "./../helper/ApiHelper";

export const registerNewUser = async (formValues) => {
  const url = "users/register";
  const method = "post";
  const headerToken = null;
  const data = formValues;
  return await helper(url, method, headerToken, data);
};

export const loginUser = async (formValues) => {
  const url = "users/login";
  const method = "post";
  const headerToken = null;
  const data = formValues;
  return await helper(url, method, headerToken, data);
};

export const getCategoriesNames = async () => {
  const url = "getCategoriesNames";
  const method = "post";
  const headerToken = null;
  const data = null;
  return await helper(url, method, headerToken, data);
};

export const createProduct = async (values) => {
  const url = "products/createProduct";
  const method = "post";
  const headerToken = values.token;
  const data = values;
  return await helper(url, method, headerToken, data);
};

export const getAllProducts = async () => {
  const url = "products/getAllProducts";
  const method = "post";
  const headerToken = null;
  const data = null;
  return await helper(url, method, headerToken, data);
};

//getAllProducts
export const getAuthToken = async (sessionId) => {
  const url = "session";
  const method = "post";
  const headerToken = null;
  const data = sessionId;
  return await helper(url, method, headerToken, data);
};

export const getOfferPrice = async (url, method, token, formValues) => {
  return await helper(url, method, token, formValues);
};

export const updateUserDetails = async (token, filterFormValues) => {
  const urlType = "add";
  const method = "post";
  const headerToken = token;
  const data = filterFormValues;

  return await helper(urlType, method, headerToken, data);
};

export const updateUserCreditCardDetails = async (token, cardValues) => {
  const urlType = "add";
  const method = "post";
  const headerToken = token;
  const data = cardValues;

  return await helper(urlType, method, headerToken, data);
};

// export const getOfferPrice = async () => {
//   const urlAll = process.env.REACT_APP_API + "/all";

//   try {
//     return await (
//       await fetch(urlAll)
//     )
//       .text()
//       .then((json) => {
//         result.status = "success";
//         result.statusId = 1;
//         result.value = json;
//         return result;
//       })
//       .catch((err) => {
//         result.status = "error";
//         result.statusId = 2;
//         result.value = "Server error";
//         return result;
//       });
//   } catch (error) {
//       console.log(error);
//     result.status = "error";
//     result.statusId = 2;
//     result.value = "Server error";
//     return result;
//   }
// };

// export const updateUserDetails = async (filterFormValues) => {
//   const urlAdd = process.env.REACT_APP_API + "/add";
//   const initParam = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(filterFormValues),
//   };

//   try {
//     return await (
//       await fetch(urlAdd, initParam)
//     )
//       .json()
//       .then(() => {
//         result.status = "success";
//         result.statusId = 1;
//         result.value = "";
//         return result;
//       })
//       .catch((err) => {
//         result.status = "error";
//         result.statusId = 2;
//         result.value = "Server error";
//         return result;
//       });
//   } catch (error) {
//     console.log(error);
//     result.status = "error";
//     result.statusId = 2;
//     result.value = "Server error";
//     return result;
//   }
// };

// export const updateUserCreditCardDetails = async (cardValues) => {
//   const urlAdd = process.env.REACT_APP_API + "/add";
//   const initParam = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(cardValues),
//   };
//   try {
//     return await (
//       await fetch(urlAdd, initParam)
//     )
//       .json()
//       .then(() => {
//         result.status = "success";
//         result.statusId = 1;
//         result.value = "";
//         return result;
//       })
//       .catch((err) => {
//         result.status = "error";
//         result.statusId = 2;
//         result.value = "Server error";
//         return result;
//       });
//   } catch (error) {
//     result.status = "error";
//     result.statusId = 2;
//     result.value = "Server error";
//     return result;
//   }
// };
