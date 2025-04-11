import { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import Loader from "./UI/Loader";

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      role
      token
    }
  }
`;

function LoginComponent({ onSuccess }) {
  const [login, { loading }] = useMutation(LOGIN);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [messages, setMessages] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessages([]);

    if (!formData.username.trim() || !formData.password.trim()) {
      setMessages([{ variant: "danger", text: "All fields are required!" }]);
      return;
    }

    try {
      const { data } = await login({
        variables: { username: formData.username, password: formData.password },
      });

      if (data.login) {
        setMessages([{ variant: "success", text: "Login successful!" }]);
        if (onSuccess) {
          onSuccess();
        }
      } else {
        setMessages([{ variant: "danger", text: "Invalid credentials!" }]);
      }
    } catch (error) {
      setMessages((m) => [...m, { variant: "danger", text: error.message }]);
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Login</h1>
      {loading && <Loader />}
      {messages.map(
        (msg, index) =>
          msg.text && (
            <Alert key={index} variant={msg.variant}>
              {msg.text}
            </Alert>
          )
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default LoginComponent;
