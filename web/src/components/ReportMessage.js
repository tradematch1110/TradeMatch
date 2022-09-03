import React, { useState, useEffect, useContext } from "react";
import { authContext } from "../contexts/AuthContext";
import Loader from "./Loader";
import { Grid } from "@mui/material";
import { useLocation } from "react-router";
import { reportMessage } from "../services/api";

export default function ReportMessage() {
  const { currentUser } = useContext(authContext);
  const search = useLocation().search;
  const initialValues = {
    message: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [displayForm, setDisplayForm] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    let currentId = new URLSearchParams(search).get("id");
    setId(currentId);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    console.log("formValues: ", formValues);
    console.log("isSubmit: ", isSubmit);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log("formValues: ", formValues);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.message) {
      errors.message = "שדה חובה";
    } else if (values.message.length < 10) {
      errors.message = "מינימום 10 תווים";
    }
    return errors;
  };

  useEffect(() => {
    console.log("formErrors: ", formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("form is valid!!!!");
      setLoading(true);
      formValues.reportingUserId = currentUser.uid;
      formValues.productId = id;
      //   formValues.token = currentUser.accessToken;
      // fetch to server
      console.log("formValues with after adding values: ", formValues);

      async function fetchData(values) {
        const res = await reportMessage(values);
        console.log("respond from report message: ", res);
        switch (res.statusId) {
          case 1:
            // setCategoriesNames(res.value.categoriesNames);
            // console.log(res);
            setDisplayForm(false);
            setTimeout(() => {
              // navigate("/");
            }, 1000);
            setLoading(false);
            break;
          case 2:
            setError(res);
            setTimeout(() => {
              setError("");
            }, 5000);
            setLoading(false);
            break;
          default:
        }
      }
      fetchData(formValues);
    }
  }, [formErrors]);

  return (
    <>
      {error && <h1>{error.message}</h1>}
      {loading && <Loader />}
      {!loading && (
        <Grid
          direction={"column"}
          item
          container
          justifyContent="center"
          xs={12}
        >
          {displayForm && (
            <div className="product_form">
              {id && <p>{id}</p>}
              <form onSubmit={handleSubmit}>
                <div className="divWrapper" style={{ height: 200 }}>
                  <label> כתוב את הודעתך יא מלשין!!!</label>
                  <br />
                  <textarea
                    style={{ height: 150 }}
                    placeholder="תוכן ההודעה"
                    name="message"
                    value={formValues.message}
                    onChange={handleChange}
                  ></textarea>
                  <p>{formErrors.message}</p>
                </div>
                <br />
                <button>שלח</button>
                <br />
                <br />
              </form>
            </div>
          )}
          {!displayForm && <h2>הודעתך נקלטה בהצלחה במערכת</h2>}
        </Grid>
      )}
    </>
  );
}
