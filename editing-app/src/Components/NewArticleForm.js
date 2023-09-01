import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import ReactQuill styles
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const NewArticleForm = ({ onSuccess }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const authorName =
    String(localStorage.getItem("loggedInEmailId")).replace("@gmail.com", "") ||
    " hello";

  const handleSubmit = () => {
    const newArticle = {
      id: uuidv4(),
      title,
      content,
      collaborators: [],
      comments: [],
      authorName,
    };

    axios
      .post("http://localhost:3000/articles", newArticle)
      .then((response) => {
        console.log("New article added:", response.data);
        onSuccess(); // Notify parent component about successful article creation
      })
      .catch((error) => {
        console.error("Error creating new article:", error);
      });
  };

  return (
    <div>
      <h2>Create New Article</h2>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="content" className="form-label">
          Content
        </label>
        <ReactQuill value={content} onChange={setContent} />
      </div>
      <button className="btn btn-primary" onClick={handleSubmit}>
        Create Article
      </button>
    </div>
  );
};

export default NewArticleForm;
