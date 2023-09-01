//import "../Styles/Main1.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Logout() {
  const navigate = useNavigate();
  localStorage.setItem("loggedInEmailId", " ");
  const handleLogout = function () {
    navigate("/");
  };
  return (
    <div>
      <div className="container">
        <button className="btn btn-primary" onClick={handleLogout}>
          <i className="bi bi-plus">Go To Home Page</i>
        </button>
      </div>
    </div>
  );
}
