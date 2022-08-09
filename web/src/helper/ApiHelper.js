// this file contain main function - Helper that build the request according to the accepted params.
// then its address to the API URL and return the result Object to the calling fanction
// result statusId 1 = ok.
// result statusId 2 = faild.
// result value =  return the value of the respond.
// result status = error || success

const result = { status: null, value: null, statusId: null };

export const helper = async (urlType, method, token, data) => {

  const url = getUrl(urlType);
  const initParam = getInitParam(method, token, data);
  // console.log("initparam", initParam);
  // console.log("url", url);

  if (
    initParam.method === "POST" ||
    initParam.method === "PUT" ||
    initParam.method === "GET" ||
    initParam.method === "DELETE"
  ) {
    try {
      const response =  await fetch(url, initParam);
      const json = await response.json();

       if(!response.ok){
          result.status = "error";
          result.statusId = 2;
          result.value = json.message;
          return result;
       }
        if (response.ok) {
          result.status = "success";
          result.statusId = 1;
          result.value = json;
          return result;
        }

    } catch (error) {
      console.log("error: ", error);
      result.status = "error";
      result.statusId = 2;
      result.value = "Server error";
      return result;
    }
  }
};
// handle and build url for the request
const getUrl = (urlType) => {
  // define the url start (production || devaloper)
  let url = process.env.REACT_APP_API || "";
  switch (urlType) {
    case "users/register":
      url += "/api/users/register";
      break;
    case "users/login":
      url += "/api/users/login";
      break;
    case "getCategoriesNames":
      url += "/api/categories/getCategoriesNames";
      break;
    case "products/createProduct":
      url += "/api/products/createProduct";
      break;
    case "products/getAllProducts":
      url += "/api/products/getAllProducts";
      break;
    //products/createProduct
    default:
      result.status = "error";
      result.statusId = 2;
      result.value = `${urlType} not match`;
      return result;
  }
  return url;
};

// handle init params for the request
const getInitParam = (method, token, data) => {
  let initParam = {};
  switch (method) {
    case "get":
      initParam = {
        method: "GET",
        dataType: "json",
        headers: {
          Authorization: "Bearer " + token, // token
          
        },
      };
      break;
    case "post":
      const body = data ? JSON.stringify(data) : "";
      let headers = new Headers();

      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
      headers.append(
        "Authorization",
        "Basic " + "Access-Control-Allow-Headers",
        "X-Requested-With, Content-Type, Accept, Origin, Authorization",
      );
      headers.append("Access-Control-Allow-Origin", process.env.REACT_APP_API || "");
      headers.append("Authorization", "Bearer " + token)
      initParam = {
        method: "POST",
        dataType: "json",
        headers: headers,
        // headers: {
        //   "Content-Type": "application/json",
        //   "Access-Control-Allow-Origin": "*",
        //   "Access-Control-Allow-Headers":
        //     "X-Requested-With, Content-Type, Accept, Origin, Authorization",
        //   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        //   Authorization: "Bearer " + token,
        // },
        body: body,
      };
      break;
    case "put":
      initParam = {
        method: "PUT",
        dataType: "json",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data),
      };
      break;
    case "delete":
      initParam = {
        method: "DELETE",
        dataType: "json",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data),
      };
      break;
    default:
      result.status = "error";
      result.statusId = 2;
      result.value = `${method} not valid`;
      return result;
  }
  return initParam;
};
