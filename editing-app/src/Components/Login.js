import { useFormik } from "formik";
import * as Yup from "yup";
import "../Styles/login.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login({ usersData }) {
  const navigate = useNavigate();
  const textVal = "text";
  const passwordVal = "password";
  const [errorData, setErrorData] = useState("");
  const [passwordVisisblity, setPasswordVisiblity] = useState(false);
  const formikForm = useFormik({
    initialValues: {
      emailName: "",
      password: "",
    },
    validationSchema: Yup.object({
      emailName: Yup.string()
        .email("enter valid email")
        .required("email is a required field"),
      password: Yup.string().required(),
    }),
    
    onSubmit: async (values) => {
      try {
        const response = await axios.get(
          "http://localhost:3000/userCredentials"
        );

        const user = response.data.find(
          (user) =>
            user.email === values.emailName && user.password === values.password
        );

        if (user) {
          setErrorData("");
          localStorage.setItem("loggedInEmailId", values.emailName);
          navigate("/dashboard");
        } else {
          setErrorData("Invalid Credentials");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  const handlePasswordVisiblity = (visiblity) => {
    let passwordElement = document.getElementById("password-element");
    if (visiblity === true) {
      passwordElement.type = textVal;
    } else {
      passwordElement.type = passwordVal;
    }
    setPasswordVisiblity(visiblity);
  };
  return (
    <div className="login-container">
      <div className="form-container">
        {errorData.length > 0 && (
          <div className="error-container">{errorData}</div>
        )}
        <div className="login-title">Login</div>
        <form onSubmit={formikForm.handleSubmit}>
          <input
            className="login-input-element"
            type="text"
            onChange={formikForm.handleChange}
            onBlur={formikForm.handleBlur}
            name="emailName"
            value={formikForm.values.emailName}
            placeholder="Email"
          />
          <div
            className={
              formikForm.touched.emailName && formikForm.errors.emailName
                ? "login-error-message"
                : ""
            }
          >
            {formikForm.touched.emailName && formikForm.errors.emailName
              ? formikForm.errors.emailName
              : ""}
          </div>
          <br />
          <input
            type="password"
            id="password-element"
            className="login-input-element"
            onChange={formikForm.handleChange}
            onBlur={formikForm.handleBlur}
            name="password"
            onPaste={(event) => {
              event.preventDefault();
            }}
            value={formikForm.values.password}
            placeholder="password"
          ></input>
          <i
            id="show-password"
            className={
              formikForm.values.password.length > 0 && passwordVisisblity
                ? "bi bi-eye-slash-fill"
                : "bi bi-eye-fill"
            }
            onMouseUp={() => {
              handlePasswordVisiblity(false);
            }}
            onMouseDown={() => {
              handlePasswordVisiblity(true);
            }}
          ></i>
          <div
            className={
              formikForm.touched.password && formikForm.errors.password
                ? "login-error-message"
                : ""
            }
          >
            {formikForm.touched.password && formikForm.errors.password
              ? formikForm.errors.password
              : ""}
          </div>
          <br />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>{" "}
          <br />
        </form>
      </div>
    </div>
  );
}
