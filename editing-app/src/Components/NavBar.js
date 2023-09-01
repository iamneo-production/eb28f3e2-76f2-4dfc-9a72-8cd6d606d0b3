import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
export default function NavBar() {
  const username = localStorage
    .getItem("loggedInEmailId")
    .replace("@gmail.com", "");

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand">WELCOME {username}</span>
          <div className="ml-auto">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  <FaUser className="icon" />
                  View Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/logout" className="nav-link text-danger">
                  <FaSignOutAlt className="icon" />
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
