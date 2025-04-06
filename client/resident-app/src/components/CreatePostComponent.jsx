import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { Form, Button, Alert } from "react-bootstrap";

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String) {
    createPost(title: $title, content: $content) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;

function CreatePostComponent({ onCompleted }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [createPost, { loading }] = useMutation(CREATE_POST);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const { data } = await createPost({
        variables: { title, content },
      });
      if (data.createPost) {
        navigate(`/posts/${data.createPost.id}`);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-4">
      <Form.Group controlId="postTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          required
          disabled={loading}
        />
      </Form.Group>

      <Form.Group controlId="postContent">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter post content"
          required
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
          className="mt-2"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Post"}
        </Button>
      </div>
    </Form>
  );
}

export default CreatePostComponent;
