import { Grid } from "@mui/material";
import React, { useState, useContext } from "react";
import { Button, Col, Row, Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { authContext } from "../contexts/AuthContext";
import { editUser, deleteUser } from "./../services/api";
import Loader from "./Loader";

export default function EditAnimal() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(authContext);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState("");
  const [formValues, setFormValues] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    phoneNumber: currentUser.phoneNumber,
  });
  const handleDeleteUser = async (e) => {
    const flag = window.confirm("האם אתה בטוח שברצונך למחוק לצמיתות משתמש?");
    console.log(flag);
    if (!flag) return;
    e.preventDefault();
    // update datebase
    setLoading(true);
    const res = await deleteUser(currentUser.uid);
    console.log(res);
    switch (res.statusId) {
      case 1:
        setLoading(false);
        setCurrentUser(null);
        localStorage.removeItem("user", {});
        window.alert("המשתמש הוסר מהמערכת!");
        navigate("/");
        break;
      case 2:
        setLoading(false);
        setError(res.value);
        setTimeout(() => {
          setError("");
        }, 5000);

        break;
      default:
    }
  };
  const handleSubmit = async (e) => {
    formValues._id = currentUser.uid;
    e.preventDefault();

    console.log(formValues);
    // update datebase
    setLoading(true);
    const res = await editUser(formValues);
    console.log(res);
    switch (res.statusId) {
      case 1:
        setLoading(false);
        setCurrentUser(res.value);
        localStorage.setItem("user", JSON.stringify(res.value));
        setSuccessMessage("עדכון הפרטים הושלם בהצלחה!");
        break;
      case 2:
        setLoading(false);
        setError(res.value);
        setTimeout(() => {
          setError("");
        }, 5000);

        break;
      default:
    }
  };
  const handleChange = (e) => {
    console.log("e.target.value: ", e.target);
  };
  return (
    <>
      {" "}
      {error && <h1>{error}</h1>}
      {successMessage && (
        <h1
          style={{
            marginTop: 200,
            maxWidth: "800px",
            minWidth: "360px",
            padding: 20,
          }}
        >
          {successMessage}
        </h1>
      )}
      {loading && <Loader />}
      {!loading && !successMessage && currentUser && (
        <Container
          style={{
            marginTop: 50,
            maxWidth: "800px",
            minWidth: "360px",
            padding: 20,
          }}
        >
          <h1
            style={{
              marginTop: 50,
              marginBottom: 50,
              color: "#0EACCB",
              fontWeight: "600",
            }}
          >
            פרטים אישיים {currentUser && currentUser.firstName}
          </h1>
          <Row
            style={{
              color: "#0EACCB",
              fontWeight: "600",
            }}
            className="justify-content-md-center"
          >
            <Col
              style={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              }}
            >
              <Form
                style={{
                  marginTop: 30,
                }}
                onSubmit={handleSubmit}
              >
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>שם פרטי</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={formValues.firstName}
                    onChange={(e) => {
                      setFormValues({
                        ...formValues,
                        firstName: e.target.value,
                      });
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>שם משפחה</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={formValues.lastName}
                    onChange={(e) => {
                      setFormValues({
                        ...formValues,
                        lastName: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>כתובת מייל</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={formValues.email}
                    disabled={true}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>מספר טלפון </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={formValues.phoneNumber}
                    onChange={(e) => {
                      setFormValues({
                        ...formValues,
                        phoneNumber: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
                <Grid container item justifyContent="center">
                  <Button
                    style={{
                      background: "#0EACCB",
                      fontWeight: "600",
                      width: 180,
                      alignContent: "center",
                      marginTop: 20,
                    }}
                    type="submit"
                  >
                    עדכן פרטים
                  </Button>
                </Grid>
                <br></br>
                <br></br>
              </Form>
            </Col>
            <br></br>
            <br></br>
            <br></br>
          </Row>
          <Row
            style={{
              color: "#0EACCB",
              fontWeight: "600",
            }}
            className="justify-content-md-center"
          >
            <Col
              style={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              }}
            >
              <Grid container item justifyContent="center">
                <Button
                  style={{
                    fontWeight: "600",
                    width: 180,
                    alignContent: "center",
                    margin: 50,
                  }}
                  variant="warning"
                  onClick={handleDeleteUser}
                >
                  מחק משתמש
                </Button>
              </Grid>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
