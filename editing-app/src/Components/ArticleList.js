import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaEdit, FaComment, FaTrash } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ArticleModal from "./ArticleModal";
import ArticleEditor from "./ArticleEditor";
import NewArticleForm from "./NewArticleForm";
import "bootstrap/dist/css/bootstrap.min.css";

const ArticleList = (usersData) => {
  const [articles, setArticlesData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/articles")
      .then((response) => setArticlesData(response.data))
      .catch((error) => console.error(error));
  }, [articles]);

  const [viewModalShow, setViewModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [commentsModalShow, setCommentsModalShow] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [showNewArticleForm, setShowNewArticleForm] = useState(false);

  const [searchTitle, setSearchTitle] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [searchComments, setSearchComments] = useState("");

  const handleNewArticleSuccess = () => {
    setShowNewArticleForm(false);
  };
  const handleView = (article) => {
    setSelectedArticle(article);
    setViewModalShow(true);
  };

  const handleEdit = (article) => {
    setSelectedArticle(article);
    setEditModalShow(true);
  };

  const handleComments = (article) => {
    setSelectedArticle(article);
    setCommentsModalShow(true);
  };

  const handleDelete = (article) => {
    setSelectedArticle(article);
    setDeleteModalShow(true);
  };

  const confirmDelete = (article) => {
    axios
      .delete(`http://localhost:3000/articles/${article.id}`)
      .then((response) => {
        console.log("Article deleted:", selectedArticle.id);
        setDeleteModalShow(false);
        setSelectedArticle(null);
      })
      .catch((error) => {
        console.error("Error deleting article:", error);
      });
  };

  const filteredArticles = articles.filter((article) => {
    return (
      article.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
      article.authorName.toLowerCase().includes(searchAuthor.toLowerCase()) &&
      (!searchComments || article.comments?.length === parseInt(searchComments))
    );
  });

  return (
    <div className="container mt-5">
      <h2>Article List</h2>

      <div className="mb-3 d-flex align-items-center">
        <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search by Title"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
        </div>

        <div className="input-group ms-3">
          <span className="input-group-text">
            <i className="bi bi-person"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search by Author Name"
            value={searchAuthor}
            onChange={(e) => setSearchAuthor(e.target.value)}
          />
        </div>

        <div className="input-group ms-3">
          <span className="input-group-text">
            <i className="bi bi-chat-dots"></i>
          </span>
          <input
            type="number"
            className="form-control"
            placeholder="Search by Number of Comments"
            value={searchComments}
            onChange={(e) => setSearchComments(e.target.value)}
          />
        </div>
      </div>

      <ul className="list-group">
        {filteredArticles.map((article) => (
          <li
            key={article.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <h5 className="mb-1 font-weight-bold">{article.title}</h5>
              <p className="mb-1">
                <ReactQuill
                  value={article.content}
                  readOnly={true}
                  modules={{ toolbar: false }}
                  theme="snow"
                />
                {/* {article.content.substring(0, 100) + "..."} */}
              </p>
              <small className="text-muted">
                Published by {article.authorName}
              </small>
            </div>
            <div>
              <Button
                variant="primary"
                className="me-2"
                onClick={() => handleView(article)}
              >
                <FaEye />
              </Button>
              <Button variant="secondary" onClick={() => handleEdit(article)}>
                <FaEdit />
              </Button>
              &nbsp;&nbsp;
              <Button variant="info" onClick={() => handleComments(article)}>
                <FaComment /> {article.comments?.length}
              </Button>
              &nbsp;&nbsp;
              <Button variant="danger" onClick={() => handleDelete(article)}>
                <FaTrash />
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <ArticleModal
        show={viewModalShow}
        onHide={() => setViewModalShow(false)}
        article={selectedArticle || {}}
      />
      <Modal
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ArticleEditor
            article={selectedArticle || {}}
            onSave={(updatedContent) => {
              setEditModalShow(false);
            }}
          />
        </Modal.Body>
      </Modal>
      {selectedArticle && (
        <Modal
          show={commentsModalShow}
          onHide={() => setCommentsModalShow(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Comments</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul>
              {selectedArticle.comments.map((comment, index) => (
                <li key={index}> 
                  User {comment.userId}: {comment.text}
                </li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setCommentsModalShow(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {selectedArticle && (
        <Modal show={deleteModalShow} onHide={() => setDeleteModalShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete the article "{selectedArticle.title}
            "?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setDeleteModalShow(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => confirmDelete(selectedArticle)}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {showNewArticleForm ? (
        <NewArticleForm onSuccess={handleNewArticleSuccess} />
      ) : (
        <button
          className="btn btn-primary btn-floating position-fixed bottom-0 end-0 m-3"
          onClick={() => setShowNewArticleForm(true)}
        >
          <i className="bi bi-plus">Create New Article</i>
        </button>
      )}
    </div>
  );
};

export default ArticleList;
