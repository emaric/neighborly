import { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import Loader from "./UI/Loader";

const SIGNUP = gql`
  mutation SignUp($username: String!, $password: String!, $role: String!) {
    signup(username: $username, password: $password, role: $role)
  }
`;

function SignUpComponent() {
  const [signUp, { loading }] = useMutation(SIGNUP);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "Resident",
  });

  const [messages, setMessages] = useState([
    {
      text: "",
      variant: "primary",
    },
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessages([]);

    if (formData.password !== formData.confirmPassword) {
      setMessages((m) => [
        ...m,
        { variant: "danger", text: "Passwords do not match!" },
      ]);
      return;
    }

    try {
      const { data } = await signUp({
        variables: {
          username: formData.username,
          password: formData.password,
          role: formData.role,
        },
      });

      if (data.signup) {
        setMessages([{ variant: "success", text: "Signup successful!" }]);
      } else {
        setMessages([{ variant: "danger", text: "Signup failed!" }]);
      }
    } catch (error) {
      if (error.graphQLErrors?.length > 0) {
        const errors = error.graphQLErrors[0].extensions?.errors;
        if (!!errors) {
          errors.forEach((_error) => {
            setMessages((m) => [
              ...m,
              { variant: "danger", text: _error.message },
            ]);
          });
        } else {
          setMessages((m) => [
            ...m,
            { variant: "danger", text: error.message },
          ]);
        }
      } else {
        setMessages((m) => [...m, { variant: "danger", text: error.message }]);
      }
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Sign Up</h1>
      {loading && <Loader />}
      {messages.map(
        (msg, index) =>
          msg &&
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

        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="role">
          <Form.Label>Role</Form.Label>
          <Form.Select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="Resident">Resident</option>
            <option value="BusinessOwner">Business Owner</option>
            <option value="CommunityOrganizer">Community Organizer</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
}

export default SignUpComponent;
