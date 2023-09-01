import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ReactQuill from "react-quill";
const ArticleModal = ({ show, onHide, article, isEditing }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? "Edit Article" : "View Article"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{article.title}</h4>
        <p>
          <ReactQuill
            value={article.content}
            readOnly={true}
            modules={{ toolbar: false }}
            theme="snow"
          />
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        {isEditing ? (
          <Button variant="primary" onClick={onHide}>
            Save Changes
          </Button>
        ) : null}
      </Modal.Footer>
    </Modal>
  );
};

export default ArticleModal;
