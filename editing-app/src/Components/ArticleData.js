import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import ArticleList from "./ArticleList";
import axios from "axios";

export default function ArticleData() {
  const [articlesData, setArticlesData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/articles")
      .then((response) => setArticlesData(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <NavBar />
      <ArticleList articles={articlesData} />
    </div>
  );
}
