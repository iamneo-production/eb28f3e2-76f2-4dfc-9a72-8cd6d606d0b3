import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errorData, setErrorData] = useState("");

  const handleRegistration = async (event) => {
    event.preventDefault();
    try {
      if (email && password && (role === "editor" || role === "author")) {
        await axios.post("http://localhost:3000/userCredentials", {
          name,
          email,
          role,
          password,
        });
        console.log("success");
        navigate("/login");
      } else {
        setErrorData("give valid data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card mt-5">
          <div className="card-body">
            {errorData.length > 0 && (
              <div className="error-container">{errorData}</div>
            )}
            <h2 className="card-title text-center mb-4">Register</h2>
            <form onSubmit={(event) => handleRegistration(event)}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  required={true}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  required={true}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  required={true}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <select
                  id="role"
                  className="form-control"
                  required={true}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option>--select any--</option>
                  <option>editor</option>
                  <option>author</option>
                </select>
              </div>

              <div className="d-grid gap-2">
                <button className="btn btn-primary">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
