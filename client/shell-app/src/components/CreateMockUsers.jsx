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

  const [messages, setMessages] = useState([
    {
      text: "",
      variant: "primary",
    },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessages([]);

    ["Resident", "BusinessOwner", "CommunityOrganizer"].forEach(
      async (role) => {
        for (let i = 2; i < 10; i++) {
          const username = `${role.toLowerCase()}user${i}`;
          const password = `bb`;

          try {
            await signUp({
              variables: {
                username,
                password,
                role,
              },
            });
            setMessages((m) => [
              ...m,
              {
                variant: "success",
                text: `Creating user ${username} with password ${password} and role ${role}`,
              },
            ]);
          } catch (error) {
            if (error.graphQLErrors?.length > 0) {
              setMessages((m) => [
                ...m,
                { variant: "danger", text: error.graphQLErrors[0].message },
              ]);
            } else {
              setMessages((m) => [
                ...m,
                { variant: "danger", text: "Signup failed!" },
              ]);
            }
          }
        }
      }
    );
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Create Mock Users</h1>
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
        <Button variant="primary" type="submit">
          Create Mock Users
        </Button>
      </Form>
    </Container>
  );
}

export default SignUpComponent;
