import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { Form, Button, Alert } from "react-bootstrap";

const CREATE_HELP_REQUEST = gql`
  mutation CreateHelpRequest($title: String!, $description: String!, $location: String) {
    createHelpRequest(title: $title, description: $description, location: $location) {
      id
      title
      description
      location
      createdAt
      updatedAt
    }
  }
`;

function CreateHelpReqComponent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");  // Add location state
  const [error, setError] = useState(null);

  const [createHelpRequest, { loading }] = useMutation(CREATE_HELP_REQUEST);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await createHelpRequest({ variables: { title, description, location } });
      setTitle("");
      setDescription("");
      setLocation("");  // Reset location
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-4">
      <h4>Need Help?</h4>

      <Form.Group className="mb-2">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </Form.Group>

      {error && <Alert variant="danger">{error}</Alert>}

      <Button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Submit Help Request"}
      </Button>
    </Form>
  );
}
  
  export default CreateHelpReqComponent;