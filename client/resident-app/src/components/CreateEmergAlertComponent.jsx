import { gql } from '@apollo/client';
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Form, Button, Alert } from "react-bootstrap";

const CREATE_EMERGENCY_ALERT = gql`
  mutation CreateEmergencyAlert($message: String!, $location: String, $urgencyLevel: String) {
    createEmergencyAlert(message: $message, location: $location, urgencyLevel: $urgencyLevel) {
      id
      message
      location
      urgencyLevel
      createdAt
    }
  }
`;

function CreateEmergencyAlertComponent() {
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState("");
  const [urgencyLevel, setUrgencyLevel] = useState("");
  const [error, setError] = useState(null);
  const [createEmergencyAlert, { loading }] = useMutation(CREATE_EMERGENCY_ALERT);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await createEmergencyAlert({ variables: { message, location, urgencyLevel } });
      setMessage("");
      setLocation("");
      setUrgencyLevel("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-2">
        <Form.Label>Message</Form.Label>
        <Form.Control
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
      <Form.Group className="mb-2">
        <Form.Label>Urgency Level</Form.Label>
        <Form.Control
          as="select"
          value={urgencyLevel}
          onChange={(e) => setUrgencyLevel(e.target.value)}
        >
          <option value="">Select urgency</option>
          <option value="Low">Low</option>
          <option value="Moderate">Moderate</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </Form.Control>
      </Form.Group>

      {error && <Alert variant="danger">{error}</Alert>}
      <Button type="submit" variant="danger" disabled={loading}>
        {loading ? "Sending Alert..." : "Send Emergency Alert"}
      </Button>
    </Form>
  );
}

export default CreateEmergencyAlertComponent;
