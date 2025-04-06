import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Form, Button, Alert } from "react-bootstrap";

const CREATE_COMMENT = gql`
  mutation CreateComment($parentId: String!, $content: String!) {
    createComment(parentId: $parentId, content: $content) {
      id
      parentId
      content
      userId
      createdAt
      updatedAt
    }
  }
`;

const CreateCommentComponent = ({ parentId, onSuccess }) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [createComment, { loading }] = useMutation(CREATE_COMMENT);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await createComment({
        variables: { parentId, content },
      });
      if (onSuccess) {
        onSuccess();
      }
      setContent("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group controlId="commentContent">
        <Form.Label>Comment</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={content}
          required
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your comment..."
          disabled={loading}
        />
      </Form.Group>

      {error && (
        <Alert variant="danger" className="mt-2">
          {error}
        </Alert>
      )}

      <div className="d-flex justify-content-end">
        <Button
          variant="primary"
          type="submit"
          disabled={loading || !content.trim()}
          className="mt-2"
        >
          {loading ? "Posting..." : "Post Comment"}
        </Button>
      </div>
    </Form>
  );
};

export default CreateCommentComponent;
