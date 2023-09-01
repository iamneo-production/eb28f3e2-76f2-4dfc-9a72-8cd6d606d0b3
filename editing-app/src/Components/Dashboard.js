import NavBar from "./NavBar";
import ArticleList from "./ArticleList";
import "../Styles/Dashboard.css";

export default function Dashboard({usersData}) {
  return (
    <div className="dashboard-container">
      <NavBar />
      <div className="content">
        <ArticleList usersData={usersData}/>
      </div>
    </div>
  );
}
