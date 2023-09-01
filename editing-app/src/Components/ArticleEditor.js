import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const ArticleEditor = ({ article, onSave }) => {
  const [editedTitle, setEditedTitle] = useState(article.title || "");
  const [editedContent, setEditedContent] = useState(article.content || "");
  const handleTitleChange = (event) => {
    setEditedTitle(event.target.value);
  };
  const handleContentChange = (content) => {
    setEditedContent(content);
  };
  const handleSave = () => {
    axios
      .put(`http://localhost:3000/articles/${article.id}`, {
        content: editedContent,
        title: editedTitle,
        id: article.id,
        authorName: article.authorName,
        collaborators: article.collaborators,
        comments: article.comments,
      })
      .then((response) => {
        onSave(
          editedContent,
          editedTitle,
          article.id,
          article.authorName,
          article.collaborators,
          article.comments
        );
        //navigate("/dashboard") // Update locally after successful update
      })
      .catch((error) => {
        console.error("Error updating article:", error);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Edit Article</h2>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={editedTitle}
          onChange={handleTitleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="content" className="form-label">
          Content
        </label>
        <ReactQuill
          value={editedContent}
          onChange={handleContentChange}
          theme="snow"
        />
      </div>
      <div className="d-flex justify-content-between">
        <button className="btn btn-primary" onClick={handleSave}>
          Publish
        </button>
      </div>
    </div>
  );
};

export default ArticleEditor;
