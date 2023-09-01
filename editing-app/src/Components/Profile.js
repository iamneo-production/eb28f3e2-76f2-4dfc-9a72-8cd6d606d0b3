import "../Styles/Profile.css";
import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/userCredentials")
      .then((response) => setUsersData(response.data))
      .catch((error) => console.error(error));
  }, []);
  const targetEmail = localStorage.getItem("loggedInEmailId");
  const targetUser = usersData.find((user) => user.email === targetEmail);
  const navigate = useNavigate();
  if (!targetUser) {
    return <p>User not found</p>;
  }
  const handleBack = () => {
    navigate("/dashboard"); // Navigate back to the previous page
  };
  return (
    <div>
      <NavBar />
      <div className="user-details-container">
        <h2 className="user-info">
          <span className="user-icon">&#128100;</span>User Details
        </h2>
        <div className="user-info">
          <p>
            <span className="user-icon">&#128100;</span>ID: {targetUser.id}
          </p>
          <p>
            <span className="user-icon">&#128101;</span>Name: {targetUser.name}
          </p>
          <p>
            <span className="user-icon">&#9993;</span>Email: {targetUser.email}
          </p>
          <p>
            <span className="user-icon">&#127381;</span>Role: {targetUser.role}
          </p>
        </div>
        <button className="btn btn-secondary" onClick={handleBack}>
          Back
        </button>
      </div>
    </div>
  );
}
